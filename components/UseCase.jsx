"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function UseCase() {
  const reduce = useReducedMotion();

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  return (
    <section
      id="use-case"
      aria-labelledby="usecase-heading"
      className={[
        "relative overflow-hidden py-24 sm:py-32",
        // ✅ light default + dark override
        "bg-white text-collin-navy",
        "dark:bg-gradient-to-br dark:from-collin-navy-darker dark:via-collin-navy-dark dark:to-collin-navy-darker dark:text-white",
      ].join(" ")}
    >
      {/* Grid texture (light + dark) */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0",
          // light grid
          "opacity-[0.20] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)]",
          // dark grid
          "dark:opacity-[0.18] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]",
          "[background-size:72px_72px]",
        ].join(" ")}
      />

      {/* Ambient glows (light + dark) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-8rem] h-80 w-80 rounded-full bg-collin-teal/10 blur-3xl dark:bg-collin-teal/15" />
        <div className="absolute -bottom-32 left-[-8rem] h-80 w-80 rounded-full bg-collin-teal-light/10 blur-3xl dark:bg-collin-teal-light/10" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Header */}
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={baseTransition}
        >
          <div
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-2",
              "border-gray-200 bg-white/80 text-collin-navy shadow-sm",
              "dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:backdrop-blur",
            ].join(" ")}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest uppercase opacity-80">
              Example work
            </p>
          </div>

          <h2
            id="usecase-heading"
            className="mt-6 text-h2 leading-tight text-collin-navy dark:text-white"
          >
            Sample use case:{" "}
            <span className="bg-gradient-to-r from-collin-teal to-collin-teal-light bg-clip-text text-transparent">
              business performance dashboard
            </span>
          </h2>

          <p className="mt-4 text-bodylg leading-relaxed text-collin-slate dark:text-white/75">
            A simplified example showing how raw operational data becomes clear KPIs,
            trends, and decision-ready reporting.
          </p>
        </motion.header>

        {/* Cards */}
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <UseCaseCard
            variants={item}
            title="Executive KPI overview"
            subtitle="Clarity for leadership"
            accent="teal"
          >
            <p className="text-sm leading-relaxed text-gray-700 dark:text-white/75">
              KPIs are defined once, governed properly, and surfaced in a way that
              supports decisions rather than noise.
            </p>

            <ul className="mt-6 space-y-3">
              <Bullet text="Consistent KPI definitions" />
              <Bullet text="Clear trends and variance explanation" />
              <Bullet text="Simple drill-downs for teams" />
            </ul>
          </UseCaseCard>

          <UseCaseCard
            variants={item}
            title="Dashboard preview"
            subtitle="Clean & readable"
            accent="light"
          >
            <div
              className={[
                "mt-2 rounded-2xl overflow-hidden border",
                "border-gray-200 bg-gray-50",
                "dark:border-white/10 dark:bg-white/5",
              ].join(" ")}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/usecase/usecase_01.png"
                  alt="Dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <MiniTag>Filters</MiniTag>
              <MiniTag>Drill-downs</MiniTag>
              <MiniTag>Export views</MiniTag>
            </div>
          </UseCaseCard>

          <UseCaseCard
            variants={item}
            title="What this includes"
            subtitle="Typical deliverables"
            accent="navy"
          >
            <ul className="space-y-3">
              <Bullet text="KPI cards and trends" />
              <Bullet text="Operational drill-downs" />
              <Bullet text="Documentation & definitions" />
              <Bullet text="Automated refresh setup" />
            </ul>

            <div
              className={[
                "mt-6 rounded-xl border p-4",
                "border-gray-200 bg-gray-50",
                "dark:border-white/10 dark:bg-white/5",
              ].join(" ")}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-600 dark:text-white/60">
                Tools (example)
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>Power BI</Pill>
                <Pill>Tableau</Pill>
                <Pill>SQL</Pill>
              </div>
            </div>
          </UseCaseCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={baseTransition}
        >
          <a
            href="#contact"
            className={[
              "inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-semibold transition",
              "bg-collin-teal text-white shadow-lg shadow-black/10 hover:opacity-95",
            ].join(" ")}
          >
            Discuss your use case
          </a>

          <a
            href="#before-after"
            className="text-sm font-semibold text-collin-navy/80 hover:underline dark:text-white/85"
          >
            View before &amp; after →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function UseCaseCard({ title, subtitle, accent, variants, children }) {
  const reduce = useReducedMotion();

  const accents = {
    teal: "ring-collin-teal/25 dark:ring-collin-teal/25",
    light: "ring-gray-200 dark:ring-white/15",
    navy: "ring-collin-navy/10 dark:ring-collin-navy/25",
  };

  return (
    <motion.article
      variants={variants}
      whileHover={reduce ? undefined : { y: -6 }}
      className={[
        "lg:col-span-4 rounded-3xl border p-7 sm:p-8 transition ring-1",
        // light
        "border-gray-200 bg-white shadow-soft",
        // dark
        "dark:border-white/10 dark:bg-white/5 dark:shadow-softDark dark:backdrop-blur",
        accents[accent],
      ].join(" ")}
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-white/60">
        {subtitle}
      </p>

      <h3 className="mt-2 text-h4 font-semibold text-collin-navy dark:text-white">
        {title}
      </h3>

      <div className="mt-6">{children}</div>
    </motion.article>
  );
}

function Bullet({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-white/75">
      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-collin-teal" />
      <span>{text}</span>
    </li>
  );
}

function MiniTag({ children }) {
  return (
    <span
      className={[
        "rounded-full border px-3 py-1 text-xs font-medium",
        "border-gray-200 bg-gray-50 text-gray-700",
        "dark:border-white/15 dark:bg-white/5 dark:text-white/80",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Pill({ children }) {
  return (
    <span
      className={[
        "rounded-full border px-3 py-1 text-xs font-medium",
        "border-gray-200 bg-white text-gray-700",
        "dark:border-white/15 dark:bg-white/5 dark:text-white/80",
      ].join(" ")}
    >
      {children}
    </span>
  );
}