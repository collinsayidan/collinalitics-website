
"use client";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "./CookieConsentProvider";

/**
 * Loads Google Analytics (gtag.js) only after the user has consented to analytics.
 * Set NEXT_PUBLIC_GA_ID in .env.local (e.g., NEXT_PUBLIC_GA_ID=G-XXXXXXXXX).
 */
export default function AnalyticsLoader() {
  const { consent, hydrated } = useCookieConsent();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const loadedRef = useRef(false); // extra guard

  useEffect(() => {
    if (!hydrated) return;                  // wait for client hydration
    if (!GA_ID) return;                     // no GA id configured
    if (!consent?.analytics) {
      // If user revoked consent and GA was previously added, you can signal Consent Mode
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        });
      }
      return;
    }

    // If GA is already loaded, just update consent and return
    if (loadedRef.current || document.getElementById("ga-script")) {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "granted",
        });
      }
      return;
    }

    // 1) Create the loader script (gtag.js)
    const loader = document.createElement("script");
    loader.id = "ga-script";
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    // 2) Create the init/config script, run after loader loads
    const init = document.createElement("script");
    init.id = "ga-init";
    init.type = "text/javascript";

    loader.addEventListener("load", () => {
      // Init dataLayer/gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      window.gtag = gtag;

      // Consent Mode v2 defaults (deny until user grants)
      gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        wait_for_update: 500
      });

      // Since the user has granted analytics, update
      gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
      });

      // GA config
      gtag("js", new Date());
      gtag("config", GA_ID, { anonymize_ip: true });

      loadedRef.current = true;
    });

    document.head.appendChild(loader);
    document.head.appendChild(init);

    // Optional cleanup: we typically do NOT remove GA script once added.
    // If you want to hard-remove GA on consent revoke, you could remove the nodes
    // here and reload the page, but that’s not standard (and won’t purge GA’s runtime state).
    return () => {
      // no-op cleanup
    };
  }, [hydrated, consent?.analytics, GA_ID]);

  return null;
}
