"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };

  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: baseTransition },
  };

  const liftHover = reduce
    ? undefined
    : {
        y: -6,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      };

  return (
    <section
      id="why"
      className="relative overflow-hidden py-24 sm:py-28 text-white"
      aria-labelledby="why-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full bg-collin-teal/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-collin-teal-light/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-wrapper relative z-10">
        {/* Header */}
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.28 }}
          variants={container}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">Why Collinalitics</p>
          </motion.div>

          <motion.h2
            id="why-heading"
            variants={fadeUp}
            className="mt-6 text-h2 text-white"
          >
            Clarity, practicality, and{" "}
            <span className="bg-gradient-to-r from-collin-teal to-collin-teal-light bg-clip-text text-transparent">
              measurable outcomes
            </span>
            .
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-4 text-bodylg leading-relaxed text-white/85">
            We combine modern analytics engineering with systems thinking — so your reporting becomes trusted,
            repeatable, and genuinely useful.
          </motion.p>
        </motion.header>

        {/* Outcomes / Stats row */}
        <motion.div
          className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          {outcomes.map((o) => (
            <motion.div
              key={o.label}
              variants={fadeUp}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <p className="text-sm font-semibold text-white">{o.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/70">{o.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid */}
        <motion.div
          className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-12 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          {/* Left: Differentiators */}
          <motion.article
            variants={fadeUp}
            whileHover={liftHover}
            whileTap={reduce ? undefined : { scale: 0.99 }}
            className={[
              "md:col-span-6",
              "rounded-3xl border border-white/10 bg-white/95 text-collin-navy",
              "shadow-[0_25px_70px_-35px_rgba(0,0,0,0.8)]",
              "p-7 sm:p-8",
            ].join(" ")}
            aria-label="What sets Collinalitics apart"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                  What sets us apart
                </p>
                <h3 className="mt-2 text-h4 font-semibold text-collin-navy">
                  Consulting-grade delivery, built for real teams.
                </h3>
              </div>

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-collin-teal/15 text-collin-teal">
                <IconCheck />
              </span>
            </div>

            <ul className="mt-7 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-collin-lightTeal/25 text-collin-teal">
                    <IconCheck />
                  </span>
                  <p className="text-body leading-relaxed text-gray-700">{p}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Best fit</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                SMEs, charities, and public-sector teams who want reporting that is trustworthy, governed,
                and easy to run — without complexity for its own sake.
              </p>
            </div>
          </motion.article>

          {/* Right: Outcomes + proof */}
          <motion.aside
            variants={fadeUp}
            whileHover={liftHover}
            whileTap={reduce ? undefined : { scale: 0.99 }}
            className={[
              "md:col-span-6",
              "rounded-3xl border border-white/10 bg-white/95 text-collin-navy",
              "shadow-[0_25px_70px_-35px_rgba(0,0,0,0.8)]",
              "p-7 sm:p-8",
            ].join(" ")}
            aria-label="Expected outcomes"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Outcomes</p>
                <h3 className="mt-2 text-h4 font-semibold text-collin-navy">
                  Reporting becomes a driver for decisions — not a chore.
                </h3>
              </div>

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-collin-navy/10 text-collin-navy">
                <IconSpark />
              </span>
            </div>

            <p className="mt-6 text-body leading-relaxed text-gray-700">
              Leaders gain trusted insight, teams get visibility, and reporting becomes repeatable.
              We reduce manual effort, improve metric confidence, and strengthen operational clarity.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Chip>Less manual reporting</Chip>
              <Chip>Trusted KPIs</Chip>
              <Chip>Faster decisions</Chip>
              <Chip>Clear ownership</Chip>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-collin-teal/15 text-collin-teal">
                  <IconChat />
                </span>
                <div>
                  <p className="text-sm italic leading-relaxed text-gray-700">
                    “We moved from scattered spreadsheets to a single source of truth.
                    Leadership finally has clarity — and reporting time dropped from days to minutes.”
                  </p>
                  <p className="mt-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    Senior Operations Manager • UK Public Sector
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>

        {/* Approach / Stepper */}
        <motion.div
          className="mx-auto mt-18 sm:mt-20 max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          variants={container}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="text-xs font-semibold tracking-widest text-white/75 uppercase">How we work</p>
            <h3 className="mt-3 text-h3 font-semibold text-white">A simple approach that scales.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80 max-w-2xl mx-auto">
              Clear phases, clear outputs, and documentation built in — so the work lasts beyond delivery.
            </p>
          </motion.div>

          {/* Stepper */}
          <motion.div
            variants={fadeIn}
            className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-7"
          >
            {/* Horizontal line (desktop) */}
            <div className="hidden lg:block relative">
              <div className="absolute left-0 right-0 top-6 h-px bg-white/15" aria-hidden="true" />
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {timeline.map((t) => (
                <motion.div
                  key={t.step}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85">
                      {t.step}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-collin-teal/15 text-collin-teal">
                      <IconStep />
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-semibold text-white">{t.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-12 text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
              aria-label="Book a consultation"
            >
              Book a consultation
              <ArrowIcon />
            </a>

            <p className="mt-3 text-xs text-white/70">
              No pressure — we’ll confirm fit, scope, and next steps.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- UI bits ---------- */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

/* ---------- Icons (no deps) ---------- */

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.5 6L20 10l-6.5 2L12 22l-1.5-10L4 10l6.5-2L12 2Z" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.62 0-3.14-.45-4.44-1.24L3 21l1.74-5.06A8.46 8.46 0 0 1 3.5 12 8.5 8.5 0 0 1 12 3.5 8.5 8.5 0 0 1 21 12Z" />
    </svg>
  );
}

function IconStep() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-2 h-4 w-4">
      <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
  );
}