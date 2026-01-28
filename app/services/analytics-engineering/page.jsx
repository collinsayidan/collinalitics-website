import React from "react";

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

  const tools = ["SQL", "dbt (optional)", "Power BI", "Tableau", "Excel/SharePoint", "Azure / GCP / AWS (as required)"];

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 md:py-32">
      {/* Background accents (subtle, premium) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/14 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] bg-[url('/patterns/grid.svg')]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
            Service
          </p>

          <h1 className="mt-3 text-h2 text-collin-navy font-semibold">
            Analytics Engineering
          </h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            We build clean, scalable data foundations that power dashboards, reporting, and confident decision-making.
            Our focus is reliability, clarity, and long-term maintainability — not one-off outputs.
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-collin-teal/40" aria-hidden="true" />
        </header>

        {/* Main grid */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: Capabilities */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                What we do
              </h2>

              <div className="mt-6 grid gap-5">
                {capabilities.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-collin-teal/10 text-collin-teal"
                      aria-hidden="true"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </span>

                    <div>
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
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                How we approach it
              </h2>

              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                <Step
                  n="1"
                  title="Map decisions → metrics"
                  desc="We start from what leaders and teams need to decide, then define KPI logic and ownership."
                />
                <Step
                  n="2"
                  title="Design the reporting layer"
                  desc="We model data for reuse (facts/dimensions or semantic layer) to make dashboards consistent."
                />
                <Step
                  n="3"
                  title="Build + automate pipelines"
                  desc="We implement transformation, scheduling, and data quality checks to reduce manual work."
                />
                <Step
                  n="4"
                  title="Document + enable adoption"
                  desc="Clear definitions, documentation, and handover so your reporting stays maintainable."
                />
              </ol>
            </div>
          </div>

          {/* Right: Outcomes + Deliverables */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Outcomes you can expect
              </h2>

              <ul className="mt-6 space-y-3">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Typical deliverables
              </h2>

              <ul className="mt-6 space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-teal/10 text-collin-teal" aria-hidden="true">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
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
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
                >
                  Discuss your data foundations
                  <span className="ml-2" aria-hidden="true">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </a>

                <a
                  href="/services"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
                >
                  View all services
                </a>
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
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-collin-teal/10 text-collin-teal text-xs font-semibold">
          {n}
        </span>
        <p className="text-sm font-semibold text-collin-navy">{title}</p>
      </div>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{desc}</p>
    </li>
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