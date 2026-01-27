"use client";

import React from "react";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieBanner() {
  const { hydrated, decided, acceptAll, rejectAll, setOpenPrefs } =
    useCookieConsent();

  if (!hydrated || decided) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[100000]
        w-[min(95vw,42rem)]
        bg-white/95 backdrop-blur-md
        border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        rounded-2xl p-5 sm:p-6
        animate-[slideUp_0.45s_ease-out]
      "
      style={{
        WebkitBackdropFilter: "blur(10px)",
      }}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
        <p className="text-[0.92rem] leading-relaxed text-gray-800">
          We use <span className="font-semibold text-collin-navy">essential cookies</span> to run our site, and optional{" "}
          <span className="font-semibold text-collin-teal">analytics cookies</span> to improve your experience.
          You can update your choices at any time.
        </p>

        <div className="flex gap-2 sm:ml-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={rejectAll}
            className="
              px-4 py-2 text-sm rounded-lg
              border border-gray-300 text-gray-700
              hover:bg-gray-100 transition
              w-full sm:w-auto
            "
          >
            Reject
          </button>

          <button
            type="button"
            onClick={() => setOpenPrefs(true)}
            className="
              px-4 py-2 text-sm rounded-lg
              border border-gray-300 text-gray-700
              hover:bg-gray-100 transition
              w-full sm:w-auto
            "
          >
            Manage
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="
              px-4 py-2 text-sm rounded-lg
              bg-collin-teal hover:bg-collin-navy
              text-white font-medium transition
              w-full sm:w-auto
            "
          >
            Accept
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
