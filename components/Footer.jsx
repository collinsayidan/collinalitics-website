"use client";

import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { useCookieConsent } from "./cookies/CookieConsentProvider"; // ✅ your path

export default function Footer() {
  // ✅ put your real Calendly link here
  const calendlyUrl = useMemo(
    () => "https://calendly.com/collinsayidan-collinalitics/30min",
    []
  );

  const { setOpenPrefs, consent } = useCookieConsent();

  const openCalendly = useCallback(async () => {
    if (typeof window === "undefined") return;

    // OPTIONAL: If you only want to allow Calendly when certain cookies are accepted,
    // keep this. If you don't care, delete this block.
    //
    // Adjust based on how your consent object is shaped.
    // Common shapes:
    // - consent?.analytics === true
    // - consent?.marketing === true
    //
    // If you’re unsure, comment this out entirely and Calendly will always open.
    const allowed =
      consent?.analytics === true || consent?.marketing === true || consent?.functional === true;

    if (!allowed) {
      // Open preferences modal so user can enable cookies
      setOpenPrefs(true);
      return;
    }

    const openWidget = () => {
      if (!window.Calendly) return;
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    };

    // Load Calendly CSS once
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Script already loaded
    if (window.Calendly) {
      openWidget();
      return;
    }

    // Load Calendly script once and wait
    let script = document.getElementById("calendly-widget-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;

      script.onload = () => openWidget();
      script.onerror = () => {
        // Fallback: open Calendly in a new tab if script fails
        window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      };

      document.body.appendChild(script);
    } else {
      // If script exists but Calendly not ready yet, poll briefly
      let tries = 0;
      const t = setInterval(() => {
        tries += 1;
        if (window.Calendly) {
          clearInterval(t);
          openWidget();
        }
        if (tries > 12) {
          clearInterval(t);
          window.open(calendlyUrl, "_blank", "noopener,noreferrer");
        }
      }, 150);
    }
  }, [calendlyUrl, consent, setOpenPrefs]);

  return (
    <footer
      className="relative overflow-hidden hero-bg text-white border-t border-white/10"
      aria-labelledby="footer-heading"
    >
      {/* Premium texture layers */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[url('/patterns/grid.svg')] bg-repeat mix-blend-soft-light",
          "opacity-[0.035] sm:opacity-[0.04]",
          "bg-[length:220px_220px] lg:bg-[length:260px_260px] 2xl:bg-[length:300px_300px]",
          "[mask-image:radial-gradient(circle_at_50%_30%,black_0%,black_60%,transparent_82%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_30%,black_0%,black_60%,transparent_82%)]",
          "transform-gpu scale-110 rotate-[0.6deg]",
        ].join(" ")}
      />
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          "bg-[url('/patterns/noise.png')] bg-repeat mix-blend-overlay",
          "opacity-[0.025] sm:opacity-[0.03] lg:opacity-[0.035]",
          "bg-[length:280px_280px] lg:bg-[length:380px_380px] 2xl:bg-[length:440px_440px]",
          "[mask-image:radial-gradient(circle_at_50%_32%,black_0%,black_62%,transparent_84%)]",
          "[-webkit-mask-image:radial-gradient(circle_at_50%_32%,black_0%,black_62%,transparent_84%)]",
        ].join(" ")}
      />

      {/* Glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/16 blur-[120px]" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-collin-teal-light/12 blur-[120px]" />
      </div>

      <div className="container-wrapper relative py-16 sm:py-18">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="flex flex-col gap-12">
          {/* Top row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Brand + pitch */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-white font-bold"
                  aria-label="Collinalitics home"
                >
                  C
                </Link>
                <p className="text-white font-semibold text-lg">Collinalitics</p>
              </div>

              <p className="mt-3 text-bodysm text-white/75 leading-relaxed">
                UK-based consultancy delivering analytics engineering, BI dashboards, systems analysis,
                AI solutions — and UX design for clear, usable digital products.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openCalendly}
                  className="cta-footer inline-flex items-center gap-2"
                  aria-label="Book a free discovery call"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Book a free discovery call
                </button>

                <a
                  href="mailto:collinsayidan@collinalitics.co.uk"
                  className="cta-footer inline-flex items-center gap-2"
                  aria-label="Email Collinalitics"
                >
                  <MailIcon className="h-4 w-4" />
                  Email
                </a>

                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  Contact <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Optional small helper note */}
              <p className="mt-3 text-[11px] text-white/55">
                Prefer a direct link?{" "}
                <a
                  href={calendlyUrl}
                  className="underline underline-offset-2 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Calendly
                </a>
              </p>
            </div>

            {/* Quick nav */}
            <nav
              className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-6 text-bodysm"
              aria-label="Footer navigation"
            >
              <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/case-studies" className="text-white/80 hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="/insights" className="text-white/80 hover:text-white transition-colors">
                Insights
              </Link>
              <Link href="/services/digital-solutions" className="text-white/80 hover:text-white transition-colors">
                UX Design
              </Link>
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" aria-hidden="true" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-bodysm text-white/85 font-medium">
                © {new Date().getFullYear()} Collinalitics Ltd
              </p>
              <p className="text-caption text-white/65">
                Registered in the UK — Company Number: SC874504
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-bodysm" aria-label="Legal">
              <Link href="/privacy-policy" className="text-white/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>

              <Link href="/cookies" className="text-white/70 hover:text-white transition-colors">
                Cookies
              </Link>

              <button
                type="button"
                onClick={() => setOpenPrefs(true)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Open cookie preferences"
              >
                Cookie preferences
              </button>

              <a
                href="mailto:collinsayidan@collinalitics.co.uk"
                className="text-white/70 hover:text-white transition-colors"
              >
                info@collinalitics.co.uk
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Icons ---------- */

function CalendarIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
    </svg>
  );
}
