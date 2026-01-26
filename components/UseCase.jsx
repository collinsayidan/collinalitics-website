
"use client";
import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function UseCase() {
  const shouldReduceMotion = useReducedMotion();

  const accentMap = {
    teal:      { text: "text-collin-teal",      bg: "bg-collin-teal/10",      border: "hover:border-collin-teal/40",
                 glow: "group-hover:shadow-[0_0_0_6px_rgba(0,151,167,0.08)]" },
    lightTeal: { text: "text-collin-lightTeal", bg: "bg-collin-lightTeal/20", border: "hover:border-collin-lightTeal/40",
                 glow: "group-hover:shadow-[0_0_0_6px_rgba(128,222,234,0.10)]" },
    navy:      { text: "text-collin-navy",      bg: "bg-collin-navy/10",      border: "hover:border-collin-navy/40",
                 glow: "group-hover:shadow-[0_0_0_6px_rgba(26,62,95,0.10)]" },
  };

  const baseTransition = { duration: 0.55, ease: [0.2, 0.65, 0.25, 1] };
  const container = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: baseTransition },
  };

  return (
    <section id="use-case" className="section bg-gray-50 py-24 sm:py-28 md:py-32 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/patterns/grid.svg')] pointer-events-none" aria-hidden="true" />

      <div className="container-wrapper relative z-10">

        {/* Header */}
        <motion.header
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={baseTransition}
        >
          <h2 className="text-h2 text-collin-navy">Sample Use Case (Demo Project)</h2>
          <p className="text-bodylg text-collin-slate mt-3">Business Performance Dashboard</p>
        </motion.header>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14 relative"
        >
          {/* Accent dividers */}
          <div className="hidden lg:block absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-collin-lightTeal/20 to-collin-teal/20" aria-hidden="true" />
          <div className="hidden lg:block absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-collin-lightTeal/20 to-collin-teal/20" aria-hidden="true" />

          {/* Card 1 */}
          <UseCaseCard
            variants={item}
            accent="teal"
            title="Executive Overview of KPIs"
            desc="Operational performance insights with drill‑down reporting for leadership and team managers."
            quote="This demo shows how Collinalitics transforms raw data into clear, actionable insight."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 20h16" /><path d="M6 16v-6" /><path d="M12 16V4" /><path d="M18 16v-3" />
              </svg>
            }
            accentMap={accentMap}
          />

          {/* Card 2 — Dashboard Preview with SVG image */}
          <UseCaseCard
            variants={item}
            accent="lightTeal"
            title="Dashboard Preview"
            desc="A clean, modern interface showing KPIs, trends, and team‑level insights."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 3h18v14H3z" /><path d="M3 10h18" />
              </svg>
            }
            preview
            imageSrc="/images/demo-dashboard.svg"
            imageAlt="Demo dashboard showing KPIs and trends"
            accentMap={accentMap}
          />

          {/* Card 3 */}
          <UseCaseCard
            variants={item}
            accent="navy"
            title="What This Demo Includes"
            list={[
              "KPI cards and trend lines",
              "Team drill‑downs",
              "Filters & segments",
              "Export‑ready reporting",
            ]}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" />
              </svg>
            }
            accentMap={accentMap}
          />
        </motion.div>

        {/* CTA Row */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={baseTransition}
        >
          <a href="#contact" className="cta-primary inline-flex items-center gap-2 text-bodylg px-8 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            Get in Touch to Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Reusable Motion Card ---------- */
function UseCaseCard({
  accent, title, desc, quote, list, icon, preview, imageSrc, imageAlt, accentMap, variants,
}) {
  const a = accentMap[accent];
  const hoverMotion = {
    y: -6,
    boxShadow: "0 20px 60px rgba(2, 12, 27, 0.08)",
    transition: { type: "spring", stiffness: 260, damping: 22 },
  };

  return (
    <motion.article
      variants={variants}
      className={[
        "group card p-7 sm:p-8 md:p-10 bg-white/95 backdrop-blur-sm",
        "border border-gray-200 rounded-2xl shadow-lg",
        "transition-all", a.border, a.glow,
      ].join(" ")}
      whileHover={hoverMotion}
      whileTap={{ scale: 0.99 }}
    >
      {/* Icon ring */}
      <div className={["h-12 w-12 sm:h-14 sm:w-14 rounded-full", a.bg, "flex items-center justify-center mb-6", "transition-transform group-hover:scale-110"].join(" ")}>
        <span className={a.text}>{icon}</span>
      </div>

      <h3 className="text-h4 font-semibold text-collin-navy leading-snug">{title}</h3>

      {/* Preview image (SVG) or fallback */}
      {preview && (
        imageSrc ? (
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={imageSrc}
                alt={imageAlt || "Dashboard preview"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 h-48 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 shadow-inner flex items-center justify-center text-gray-500 text-sm">
            Dashboard Screenshot Placeholder
          </div>
        )
      )}

      {desc && <p className="mt-4 text-body text-gray-700 leading-relaxed">{desc}</p>}

      {quote && (
        <p className="mt-4 text-body italic text-gray-600 leading-relaxed border-l-4 border-collin-lightTeal/40 pl-4">
          “{quote}”
        </p>
      )}

      {list && (
        <ul className="mt-6 space-y-4 text-gray-700 leading-relaxed">
          {list.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${a.text} mt-0.5 flex-shrink-0`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
