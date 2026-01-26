
// /lib/smoothScroll.js

/**
 * Smooth scroll to an element or selector with offset + easing + polyfill fallback.
 * @param {Element|string} target - Element or selector/hash string.
 * @param {Object} opts
 * @param {number} [opts.offset=0] - Pixels to offset (for sticky headers).
 * @param {number} [opts.duration=600] - Duration in ms for polyfill.
 * @param {"outCubic"|"linear"} [opts.easing="outCubic"] - Easing for polyfill.
 * @param {Function} [opts.onDone] - Callback after scroll finishes.
 */
export function smoothScrollTo(target, opts = {}) {
  const { offset = 0, duration = 600, easing = "outCubic", onDone } = opts;

  let el = target;
  if (typeof target === "string") {
    el = document.querySelector(target);
  }
  if (!el) return;

  const startY = window.scrollY || window.pageYOffset;
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + startY - offset;

  // If native smooth behavior exists, use it
  try {
    window.scrollTo({ top: targetY, behavior: "smooth" });
    // Fallback to onDone after an approximate delay (cannot detect native end)
    if (typeof onDone === "function") {
      setTimeout(onDone, Math.max(200, duration));
    }
    return;
  } catch {
    // Some browsers throw for object options; polyfill below
  }

  const easings = {
    linear: (t) => t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
  };
  const ease = easings[easing] || easings.outCubic;

  const startTime = performance.now();

  function frame(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    const y = startY + (targetY - startY) * ease(t);
    window.scrollTo(0, y);

    if (t < 1) {
      requestAnimationFrame(frame);
    } else if (typeof onDone === "function") {
      onDone();
    }
  }

  requestAnimationFrame(frame);
}
