"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HowWeWork() {
  const reduce = useReducedMotion();

  const steps = useMemo(
    () => [
      {
        title: "Discovery",
        eyebrow: "Align goals + constraints",
        desc: "We understand your goals, current reporting pain points, and the real constraints behind your data and systems.",
        accent: "teal",
        icon: <SearchIcon />,
        bullets: ["Current-state review", "Stakeholder goals", "Data/system constraints"],
      },
      {
        title: "Design",
        eyebrow: "Define what “good” looks like",
        desc: "We define KPIs, metric logic, ownership, and the technical approach to deliver insight that’s consistent and trusted.",
        accent: "lightTeal",
        icon: <PencilIcon />,
        bullets: ["Metric definitions", "Ownership + governance", "Delivery plan"],
      },
      {
        title: "Build",
        eyebrow: "Deliver reliably",
        desc: "We develop dashboards, models, and automations that are reliable, maintainable, and easy to use day-to-day.",
        accent: "navy",
        icon: <BuildIcon />,
        bullets: ["Dashboards + models", "Automation + refresh", "Documentation"],
      },
      {
        title: "Support",
        eyebrow: "Keep it useful",
        desc: "We refine, extend, and support what we deliver so it stays useful as your organisation evolves.",
        accent: "teal",
        icon: <SupportIcon />,
        bullets: ["Iteration + improvements", "Performance checks", "Ongoing support"],
      },
    ],
    []
  );

  const accentMap = {
    teal: {
      ring: "ring-collin-teal/25",
      iconBg: "bg-collin-teal/15",
      iconText: "text-collin-teal",
      dot: "bg-collin-teal",
      hover: "hover:border-collin-teal/40",
    },
    lightTeal: {
      ring: "ring-collin-lightTeal/25",
      iconBg: "bg-collin-lightTeal/25",
      iconText: "text-collin-lightTeal",
      dot: "bg-collin-lightTeal",
      hover: "hover:border-collin-lightTeal/40",
    },
    navy: {
      ring: "ring-collin-navy/20",
      iconBg: "bg-collin-navy/15",
      iconText: "text-collin-navy",
      dot: "bg-collin-navy",
      hover: "hover:border-collin-navy/35",
    },
  };

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };

  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  const liftHover = reduce
    ? undefined
    : { y: -6, transition: { type: "spring", stiffness: 260, damping: 22 } };

  return (
    <section
      id="how"
      className="relative overflow-hidden py-24 sm:py-28 md:py-32 text-white"
      aria-labelledby="how-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />

      {/* Soft grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full bg-collin-teal/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-collin-lightTeal/18 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-wrapper relative z-10">
        {/* Header */}
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
              How we work
            </p>
          </motion.div>

          <motion.h2 id="how-heading" variants={fadeUp} className="mt-6 text-h2 text-white">
            A clear, collaborative process — designed for confidence.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-4 text-bodylg text-white/85 leading-relaxed">
            Transparent, structured, and aligned with best practice — so your reporting becomes easier,
            more reliable, and more useful across the organisation.
          </motion.p>

          {/* Deliverables pills */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-2">
            <Pill>Clear KPI definitions</Pill>
            <Pill>Decision-ready dashboards</Pill>
            <Pill>Automated reporting workflows</Pill>
            <Pill>Maintainable handover</Pill>
          </motion.div>
        </motion.header>

        {/* Mini “what you get” row */}
        <motion.div
          className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
          variants={container}
        >
          <MiniStat variants={fadeUp} label="Clarity" value="Definitions & ownership" />
          <MiniStat variants={fadeUp} label="Reliability" value="Repeatable delivery" />
          <MiniStat variants={fadeUp} label="Automation" value="Less manual reporting" />
          <MiniStat variants={fadeUp} label="Support" value="Iterate + improve" />
        </motion.div>

        {/* Stepper / Timeline */}
        <motion.div
          className="mx-auto mt-14 max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* Desktop connector */}
          <div className="relative hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-px bg-white/15" aria-hidden="true" />
          </div>

          <ol className="grid gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, idx) => {
              const a = accentMap[s.accent] || accentMap.teal;

              return (
                <motion.li
                  key={s.title}
                  variants={fadeUp}
                  className="relative"
                >
                  {/* Desktop dot that sits on the connector line */}
                  <span
                    className={[
                      "hidden lg:block absolute left-1/2 top-8 -translate-x-1/2",
                      "h-3.5 w-3.5 rounded-full",
                      a.dot,
                      "shadow-[0_0_0_8px_rgba(255,255,255,0.06)]",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <motion.article
                    whileHover={liftHover}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    className={[
                      "mt-0 lg:mt-14",
                      "rounded-3xl border border-white/10 bg-white/95 text-collin-navy",
                      "shadow-[0_25px_70px_-35px_rgba(0,0,0,0.85)]",
                      "p-7 sm:p-8",
                      "transition",
                      a.hover,
                      "ring-1",
                      a.ring,
                    ].join(" ")}
                  >
                    {/* Top row: step + icon */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                          Step {idx + 1}
                        </p>
                        <p className="mt-2 text-xs font-semibold tracking-widest text-collin-slate uppercase">
                          {s.eyebrow}
                        </p>
                      </div>

                      <span
                        className={[
                          "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                          a.iconBg,
                          a.iconText,
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </span>
                    </div>

                    <h3 className="mt-4 text-h4 font-semibold text-collin-navy leading-snug">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {s.desc}
                    </p>

                    {/* Deliverables */}
                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                        Outputs
                      </p>
                      <ul className="mt-4 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className={["mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl", a.iconBg, a.iconText].join(" ")}>
                              <IconCheck className="h-4 w-4" />
                            </span>
                            <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                </motion.li>
              );
            })}
          </ol>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="mt-16 sm:mt-20 flex flex-col lg:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={baseTransition}
        >
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-base font-semibold text-white">
              Ready to improve reporting clarity?
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              We’ll recommend a practical first step based on your current maturity — focused on the highest-impact improvements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a href="#contact" className="ctaConsultation cta-full" aria-label="Get started with Collinalitics">
              Get Started
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition w-full sm:w-auto"
              aria-label="View services"
            >
              View Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Small UI bits ---------- */

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
      {children}
    </span>
  );
}

function MiniStat({ label, value, variants }) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
    >
      <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </motion.div>
  );
}

/* ---------- Icons ---------- */

function IconCheck({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5Z" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7l-4 4 6 6 4-4-6-6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13l-3 3 6 6 3-3" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a6 6 0 1 0-12 0v4a6 6 0 1 0 12 0v-4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2" />
    </svg>
  );
}