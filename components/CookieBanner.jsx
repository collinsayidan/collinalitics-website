
"use client";

import React from "react";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieBanner() {
  const { hydrated, decided, acceptAll, rejectAll, setOpenPrefs } =
    useCookieConsent();

  // Avoid SSR flash; only show if undecided
  if (!hydrated) return null;
  if (decided) return null;

  return (
    <div
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]
        w-[min(96vw,44rem)]
        bg-white text-gray-800 border border-gray-200 shadow-xl rounded-xl
        p-4 sm:p-5
      "
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
        <p className="text-sm leading-relaxed">
          We use <span className="font-medium">essential cookies</span> to make this
          site work, and optional <span className="font-medium">analytics</span> to
          help us improve it. You can change your choices at any time.
        </p>

        <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={rejectAll}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
            aria-label="Reject non-essential cookies"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => setOpenPrefs(true)}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
            aria-label="Manage cookie preferences"
          >
            Manage
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="px-3 py-2 text-sm rounded-lg bg-collin-teal hover:bg-collin-navy text-white font-medium transition w-full sm:w-auto"
            aria-label="Accept all cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
