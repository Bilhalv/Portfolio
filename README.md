# Portfolio

This is a dependency-free portfolio website built with vanilla HTML, CSS, and JavaScript. It is fully responsive and includes language switching, dark mode, smooth section navigation, a scroll-progress console, animated section reveals, and localStorage persistence.

## Features

- Responsive design
- Dark mode
- Vanilla HTML, CSS, and JavaScript
- English and Portuguese translations
- Light and dark themes
- Terminal-inspired scroll progress and section waypoints
- Reduced-motion support for scroll and reveal effects
- Semantic no-JavaScript overview fallback
- Accessible progress, language, and theme state announcements
- Grid decorations isolated in `decorations/` with reduced-motion support

## Structure

```
index.html                  Markup + load order (data-content keys come from content.js)
styles/
  base.css                  Tokens, reset, typography, header/nav, scroll-console, layout chrome
  components.css            Hero, buttons, project cards, about, timeline, skills, contact
  responsive.css            Reduced-motion overrides + 850px / 560px breakpoints
scripts/
  content.js                Bilingual copy (content.en / content.pt); edit strings here
  site.js                   Rendering, navigation, scroll progress, reveal, theme/language
decorations/
  config.js                 Tuning knobs for the background decorations
  decorations.js            Grid joints, tracer lines, sparkle path + dot state machine
  decorations.css           Grid backdrop, tracers, sparkles, reduced-motion fallback
```

Load order matters: CSS links `base → components → responsive → decorations`; scripts load `content → site`, then `decorations/config → decorations`. Every option in `decorations/config.js` is documented inline (units, effect, and range hints).

## About

This project serves as a portfolio for me, showcasing my skills and experience in web development.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
