"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    const calc = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight || 0;
      const winHeight = window.innerHeight || 0;
      const total = Math.max(1, docHeight - winHeight);
      const pct = Math.min(100, Math.max(0, (scrollTop / total) * 100));
      setProgress(pct);
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);

    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[80] h-[3px] bg-transparent">
      <div
        className="h-full bg-collin-teal"
        style={{
          width: `${progress}%`,
          transition: prefersReducedMotion ? "none" : "width 120ms ease-out",
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{`Reading progress: ${Math.round(progress)}%`}</span>
    </div>
  );
}