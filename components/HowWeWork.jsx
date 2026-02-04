"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Pencil, Hammer, LifeBuoy, Check, ArrowRight } from "lucide-react";

export default function HowWeWork() {
  const reduce = useReducedMotion();

  const steps = useMemo(
    () => [
      {
        title: "Discovery",
        eyebrow: "Align goals + constraints",
        desc: "We understand your goals, current reporting pain points, and the real constraints behind your data and systems.",
        accent: "teal",
        icon: Search,
        bullets: ["Current-state review", "Stakeholder goals", "Data/system constraints"],
      },
      {
        title: "Design",
        eyebrow: "Define what “good” looks like",
        desc: "We define KPIs, metric logic, ownership, and the technical approach to deliver insight that’s consistent and trusted.",
        accent: "lightTeal",
        icon: Pencil,
        bullets: ["Metric definitions", "Ownership + governance", "Delivery plan"],
      },
      {
        title: "Build",
        eyebrow: "Deliver reliably",
        desc: "We develop dashboards, models, and automations that are reliable, maintainable, and easy to use day-to-day.",
        accent: "navy",
        icon: Hammer,
        bullets: ["Dashboards + models", "Automation + refresh", "Documentation"],
      },
      {
        title: "Support",
        eyebrow: "Keep it useful",
        desc: "We refine, extend, and support what we deliver so it stays useful as your organisation evolves.",
        accent: "teal",
        icon: LifeBuoy,
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
      checkRing: "bg-collin-teal/15 text-collin-teal",
    },
    lightTeal: {
      ring: "ring-collin-lightTeal/25",
      iconBg: "bg-collin-lightTeal/25",
      iconText: "text-collin-lightTeal",
      dot: "bg-collin-lightTeal",
      hover: "hover:border-collin-lightTeal/40",
      checkRing: "bg-collin-lightTeal/25 text-collin-lightTeal",
    },
    navy: {
      ring: "ring-collin-navy/20",
      iconBg: "bg-collin-navy/12",
      iconText: "text-collin-navy",
      dot: "bg-collin-navy",
      hover: "hover:border-collin-navy/30",
      checkRing: "bg-collin-navy/12 text-collin-navy",
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
      className="section relative overflow-hidden bg-gray-50 py-24 sm:py-28 md:py-32"
      aria-labelledby="how-heading"
    >
      {/* ✅ Services-style ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-lightTeal/25 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-80 w-80 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative">
        {/* Header */}
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 backdrop-blur"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              How we work
            </p>
          </motion.div>

          <motion.h2
            id="how-heading"
            variants={fadeUp}
            className="mt-6 text-h2 text-collin-navy"
          >
            A clear, collaborative process designed for confidence.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-bodylg text-collin-slate leading-relaxed"
          >
            Transparent, structured, and aligned with best practice so your reporting becomes easier,
            more reliable, and more useful across the organisation.
          </motion.p>

          {/* Pills */}
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

        {/* Stepper */}
        <motion.div
          className="mx-auto mt-14 max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          {/* Desktop connector */}
          <div className="relative hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-px bg-gray-200" aria-hidden="true" />
          </div>

          <ol className="grid gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, idx) => {
              const a = accentMap[s.accent] || accentMap.teal;
              const Icon = s.icon;

              return (
                <motion.li key={s.title} variants={fadeUp} className="relative">
                  {/* Desktop dot */}
                  <span
                    className={[
                      "hidden lg:block absolute left-1/2 top-8 -translate-x-1/2",
                      "h-3.5 w-3.5 rounded-full",
                      a.dot,
                      "shadow-[0_0_0_8px_rgba(2,12,27,0.06)]",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <motion.article
                    whileHover={liftHover}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    className={[
                      "mt-0 lg:mt-14",
                      "rounded-3xl border border-gray-200 bg-white/95 text-collin-navy",
                      "shadow-[0_22px_70px_rgba(2,12,27,0.10)]",
                      "p-7 sm:p-8 transition ring-1",
                      a.ring,
                      a.hover,
                    ].join(" ")}
                  >
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
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>

                    <h3 className="mt-4 text-h4 font-semibold text-collin-navy leading-snug">
                      {s.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{s.desc}</p>

                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                        Outputs
                      </p>

                      <ul className="mt-4 space-y-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span
                              className={[
                                "mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl",
                                a.checkRing,
                              ].join(" ")}
                              aria-hidden="true"
                            >
                              <Check className="h-4 w-4" strokeWidth={2.5} />
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
            <h3 className="text-base font-semibold text-collin-navy">
              Ready to improve reporting clarity?
            </h3>
            <p className="mt-2 text-sm text-collin-slate leading-relaxed">
              We’ll recommend a practical first step based on your current maturity, focused on
              the highest-impact improvements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button
              size="md"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="md"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Small UI bits ---------- */

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

function MiniStat({ label, value, variants }) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border border-gray-200 bg-white/70 p-5 backdrop-blur"
    >
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">{label}</p>
      <p className="mt-2 text-sm font-semibold text-collin-navy">{value}</p>
    </motion.div>
  );
}
