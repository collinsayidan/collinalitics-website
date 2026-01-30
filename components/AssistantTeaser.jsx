"use client";

import { useEffect, useMemo, useState } from "react";

export default function AssistantTeaser() {
  const [show, setShow] = useState(false);

  // Timings (easy to tweak)
  const delayMs = 2500; // wait before showing
  const visibleMs = 6500; // how long it stays visible

  // Persist “dismissed” so it won’t keep popping up
  const storageKey = useMemo(
    () => "collinalitics_assistant_teaser_dismissed",
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = window.localStorage.getItem(storageKey) === "1";
    if (dismissed) return;

    const showTimer = window.setTimeout(() => setShow(true), delayMs);
    const hideTimer = window.setTimeout(
      () => setShow(false),
      delayMs + visibleMs
    );

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [delayMs, visibleMs, storageKey]);

  const dismiss = () => {
    setShow(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, "1");
    }
  };

  return (
    <div
      aria-live="polite"
      className={[
        "fixed z-40",
        "right-4 sm:right-6",
        "bottom-24 sm:bottom-28",
        "transition-all duration-500 ease-out",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      {/* Bubble */}
      <div
        className={[
          "relative max-w-xs",
          "rounded-2xl",
          // ✅ Updated: readable on WHITE + still premium on DARK/TEAL
          "bg-slate-50/95 backdrop-blur-md",
          "border border-collin-navy/15",
          "shadow-[0_18px_50px_rgba(2,12,27,0.22)]",
          "px-4 py-3",
          "text-collin-navy",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="h-9 w-9 rounded-xl bg-collin-teal shadow-sm flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5 text-white"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug text-collin-navy">
              Need help?
            </p>
            <p className="mt-1 text-sm text-collin-slate leading-relaxed">
              I’m here if you need anything — questions, guidance, or next steps.
            </p>

            <div className="mt-3 flex items-center gap-2">
              {/* Optional: hook this to open your chat widget/modal */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-3 py-1.5 text-xs font-semibold text-white hover:opacity-95 transition"
              >
                Contact us
              </a>

              <button
                type="button"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-xl border border-collin-navy/15 bg-white/60 px-3 py-1.5 text-xs font-semibold text-collin-navy hover:bg-white transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* Close (top-right) */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss assistant teaser"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-collin-navy/10 bg-white/60 hover:bg-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 text-collin-navy/70"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>

      {/* Arrow */}
      <div
        aria-hidden="true"
        className={[
          "ml-10 -mt-2 h-3 w-3 rotate-45",
          "bg-slate-50/95 backdrop-blur-md",
          "border border-collin-navy/15",
          "shadow-[0_8px_20px_rgba(2,12,27,0.18)]",
        ].join(" ")}
      />
    </div>
  );
}
