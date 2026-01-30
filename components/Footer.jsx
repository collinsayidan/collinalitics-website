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

  // ✅ put your real social links here
  const social = useMemo(
    () => [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/YOUR-HANDLE", icon: <LinkedInIcon className="h-5 w-5" /> },
      { label: "GitHub", href: "https://github.com/YOUR-HANDLE", icon: <GitHubIcon className="h-5 w-5" /> },
      { label: "Instagram", href: "https://instagram.com/YOUR-HANDLE", icon: <InstagramIcon className="h-5 w-5" /> },
      { label: "Medium", href: "https://medium.com/@YOUR-HANDLE", icon: <MediumIcon className="h-5 w-5" /> },
      { label: "YouTube", href: "https://www.youtube.com/@YOUR-HANDLE", icon: <YouTubeIcon className="h-5 w-5" /> },
    ],
    []
  );

  const { setOpenPrefs, consent } = useCookieConsent();

  const openCalendly = useCallback(async () => {
    if (typeof window === "undefined") return;

    // OPTIONAL: require functional/analytics/marketing consent before opening Calendly
    const allowed =
      consent?.analytics === true ||
      consent?.marketing === true ||
      consent?.functional === true;

    if (!allowed) {
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

    // Load script once
    let script = document.getElementById("calendly-widget-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;

      script.onload = () => openWidget();
      script.onerror = () => {
        window.open(calendlyUrl, "_blank", "noopener,noreferrer");
      };

      document.body.appendChild(script);
    } else {
      // Poll briefly if script exists but Calendly not ready
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
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Brand + pitch */}
            <div className="lg:col-span-5">
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
                UK-based consultancy delivering analytics engineering, BI dashboards,
                systems analysis, AI solutions and UX design for clear, usable digital products.
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

              {/* Social (UK-standard: simple, accessible icons + text) */}
              <div className="mt-7">
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Social
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "group inline-flex items-center gap-2",
                        "rounded-xl border border-white/15 bg-white/5 px-3 py-2",
                        "text-sm font-semibold text-white/85 hover:text-white",
                        "hover:bg-white/10 transition",
                        "focus:outline-none focus:ring-2 focus:ring-white/30",
                      ].join(" ")}
                      aria-label={`Open ${s.label} (new tab)`}
                      title={s.label}
                    >
                      <span className="text-white/85 group-hover:text-white">{s.icon}</span>
                      <span className="text-xs">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Optional small helper note */}
              <p className="mt-4 text-[11px] text-white/55">
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

            {/* Quick nav (UK style: clear columns) */}
            <div className="lg:col-span-7 grid gap-8 sm:grid-cols-2">
              <nav aria-label="Footer navigation">
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Explore
                </p>
                <ul className="mt-4 space-y-3 text-bodysm">
                  <li>
                    <Link href="/services" className="text-white/75 hover:text-white transition-colors">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="text-white/75 hover:text-white transition-colors">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/insights" className="text-white/75 hover:text-white transition-colors">
                      Insights
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/digital-solutions"
                      className="text-white/75 hover:text-white transition-colors"
                    >
                      UX Design
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Company">
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Company
                </p>
                <ul className="mt-4 space-y-3 text-bodysm">
                  <li>
                    <Link href="/privacy-policy" className="text-white/75 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-white/75 hover:text-white transition-colors">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setOpenPrefs(true)}
                      className="text-white/75 hover:text-white transition-colors"
                      aria-label="Open cookie preferences"
                    >
                      Cookie preferences
                    </button>
                  </li>
                  <li>
                    <a
                      href="mailto:info@collinalitics.co.uk"
                      className="text-white/75 hover:text-white transition-colors"
                    >
                      info@collinalitics.co.uk
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-white/10" aria-hidden="true" />

          {/* Bottom row (UK standard: legal + company info) */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-bodysm text-white/85 font-medium">
                © {new Date().getFullYear()} Collinalitics Ltd. All rights reserved.
              </p>
              <p className="text-caption text-white/65">
                Registered in Scotland • Company Number: SC874504
              </p>
            </div>

            {/* Small social row on the far right */}
            <div className="flex flex-wrap items-center gap-2">
              {social.map((s) => (
                <a
                  key={`mini-${s.label}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "inline-flex items-center justify-center",
                    "h-10 w-10 rounded-xl",
                    "border border-white/15 bg-white/5",
                    "text-white/80 hover:text-white hover:bg-white/10 transition",
                    "focus:outline-none focus:ring-2 focus:ring-white/30",
                  ].join(" ")}
                  aria-label={`Open ${s.label} (new tab)`}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
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

function LinkedInIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 23.5h4V7.98h-4V23.5ZM8.5 7.98h3.83v2.12h.05c.53-1 1.83-2.12 3.77-2.12 4.03 0 4.78 2.65 4.78 6.09v9.43h-4v-8.36c0-2-.04-4.57-2.79-4.57-2.79 0-3.22 2.18-3.22 4.43v8.5h-4V7.98Z" />
    </svg>
  );
}

function GitHubIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.75 5.62.75 12c0 5.12 3.29 9.46 7.86 10.99.58.11.79-.26.79-.57v-2.06c-3.2.71-3.87-1.58-3.87-1.58-.53-1.36-1.29-1.73-1.29-1.73-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.22 1.77 1.22 1.03 1.8 2.7 1.28 3.36.98.1-.77.4-1.28.73-1.57-2.56-.3-5.26-1.31-5.26-5.84 0-1.29.45-2.35 1.18-3.18-.12-.3-.51-1.52.11-3.17 0 0 .97-.32 3.18 1.22.92-.26 1.9-.39 2.88-.39.98 0 1.97.13 2.88.39 2.2-1.54 3.18-1.22 3.18-1.22.62 1.65.23 2.87.11 3.17.73.83 1.18 1.89 1.18 3.18 0 4.54-2.7 5.54-5.27 5.84.41.37.78 1.1.78 2.22v3.29c0 .31.21.68.8.57 4.56-1.53 7.85-5.87 7.85-10.99C23.25 5.62 18.27.5 12 .5Z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm6.2-2.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    </svg>
  );
}

function MediumIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2.5 7.2a.7.7 0 0 1 .25-.56l1.9-2.3A.7.7 0 0 1 5.2 4h13.6a.7.7 0 0 1 .54.25l1.9 2.3a.7.7 0 0 1 .25.56v.3a.7.7 0 0 1-.25.55l-.7.6v8.1l.7.6a.7.7 0 0 1 .25.55v.3a.7.7 0 0 1-.7.7H16.6a.7.7 0 0 1-.7-.7v-.3a.7.7 0 0 1 .25-.55l.7-.6V9.6l-4.3 10.3h-.6L7.7 9.6v7.8l1.05 1a.7.7 0 0 1 .25.55v.3a.7.7 0 0 1-.7.7H3.2a.7.7 0 0 1-.7-.7v-.3a.7.7 0 0 1 .25-.55l1.05-1V8.65l-.7-.6a.7.7 0 0 1-.25-.55v-.3Z" />
    </svg>
  );
}

function YouTubeIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-4.8ZM10.2 15.3V8.7L15.9 12l-5.7 3.3Z" />
    </svg>
  );
}