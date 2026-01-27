"use client";

import React from "react";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookiePreferencesModal() {
  const { hydrated, openPrefs, setOpenPrefs, consent, savePartial } =
    useCookieConsent();

  if (!hydrated || !openPrefs) return null;

  const [analytics, setAnalytics] = React.useState(consent.analytics);

  const close = () => setOpenPrefs(false);

  const save = () => {
    savePartial({ analytics });
    close();
  };

  return (
    <div
      className="
        fixed inset-0 z-[200000]
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        animate-[fadeIn_0.3s_ease-out]
      "
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
    >
      <div
        className="
          w-[min(92vw,32rem)]
          bg-white rounded-2xl shadow-2xl
          p-6 sm:p-7
          animate-[slideUp_0.35s_ease-out]
        "
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cookie Preferences
        </h2>

        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          Choose which cookies you want to allow. You can update these settings
          at any time.
        </p>

        {/* Essential cookies */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900">Essential cookies</span>
            <span className="text-xs text-gray-500">Always on</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Required for the website to function properly. These cannot be
            disabled.
          </p>
        </div>

        {/* Analytics cookies */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-gray-900">Analytics cookies</span>

            {/* Toggle */}
            <button
              onClick={() => setAnalytics(!analytics)}
              className={`
                relative inline-flex h-6 w-11 rounded-full transition
                ${analytics ? "bg-collin-teal" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow
                  transition-transform
                  ${analytics ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Helps us understand how visitors use our site so we can improve it.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="
              px-4 py-2 text-sm rounded-lg
              border border-gray-300 text-gray-700
              hover:bg-gray-100 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="
              px-4 py-2 text-sm rounded-lg
              bg-collin-teal hover:bg-collin-navy
              text-white font-medium transition
            "
          >
            Save preferences
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
