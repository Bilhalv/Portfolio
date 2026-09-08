// Site behavior: i18n rendering, theme/language persistence, scroll progress,
// section waypoints and navigation, and scroll-reveal animations.
// Depends on `content` from scripts/content.js (load it first).

// ---------------------------------------------------------------------------
// Persistent preferences
// ---------------------------------------------------------------------------
const LANGUAGE_STORAGE_KEY = "portfolio-language";
const THEME_STORAGE_KEY = "portfolio-theme";

// localStorage can throw (private browsing, blocked storage), so every read and
// write is guarded and degrades to the no-preference/default state.
function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
  }
}

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------
const navItems = [
  "home",
  "projects",
  "about",
  "experience",
  "education",
  "skills",
  "contact",
];
// Mirrors the <section id=...> anchors in index.html; "title" is the hero/Home.
const sectionIds = [
  "title",
  "projects",
  "about",
  "experience",
  "education",
  "skills",
  "contact",
];

// ---------------------------------------------------------------------------
// App state
// ---------------------------------------------------------------------------
// Preferred language wins; otherwise fall back to the browser language (pt
// surfaces Portuguese, everything else defaults to English).
let language =
  readPreference(LANGUAGE_STORAGE_KEY) === "pt"
    ? "pt"
    : navigator.language.startsWith("pt")
      ? "pt"
      : "en";
// Persisted theme wins, else the OS color-scheme preference.
let isDarkMode =
  readPreference(THEME_STORAGE_KEY) === "dark" ||
  (!readPreference(THEME_STORAGE_KEY) &&
    matchMedia("(prefers-color-scheme: dark)").matches);

// ---------------------------------------------------------------------------
// Content rendering
// ---------------------------------------------------------------------------
/** Resolve a dotted path like "hero.summary" against the content object. */
const getValue = (object, path) =>
  path.split(".").reduce((value, key) => value[key], object);

/** Fill a timeline container (experience/education) from an items array. */
function renderList(containerId, entries) {
  document.getElementById(containerId).innerHTML = entries
    .map(
      (entry) =>
        `<article class="timeline-item"><span class="timeline-marker"></span><h3>${entry.title}</h3><p class="item-meta">${entry.meta}</p><ul>${entry.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul></article>`,
    )
    .join("");
}

/** Fill the skills grid from a list of { title, items } groups. */
function renderSkills(groups) {
  document.getElementById("skills-list").innerHTML = groups
    .map(
      (group) =>
        `<article class="skill-group"><h3>${group.title}</h3><ul>${group.items.map((item) => `<li><span class="skill-mark">+</span>${item}</li>`).join("")}</ul></article>`,
    )
    .join("");
}

/** Render the waypoint rail buttons and wire up their click handlers. */
function renderWaypoints(current) {
  document.getElementById("waypoint-rail").innerHTML = sectionIds
    .map((id, index) => {
      const label = id === "title" ? current.menu.home : current.menu[id];
      return `<button class="waypoint" type="button" data-waypoint="${id}" aria-label="${current.controls.goTo} ${label}" title="${label}"><span>${String(index).padStart(2, "0")}</span><i></i></button>`;
    })
    .join("");
  document.querySelectorAll("[data-waypoint]").forEach((button) => {
    button.addEventListener("click", () =>
      scrollToSection(button.dataset.waypoint),
    );
  });
}

/** Highlight the active section in the nav links and the waypoint rail. */
function setActiveSection(sectionId) {
  document.body.dataset.activeSection = sectionId;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === sectionId);
  });
  document.querySelectorAll("[data-waypoint]").forEach((button) => {
    const isActive = button.dataset.waypoint === sectionId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "location" : "false");
  });
}

/** Smooth-scroll to a section, offset by the sticky header; instant if the
 *  user prefers reduced motion. */
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const headerOffset = document.querySelector(".site-header").offsetHeight + 28;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: Math.max(
      0,
      element.getBoundingClientRect().top + window.scrollY - headerOffset,
    ),
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

// ---------------------------------------------------------------------------
// Scroll progress
// ---------------------------------------------------------------------------
let progressFrame = null;
// rAF-throttled: a read of scrollY per frame drives the scroll-console bar and
// the root --scroll-progress, which the decorations grid also consumes.
function updateScrollProgress() {
  if (progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      scrollableHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
        : 0;
    document.getElementById("scroll-progress").style.height = `${progress}%`;
    document.getElementById("scroll-percent").textContent =
      `${String(Math.round(progress)).padStart(2, "0")}%`;
    document
      .querySelector(".scroll-progress-track")
      .setAttribute("aria-valuenow", String(Math.round(progress)));
    document.documentElement.style.setProperty(
      "--scroll-progress",
      `${progress}%`,
    );
    progressFrame = null;
  });
}

// ---------------------------------------------------------------------------
// Scroll-reveal animations
// ---------------------------------------------------------------------------
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      )
    : null;

/** Watch reveal-on-scroll elements; stagger their --reveal-delay by order. */
function observeReveals() {
  const revealItems = document.querySelectorAll(
    ".project-card, .about-copy, .timeline-item, .skill-group, .contact-links",
  );
  revealItems.forEach((element, index) => {
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index * 55, 275)}ms`,
    );
    if (revealObserver) {
      revealObserver.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  });
}

// ---------------------------------------------------------------------------
// Page render / wiring
// ---------------------------------------------------------------------------
/** Apply the active language + theme to the DOM (content, nav, a11y labels). */
function render() {
  const current = content[language];
  document.documentElement.lang = language;
  document.querySelectorAll("[data-content]").forEach((element) => {
    element.textContent = getValue(current, element.dataset.content);
  });
  document.getElementById("nav-links").innerHTML = navItems
    .map(
      (item) =>
        `<a href="#${item === "home" ? "title" : item}" data-nav="${item === "home" ? "title" : item}">${current.menu[item]}</a>`,
    )
    .join("");
  document.getElementById("project-tags").innerHTML = current.projects.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  document.getElementById("focus-list").innerHTML = current.hero.focusItems
    .map((item) => `<li>${item}</li>`)
    .join("");
  renderList("experience-list", current.experience.items);
  renderList("education-list", current.education.items);
  renderSkills(current.skills.groups);
  renderWaypoints(current);
  observeReveals();
  document.getElementById("language-toggle").textContent =
    language.toUpperCase();
  document
    .getElementById("language-toggle")
    .setAttribute("aria-pressed", language === "pt" ? "true" : "false");
  document
    .getElementById("language-toggle")
    .setAttribute(
      "aria-label",
      language === "pt"
        ? "Mudar idioma para inglês"
        : "Switch language to Portuguese",
    );
  document
    .getElementById("theme-toggle")
    .setAttribute(
      "aria-label",
      isDarkMode ? "Switch to light mode" : "Switch to dark mode",
    );
  document
    .getElementById("theme-toggle")
    .setAttribute("aria-pressed", isDarkMode ? "true" : "false");
  document.getElementById("theme-label").textContent = isDarkMode
    ? "Dark"
    : "Light";
}

/** Apply the dark class + persist the choice, then re-render. */
function setTheme() {
  document.body.classList.toggle("dark", isDarkMode);
  document.getElementById("theme-icon").textContent = isDarkMode ? "☀" : "◐";
  writePreference(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = isDarkMode ? "#132023" : "#f5f7f3";
  render();
}

// Event wiring + init (DOM is fully parsed by the time this script runs).
document.getElementById("language-toggle").addEventListener("click", () => {
  language = language === "pt" ? "en" : "pt";
  writePreference(LANGUAGE_STORAGE_KEY, language);
  render();
  document.getElementById("status-announcer").textContent =
    language === "pt"
      ? "Idioma alterado para português."
      : "Language changed to English.";
});
document.getElementById("theme-toggle").addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  setTheme();
});
document
  .querySelectorAll("[data-scroll-to]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      scrollToSection(button.dataset.scrollTo),
    ),
  );
document.getElementById("year").textContent = new Date().getFullYear();

// Track the active section via a band near the viewport center. Fall back to
// marking the hero when IntersectionObserver is unavailable.
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }),
    { rootMargin: "-35% 0px -55%" },
  );
  sectionIds.forEach((id) =>
    sectionObserver.observe(document.getElementById(id)),
  );
} else {
  setActiveSection("title");
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();
setTheme();