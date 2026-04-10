"use client";

import i18next from "i18next";
import { useEffect, useMemo, useState } from "react";
import {
  GitHub,
  LinkedIn,
  Mail,
  Home as HomeIcon,
  AccountTree as ProjectsIcon,
  Info as AboutIcon,
  HomeRepairService as ExperienceIcon,
  School as EducationIcon,
  Code as SkillsIcon,
  ContactMail as ContactIcon,
  LightMode,
  DarkMode,
  Language,
  FmdGood,
  Verified,
  Hub,
  NorthEast,
  School,
} from "@mui/icons-material";

type SupportedLanguage = "en" | "pt";

type TimelineEntry = {
  title: string;
  meta: string;
  bullets: string[];
};

type RepoHighlight = {
  name: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
};

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const THEME_STORAGE_KEY = "portfolio-theme";

const techIconMap: Record<string, string> = {
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  HTML5: "html5",
  CSS3: "css3",
  "React.js": "react",
  "Next.js": "nextdotjs",
  "React Native": "react",
  "Node.js": "nodedotjs",
  Express: "express",
  MySQL: "mysql",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  Git: "git",
  GitHub: "github",
  Expo: "expo",
  Vercel: "vercel",
  Figma: "figma",
  "VS Code": "visualstudiocode",
};

const getTechIconUrl = (techName: string) => {
  const slug = techIconMap[techName];
  if (!slug) {
    return null;
  }
  return `https://cdn.simpleicons.org/${slug}`;
};

const content = {
  en: {
    menu: {
      home: "Home",
      projects: "Projects",
      about: "About",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      role: "Software Engineering Technician Student",
      summary:
        "Graduated in System Analysis and Development and now building practical, scalable products while studying in Toronto.",
      badgeLocation: "Toronto, Canada",
      badgeGrad: "System Analysis and Development - Graduated 2025",
      badgeCurrent: "Centennial College - Software Engineering Technician (2026 - Current)",
      ctaProjects: "View Projects",
      ctaContact: "Contact Me",
    },
    projects: {
      title: "Featured Work",
      liveLabel: "Case Study",
      cardTitle: "Minha Feira",
      cardDesc:
        "Web platform for market discovery, vendor onboarding, and public schedule visibility with practical location-based browsing.",
      tags: ["React", "Next.js", "TailwindCSS", "Maps"],
      comingTitle: "Building Next",
      comingDesc:
        "A new full-stack project focused on robust architecture, clean APIs, and production-ready UX is in progress.",
    },
    about: {
      title: "About",
      text:
        "I am a developer focused on solving real operational problems through automation, clear interfaces, and reliable systems. I graduated from UniSenac in 2025, currently study Software Engineering Technician at Centennial College, and live in Toronto, Canada.",
    },
    experience: {
      title: "Experience",
      items: [
        {
          title: "IT Assistant",
          meta: "ASSTBM | 2023 - Current | Pelotas, Brazil",
          bullets: [
            "Technical assistance and troubleshooting",
            "Website development and maintenance",
            "Document digitization workflows",
            "Process automation improvements",
          ],
        },
        {
          title: "IT Assistant and Social Media",
          meta: "SP Motos | 2023 - 2024 | Pelotas, Brazil",
          bullets: [
            "Technical assistance",
            "Website development",
            "Document digitization",
            "Process automation",
            "Social media operations",
          ],
        },
      ] as TimelineEntry[],
    },
    education: {
      title: "Education",
      items: [
        {
          title: "Technologist in System Analysis and Development",
          meta: "UniSenac | Pelotas, Brazil | Graduated in 2025",
          bullets: [
            "Databases: MySQL and MongoDB",
            "Web programming: React.js and TailwindCSS",
            "Algorithms and data structures with Python",
          ],
        },
        {
          title: "Software Engineering Technician",
          meta: "Centennial College | Toronto, Canada | 2026 - Current",
          bullets: [
            "Program code: 3408",
            "Software design principles",
            "Application architecture and testing",
            "Modern development practices",
          ],
        },
        {
          title: "Front End Beginner",
          meta: "Ada Tech - Santander Coders | 2024",
          bullets: [
            "Static Front End: HTML and CSS",
            "Programming Logic: JavaScript",
            "Object-oriented programming",
            "Dynamic Front End: DOM",
            "Angular I and II",
          ],
        },
      ] as TimelineEntry[],
    },
    skills: {
      title: "Skills",
      groups: [
        {
          title: "Languages",
          items: ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3"],
        },
        {
          title: "Frameworks and Runtime",
          items: ["React.js", "Next.js", "React Native", "Node.js", "Express", "Expo"],
        },
        {
          title: "Databases",
          items: ["MySQL", "MongoDB", "PostgreSQL"],
        },
        {
          title: "Tools and Platforms",
          items: ["Git", "GitHub", "Vercel", "Figma", "VS Code"],
        },
        {
          title: "Attributes",
          items: ["Proactivity", "Creativity", "Communication"],
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Open to internships, junior opportunities, and collaboration.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    controls: {
      modeLight: "Switch to light mode",
      modeDark: "Switch to dark mode",
      switchToEnglish: "Switch language to English",
      switchToPortuguese: "Switch language to Portuguese",
    },
    footer: "All rights reserved.",
  },
  pt: {
    menu: {
      home: "Início",
      projects: "Projetos",
      about: "Sobre",
      experience: "Experiência",
      education: "Educação",
      skills: "Habilidades",
      contact: "Contato",
    },
    hero: {
      role: "Estudante de Software Engineering Technician",
      summary:
        "Formado em Análise e Desenvolvimento de Sistemas e atualmente criando produtos práticos e escaláveis enquanto estudo em Toronto.",
      badgeLocation: "Toronto, Canada",
      badgeGrad: "Análise e Desenvolvimento de Sistemas - Formado em 2025",
      badgeCurrent: "Centennial College - Software Engineering Technician (2026 - Atual)",
      ctaProjects: "Ver Projetos",
      ctaContact: "Entrar em Contato",
    },
    projects: {
      title: "Projetos em Destaque",
      liveLabel: "Estudo de Caso",
      cardTitle: "Minha Feira",
      cardDesc:
        "Plataforma web para descoberta de feiras, cadastro de feirantes e exibição pública de horários com navegação por localização.",
      tags: ["React", "Next.js", "TailwindCSS", "Mapas"],
      comingTitle: "Próximo Projeto",
      comingDesc:
        "Um novo projeto full-stack focado em arquitetura robusta, APIs limpas e UX pronta para produção.",
    },
    about: {
      title: "Sobre",
      text:
        "Sou um desenvolvedor focado em resolver problemas operacionais reais com automação, interfaces claras e sistemas confiáveis. Me formei na UniSenac em 2025, atualmente estudo Software Engineering Technician na Centennial College e moro em Toronto, Canadá.",
    },
    experience: {
      title: "Experiência",
      items: [
        {
          title: "Assistente de TI",
          meta: "ASSTBM | 2023 - Atual | Pelotas, Brasil",
          bullets: [
            "Assistência técnica e suporte",
            "Desenvolvimento e manutenção de sites",
            "Fluxos de digitalização de documentos",
            "Melhorias com automação de processos",
          ],
        },
        {
          title: "Assistente de TI e Redes Sociais",
          meta: "SP Motos | 2023 - 2024 | Pelotas, Brasil",
          bullets: [
            "Assistência técnica",
            "Desenvolvimento de sites",
            "Digitalização de documentos",
            "Automação de processos",
            "Operação de redes sociais",
          ],
        },
      ] as TimelineEntry[],
    },
    education: {
      title: "Educação",
      items: [
        {
          title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
          meta: "UniSenac | Pelotas, Brasil | Formado em 2025",
          bullets: [
            "Banco de dados: MySQL e MongoDB",
            "Programação web: React.js e TailwindCSS",
            "Algoritmos e estruturas de dados com Python",
          ],
        },
        {
          title: "Software Engineering Technician",
          meta: "Centennial College | Toronto, Canada | 2026 - Atual",
          bullets: [
            "Princípios de design de software",
            "Arquitetura de aplicações e testes",
            "Práticas modernas de desenvolvimento",
          ],
        },
        {
          title: "Iniciante em Front End",
          meta: "Ada Tech - Santander Coders | 2024",
          bullets: [
            "Front End estático: HTML e CSS",
            "Lógica de programação: JavaScript",
            "Programação orientada a objetos",
            "Front End dinâmico: DOM",
            "Angular I e II",
          ],
        },
      ] as TimelineEntry[],
    },
    skills: {
      title: "Habilidades",
      groups: [
        {
          title: "Linguagens",
          items: ["TypeScript", "JavaScript", "Python", "HTML5", "CSS3"],
        },
        {
          title: "Frameworks",
          items: ["React.js", "Next.js", "React Native", "Node.js", "Expo"],
        },
        {
          title: "Bancos de Dados",
          items: ["MySQL", "MongoDB", "PostgreSQL"],
        },
        {
          title: "Ferramentas e Plataformas",
          items: ["Git", "GitHub", "Vercel", "Figma", "VS Code"],
        },
        {
          title: "Atributos",
          items: ["Proatividade", "Criatividade", "Comunicação"],
        },
      ],
    },
    contact: {
      title: "Contato",
      subtitle:
        "Aberto para estágios, oportunidades júnior e colaborações em projetos. Perfil ativo com contribuições consistentes no GitHub.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    controls: {
      modeLight: "Mudar para tema claro",
      modeDark: "Mudar para tema escuro",
      switchToEnglish: "Mudar idioma para inglês",
      switchToPortuguese: "Mudar idioma para português",
    },
    footer: "Todos os direitos reservados.",
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("title");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isPortuguese = language === "pt";

  const t = content[language];

  const menuItems = useMemo(
    () => [
      { id: "title", name: t.menu.home, icon: <HomeIcon fontSize="small" /> },
      {
        id: "projects",
        name: t.menu.projects,
        icon: <ProjectsIcon fontSize="small" />,
      },
      { id: "about", name: t.menu.about, icon: <AboutIcon fontSize="small" /> },
      {
        id: "experience",
        name: t.menu.experience,
        icon: <ExperienceIcon fontSize="small" />,
      },
      {
        id: "education",
        name: t.menu.education,
        icon: <EducationIcon fontSize="small" />,
      },
      { id: "skills", name: t.menu.skills, icon: <SkillsIcon fontSize="small" /> },
      {
        id: "contact",
        name: t.menu.contact,
        icon: <ContactIcon fontSize="small" />,
      },
    ],
    [t]
  );

  useEffect(() => {
    const storedLanguage =
      typeof window !== "undefined"
        ? (localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage | null)
        : null;

    const browserLanguage =
      typeof navigator !== "undefined" && navigator.language.startsWith("pt")
        ? "pt"
        : "en";

    const initialLanguage: SupportedLanguage =
      storedLanguage === "pt" || storedLanguage === "en"
        ? storedLanguage
        : browserLanguage;

    const syncLanguage = (lng: string) => {
      const normalizedLanguage: SupportedLanguage = lng.startsWith("pt")
        ? "pt"
        : "en";
      setLanguage(normalizedLanguage);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage);
      document.documentElement.lang = normalizedLanguage;
    };

    if (!i18next.isInitialized) {
      void i18next.init({
        lng: initialLanguage,
        fallbackLng: "en",
        supportedLngs: ["en", "pt"],
      });
    } else {
      void i18next.changeLanguage(initialLanguage);
    }

    syncLanguage(initialLanguage);
    i18next.on("languageChanged", syncLanguage);

    return () => {
      i18next.off("languageChanged", syncLanguage);
    };
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sectionOffsets = menuItems
        .map(({ id }) => {
          const element = document.getElementById(id);
          if (!element) {
            return null;
          }
          return {
            id,
            top: element.offsetTop,
            bottom: element.offsetTop + element.offsetHeight,
          };
        })
        .filter(Boolean) as { id: string; top: number; bottom: number }[];

      const current = sectionOffsets.find(
        (section) =>
          window.scrollY + 120 >= section.top && window.scrollY + 120 < section.bottom
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [menuItems]);

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 88,
      behavior: "smooth",
    });
  };

  const handleModeChange = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem(THEME_STORAGE_KEY, nextDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextDark);
  };

  const handleLanguageChange = () => {
    const nextLanguage: SupportedLanguage = isPortuguese ? "en" : "pt";
    void i18next.changeLanguage(nextLanguage);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="pointer-events-none absolute inset-0 -z-0 opacity-70 dark:opacity-40">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/35 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-300/35 blur-3xl" />
      </div>

      <header className="sticky top-3 z-50 mx-auto w-full max-w-6xl px-4">
        <nav className="rounded-2xl border border-slate-200/70 bg-white/85 px-3 py-3 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/85">
          <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScroll(item.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.name}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={handleModeChange}
                aria-label={isDarkMode ? t.controls.modeLight : t.controls.modeDark}
              >
                {isDarkMode ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                <span className="hidden sm:inline">{isDarkMode ? "Dark" : "Light"}</span>
              </button>
            </li>
            <li>
              <button
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={handleLanguageChange}
                aria-label={
                  isPortuguese
                    ? t.controls.switchToEnglish
                    : t.controls.switchToPortuguese
                }
              >
                <Language fontSize="small" />
                {isPortuguese ? "PT" : "EN"}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main
        id="main-content"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-14 sm:px-6"
      >
        <section id="title" className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-100/70 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-900/20 dark:text-cyan-200">
              <Hub fontSize="small" />
              {t.hero.role}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Pedro Bilhalva Oliveira
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {t.hero.summary}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium dark:border-slate-700 dark:bg-slate-900">
                <FmdGood fontSize="small" />
                {t.hero.badgeLocation}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium dark:border-slate-700 dark:bg-slate-900">
                <Verified fontSize="small" />
                {t.hero.badgeGrad}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium dark:border-slate-700 dark:bg-slate-900">
                <School fontSize="small" />
                {t.hero.badgeCurrent}
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
              Focus Areas
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li>Full-stack web development</li>
              <li>Process automation</li>
              <li>Clean architecture and maintainability</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                onClick={() => handleScroll("projects")}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                {t.hero.ctaProjects}
                <NorthEast fontSize="small" />
              </button>
              <button
                onClick={() => handleScroll("contact")}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {t.hero.ctaContact}
              </button>
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell">
          <div className="section-heading-wrap">
            <h2 className="section-heading">{t.projects.title}</h2>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <a
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              href="https://github.com/FeirasProjeto/Minha-Feira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                {t.projects.liveLabel}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{t.projects.cardTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t.projects.cardDesc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.projects.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-2xl font-semibold">{t.projects.comingTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {t.projects.comingDesc}
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell">
          <div className="section-heading-wrap">
            <h2 className="section-heading">{t.about.title}</h2>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="leading-relaxed text-slate-700 dark:text-slate-200">{t.about.text}</p>
          </div>
        </section>

        <section id="experience" className="section-shell">
          <div className="section-heading-wrap">
            <h2 className="section-heading">{t.experience.title}</h2>
          </div>
          <div className="mt-6 space-y-6 border-l-2 border-indigo-500/60 pl-5">
            {t.experience.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.meta}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-200">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section-shell">
          <div className="section-heading-wrap">
            <h2 className="section-heading">{t.education.title}</h2>
          </div>
          <div className="mt-6 space-y-6 border-l-2 border-cyan-500/60 pl-5">
            {t.education.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.meta}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-200">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell">
          <div className="section-heading-wrap">
            <h2 className="section-heading">{t.skills.title}</h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.skills.groups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800"
                    >
                      {getTechIconUrl(skill) ? (
                        <img
                          src={getTechIconUrl(skill) ?? ""}
                          alt={`${skill} icon`}
                          className="h-4 w-4 shrink-0"
                        />
                      ) : null}
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell">
          <div className="section-heading-wrap">
            <h2 className="section-heading">{t.contact.title}</h2>
          </div>
          <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">{t.contact.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:pedrobilhalvaoliveira@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              <Mail fontSize="small" />
              {t.contact.email}
            </a>
            <a
              href="https://linkedin.com/in/pedrobilhalva"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <LinkedIn fontSize="small" />
              {t.contact.linkedin}
            </a>
            <a
              href="https://github.com/bilhalv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <GitHub fontSize="small" />
              {t.contact.github}
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-6 w-full max-w-6xl px-4 pb-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Pedro Bilhalva Oliveira. {t.footer}
        </p>
      </footer>
    </div>
  );
}