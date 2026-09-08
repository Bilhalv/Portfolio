// Bilingual site copy.
// `content[language]` holds every translatable string. Markup references a key
// via data-content="path.to.key" (e.g. "hero.summary"), and scripts/site.js
// resolves it through getValue(). Add a key here and it becomes reachable from
// the markup without touching the render logic.

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
      badgeCurrent:
        "Centennial College - Software Engineering Technician (2026 - Current)",
      ctaProjects: "View projects",
      ctaContact: "Contact me",
      statusLabel: "Job status",
      statusValue: "Available",
      focusTitle: "Focus areas",
      focusItems: [
        "Full-stack web development",
        "Process automation",
        "Clean architecture",
      ],
    },
    projects: {
      title: "Featured work",
      liveLabel: "Case study",
      cardTitle: "Minha Feira",
      cardDesc:
        "Mobile app for finding local markets in Pelotas. I worked on login, registration and password validation, componentization, API refactors, map improvements, and NativeWind integration.",
      tags: ["React Native", "Expo", "NativeWind", "Node.js", "Prisma", "Maps"],
      comingTitle: "Building next",
      comingDesc:
        "A new full-stack project focused on robust architecture, clean APIs, and production-ready UX is in progress.",
    },
    about: {
      title: "About",
      text: "I am a developer focused on solving real operational problems through automation, clear interfaces, and reliable systems. I graduated from UniSenac in 2025, currently study Software Engineering Technician at Centennial College, and live in Toronto, Canada.",
    },
    experience: {
      title: "Experience",
      items: [
        {
          title: "Frontend Developer",
          meta: "Freelance | Remote | July 2025 - Present",
          bullets: [
            "Translated Figma UI/UX designs into responsive React components",
            "Designed RESTful API contracts for data-driven interfaces",
            "Implemented Jest unit tests for reliable, maintainable code",
            "Built scalable component architectures using OOP principles",
            "Collaborated in Agile/Scrum workflows and iterative sprints",
          ],
        },
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
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          title: "Software Engineering Technician",
          meta: "Centennial College | Toronto, Canada | 2026 - Current",
          bullets: [
            "Software design principles",
            "Application architecture and testing",
            "Modern development practices",
          ],
        },
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
      ],
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
          items: [
            "React.js",
            "Next.js",
            "React Native",
            "Node.js",
            "Express",
            "Expo",
          ],
        },
        { title: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL"] },
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
    controls: { goTo: "Go to" },
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
      badgeLocation: "Toronto, Canadá",
      badgeGrad: "Análise e Desenvolvimento de Sistemas - Formado em 2025",
      badgeCurrent:
        "Centennial College - Software Engineering Technician (2026 - Atual)",
      ctaProjects: "Ver projetos",
      ctaContact: "Entrar em contato",
      statusLabel: "Status profissional",
      statusValue: "Disponível",
      focusTitle: "Áreas de foco",
      focusItems: [
        "Desenvolvimento web full-stack",
        "Automação de processos",
        "Arquitetura limpa",
      ],
    },
    projects: {
      title: "Projetos em destaque",
      liveLabel: "Estudo de caso",
      cardTitle: "Minha Feira",
      cardDesc:
        "Aplicativo para encontrar feiras locais em Pelotas. Trabalhei em validação de login, cadastro e nova senha, componentização, refatoração das chamadas de API, melhorias na biblioteca de mapas e integração com NativeWind.",
      tags: [
        "React Native",
        "Expo",
        "NativeWind",
        "Node.js",
        "Prisma",
        "Mapas",
      ],
      comingTitle: "Próximo projeto",
      comingDesc:
        "Um novo projeto full-stack focado em arquitetura robusta, APIs limpas e UX pronta para produção.",
    },
    about: {
      title: "Sobre",
      text: "Sou um desenvolvedor focado em resolver problemas operacionais reais com automação, interfaces claras e sistemas confiáveis. Me formei na UniSenac em 2025, atualmente estudo Software Engineering Technician na Centennial College e moro em Toronto, Canadá.",
    },
    experience: {
      title: "Experiência",
      items: [
        {
          title: "Desenvolvedor Frontend",
          meta: "Freelance | Remoto | Julho de 2025 - Atual",
          bullets: [
            "Transformação de projetos Figma em componentes React responsivos",
            "Definição de contratos de APIs REST para interfaces dinâmicas",
            "Implementação de testes unitários com Jest",
            "Construção de arquiteturas escaláveis com princípios de POO",
            "Colaboração em fluxos Agile/Scrum e sprints iterativos",
          ],
        },
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
      ],
    },
    education: {
      title: "Educação",
      items: [
        {
          title: "Software Engineering Technician",
          meta: "Centennial College | Toronto, Canadá | 2026 - Atual",
          bullets: [
            "Princípios de design de software",
            "Arquitetura de aplicações e testes",
            "Práticas modernas de desenvolvimento",
          ],
        },
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
      ],
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
          items: [
            "React.js",
            "Next.js",
            "React Native",
            "Node.js",
            "Express",
            "Expo",
          ],
        },
        { title: "Bancos de dados", items: ["MySQL", "MongoDB", "PostgreSQL"] },
        {
          title: "Ferramentas e plataformas",
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
        "Aberto para estágios, oportunidades júnior e colaborações em projetos.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    controls: { goTo: "Ir para" },
    footer: "Todos os direitos reservados.",
  },
};