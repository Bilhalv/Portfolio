window.decorationConfig = {
  // Spacing of the backdrop grid, in px. Also written to the root
  // --grid-step variable so the grid lines and the sparkle positions snap to
  // the same lattice (sparkles sit on grid "joints").
  gridStep: 64,

  // Ambient tracer lines. Rendered like the sparkles: N configurable lines,
  // each snapped to a random grid row (horizontal) or column (vertical) with a
  // random speed, random negative start delay, random length and a cycled
  // color, so no two loads look identical.
  lines: {
    // How many tracer lines are rendered.
    count: 5,

    // Random animation speed range (one full cross-screen loop), in seconds.
    minDuration: 14,
    maxDuration: 26,

    // Random negative start delay (max magnitude), in seconds. Negative values
    // start lines mid-loop so the tracers feel continuous and desynchronized
    // instead of starting together.
    maxDelay: 12,

    // Random line length, in grid cells (gridStep px each).
    minLength: 6,
    maxLength: 12,

    // Share (0-1) of lines that travel horizontally along a grid row; the
    // remaining lines travel vertically along a grid column.
    horizontalShare: 0.6,

    // Line glow colors, cycled per line. CSS variables or any CSS color work.
    colors: ["var(--accent)", "var(--cyan)", "#c084fc", "#818cf8"],
  },

  dots: {
    // How many sparkles are rendered (each cycles onto random grid joints).
    count: 5,

    // Random per-dot scale multiplier (rem) applied to the base 1rem sparkle.
    minSize: 0.5,
    maxSize: 1.35,

    // Sparkle width range, in rem. Randomly chosen per dot.
    horizontalMin: 1.2,
    horizontalMax: 2.4,

    // Sparkle height range, in rem. Keeping this above the width range yields
    // the stretched "reticle/cursor-flare" sparkles the design calls for.
    verticalMin: 2.8,
    verticalMax: 4.2,

    // Durations (ms) of the sparkle state machine phases:
    //   fade:         pause between "faded out" and relocating to a new joint.
    //                 Keep >= the CSS opacity transition (800ms), or the dot
    //                 will snap to the new position while still visible.
    //   hiddenHold:   how long the dot stays dark at its new joint.
    //   visibleHold:  how long it stays lit before the CSS fade-out begins.
    //   jitter:       randomized extra lit-time (and initial stagger), so dots
    //                 don't blink in lockstep.
    fade: 750,
    hiddenHold: 750,
    visibleHold: 250,
    jitter: 2500,

    // Valley curvature of the sparkle path, in px along the chord normal.
    // Each quadratic control point = chord midpoint pushed inward by 2x this
    // value. Larger = deeper smooth "U" valleys (Lucide-style junction);
    // near 0  = sharp angular zig-zag. 3.5 is the tuned sweet spot.
    junctionCurve: 3.5,
  },

  // Sparkle colors, cycled per dot. CSS variables or any CSS color work.
  colors: ["var(--accent)", "var(--cyan)", "#c084fc", "#818cf8"],
};