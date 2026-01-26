
"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

/**
 * SmoothScrollProvider
 * - Delegates anchor click handling (a[href*="#"]) at the document level.
 * - Only intercepts same-page hashes.
 * - Supports sticky header offset via CSS var --header-offset or [data-sticky="header"] height.
 * - Respects prefers-reduced-motion.
 * - Sets focus to target after scroll for a11y.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const getHeaderOffset = () => {
      // Try CSS variable first
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-offset")
        .trim();
      if (val) {
        const px = parseInt(val, 10);
        if (!Number.isNaN(px)) return px;
      }
      // Fallback: measure a sticky header
      const sticky = document.querySelector('[data-sticky="header"]');
      if (sticky) return sticky.getBoundingClientRect().height;
      // Final fallback
      return 0;
    };

    const isModifiedClick = (e) =>
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

    const onClick = (e) => {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;

      // Skip if explicitly opted-out
      if (link.hasAttribute("data-no-smooth")) return;
      // Skip if downloading/new tab/external
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (isModifiedClick(e)) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      // Parse URL to determine same-page hash
      const url = new URL(href, window.location.href);
      const isSameOrigin = url.origin === window.location.origin;
      const isSamePath = url.pathname === window.location.pathname;
      const hash = url.hash; // includes '#...'

      if (!hash) return; // not a hash link
      if (!isSameOrigin || !isSamePath) return; // let Next.js handle route nav

      const id = decodeURIComponent(hash.slice(1));
      const target =
        document.getElementById(id) ||
        // legacy support: <a name="...">
        document.querySelector(`[name="${CSS.escape(id)}"]`);

      if (!target) return; // allow default (maybe Next will handle or it's dynamic content)

      // We have a same-page target element
      e.preventDefault();

      // Reduced motion: jump directly
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
          // Focus target for a11y (without visible outline jumps)
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          // Update hash without an extra jump
          history.replaceState(null, "", hash);
        },
      });
    };

    document.addEventListener("click", onClick, { passive: false });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return children;
}
