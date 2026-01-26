
"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function WhyUs() {
  const shouldReduceMotion = useReducedMotion();

  const points = [
    "Clear, business‑focused reporting",
    "UK‑based, professional service",
    "Practical solutions without over‑engineering",
    "Experience across analytics, systems, and operations",
  ];

  const timeline = [
    { step: "1", title: "Understand", desc: "We learn your goals, challenges, and the reality of your data." },
    { step: "2", title: "Design", desc: "We define KPIs, reporting structures, and success criteria." },
    { step: "3", title: "Build", desc: "We create dashboards, models, and automated workflows." },
    { step: "4", title: "Refine", desc: "We iterate with your team to ensure clarity, adoption, and usability." },
  ];

  // Calm consultancy-grade motion
  const baseTransition = { duration: 0.55, ease: [0.2, 0.65, 0.25, 1] };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -18 },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  };

  const liftHover = shouldReduceMotion
    ? undefined
    : {
        y: -6,
        boxShadow: "0 24px 72px rgba(2, 12, 27, 0.22)",
        transition: { type: "spring", stiffness: 260, damping: 22 },
      };

  return (
    <section
      id="why"
      className="relative overflow-hidden py-24 sm:py-28 md:py-32 text-white"
    >
      {/* Navy gradient background + subtle glows */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/20 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-collin-lightTeal/20 blur-[100px]" aria-hidden="true" />
      {/* Soft grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('/patterns/grid.svg')] mix-blend-soft-light" aria-hidden="true" />

      <div className="container-wrapper relative z-10">
        {/* Top Divider */}
        <motion.div
          className="mx-auto h-px w-24 bg-white/20 mb-10 sm:mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={baseTransition}
          style={{ transformOrigin: "left center" }}
        />

        {/* Header */}
        <motion.header
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-h2 text-white">Why Collinalitics</h2>
          <p className="text-bodylg text-white/85 mt-3 leading-relaxed">
            Clarity, practicality, and measurable outcomes — delivered with modern technical excellence.
          </p>
        </motion.header>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-14 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
        >
          {/* Vertical Divider */}
          <div
            className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-white/20 to-white/10"
            aria-hidden="true"
          />

          {/* Left Card */}
          <motion.article
            variants={fadeRight}
            whileHover={liftHover}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            className={[
              "group card card-pad backdrop-blur-md",
              "bg-white/95 border border-white/10 rounded-2xl shadow-lg",
              "transition-all",
              "hover:border-collin-teal/40",
            ].join(" ")}
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-collin-teal/15 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <CheckIcon className="text-collin-teal h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <h3 className="text-h4 font-semibold text-collin-navy leading-snug">
              What Sets Us Apart
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700 leading-relaxed">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckIcon className="text-collin-teal h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-body">{p}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          {/* Right Card */}
          <motion.article
            variants={fadeLeft}
            whileHover={liftHover}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
            className={[
              "group card card-pad backdrop-blur-md",
              "bg-white/95 border border-white/10 rounded-2xl shadow-lg",
              "transition-all",
              "hover:border-collin-teal/40",
            ].join(" ")}
          >
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-collin-navy/15 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
              <PlusIcon className="text-collin-navy h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <h3 className="text-h4 font-semibold text-collin-navy leading-snug">
              Outcomes
            </h3>

            <p className="mt-6 text-body text-gray-700 leading-relaxed">
              Leaders gain trusted insight, teams get visibility, and reporting becomes a driver
              for decisions — not a chore. Our work creates clarity, reduces manual effort,
              and strengthens operational confidence across your organisation.
            </p>

            <p className="mt-4 text-body italic text-gray-600 leading-relaxed border-l-4 border-collin-lightTeal/40 pl-4">
              “We don’t just build dashboards — we build understanding.”
            </p>
          </motion.article>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className={[
            "mt-16 sm:mt-20 max-w-3xl mx-auto card card-pad",
            "bg-white/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg",
            "transition-all hover:shadow-2xl hover:-translate-y-1 hover:border-collin-teal/40 text-center",
          ].join(" ")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-collin-teal/15 flex items-center justify-center">
              <ChatIcon className="text-collin-teal h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <p className="text-body italic text-gray-700 leading-relaxed max-w-xl">
              “Collinalitics helped us transform scattered spreadsheets into a single source of truth.
              Our leadership team finally has clarity — and our reporting time dropped from days to minutes.”
            </p>

            <p className="mt-2 text-caption font-medium text-collin-navy">
              — Senior Operations Manager, UK Public Sector
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mt-20 sm:mt-24 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <motion.h3
            className="text-center text-h3 font-semibold text-white mb-10 sm:mb-12"
            variants={fadeUp}
          >
            Our Approach in Action
          </motion.h3>

          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-white/25 to-white/10 -translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-12 sm:space-y-14 md:space-y-16">
              {timeline.map((t, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <motion.div
                    key={t.step}
                    className={[
                      "relative flex items-start gap-6",
                      isRight ? "flex-row-reverse text-right" : "flex-row",
                    ].join(" ")}
                    variants={fadeUp}
                  >
                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white shadow-md ring-4 ring-white/20" aria-hidden="true" />

                    {/* Content */}
                    <div className="w-1/2">
                      <div className="inline-flex items-center gap-2 text-caption font-medium text-white/80">
                        <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white/15 text-white px-2">
                          {t.step}
                        </span>
                        <span className="uppercase tracking-wide">{t.title}</span>
                      </div>

                      <h4 className="mt-2 text-h4 font-semibold text-white leading-snug">
                        {t.title}
                      </h4>
                      <p className="mt-2 text-body text-white/85 leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          className="mx-auto h-px w-24 bg-white/20 mt-16 sm:mt-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={baseTransition}
          style={{ transformOrigin: "right center" }}
        />
      </div>
    </section>
  );
}

/* ---------------- Icons ---------------- */

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}

function ChatIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 2.21.896 4.21 2.343 5.657L4 20l4.343-2.343A7.963 7.963 0 0 0 12 20z" />
    </svg>
  );
}
