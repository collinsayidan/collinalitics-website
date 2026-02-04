"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function WhyUs() {
  const reduce = useReducedMotion();

  const points = [
    "Clear, business-focused reporting (not just charts)",
    "UK-based, professional service and communication",
    "Practical solutions without over-engineering",
    "Experience across analytics, systems, and operations",
  ];

  const outcomes = [
    { label: "Less manual reporting", desc: "Automated pipelines and repeatable delivery." },
    { label: "Trusted KPIs", desc: "Clear definitions, governance, and ownership." },
    { label: "Faster decisions", desc: "Decision-ready insight aligned to goals." },
    { label: "Operational clarity", desc: "Metrics tied to systems and real workflows." },
  ];

  const timeline = [
    { step: "01", title: "Understand", desc: "We learn your goals, constraints, and the reality of your data." },
    { step: "02", title: "Design", desc: "We define KPIs, reporting structure, ownership, and success criteria." },
    { step: "03", title: "Build", desc: "We deliver dashboards, models, and automated workflows that scale." },
    { step: "04", title: "Refine", desc: "We iterate with your team to ensure adoption, clarity, and usability." },
  ];

  const baseTransition = { duration: 0.55, ease: [0.2, 0.65, 0.25, 1] };

  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  const liftHover = reduce
    ? undefined
    : {
        y: -8,
        boxShadow: "0 24px 80px rgba(2, 12, 27, 0.25)",
        transition: { type: "spring", stiffness: 260, damping: 22 },
      };

  return (
    <section
      id="why"
      className="relative overflow-hidden py-24 sm:py-28 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="why-heading"
    >
      {/* ✅ Background: glows + grid (Services-style) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: reduce ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 bg-teal-500/10 border-teal-500/20">
            <span className="h-2 w-2 rounded-full bg-teal-300" />
            <span className="text-teal-300 text-sm font-medium tracking-wide">
              Why Collinalitics
            </span>
          </div>

          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Clarity, practicality, and{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              measurable outcomes
            </span>
            .
          </h2>

          <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-3xl">
            We combine analytics engineering, BI, and systems thinking so reporting becomes trusted,
            repeatable, and genuinely useful — not a monthly scramble.
          </p>

          {/* Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>Consulting-grade delivery</Chip>
            <Chip>Decision-ready reporting</Chip>
            <Chip>Automation-first</Chip>
            <Chip>UK-based</Chip>
          </div>
        </motion.header>

        {/* Outcomes row */}
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          {outcomes.map((o) => (
            <motion.div
              key={o.label}
              variants={fadeUp}
              whileHover={liftHover}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition"
            >
              <p className="text-sm font-semibold text-white">{o.label}</p>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{o.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid: Differentiators + Proof */}
        <motion.div
          className="mt-10 grid gap-8 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* Left card */}
          <motion.article
            variants={fadeUp}
            whileHover={liftHover}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8"
            aria-label="What sets Collinalitics apart"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                  What sets us apart
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  Reporting built for real teams — not dashboards for show.
                </h3>
              </div>

              <span className="h-12 w-12 rounded-xl bg-teal-500/10 text-teal-300 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </span>
            </div>

            <ul className="mt-7 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">{p}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/40 p-5">
              <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                Best fit
              </p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                SMEs, charities, and public-sector teams who want KPI clarity, reliable reporting,
                and less manual effort — without complexity for its own sake.
              </p>
            </div>
          </motion.article>

          {/* Right card */}
          <motion.aside
            variants={fadeUp}
            whileHover={liftHover}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8"
            aria-label="Expected outcomes"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                  Outcomes
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  Reporting becomes a driver for decisions — not a chore.
                </h3>
              </div>

              <span className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-300 flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </span>
            </div>

            <p className="mt-6 text-sm text-slate-300 leading-relaxed">
              Leaders gain trusted insight, teams get visibility, and reporting becomes repeatable.
              We reduce manual effort, improve metric confidence, and strengthen operational clarity.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <OutcomePill>Less manual reporting</OutcomePill>
              <OutcomePill>Trusted KPIs</OutcomePill>
              <OutcomePill>Faster decisions</OutcomePill>
              <OutcomePill>Clear ownership</OutcomePill>
            </div>

            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/40 p-6">
              <p className="text-sm italic leading-relaxed text-slate-300">
                “We moved from scattered spreadsheets to a single source of truth.
                Leadership finally has clarity and reporting time dropped from days to minutes.”
              </p>
              <p className="mt-3 text-xs font-semibold tracking-widest text-slate-500 uppercase">
                Senior Operations Manager • UK Public Sector
              </p>
            </div>
          </motion.aside>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/60 p-7 sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              How we work
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              A simple approach that scales.
            </h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Clear phases, clear outputs, and documentation built in so the work lasts beyond delivery.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {timeline.map((t) => (
              <motion.div
                key={t.step}
                variants={fadeUp}
                className="rounded-xl border border-slate-800 bg-slate-950/40 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85">
                    {t.step}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold text-white">{t.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 hover:opacity-95 transition"
              aria-label="Book a consultation"
            >
              Book a consultation
              <span className="ml-2">→</span>
            </a>

            <p className="mt-3 text-xs text-slate-500">
              No pressure — we’ll confirm fit, scope, and next steps.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Small UI ---------- */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs font-medium text-slate-200">
      {children}
    </span>
  );
}

function OutcomePill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs font-medium text-slate-200">
      {children}
    </span>
  );
}