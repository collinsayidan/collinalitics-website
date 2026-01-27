"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

const CONSENT_LS_KEY = "collinalitics_cookie_consent_v1";

const defaultConsent = {
  essential: true,
  analytics: false,
};

const CookieConsentContext = createContext({
  consent: defaultConsent,
  decided: false,
  hydrated: false,
  openPrefs: false,
  setOpenPrefs: () => {},
  acceptAll: () => {},
  rejectAll: () => {},
  savePartial: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export default function CookieConsentProvider({ children }) {
  const [state, setState] = useState({
    consent: defaultConsent,
    decided: false,
  });

  const [hydrated, setHydrated] = useState(false);

  // Load localStorage AFTER hydration
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CONSENT_LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          consent: { essential: true, analytics: !!parsed.analytics },
          decided: true,
        });
      }
    } catch {}

    setHydrated(true);
  }, []);

  const persist = useCallback((next) => {
    try {
      window.localStorage.setItem(CONSENT_LS_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const acceptAll = useCallback(() => {
    const consent = { essential: true, analytics: true };
    setState({ consent, decided: true });
    persist(consent);
  }, [persist]);

  const rejectAll = useCallback(() => {
    const consent = { essential: true, analytics: false };
    setState({ consent, decided: true });
    persist(consent);
  }, [persist]);

  const savePartial = useCallback(
    (partial) => {
      const consent = {
        essential: true,
        analytics:
          partial && typeof partial.analytics !== "undefined"
            ? !!partial.analytics
            : state.consent.analytics ?? false,
      };
      setState({ consent, decided: true });
      persist(consent);
    },
    [persist, state.consent.analytics]
  );

  const [openPrefs, setOpenPrefs] = useState(false);

  const value = useMemo(
    () => ({
      consent: state.consent,
      decided: state.decided,
      hydrated,
      openPrefs,
      setOpenPrefs,
      acceptAll,
      rejectAll,
      savePartial,
    }),
    [state, hydrated, openPrefs, acceptAll, rejectAll, savePartial]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}
