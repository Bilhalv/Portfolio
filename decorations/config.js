window.decorationConfig = {
  // Spacing of the backdrop grid, in px. Also written to the root
  // --grid-step variable so the grid lines and the sparkle positions snap to
  // the same lattice (sparkles sit on grid "joints").
  gridStep: 64,

  // Ambient tracer lines. Each entry maps to one .ambient-line element:
  //   default           -> line one   (horizontal, upper area)
  //   vertical          -> line two   (vertical, left area)
  //   reverseHorizontal -> line three (horizontal, reverse direction)
  //   reverseVertical   -> line four  (vertical, reverse direction)
  //   slow              -> line five  (horizontal, short + fast-ish)
  //   duration: length of one full animation loop, in seconds.
  //   delay:    negative values start the line mid-loop so the tracers feel
  //             continuous and desynchronized instead of starting together.
  linePasses: {
    default: {
      duration: 25,
      delay: 0,
    },
    vertical: {
      duration: 25,
      delay: -8,
    },
    reverseHorizontal: {
      duration: 25,
      delay: -13,
    },
    reverseVertical: {
      duration: 25,
      delay: -5,
    },
    slow: {
      duration: 25,
      delay: -10,
    },
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