"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/* ---------- Icons (define FIRST) ---------- */

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A8.5 8.5 0 0 1 11.2 3a6.5 6.5 0 1 0 9.8 9.8Z" />
    </svg>
  );
}

/* ---------- Component ---------- */

export default function ThemeToggle({ compact = false }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark");

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={[
        "group inline-flex items-center gap-2",
        "h-10 rounded-xl px-3",
        "border border-gray-200 bg-white/80 text-collin-navy",
        "hover:bg-gray-50 transition",
        "shadow-sm hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/30",
        "dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
      ].join(" ")}
    >
      <span
        className={[
          "inline-flex h-7 w-7 items-center justify-center rounded-lg",
          "bg-collin-teal/10 text-collin-teal",
          "dark:bg-white/10 dark:text-collin-teal-light",
        ].join(" ")}
        aria-hidden="true"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>

      {!compact && (
        <span className="text-xs font-semibold tracking-wide">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}