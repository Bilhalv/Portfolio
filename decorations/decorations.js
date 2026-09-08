// Background decoration system.
// Draws an SVG sparkle on random points of the --grid-step lattice, plus a
// configurable number of tracer lines on random grid rows/columns, all inside
// #decorations (behind the page content). Behavior is tunable via
// decorations/config.js.

const decorationRoot = document.getElementById("decorations");
const config = window.decorationConfig;

// Push the JS grid spacing into a root variable BEFORE reading it below, so the
// CSS grid lines and the sparkle positions share one source of truth. The value
// ends up in px, but keep the rem fallback for the default in stylesheets.
if (config.gridStep) {
  document.documentElement.style.setProperty("--grid-step", `${config.gridStep}px`);
}
const rootStyles = getComputedStyle(document.documentElement);
const rootFontSize = parseFloat(rootStyles.fontSize) || 16;
const cssGridStep = rootStyles.getPropertyValue("--grid-step").trim();
const gridStep = cssGridStep.endsWith("rem")
  ? parseFloat(cssGridStep) * rootFontSize
  : parseFloat(cssGridStep) || config.gridStep;

const dotColors = config.colors;
const dotCount = config.dots.count;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const timing = config.dots;

// ---------------------------------------------------------------------------
// Ambient tracer lines
// ---------------------------------------------------------------------------
// Rendered exactly like the sparkles: a configurable number of lines, each
// snapped to a random grid row (horizontal) or column (vertical), with a
// random speed (duration), random negative start delay, random length and a
// cycled color. Under reduced motion the animation is skipped, so only the
// static lanes are placed.
const randBetween = (min, max) => min + Math.random() * (max - min);
const linesConfig = config.lines;

const lines = Array.from({ length: linesConfig.count }, (_, index) => {
  const line = document.createElement("span");
  const horizontal = Math.random() < linesConfig.horizontalShare;
  const reverse = Math.random() < 0.5;
  const length = randBetween(linesConfig.minLength, linesConfig.maxLength);

  line.className = `ambient-line ${horizontal ? "is-horizontal" : "is-vertical"}`;
  line.style.setProperty("--line-color", linesConfig.colors[index % linesConfig.colors.length]);
  line.style.width = horizontal ? `${length * gridStep}px` : "1px";
  line.style.height = horizontal ? "1px" : `${length * gridStep}px`;

  if (!reducedMotion) {
    line.style.animationName = horizontal
      ? (reverse ? "horizontal-tracer-reverse" : "horizontal-tracer")
      : (reverse ? "vertical-tracer-reverse" : "vertical-tracer");
    line.style.animationDuration = `${randBetween(linesConfig.minDuration, linesConfig.maxDuration)}s`;
    line.style.animationDelay = `-${randBetween(0, linesConfig.maxDelay)}s`;
    // Start off-canvas so the first frame doesn't flash at the origin.
    line.style.transform = horizontal
      ? `translate3d(${reverse ? "220vw" : "-120vw"}, 0, 0)`
      : `translate3d(0, ${reverse ? "220vh" : "-120vh"}, 0)`;
  }

  // A horizontal line rides one grid row somewhere down the full page; a
  // vertical line rides one grid column somewhere across the viewport.
  const place = () => {
    if (horizontal) {
      const cellsTall = Math.max(1, Math.ceil(document.documentElement.scrollHeight / gridStep));
      line.style.top = `${Math.floor(Math.random() * cellsTall) * gridStep}px`;
    } else {
      const cellsWide = Math.max(1, Math.floor(window.innerWidth / gridStep));
      line.style.left = `${Math.floor(Math.random() * cellsWide) * gridStep}px`;
    }
  };
  place();
  decorationRoot.append(line);
  return { place };
});

// ---------------------------------------------------------------------------
// Sparkle path geometry
// ---------------------------------------------------------------------------
// One path with 4 tips and 4 quadratic valley segments, generated from the
// `junctionCurve` config. Each control point is the midpoint of its valley
// chord, pushed inward (toward the sparkle centerline) by 2 * junctionCurve,
// so larger values deepen the valleys.
const n = Math.SQRT1_2;
const f = (v) => +v.toFixed(2);
const d = timing.junctionCurve * 2;
const tip = [[12,2],[22,12],[12,22],[2,12]];
const mid = [[17,7],[17,17],[7,17],[7,7]];
const nrm = [[-n,n],[-n,-n],[n,-n],[n,n]];
const q = mid.map((m,i) => [f(m[0]+d*nrm[i][0]), f(m[1]+d*nrm[i][1])]);
const sparklePath = `M${tip[0]}Q${q[0]} ${tip[1]}Q${q[1]} ${tip[2]}Q${q[2]} ${tip[3]}Q${q[3]} ${tip[0]}Z`;

// ---------------------------------------------------------------------------
// Sparkle dots
// ---------------------------------------------------------------------------
// Each dot is a 1px anchor placed on a random grid joint; the SVG is centered
// on it with translate(-50%, -50%) (see decorations.css .sparkle-svg).
const dots = Array.from({ length: dotCount }, (_, index) => {
  const dot = document.createElement("span");
  dot.className = "grid-dot";
  const color = dotColors[index % dotColors.length];
  const size = timing.minSize + Math.random() * (timing.maxSize - timing.minSize);
  const horizontalSize = timing.horizontalMin + Math.random() * (timing.horizontalMax - timing.horizontalMin);
  const verticalSize = timing.verticalMin + Math.random() * (timing.verticalMax - timing.verticalMin);
  dot.style.setProperty("--sparkle-x", horizontalSize);
  dot.style.setProperty("--sparkle-y", verticalSize);
  dot.style.setProperty("--sparkle-scale", size);
  dot.style.color = color;
  dot.innerHTML = `<svg class="sparkle-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${sparklePath}" fill="currentColor"/></svg>`;
  decorationRoot.append(dot);
  return dot;
});

// Random grid joint (multiple of gridStep). x spans the viewport, y spans the
// full document height so sparkles appear throughout the (scrollable) page.
const randomJoint = () => ({
  x: Math.floor(Math.random() * Math.max(1, Math.floor(window.innerWidth / gridStep))) * gridStep,
  y: Math.floor(Math.random() * Math.max(1, Math.ceil(document.documentElement.scrollHeight / gridStep))) * gridStep,
});

const placeDot = (dot) => {
  const joint = randomJoint();
  dot.style.left = `${joint.x}px`;
  dot.style.top = `${joint.y}px`;
};

// ---------------------------------------------------------------------------
// Sparkle state machine
// ---------------------------------------------------------------------------
// entering -> visible (lit, then CSS-faded out) -> hidden -> (relocate) ...
// Timers are stashed on the dot so a resize can restart mid-cycle cleanly.
const clearDotTimer = (dot) => {
  if (dot._timer) window.clearTimeout(dot._timer);
};

const scheduleDotPhase = (dot, delay, phase) => {
  clearDotTimer(dot);
  dot._phase = phase;
  dot._timer = window.setTimeout(() => runDotPhase(dot), delay);
};

const runDotPhase = (dot) => {
  if (dot._phase === "visible") {
    dot.classList.remove("is-lit");
    scheduleDotPhase(dot, timing.fade, "hidden");
    return;
  }
  if (dot._phase === "hidden") {
    placeDot(dot);
    scheduleDotPhase(dot, timing.hiddenHold, "entering");
    return;
  }
  dot.classList.add("is-lit");
  scheduleDotPhase(dot, timing.fade + timing.visibleHold + Math.random() * timing.jitter, "visible");
};

const startDot = (dot, stagger = true) => {
  clearDotTimer(dot);
  placeDot(dot);
  if (reducedMotion) {
    dot.classList.add("is-lit");
    return;
  }
  dot.classList.remove("is-lit");
  scheduleDotPhase(dot, stagger ? Math.random() * timing.jitter : 0, "entering");
};

dots.forEach((dot) => {
  startDot(dot);
});

// On resize the lattice moves under the dots AND lines, so relocate them all;
// stagger the first light-up so the dots don't all flash at once.
window.addEventListener("resize", () => {
  dots.forEach((dot) => startDot(dot, false));
  lines.forEach((line) => line.place());
});