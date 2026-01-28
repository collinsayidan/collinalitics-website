"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieBanner() {
  const { hydrated, decided, acceptAll, rejectAll, setOpenPrefs } =
    useCookieConsent();

  const dialogRef = useRef(null);

  // Accessibility: move focus to banner when it appears (non-invasive)
  useEffect(() => {
    if (!hydrated || decided) return;
    dialogRef.current?.focus?.();
  }, [hydrated, decided]);

  if (!hydrated || decided) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100000] px-3 pb-3 sm:pb-6">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="false"
        aria-live="polite"
        aria-label="Cookie consent"
        className={[
          "mx-auto w-full max-w-2xl",
          "rounded-2xl border border-gray-200/90 bg-white/90 backdrop-blur-xl",
          "shadow-[0_18px_50px_rgba(0,0,0,0.14)]",
          "p-4 sm:p-5",
          "animate-[cookieUp_0.45s_ease-out]",
          "outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/50",
        ].join(" ")}
        style={{ WebkitBackdropFilter: "blur(14px)" }}
      >
        {/* Top row: icon + heading */}
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-collin-teal/10 text-collin-teal border border-collin-teal/15"
          >
            <CookieIcon className="h-5 w-5" />
          </span>

          <div className="flex-1">
            <p className="text-sm font-semibold text-collin-navy">
              Cookies & privacy controls
            </p>

            <p className="mt-1 text-[0.95rem] leading-relaxed text-gray-700">
              We use <span className="font-semibold text-collin-navy">essential cookies</span> to
              run this site. With your permission, we also use{" "}
              <span className="font-semibold text-collin-teal">analytics cookies</span> to
              understand usage and improve the experience. You can change your choices at any time.
            </p>

            {/* Micro links */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <Link
                href="/cookies"
                className="text-collin-teal font-semibold hover:underline"
              >
                Cookies policy
              </Link>
              <Link
                href="/privacy-policy"
                className="text-collin-teal font-semibold hover:underline"
              >
                Privacy policy
              </Link>
              <span className="text-gray-500">
                UK GDPR aligned
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-4 h-px w-full bg-gray-200/80" aria-hidden="true" />

        {/* Actions */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2.5">
          <button
            type="button"
            onClick={rejectAll}
            className={[
              "w-full sm:w-auto",
              "inline-flex items-center justify-center",
              "rounded-xl border border-gray-300 bg-white",
              "px-4 py-2.5 text-sm font-semibold text-gray-800",
              "hover:bg-gray-50 transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/40",
            ].join(" ")}
          >
            Reject optional
          </button>

          <button
            type="button"
            onClick={() => setOpenPrefs(true)}
            className={[
              "w-full sm:w-auto",
              "inline-flex items-center justify-center",
              "rounded-xl border border-gray-300 bg-white",
              "px-4 py-2.5 text-sm font-semibold text-gray-800",
              "hover:bg-gray-50 transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/40",
            ].join(" ")}
          >
            Manage preferences
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className={[
              "w-full sm:w-auto sm:ml-auto",
              "inline-flex items-center justify-center gap-2",
              "rounded-xl bg-collin-teal px-5 py-2.5",
              "text-sm font-semibold text-white",
              "shadow-sm hover:opacity-95 transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/40",
            ].join(" ")}
          >
            Accept all
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Keyframes */}
        <style jsx>{`
          @keyframes cookieUp {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */

function CookieIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 12a8 8 0 1 1-8-8c.3 0 .6.02.9.05a3 3 0 0 0 3.1 3.1c.03.3.05.6.05.9a3 3 0 0 0 3 3c.3 0 .6-.02.9-.05.03.35.05.7.05 1.05Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 10.2h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.2h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.6 12.3h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 14.8h.01" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7" />
    </svg>
  );
}