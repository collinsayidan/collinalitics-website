"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const CONSENT_VERSION = 1;
const CONSENT_LS_KEY = `collinalitics_cookie_consent_v${CONSENT_VERSION}`;

const defaultConsent = {
  essential: true,
  analytics: false,
};

function safeParseJSON(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const CookieConsentContext = createContext({
  consent: defaultConsent,
  decided: false,
  hydrated: false,
  openPrefs: false,

  // actions
  openPreferences: () => {},
  closePreferences: () => {},
  setOpenPrefs: () => {},

  acceptAll: () => {},
  rejectAll: () => {},
  savePartial: () => {},

  // optional extra helpers
  resetConsent: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export default function CookieConsentProvider({ children }) {
  const [state, setState] = useState({
    consent: defaultConsent,
    decided: false,
    decidedAt: null,
  });

  const [hydrated, setHydrated] = useState(false);
  const [openPrefs, setOpenPrefs] = useState(false);

  // Load persisted consent AFTER hydration
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.localStorage.getItem(CONSENT_LS_KEY);

    if (raw) {
      const parsed = safeParseJSON(raw);

      // expected shape: { analytics: boolean, decidedAt: string }
      if (parsed && typeof parsed.analytics !== "undefined") {
        setState({
          consent: { essential: true, analytics: !!parsed.analytics },
          decided: true,
          decidedAt: parsed.decidedAt || null,
        });
      }
    }

    setHydrated(true);
  }, []);

  const persist = useCallback((next) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        CONSENT_LS_KEY,
        JSON.stringify({
          analytics: !!next.analytics,
          decidedAt: new Date().toISOString(),
        })
      );
    } catch {}
  }, []);

  const closePreferences = useCallback(() => setOpenPrefs(false), []);
  const openPreferences = useCallback(() => setOpenPrefs(true), []);

  const acceptAll = useCallback(() => {
    const consent = { essential: true, analytics: true };
    setState({ consent, decided: true, decidedAt: new Date().toISOString() });
    persist(consent);
    closePreferences();
  }, [persist, closePreferences]);

  const rejectAll = useCallback(() => {
    const consent = { essential: true, analytics: false };
    setState({ consent, decided: true, decidedAt: new Date().toISOString() });
    persist(consent);
    closePreferences();
  }, [persist, closePreferences]);

  const savePartial = useCallback(
    (partial) => {
      const consent = {
        essential: true,
        analytics:
          partial && typeof partial.analytics !== "undefined"
            ? !!partial.analytics
            : state.consent.analytics ?? false,
      };

      setState({ consent, decided: true, decidedAt: new Date().toISOString() });
      persist(consent);
      closePreferences();
    },
    [persist, closePreferences, state.consent.analytics]
  );

  // Optional dev helper
  const resetConsent = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(CONSENT_LS_KEY);
    } catch {}
    setState({ consent: defaultConsent, decided: false, decidedAt: null });
    setOpenPrefs(false);
  }, []);

  const value = useMemo(
    () => ({
      consent: state.consent,
      decided: state.decided,
      decidedAt: state.decidedAt,
      hydrated,
      openPrefs,
      setOpenPrefs,

      openPreferences,
      closePreferences,

      acceptAll,
      rejectAll,
      savePartial,

      resetConsent,
    }),
    [
      state,
      hydrated,
      openPrefs,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectAll,
      savePartial,
      resetConsent,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
