"use client";

import React, { useCallback, useMemo } from "react";

export default function About() {
  const calendlyUrl = useMemo(
    () => "https://calendly.com/collinsayidan-collinalitics/30min",
    []
  );

  const openCalendly = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () => window.Calendly?.initPopupWidget({ url: calendlyUrl });

    // Load Calendly CSS once
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // Script already loaded
    if (window.Calendly) return openWidget();

    // Load script once
    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = openWidget;
      document.body.appendChild(script);
      return;
    }

    // Script tag exists but window.Calendly not ready yet
    const t = setTimeout(openWidget, 250);
    return () => clearTimeout(t);
  }, [calendlyUrl]);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
      aria-labelledby="about-heading"
    >
      {/* Minimal premium background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="absolute -top-24 right-[-8rem] h-80 w-80 rounded-full bg-collin-lightTeal/22 blur-3xl" />
        <div className="absolute -bottom-28 left-[-8rem] h-80 w-80 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                About Collinalitics
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-6 text-h2 text-collin-navy tracking-tight"
            >
              We build analytics that leaders{" "}
              <span className="bg-gradient-to-r from-collin-teal to-collin-lightTeal bg-clip-text text-transparent">
                trust.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-bodylg leading-relaxed text-collin-slate">
              Collinalitics is a UK-based analytics engineering and consulting firm helping teams
              replace fragmented reporting with automated, reliable insight faster, with confidence,
              and designed to scale.
            </p>

            {/* Proof row (quiet confidence) */}
            <div className="mt-8 flex flex-wrap gap-2">
              <ProofPill label="Reliability" sub="Versioned pipelines & governed metrics" />
              <ProofPill label="Clarity" sub="KPI definitions stakeholders align on" />
              <ProofPill label="Speed" sub="Less manual reporting, more decisions" />
            </div>

            {/* Capability list (no extra boxes) */}
            <div className="mt-10">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Core capabilities
              </p>

              <ul className="mt-4 space-y-3">
                <CapabilityRow
                  title="Analytics engineering"
                  desc="Clean models, reusable transformations, maintainable foundations."
                />
                <CapabilityRow
                  title="BI & reporting"
                  desc="Dashboards and reporting packs designed for decision-making."
                />
                <CapabilityRow
                  title="KPI frameworks"
                  desc="Metric design, ownership, governance, and performance definitions."
                />
                <CapabilityRow
                  title="Systems analysis"
                  desc="Requirements, process clarity, and operational improvements."
                />
              </ul>
            </div>

            {/* CTAs (only two) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/30"
                aria-label="Book a free discovery call on Calendly"
              >
                Book a discovery call
                <ArrowIcon />
              </button>

              <a
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/20"
                aria-label="View case studies"
              >
                View case studies
              </a>
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              30 minutes • no obligation • clear next steps
            </p>
          </div>

          {/* Right: Premium trust/founder card (simple) */}
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white/85 backdrop-blur p-7 sm:p-8 shadow-[0_22px_70px_rgba(2,12,27,0.10)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-collin-navy">Collins Ayidan</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Founder • Lead Analytics Engineer • Edinburgh (UK)
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-collin-navy">
                  UK delivery
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Operating standard
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  Precision in definitions. Reliability in delivery. Maintainability by design.
                  We build foundations that stay useful long after launch.
                </p>
              </div>

              {/* Tight outcomes list */}
              <div className="mt-6 space-y-3">
                <MiniCheck text="Clear scope and delivery plan" />
                <MiniCheck text="Documentation and ownership built-in" />
                <MiniCheck text="Practical outputs — no jargon" />
              </div>

              {/* Calendly CTA inside card */}
              <div className="mt-7">
                <button
                  type="button"
                  onClick={openCalendly}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/25"
                  aria-label="Book a discovery call (Calendly)"
                >
                  Book with Collins
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-[11px] text-gray-500">
                  Direct call • practical advice • next steps
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Small UI ---------------- */

function ProofPill({ label, sub }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold text-collin-navy">
      <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
      <span>{label}</span>
      <span className="hidden sm:inline text-gray-500 font-medium">• {sub}</span>
    </span>
  );
}

function CapabilityRow({ title, desc }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-collin-lightTeal/20 text-collin-teal border border-collin-teal/10">
        <IconCheck />
      </span>
      <div>
        <p className="text-sm font-semibold text-collin-navy">{title}</p>
        <p className="mt-1 text-sm text-gray-700 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function MiniCheck({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
      <span className="mt-0.5 text-collin-teal" aria-hidden="true">
        <IconCheck />
      </span>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}

/* ---------------- Icons ---------------- */

function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}