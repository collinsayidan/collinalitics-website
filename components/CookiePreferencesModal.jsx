
"use client";
import React, { useEffect, useState } from "react";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookiePreferencesModal() {
  const {
    hydrated,
    openPrefs,
    setOpenPrefs,
    consent,
    savePartial,
    rejectAll,
  } = useCookieConsent();

  const [analytics, setAnalytics] = useState(!!consent.analytics);

  useEffect(() => {
    if (openPrefs) setAnalytics(!!consent.analytics);
  }, [openPrefs, consent.analytics]);

  // Don’t show modal until hydration (prevents SSR flash)
  if (!hydrated || !openPrefs) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
      onClick={() => setOpenPrefs(false)}
    >
      <div
        className="w-[min(96vw,40rem)] bg-white rounded-xl shadow-2xl border border-gray-200 p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="cookie-prefs-title"
            className="text-lg font-semibold text-collin-navy"
          >
            Cookie Preferences
          </h2>
          <button
            type="button"
            onClick={() => setOpenPrefs(false)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close cookie preferences"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <input
              id="cookies-essential"
              type="checkbox"
              checked
              disabled
              className="mt-1 h-4 w-4 rounded border-gray-300 text-collin-teal focus:ring-collin-teal"
            />
            <div>
              <label
                htmlFor="cookies-essential"
                className="font-medium text-gray-900"
              >
                Essential cookies
              </label>
              <p className="text-gray-600">
                Required for core site functionality (cannot be disabled).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              id="cookies-analytics"
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-collin-teal focus:ring-collin-teal"
            />
            <div>
              <label
                htmlFor="cookies-analytics"
                className="font-medium text-gray-900"
              >
                Analytics cookies
              </label>
              <p className="text-gray-600">
                Help us understand usage and improve the site (set by analytics
                tools).
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
          <button
            type="button"
            onClick={() => {
              rejectAll();
              setOpenPrefs(false);
            }}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={() => {
              savePartial({ analytics });
              setOpenPrefs(false);
            }}
            className="px-4 py-2 text-sm rounded-lg bg-collin-teal hover:bg-collin-navy text-white font-medium transition w-full sm:w-auto"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}
