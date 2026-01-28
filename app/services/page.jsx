"use client";

import React, { useMemo } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const services = useMemo(
    () => [
      {
        name: "Analytics Engineering",
        slug: "analytics-engineering",
        tagline: "Clean, scalable data foundations for trusted reporting.",
        points: ["Data modelling", "Pipelines & QA", "Single source of truth"],
        icon: <DatabaseIcon />,
      },
      {
        name: "BI Dashboards",
        slug: "bi-dashboards",
        tagline: "Decision-ready dashboards built for clarity and adoption.",
        points: ["Executive KPIs", "Drill-down reporting", "Trends & targets"],
        icon: <DashboardIcon />,
      },
      {
        name: "Systems Analysis",
        slug: "systems-analysis",
        tagline: "Understand your workflow, fix friction, and improve outcomes.",
        points: ["Process mapping", "Requirements", "Operating model clarity"],
        icon: <SystemsIcon />,
      },
      {
        name: "Digital Solutions",
        slug: "digital-solutions",
        tagline: "Practical digital delivery — automation, tools, and integration.",
        points: ["Automation", "Integrations", "Reliable delivery"],
        icon: <BoltIcon />,
      },
      
      {
        name: "LLM & AI Solutions",
        slug: "llm-ai-solutions",
        tagline: "Secure, practical AI that reduces manual effort.",
        points: ["AI workflows", "Natural-language querying", "Governance"],
        icon: <SparkIcon />,
      },
    ],
    []
  );

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-28">
      {/* Background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/18 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/patterns/grid.svg')]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-collin-slate mb-10 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-collin-navy transition font-medium">
            Home
          </Link>
          <span className="text-collin-slate/60">/</span>
          <span className="text-collin-navy font-semibold">Services</span>
        </nav>

        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Services</p>
          <h1 className="mt-3 text-h2 text-collin-navy font-semibold">Practical delivery, built for clarity.</h1>
          <p className="text-bodylg text-collin-slate mt-5 leading-relaxed">
            Modern analytics and systems solutions designed to reduce manual effort, improve KPI confidence,
            and help teams make decisions faster — with professional, UK-based delivery.
          </p>

          {/* Chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Chip>Trusted KPIs</Chip>
            <Chip>Automation</Chip>
            <Chip>Decision-ready dashboards</Chip>
            <Chip>Maintainable handover</Chip>
          </div>
        </header>

        {/* Cards */}
        <div className="mt-16 sm:mt-20 grid md:grid-cols-2 gap-10 lg:gap-12">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="max-w-2xl mx-auto rounded-3xl border border-gray-200 bg-white/95 p-8 sm:p-10 shadow-soft">
            <h2 className="text-h4 text-collin-navy">Not sure which service fits?</h2>
            <p className="mt-3 text-body text-collin-slate leading-relaxed">
              Share what you’re trying to improve. We’ll recommend a practical first step and outline what “good” looks like.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#contact" className="cta-primary cta-full">
                Book a discovery call
              </a>
              <Link href="/" className="cta-secondary cta-full">
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={[
        "group block rounded-3xl overflow-hidden",
        "border border-gray-200 bg-white/95",
        "shadow-soft hover:shadow-lift",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-collin-teal/40",
      ].join(" ")}
      aria-label={`Learn more about ${service.name}`}
    >
      {/* Top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-collin-teal to-collin-teal-light" />

      <div className="p-7 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div
            className={[
              "h-12 w-12 rounded-2xl",
              "bg-collin-teal/10 text-collin-teal",
              "flex items-center justify-center",
              "transition-transform duration-300 group-hover:scale-110",
            ].join(" ")}
            aria-hidden="true"
          >
            {service.icon}
          </div>

          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-collin-navy">
            View details
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <ArrowRightMini className="h-4 w-4" />
            </span>
          </span>
        </div>

        <h3 className="mt-5 text-h4 text-collin-navy leading-snug group-hover:text-collin-teal transition-colors">
          {service.name}
        </h3>

        <p className="mt-3 text-body text-gray-700 leading-relaxed">{service.tagline}</p>

        <ul className="mt-6 space-y-3">
          {service.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-7 sm:px-9 pb-7 sm:pb-9">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Best for</p>
          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
            Teams needing clearer reporting, less manual work, and a reliable foundation for decision-making.
          </p>
        </div>
      </div>
    </Link>
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

/* ---------- Icons ---------- */

function ArrowRightMini({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3-3.582-3-8-3-8 1.343-8 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 13h3v5H7v-5zM14 6h3v12h-3V6z" />
    </svg>
  );
}

function SystemsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h10M10 12h10M10 18h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h2v2H4V6zM4 12h2v2H4v-2zM4 18h2v2H4v-2z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" />
    </svg>
  );
}

// Optional if you add AI service:
function SparkIcon() {
   return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2z" />
    </svg>
  );  
}