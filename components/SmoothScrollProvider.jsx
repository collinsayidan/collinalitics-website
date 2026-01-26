
"use client";

import { useEffect } from "react";

/**
 * Smooth scroll helper with offset, prefers-reduced-motion, and focus management.
 */
function smoothScrollTo(target, { offset = 0, duration = 600, easing = "outCubic", onDone } = {}) {
  let el = target;
  if (typeof target === "string") {
    el = document.querySelector(target);
  }
  if (!el) return;

  const startY = window.scrollY || window.pageYOffset;
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + startY - offset;

  // Try native smooth scroll
  try {
    window.scrollTo({ top: targetY, behavior: "smooth" });
    if (typeof onDone === "function") {
      setTimeout(onDone, Math.max(200, duration));
    }
    return;
  } catch {
    // fall through to polyfill
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
    if (t < 1) requestAnimationFrame(frame);
    else if (typeof onDone === "function") onDone();
  }
  requestAnimationFrame(frame);
}

/**
 * SmoothScrollProvider
 * - Delegates same-page hash link clicks.
 * - Respects prefers-reduced-motion.
 * - Applies sticky header offset via CSS var --header-offset or [data-sticky="header"] height.
 * - Sets focus to the target after scroll (a11y).
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const getHeaderOffset = () => {
      const cssVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-offset")
        .trim();
      if (cssVar) {
        const px = parseInt(cssVar, 10);
        if (!Number.isNaN(px)) return px;
      }
      const sticky = document.querySelector('[data-sticky="header"]');
      if (sticky) return sticky.getBoundingClientRect().height;
      return 0;
    };

    const isModifiedClick = (e) =>
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

    const onClick = (e) => {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;

      if (link.hasAttribute("data-no-smooth")) return; // opt-out
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (isModifiedClick(e)) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(href, window.location.href);
      const hash = url.hash; // includes '#'
      if (!hash) return;

      // Only same-page hashes
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(hash.slice(1));
      const target =
        document.getElementById(id) ||
        document.querySelector(`[name="${CSS.escape(id)}"]`);
      if (!target) return;

      e.preventDefault();

      if (prefersReduced) {
        target.scrollIntoView();
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        history.replaceState(null, "", hash);
        return;
      }

      const offset = getHeaderOffset();
      smoothScrollTo(target, {
        offset,
        duration: 600,
        easing: "outCubic",
        onDone: () => {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          history.replaceState(null, "", hash);
        },
      });
    };

    document.addEventListener("click", onClick, { passive: false });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return children;
}
