// /lib/smoothScroll.js

/**
 * Smooth scroll to an element / selector / hash with offset + easing.
 * - Handles prefers-reduced-motion
 * - Optional hash update without jump
 * - Optional focus for accessibility
 *
 * @param {Element|string} target - Element OR selector/hash string ("#id" | "id" | ".class")
 * @param {Object} opts
 * @param {number} [opts.offset=0] - Pixels to offset (sticky header).
 * @param {number} [opts.duration=650] - Polyfill duration (ms).
 * @param {"outCubic"|"linear"} [opts.easing="outCubic"] - Easing for polyfill.
 * @param {boolean} [opts.updateHash=false] - Update URL hash (for anchors).
 * @param {boolean} [opts.focus=false] - Focus target after scroll (accessibility).
 * @param {number} [opts.focusDelay=0] - Delay focus (ms).
 * @param {Function} [opts.onDone] - Callback after scroll finishes.
 * @param {string|Element|null} [opts.header] - Header element/selector to auto-offset (optional).
 */
export function smoothScrollTo(target, opts = {}) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const {
    offset = 0,
    duration = 650,
    easing = "outCubic",
    updateHash = false,
    focus = false,
    focusDelay = 0,
    onDone,
    header = null,
  } = opts;

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Resolve element
  let el = target;

  if (typeof target === "string") {
    // Allow "services" as shorthand for "#services"
    const str = target.trim();
    const selector =
      str.startsWith("#") || str.startsWith(".") || str.startsWith("[")
        ? str
        : `#${str}`;
    el = document.querySelector(selector);
  }

  if (!el) return;

  // Compute automatic header offset if provided
  let headerOffset = 0;
  if (header) {
    const headerEl =
      typeof header === "string" ? document.querySelector(header) : header;
    if (headerEl && headerEl.getBoundingClientRect) {
      headerOffset = Math.round(headerEl.getBoundingClientRect().height);
    }
  }

  const totalOffset = Math.max(0, offset + headerOffset);

  const startY = window.scrollY || window.pageYOffset || 0;
  const rect = el.getBoundingClientRect();
  const targetY = Math.max(0, rect.top + startY - totalOffset);

  const finish = () => {
    // Optional URL hash update without jump
    if (updateHash) {
      const id = el.id ? `#${el.id}` : null;
      if (id) {
        // replaceState avoids pushing history spam; use pushState if you prefer
        window.history.replaceState(null, "", id);
      }
    }

    // Optional focus (accessibility)
    if (focus) {
      window.setTimeout(() => {
        // Make it focusable if it isn’t already
        const prevTabIndex = el.getAttribute("tabindex");
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });

        // Optional: restore tabindex if it wasn't originally set
        if (prevTabIndex === null) {
          // keep it? usually safe to remove
          el.removeAttribute("tabindex");
        }
      }, Math.max(0, focusDelay));
    }

    if (typeof onDone === "function") onDone();
  };

  // Reduced motion: jump instantly
  if (prefersReduced) {
    window.scrollTo(0, targetY);
    finish();
    return;
  }

  // If native smooth is supported, use it and detect end via RAF watcher
  // (Better than guessing with setTimeout)
  const canNativeSmooth = "scrollBehavior" in document.documentElement.style;

  if (canNativeSmooth) {
    window.scrollTo({ top: targetY, behavior: "smooth" });

    // End detection: watch scroll position settle
    let lastY = -1;
    let sameCount = 0;
    const maxFrames = Math.ceil((duration / 16) * 2); // safety
    let frames = 0;

    const watch = () => {
      frames += 1;
      const y = window.scrollY || window.pageYOffset || 0;

      if (Math.abs(y - targetY) <= 1) {
        finish();
        return;
      }

      if (Math.abs(y - lastY) <= 0.5) sameCount += 1;
      else sameCount = 0;

      lastY = y;

      // If scrolling stopped but we didn't land exactly, force final
      if (sameCount > 8 || frames > maxFrames) {
        window.scrollTo(0, targetY);
        finish();
        return;
      }

      requestAnimationFrame(watch);
    };

    requestAnimationFrame(watch);
    return;
  }

  // Polyfill animation
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

    if (t < 1) requestAnimationFrame(frame);
    else finish();
  }

  requestAnimationFrame(frame);
}