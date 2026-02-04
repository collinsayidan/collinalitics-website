"use client";

import React, { useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Calendar } from "lucide-react";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const calendlyUrl = useMemo(
    () => "https://calendly.com/collinsayidan-collinalitics/30min",
    []
  );

  const openCalendly = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () =>
      window.Calendly?.initPopupWidget({ url: calendlyUrl });

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

    const t = setTimeout(openWidget, 250);
    return () => clearTimeout(t);
  }, [calendlyUrl]);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={[
        "relative overflow-hidden py-24 sm:py-28 md:py-32",
        // ✅ Light default
        "bg-gradient-to-b from-white via-gray-50 to-white",
        // ✅ Dark override
        "dark:bg-gradient-to-b dark:from-collin-navy-darker dark:via-collin-navy-dark dark:to-collin-navy-darker",
      ].join(" ")}
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-collin-teal/10 dark:bg-collin-teal/14" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-collin-teal-light/12 dark:bg-collin-teal-light/16" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-3xl bg-collin-navy/5 dark:bg-white/5" />

        {/* Grid */}
        <div
          className={[
            "absolute inset-0",
            "bg-[linear-gradient(rgba(10,37,64,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.05)_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
            "bg-[size:72px_72px]",
          ].join(" ")}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-4 py-2",
                "border-gray-200 bg-white/80",
                "dark:border-white/10 dark:bg-white/5",
              ].join(" ")}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
              <p className="text-xs font-semibold tracking-widest uppercase text-collin-slate dark:text-white/70">
                About Collinalitics
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-collin-navy dark:text-white"
            >
              We build analytics that leaders{" "}
              <span className="bg-gradient-to-r from-collin-teal via-collin-teal-light to-collin-teal bg-clip-text text-transparent">
                trust.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-collin-slate dark:text-white/70">
              Collinalitics is a UK-based analytics engineering and consulting firm helping teams
              replace fragmented reporting with automated, reliable insight — faster, with confidence,
              and designed to scale.
            </p>

            {/* Proof row */}
            <div className="mt-8 flex flex-wrap gap-2">
              <ProofPill label="Reliability" sub="Versioned pipelines & governed metrics" />
              <ProofPill label="Clarity" sub="KPI definitions stakeholders align on" />
              <ProofPill label="Speed" sub="Less manual reporting, more decisions" />
            </div>

            {/* Capability list */}
            <div className="mt-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-white/45">
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

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openCalendly}
                className={[
                  "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition",
                  "bg-collin-teal text-white shadow-lg shadow-collin-teal/20 hover:opacity-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/30",
                ].join(" ")}
                aria-label="Book a free discovery call on Calendly"
              >
                Book a discovery call
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <a
                href="/case-studies"
                className={[
                  "inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition",
                  "border-gray-200 bg-white text-collin-navy hover:bg-gray-50",
                  "dark:border-white/12 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/20",
                ].join(" ")}
                aria-label="View case studies"
              >
                View case studies
              </a>
            </div>

            <p className="mt-3 text-[11px] text-gray-500 dark:text-white/45">
              30 minutes • no obligation • clear next steps
            </p>
          </motion.div>

          {/* Right */}
          <motion.aside
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div
              className={[
                "rounded-3xl border backdrop-blur-xl p-7 sm:p-8",
                "border-gray-200 bg-white/85 shadow-[0_22px_70px_rgba(2,12,27,0.10)]",
                "dark:border-white/10 dark:bg-white/5 dark:shadow-softDark",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-collin-navy dark:text-white">
                    Collins Ayidan
                  </p>
                  <p className="mt-1 text-xs text-gray-600 dark:text-white/60">
                    Founder • Lead Analytics Engineer • Edinburgh (UK)
                  </p>
                </div>

                <span
                  className={[
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                    "border-gray-200 bg-white text-collin-navy",
                    "dark:border-white/10 dark:bg-white/5 dark:text-white/80",
                  ].join(" ")}
                >
                  UK delivery
                </span>
              </div>

              <div
                className={[
                  "mt-6 rounded-2xl border p-5",
                  "border-gray-200 bg-white",
                  "dark:border-white/10 dark:bg-white/5",
                ].join(" ")}
              >
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-white/45">
                  Operating standard
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-white/70">
                  Precision in definitions. Reliability in delivery. Maintainability by design.
                  We build foundations that stay useful long after launch.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <MiniCheck text="Clear scope and delivery plan" />
                <MiniCheck text="Documentation and ownership built-in" />
                <MiniCheck text="Practical outputs — no jargon" />
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={openCalendly}
                  className={[
                    "w-full inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition",
                    "bg-collin-navy text-white shadow-lg shadow-black/10 hover:opacity-95",
                    "dark:bg-white dark:text-collin-navy",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/25",
                  ].join(" ")}
                  aria-label="Book a discovery call (Calendly)"
                >
                  Book with Collins
                  <Calendar className="ml-2 h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-[11px] text-gray-500 dark:text-white/45">
                  Direct call • practical advice • next steps
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Small UI ---------------- */

function ProofPill({ label, sub }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        "border-gray-200 bg-white text-collin-navy",
        "dark:border-white/10 dark:bg-white/5 dark:text-white/80",
      ].join(" ")}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
      <span>{label}</span>
      <span className="hidden sm:inline text-gray-500 dark:text-white/45 font-medium">
        • {sub}
      </span>
    </span>
  );
}

function CapabilityRow({ title, desc }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border bg-collin-teal/10 text-collin-teal border-collin-teal/20">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-collin-navy dark:text-white">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-collin-slate dark:text-white/70">
          {desc}
        </p>
      </div>
    </li>
  );
}

function MiniCheck({ text }) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-2xl border p-4",
        "border-gray-200 bg-white",
        "dark:border-white/10 dark:bg-white/5",
      ].join(" ")}
    >
      <span className="mt-0.5 text-collin-teal" aria-hidden="true">
        <Check className="h-4 w-4" />
      </span>
      <p className="text-sm text-gray-700 dark:text-white/70">{text}</p>
    </div>
  );
}