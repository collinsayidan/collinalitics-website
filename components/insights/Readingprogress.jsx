"use client";

import React, { useEffect, useState } from "react";

/**
 * Top reading progress bar for blog posts.
 * - Lightweight, no deps
 * - Uses requestAnimationFrame for smoothness
 * - Safe for Next.js App Router (client component)
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const calc = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight || 0;
      const clientHeight = doc.clientHeight || 0;

      const total = Math.max(scrollHeight - clientHeight, 1);
      const pct = Math.min(100, Math.max(0, (scrollTop / total) * 100));
      setProgress(pct);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full origin-left bg-collin-teal"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
