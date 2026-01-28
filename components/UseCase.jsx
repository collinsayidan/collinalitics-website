"use client";
import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function UseCase() {
  const reduce = useReducedMotion();

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };

  const container = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: baseTransition },
  };

  return (
    <section
      id="use-case"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
      aria-labelledby="usecase-heading"
    >
      {/* Background grid + accents */}
      <div
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:72px_72px] pointer-events-none"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/20 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Header */}
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={baseTransition}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              Example work
            </p>
          </div>

          <h2 id="usecase-heading" className="mt-6 text-h2 text-collin-navy">
            Sample use case:{" "}
            <span className="bg-gradient-to-r from-collin-teal to-collin-teal-light bg-clip-text text-transparent">
              Business performance dashboard
            </span>
          </h2>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed">
            A simple demo showing how we turn raw data into clear KPIs, trends, and decision-ready
            reporting — with drill-downs and export-ready views.
          </p>

          {/* Credibility chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Chip>Executive KPIs</Chip>
            <Chip>Trend analysis</Chip>
            <Chip>Team drill-downs</Chip>
            <Chip>Export-ready views</Chip>
          </div>

          {/* Demo disclaimer */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left">
            <InfoIcon className="h-4 w-4 text-collin-teal" />
            <p className="text-xs text-gray-600 leading-relaxed">
              <span className="font-semibold text-collin-navy">Demo build:</span> real client work is tailored
              to your systems, KPIs, and operational goals.
            </p>
          </div>
        </motion.header>

        {/* Mini stats row (adds “substance”) */}
        <motion.div
          className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={container}
        >
          <Stat variants={item} label="Focus" value="Decision-ready KPIs" />
          <Stat variants={item} label="Structure" value="One source of truth" />
          <Stat variants={item} label="Depth" value="Drill-down reporting" />
          <Stat variants={item} label="Output" value="Export-ready views" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10"
        >
          {/* Card 1: Narrative */}
          <UseCaseCard
            variants={item}
            title="Executive overview of KPIs"
            subtitle="Leadership clarity without the noise"
            icon={<IconBars />}
            accent="teal"
          >
            <p className="text-sm leading-relaxed text-gray-700">
              Operational performance insight with drill-downs for leadership and managers. Metrics are
              defined once, tracked consistently, and designed to support real decisions.
            </p>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                What this demonstrates
              </p>
              <ul className="mt-4 space-y-3">
                <Bullet accent="teal" text="Clear definitions for KPIs and ownership" />
                <Bullet accent="teal" text="Trends that explain change, not just display it" />
                <Bullet accent="teal" text="Simple drill-down paths for teams" />
              </ul>
            </div>

            <blockquote className="mt-6 border-l-4 border-collin-teal/35 pl-4 text-sm italic text-gray-600">
              “From raw data → to metrics leaders can trust — with clarity and repeatability.”
            </blockquote>
          </UseCaseCard>

          {/* Card 2: Preview (premium “browser chrome”) */}
          <UseCaseCard
            variants={item}
            title="Dashboard preview"
            subtitle="Clean, modern, and readable"
            icon={<IconWindow />}
            accent="tealLight"
          >
            <div className="mt-1 rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
                </div>
                <div className="hidden sm:block text-xs text-gray-500">
                  demo-dashboard / overview
                </div>
                <span className="inline-flex items-center rounded-full bg-collin-teal/10 px-3 py-1 text-xs font-semibold text-collin-teal">
                  Preview
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/project_05.jpg"
                  alt="Demo dashboard showing KPIs and trends"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MiniTag>Filters & segments</MiniTag>
              <MiniTag>Team drill-downs</MiniTag>
              <MiniTag>Trend lines</MiniTag>
              <MiniTag>Export views</MiniTag>
            </div>
          </UseCaseCard>

          {/* Card 3: Included */}
          <UseCaseCard
            variants={item}
            title="What this demo includes"
            subtitle="Deliverables you can expect"
            icon={<IconCode />}
            accent="navy"
          >
            <ul className="mt-1 space-y-3">
              <Bullet accent="navy" text="KPI cards and trend lines" />
              <Bullet accent="navy" text="Team drill-downs and basic segmentation" />
              <Bullet accent="navy" text="Export-ready reporting views" />
              <Bullet accent="navy" text="Documentation notes (definitions & assumptions)" />
            </ul>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                Tooling (example)
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill>Power BI</Pill>
                <Pill>Tableau</Pill>
                <Pill>SQL models</Pill>
                <Pill>Automated refresh</Pill>
              </div>

              <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                We adapt the build to your stack and workflows — this is just an illustration.
              </p>
            </div>
          </UseCaseCard>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="mt-14 sm:mt-18 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={baseTransition}
        >
          <a
            href="#contact"
            className="cta-primary inline-flex items-center gap-2 text-sm sm:text-base px-7 py-3"
            aria-label="Get in touch to learn more"
          >
            <ArrowRightIcon className="h-5 w-5" />
            Get in touch to learn more
          </a>

          <a
            href="#before-after"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm sm:text-base font-semibold text-collin-navy hover:bg-gray-50 transition"
            aria-label="View the before and after example"
          >
            View before &amp; after
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Reusable Card ---------- */

function UseCaseCard({ title, subtitle, icon, accent, variants, children }) {
  const reduce = useReducedMotion();

  const accentStyles = {
    teal: {
      ring: "ring-collin-teal/20",
      iconBg: "bg-collin-teal/10",
      iconText: "text-collin-teal",
      hover: "hover:border-collin-teal/35",
    },
    tealLight: {
      ring: "ring-collin-teal-light/20",
      iconBg: "bg-collin-teal-light/15",
      iconText: "text-collin-teal-light",
      hover: "hover:border-collin-teal-light/40",
    },
    navy: {
      ring: "ring-collin-navy/15",
      iconBg: "bg-collin-navy/10",
      iconText: "text-collin-navy",
      hover: "hover:border-collin-navy/25",
    },
  };

  const a = accentStyles[accent] || accentStyles.teal;

  const liftHover = reduce
    ? undefined
    : { y: -6, transition: { type: "spring", stiffness: 260, damping: 22 } };

  return (
    <motion.article
      variants={variants}
      whileHover={liftHover}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      className={[
        "lg:col-span-4",
        "rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-8 shadow-xl",
        "transition",
        a.hover,
        "ring-1",
        a.ring,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            {subtitle}
          </p>
          <h3 className="mt-2 text-h4 font-semibold text-collin-navy leading-snug">
            {title}
          </h3>
        </div>

        <span className={["inline-flex h-12 w-12 items-center justify-center rounded-2xl", a.iconBg, a.iconText].join(" ")}>
          {icon}
        </span>
      </div>

      <div className="mt-6">{children}</div>
    </motion.article>
  );
}

/* ---------- Small UI bits ---------- */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

function MiniTag({ children }) {
  return (
    <span className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-collin-navy">
      {children}
    </span>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}

function Stat({ label, value, variants }) {
  return (
    <motion.div
      variants={variants}
      className="rounded-2xl border border-gray-200 bg-white/75 p-5 backdrop-blur"
    >
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">{label}</p>
      <p className="mt-2 text-sm font-semibold text-collin-navy">{value}</p>
    </motion.div>
  );
}

function Bullet({ text, accent }) {
  const styles = {
    teal: "text-collin-teal bg-collin-teal/10",
    tealLight: "text-collin-teal-light bg-collin-teal-light/15",
    navy: "text-collin-navy bg-collin-navy/10",
  };
  const s = styles[accent] || styles.teal;

  return (
    <li className="flex items-start gap-3">
      <span className={["mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl", s].join(" ")}>
        <IconCheck className="h-4 w-4" />
      </span>
      <p className="text-sm leading-relaxed text-gray-700">{text}</p>
    </li>
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

function ArrowRightIcon({ className }) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function InfoIcon({ className }) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 10v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" />
    </svg>
  );
}

function IconBars() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20h16" />
      <path d="M7 16V9" />
      <path d="M12 16V4" />
      <path d="M17 16v-6" />
    </svg>
  );
}

function IconWindow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h18v16H3z" />
      <path d="M3 9h18" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6l-6 6 6 6" />
    </svg>
  );
}