import React from "react";
import Link from "next/link";

export default function AnalyticsEngineering() {
  const capabilities = [
    {
      title: "Data modelling & transformation",
      desc: "Clean, documented models that turn raw data into reusable, business-ready datasets — with consistent definitions and naming.",
    },
    {
      title: "Pipeline optimisation",
      desc: "Faster refresh cycles, fewer failures, and predictable performance through modular pipelines, incremental loads, and QA checks.",
    },
    {
      title: "Source system integration",
      desc: "Bring together finance, operations, CRM, and spreadsheets into a single reporting layer — without breaking existing workflows.",
    },
    {
      title: "Automated reporting foundations",
      desc: "Reliable datasets, scheduled refresh, governance, and metric ownership so dashboards stay trusted as the business evolves.",
    },
  ];

  const outcomes = [
    "Reduce manual reporting effort and repeated data cleaning",
    "Improve KPI confidence with agreed metric logic and ownership",
    "Enable faster, more consistent dashboards and reporting cycles",
    "Create a scalable base for Power BI, Tableau, and ad-hoc analysis",
  ];

  const deliverables = [
    "KPI definition sheet (logic, ownership, cadence)",
    "Data model (facts/dimensions or semantic layer)",
    "Automated pipeline + refresh schedule",
    "QA checks and data quality rules",
    "Documentation + handover for maintainability",
  ];

  const tools = [
    "SQL",
    "dbt (optional)",
    "Power BI",
    "Tableau",
    "Excel/SharePoint",
    "Azure / GCP / AWS (as required)",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-28">
      {/* Premium background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/14 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Top nav row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-collin-slate flex flex-wrap items-center gap-2"
          >
            <Link href="/" className="hover:text-collin-navy transition font-medium">
              Home
            </Link>
            <span className="text-collin-slate/60">/</span>
            <Link href="/services" className="hover:text-collin-navy transition font-medium">
              Services
            </Link>
            <span className="text-collin-slate/60">/</span>
            <span className="text-collin-navy font-semibold">Analytics Engineering</span>
          </nav>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold text-collin-navy hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold text-collin-navy hover:bg-gray-50 transition"
            >
              All Services
            </Link>
          </div>
        </div>

        {/* Header */}
        <header className="max-w-3xl mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              Service
            </p>
          </div>

          <h1 className="mt-6 text-h2 text-collin-navy font-semibold tracking-tight">
            Analytics Engineering
          </h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            We build clean, scalable data foundations that power dashboards, reporting, and confident
            decision-making. Our focus is reliability, clarity, and long-term maintainability — not
            one-off outputs.
          </p>

          {/* Micro-proof row */}
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <ProofPill>UK-based delivery</ProofPill>
            <ProofPill>Clear KPI definitions</ProofPill>
            <ProofPill>Maintainable pipelines</ProofPill>
            <ProofPill>Documentation included</ProofPill>
          </div>

          <div className="mt-8 h-px w-full bg-gray-200" aria-hidden="true" />
        </header>

        {/* Main grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-7 space-y-8">
            {/* What we do */}
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                What we do
              </h2>

              <div className="mt-6 grid gap-5">
                {capabilities.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-collin-teal/10 text-collin-teal border border-collin-teal/10"
                      aria-hidden="true"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-base font-semibold text-collin-navy">
                        {c.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                  How we approach it
                </h2>

                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-collin-navy">
                  4-step delivery
                </span>
              </div>

              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                <Step
                  n="1"
                  title="Map decisions → metrics"
                  desc="We start from what leaders and teams need to decide, then define KPI logic and ownership."
                />
                <Step
                  n="2"
                  title="Design the reporting layer"
                  desc="We model data for reuse (facts/dimensions or semantic layer) so dashboards stay consistent."
                />
                <Step
                  n="3"
                  title="Build + automate pipelines"
                  desc="We implement transformation, scheduling, and data quality checks to reduce manual work."
                />
                <Step
                  n="4"
                  title="Document + enable adoption"
                  desc="Definitions, documentation, and handover so reporting remains maintainable."
                />
              </ol>
            </div>

            {/* Bottom conversion band */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-collin-teal/10 blur-3xl"
              />
              <div className="relative">
                <h3 className="text-h4 text-collin-navy">Not sure where to start?</h3>
                <p className="mt-2 text-body text-collin-slate leading-relaxed max-w-2xl">
                  Share your reporting pain points — we’ll recommend a practical first step and outline
                  what “good” looks like for your KPIs and automation.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
                  >
                    Discuss your data foundations
                    <span className="ml-2" aria-hidden="true">
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </a>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
                  >
                    View all services
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right (sticky summary) */}
          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            {/* Outcomes */}
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Outcomes you can expect
              </h2>

              <ul className="mt-6 space-y-3">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-collin-teal flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Typical deliverables
              </h2>

              <ul className="mt-6 space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-collin-teal/10 text-collin-teal border border-collin-teal/10 flex-shrink-0">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Tools & environments
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-collin-navy"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed">
                  We adapt delivery to your stack and maturity. The goal is a reliable reporting layer
                  you can own and extend.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small components ---------- */

function Step({ n, title, desc }) {
  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-collin-teal/10 text-collin-teal text-xs font-semibold border border-collin-teal/10">
          {n}
        </span>
        <p className="text-sm font-semibold text-collin-navy">{title}</p>
      </div>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{desc}</p>
    </li>
  );
}

function ProofPill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold text-collin-navy">
      {children}
    </span>
  );
}

/* ---------- Icons ---------- */

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
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

function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
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