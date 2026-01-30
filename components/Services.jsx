"use client";

import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  // ✅ Your Calendly link (30 min)
  const calendlyUrl = "https://calendly.com/collinsayidan-collinalitics/30min";

  // ✅ Opens Calendly popup + loads script/CSS once
  const openCalendlyPopup = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () => window.Calendly?.initPopupWidget({ url: calendlyUrl });

    // Load Calendly CSS once
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // If script already loaded, open now
    if (window.Calendly) return openWidget();

    // Load script once
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
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  };

  return (
    <section
      id="services"
      className="section relative overflow-hidden bg-gray-50 py-24 sm:py-28 md:py-32"
      aria-labelledby="services-heading"
    >
      {/* Ambient accents (matches Hero/About polish) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-lightTeal/25 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-80 w-80 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative">
        {/* Header */}
        <header className="max-w-4xl">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
            Services
          </p>

          <h2 id="services-heading" className="mt-3 text-h2 text-collin-navy">
            Practical analytics services built for clarity, reliability, and scale.
          </h2>

          <p className="mt-5 text-bodylg text-collin-slate leading-relaxed max-w-3xl">
            We modernise reporting, strengthen data foundations, and design dashboards
            that stakeholders actually use without unnecessary complexity.
          </p>

          {/* Proof / audience chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>SMEs</Chip>
            <Chip>Charities</Chip>
            <Chip>Public sector</Chip>
            <Chip>Operations & leadership teams</Chip>
          </div>
        </header>

        {/* Grid */}
        <motion.div
          className="mt-14 grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <ServiceCard
            title="Data Analytics & Business Intelligence"
            subtitle="Dashboards and reporting you can trust."
            accent="teal"
            icon={<BarChartIcon />}
            items={[
              "Power BI dashboards (exec + operational)",
              "KPI design, metric definitions, and ownership",
              "Data cleaning, modelling, and QA checks",
              "Monthly reporting packs and automation",
            ]}
            outcomes={["Faster reporting cycles", "Shared definitions of performance"]}
            variants={item}
            reduced={shouldReduceMotion}
          />

          <ServiceCard
            featured
            title="Analytics Engineering & Data Foundations"
            subtitle="Clean pipelines, consistent models, scalable insight."
            accent="lightTeal"
            icon={<FoundationIcon />}
            items={[
              "Data modelling and transformation (dbt-style approach)",
              "Single source of truth for core metrics",
              "Workflow automation & reproducible pipelines",
              "Documentation and handover for maintainability",
            ]}
            outcomes={["Less manual reporting work", "Reliable data for every team"]}
            variants={item}
            reduced={shouldReduceMotion}
          />

          <ServiceCard
            title="IT & Systems Analysis"
            subtitle="Systems thinking to remove friction and improve efficiency."
            accent="navy"
            icon={<SystemsIcon />}
            items={[
              "Process analysis and bottleneck identification",
              "Requirements gathering and stakeholder alignment",
              "Systems improvement recommendations",
              "Data workflow optimisation and governance support",
            ]}
            outcomes={["Clearer processes and ownership", "Improved operational efficiency"]}
            variants={item}
            reduced={shouldReduceMotion}
          />
        </motion.div>

        {/* ✅ CTA Row (fixed + Calendly connected) */}
        <div className="mt-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-base font-semibold text-collin-navy">
              Not sure what you need yet?
            </h3>
            <p className="mt-2 text-sm text-collin-slate leading-relaxed">
              We’ll help you pinpoint the quickest path to impact whether that’s KPI clarity,
              reporting automation, or strengthening your data foundations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Calendly popup button */}
            <button
              type="button"
              onClick={openCalendlyPopup}
              className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
              aria-label="Book a free discovery call via Calendly"
            >
              Book a free discovery call
              <ArrowIcon />
            </button>

            {/* Normal link */}
            <a
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
              aria-label="View case studies"
            >
              View examples
            </a>
          </div>
        </div>
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
  icon,
  accent,
  variants,
  reduced,
  featured = false,
}) {
  const accentStyles =
    {
      teal: {
        ring: "bg-collin-teal/15",
        text: "text-collin-teal",
        hoverBorder: "hover:border-collin-teal/40",
        glow: "group-hover:shadow-[0_0_0_6px_rgba(0,151,167,0.08)]",
      },
      lightTeal: {
        ring: "bg-collin-lightTeal/20",
        text: "text-collin-lightTeal",
        hoverBorder: "hover:border-collin-lightTeal/40",
        glow: "group-hover:shadow-[0_0_0_6px_rgba(128,222,234,0.10)]",
      },
      navy: {
        ring: "bg-collin-navy/15",
        text: "text-collin-navy",
        hoverBorder: "hover:border-collin-navy/40",
        glow: "group-hover:shadow-[0_0_0_6px_rgba(26,62,95,0.10)]",
      },
    }[accent] || {};

  const hoverMotion = reduced
    ? undefined
    : {
        y: -6,
        boxShadow: "0 20px 60px rgba(2, 12, 27, 0.10)",
        transition: { type: "spring", stiffness: 260, damping: 22 },
      };

  return (
    <motion.article
      variants={variants}
      whileHover={hoverMotion}
      whileTap={reduced ? undefined : { scale: 0.99 }}
      className={[
        "group relative rounded-2xl border shadow-lg transition-all duration-300",
        "bg-white/95 backdrop-blur-sm border-gray-200",
        accentStyles.hoverBorder,
        accentStyles.glow,
        featured ? "ring-1 ring-collin-lightTeal/30 shadow-xl" : "",
      ].join(" ")}
    >
      {/* Featured ribbon */}
      {featured && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center rounded-full bg-collin-teal px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Most requested
          </span>
        </div>
      )}

      <div className="p-7 sm:p-8">
        {/* Icon Ring */}
        <div
          className={[
            "h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center",
            accentStyles.ring,
          ].join(" ")}
        >
          <span className={accentStyles.text} aria-hidden="true">
            {icon}
          </span>
        </div>

        <h3 className="mt-6 text-h4 font-semibold text-collin-navy leading-snug">
          {title}
        </h3>

        <p className="mt-3 text-sm text-collin-slate leading-relaxed">{subtitle}</p>

        <ul className="mt-6 space-y-4 text-gray-700 leading-relaxed">
          {items.map((it) => (
            <li key={it} className="flex items-start gap-3">
              <CheckIcon className={`${accentStyles.text} h-5 w-5 mt-0.5 flex-shrink-0`} />
              <span className="text-body">{it}</span>
            </li>
          ))}
        </ul>

        {/* Outcomes */}
        <div className="mt-7 pt-6 border-t border-gray-200">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Typical outcomes
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {outcomes.map((o) => (
              <span
                key={o}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-collin-navy"
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
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

function CheckIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* Icons */
const BarChartIcon = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4 20h16M6 16V10M12 16V4M18 16v-6" />
  </svg>
);

const FoundationIcon = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M4 10h16M6 10V20m12-10V20M8 20h8M7 6l5-3 5 3" />
  </svg>
);

const SystemsIcon = () => (
  <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M3 3h6v6H3zM15 3h6v6h-6zM9 15h6v6H9zM6 9v6M18 9v6M9 6h6M12 15v-3" />
  </svg>
);

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-2 h-4 w-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
