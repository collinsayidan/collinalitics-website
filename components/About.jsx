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
      className="relative overflow-hidden py-24 sm:py-28 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="about-heading"
    >
      {/* Hero-style background */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: narrative */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-teal-400" />
              <p className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
                About Collinalitics
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              We build analytics that leaders{" "}
              <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                trust.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
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
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
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
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30"
                aria-label="Book a free discovery call on Calendly"
              >
                Book a discovery call
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <a
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/20"
                aria-label="View case studies"
              >
                View case studies
              </a>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              30 minutes • no obligation • clear next steps
            </p>
          </motion.div>

          {/* Right: trust / founder card */}
          <motion.aside
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-7 sm:p-8 shadow-[0_22px_70px_rgba(2,12,27,0.25)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Collins Ayidan</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Founder • Lead Analytics Engineer • Edinburgh (UK)
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs font-semibold text-slate-200">
                  UK delivery
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                  Operating standard
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
                  className="w-full inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3 text-sm font-semibold shadow-lg shadow-black/10 hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/25"
                  aria-label="Book a discovery call (Calendly)"
                >
                  Book with Collins
                  <Calendar className="ml-2 h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-[11px] text-slate-500">
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
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs font-semibold text-slate-200">
      <span className="inline-flex h-2 w-2 rounded-full bg-teal-400" aria-hidden="true" />
      <span>{label}</span>
      <span className="hidden sm:inline text-slate-500 font-medium">• {sub}</span>
    </span>
  );
}

function CapabilityRow({ title, desc }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function MiniCheck({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
      <span className="mt-0.5 text-teal-300" aria-hidden="true">
        <Check className="h-4 w-4" />
      </span>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
