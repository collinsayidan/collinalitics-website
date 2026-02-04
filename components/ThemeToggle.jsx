"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition",
        "border-gray-200 bg-white text-collin-navy hover:bg-gray-50",
        "dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/35",
      ].join(" ")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
        {!mounted ? null : isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      <span className="hidden sm:inline">
        {!mounted ? "Theme" : isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}

/* --- Icons --- */

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.42-1.42M7.05 7.05 5.64 5.64m12.02 0-1.41 1.41M7.05 16.95l-1.41 1.41" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A7.5 7.5 0 1111.2 3 6 6 0 0021 12.8z" />
    </svg>
  );
}