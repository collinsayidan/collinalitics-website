
"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  // Calm, consultancy-grade motion
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
      className="section bg-gray-50 py-24 sm:py-28 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="container-wrapper">

        {/* Header (left-aligned to match About; switch to text-center to center) */}
        <header className="max-w-4xl mb-16">
          <h2 id="services-heading" className="text-h2 text-collin-navy">
            Our Services
          </h2>
          <p className="text-bodylg text-collin-slate mt-4 leading-relaxed max-w-2xl">
            Modern analytics, systems analysis, and digital solutions designed
            to help organisations make confident, insight‑driven decisions.
          </p>
        </header>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 sm:gap-10 lg:gap-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <ServiceCard
            title="Data Analytics & Business Intelligence"
            accent="teal"
            icon={<BarChartIcon />}
            items={[
              "Power BI dashboards",
              "KPI design and reporting",
              "Data cleaning and modelling",
              "Executive and operational reporting",
            ]}
            variants={item}
            reduced={shouldReduceMotion}
          />

          <ServiceCard
            title="IT & Systems Analysis"
            accent="lightTeal"
            icon={<SystemsIcon />}
            items={[
              "Process analysis",
              "Systems improvement recommendations",
              "Requirements gathering",
              "Data workflow optimisation",
            ]}
            variants={item}
            reduced={shouldReduceMotion}
          />

          <ServiceCard
            title="Software & Digital Solutions"
            accent="navy"
            icon={<CodeIcon />}
            items={[
              "Web and internal tools",
              "Reporting automation",
              "Data integrations",
            ]}
            variants={item}
            reduced={shouldReduceMotion}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Reusable Components ---------- */

function ServiceCard({ title, items, icon, accent, variants, reduced }) {
  // Explicit Tailwind class maps (JIT-safe)
  const accentStyles = {
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
  }[accent];

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
        "group card card-pad bg-white/95 backdrop-blur-sm",
        "border border-gray-200 rounded-2xl shadow-lg",
        "transition-all duration-300",
        accentStyles.hoverBorder,
        accentStyles.glow,
      ].join(" ")}
    >
      {/* Icon Ring */}
      <div className={["h-12 w-12 sm:h-14 sm:w-14 rounded-full", accentStyles.ring, "flex items-center justify-center mb-6"].join(" ")}>
        {/* inherit icon color from accentStyles.text if needed */}
        <span className={accentStyles.text} aria-hidden="true">
          {icon}
        </span>
      </div>

      <h3 className="text-h4 font-semibold text-collin-navy leading-snug">
        {title}
      </h3>

      <ul className="mt-6 space-y-4 text-gray-700 leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckIcon className={`${accentStyles.text} h-5 w-5 mt-0.5 flex-shrink-0`} />
            <span className="text-body">{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
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
  <svg
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M4 20h16M6 16V10M12 16V4M18 16v-6" />
  </svg>
);

const SystemsIcon = () => (
  <svg
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M3 3h6v6H3zM15 3h6v6h-6zM9 15h6v6H9zM6 9v6M18 9v6M9 6h6M12 15v-3" />
  </svg>
);

const CodeIcon = () => (
  <svg
    className="h-7 w-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);
