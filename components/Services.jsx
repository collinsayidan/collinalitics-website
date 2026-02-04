"use client";

import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Layers,
  Network,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Data Analytics & Business Intelligence",
    subtitle: "Dashboards and reporting you can trust.",
    items: [
      "Power BI dashboards (exec + operational)",
      "KPI design, metric definitions, and ownership",
      "Data cleaning, modelling, and QA checks",
      "Monthly reporting packs and automation",
    ],
    outcomes: ["Faster reporting cycles", "Shared definitions of performance"],
    color: "blue",
  },
  {
    icon: Layers,
    title: "Analytics Engineering & Data Foundations",
    subtitle: "Clean pipelines, consistent models, scalable insight.",
    items: [
      "Data modelling and transformation (dbt-style approach)",
      "Single source of truth for core metrics",
      "Workflow automation & reproducible pipelines",
      "Documentation and handover for maintainability",
    ],
    outcomes: ["Less manual reporting work", "Reliable data for every team"],
    color: "teal",
    featured: true,
  },
  {
    icon: Network,
    title: "IT & Systems Analysis",
    subtitle: "Systems thinking to remove friction and improve efficiency.",
    items: [
      "Process analysis and bottleneck identification",
      "Requirements gathering and stakeholder alignment",
      "Systems improvement recommendations",
      "Data workflow optimisation and governance support",
    ],
    outcomes: ["Clearer processes and ownership", "Improved operational efficiency"],
    color: "violet",
  },
];

const accent = {
  blue: {
    pill: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    ring: "bg-blue-500/10 text-blue-400",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(59,130,246,0.12)]",
    gradient: "group-hover:from-blue-500/10 group-hover:to-teal-500/10",
  },
  teal: {
    pill: "bg-teal-500/10 border-teal-500/20 text-teal-300",
    ring: "bg-teal-500/10 text-teal-300",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(45,212,191,0.14)]",
    gradient: "group-hover:from-teal-500/10 group-hover:to-blue-500/10",
  },
  violet: {
    pill: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    ring: "bg-violet-500/10 text-violet-300",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(139,92,246,0.14)]",
    gradient: "group-hover:from-violet-500/10 group-hover:to-blue-500/10",
  },
};

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  // ✅ Calendly link (30 min)
  const calendlyUrl = "https://calendly.com/collinsayidan-collinalitics/30min";

  // ✅ Opens Calendly popup + loads script/CSS once
  const openCalendlyPopup = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () =>
      window.Calendly?.initPopupWidget({ url: calendlyUrl });

    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    if (window.Calendly) return openWidget();

    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = openWidget;
      document.body.appendChild(script);
    } else {
      setTimeout(openWidget, 250);
    }
  }, [calendlyUrl]);

  const baseTransition = { duration: 0.55, ease: [0.2, 0.65, 0.25, 1] };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 sm:py-28 md:py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      aria-labelledby="services-heading"
    >
      {/* Background: glows + grid (Hero-style) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 bg-blue-500/10 border-blue-500/20">
            <span className="text-blue-400 text-sm font-medium tracking-wide">
              Services
            </span>
          </div>

          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Practical analytics services built for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              clarity, reliability, and scale
            </span>
            .
          </h2>

          <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-3xl">
            We modernise reporting, strengthen data foundations, and design dashboards
            that stakeholders actually use — without unnecessary complexity.
          </p>

          {/* Audience chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>SMEs</Chip>
            <Chip>Charities</Chip>
            <Chip>Public sector</Chip>
            <Chip>Operations & leadership teams</Chip>
          </div>
        </motion.header>

        {/* Grid */}
        <div className="mt-14 grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-3">
          {services.map((s, idx) => (
            <ServiceCard
              key={s.title}
              {...s}
              idx={idx}
              variants={item}
              reduce={shouldReduceMotion}
            />
          ))}
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8"
        >
          <div className="max-w-2xl">
            <h3 className="text-base font-semibold text-white">
              Not sure what you need yet?
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              We’ll help you pinpoint the quickest path to impact — KPI clarity,
              reporting automation, or strengthening your data foundations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={openCalendlyPopup}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition"
              aria-label="Book a free discovery call via Calendly"
            >
              Book a free discovery call
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <a
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition"
              aria-label="View case studies"
            >
              View examples
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-center text-slate-500 mt-12"
        >
          Supporting SMEs, charities, and public-sector teams across the UK.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function ServiceCard({
  title,
  subtitle,
  items,
  outcomes,
  icon: Icon,
  color,
  featured,
  idx,
  variants,
  reduce,
}) {
  const palette = accent[color] || accent.blue;

  const hoverMotion = reduce
    ? undefined
    : {
        y: -8,
        boxShadow: "0 24px 80px rgba(2, 12, 27, 0.25)",
        transition: { type: "spring", stiffness: 260, damping: 22 },
      };

  return (
    <motion.article
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: idx * 0.08 }}
      whileHover={hoverMotion}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      className={[
        "group relative rounded-2xl border overflow-hidden transition-all duration-500",
        "bg-slate-900/60 backdrop-blur-xl border-slate-800",
        palette.glow,
        featured ? "ring-1 ring-teal-400/20" : "",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-gradient-to-br from-transparent to-transparent transition-all duration-500",
          palette.gradient,
        ].join(" ")}
      />

      {featured && (
        <div className="absolute -top-3 left-6 z-20">
          <span className="inline-flex items-center rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Most requested
          </span>
        </div>
      )}

      <div className="relative z-10 p-7 sm:p-8">
        <div className={["h-12 w-12 sm:h-14 sm:w-14 rounded-xl flex items-center justify-center", palette.ring].join(" ")}>
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-white leading-snug">
          {title}
        </h3>

        <p className="mt-3 text-sm text-slate-400 leading-relaxed">{subtitle}</p>

        <ul className="mt-6 space-y-4 text-slate-300 leading-relaxed">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-teal-300" />
              <span className="text-sm">{it}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 pt-6 border-t border-slate-800">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
            Typical outcomes
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {outcomes.map((o) => (
              <span
                key={o}
                className="inline-flex items-center rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1 text-xs font-medium text-slate-200"
              >
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1 text-xs font-medium text-slate-200">
      {children}
    </span>
  );
}
