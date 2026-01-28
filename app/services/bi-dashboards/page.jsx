import React from "react";

export default function BIDashboards() {
  const capabilities = [
    {
      title: "Executive KPI dashboards",
      desc: "High-level visibility for leaders — a small set of metrics that reflect performance, risk, and priorities.",
    },
    {
      title: "Team & operational reporting",
      desc: "Clear views for managers and teams with drill-down paths from KPIs to operational drivers.",
    },
    {
      title: "Interactive segmentation",
      desc: "Filters and slicing that answer real questions (service, region, team, product) without overwhelming users.",
    },
    {
      title: "Performance trends & targets",
      desc: "Trends, comparisons, thresholds, and targets built around decisions — not decoration.",
    },
  ];

  const outcomes = [
    "Dashboards leaders trust — with consistent KPI definitions",
    "Less time debating numbers, more time acting on insight",
    "Faster reporting cycles with automated refresh and QA checks",
    "Cleaner narratives: what changed, why it changed, what to do next",
  ];

  const deliverables = [
    "KPI framework + definitions (logic, owner, cadence)",
    "Dashboard layout + decision flow (what users do first/next)",
    "Interactive report with drill-down pages and segments",
    "Performance targets, thresholds, and trend context",
    "Documentation + handover (usage + metric definitions)",
  ];

  const tools = ["Power BI", "Tableau", "Looker Studio", "Excel (where needed)", "SQL-backed reporting layer"];

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 md:py-32">
      {/* Subtle background accents */}
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
            BI Dashboards
          </h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            We design clear, decision-ready dashboards that give leaders and teams the visibility they need —
            without noise, clutter, or unnecessary complexity. The focus is usability, trust, and outcomes.
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-collin-teal/40" aria-hidden="true" />
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: What we build */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                What we build
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
                      <p className="text-base font-semibold text-collin-navy">{c.title}</p>
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UX Principles */}
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Dashboard UX principles (how we avoid clutter)
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Principle
                  title="Decision flow first"
                  desc="Each page supports a decision: what’s happening, why, and what to do next."
                />
                <Principle
                  title="Consistent metric logic"
                  desc="Definitions are explicit and shared — so the same KPI means the same thing everywhere."
                />
                <Principle
                  title="Progressive drill-down"
                  desc="Start simple, then drill into segments and drivers without overwhelming users."
                />
                <Principle
                  title="Performance context"
                  desc="Targets, trends, and comparisons turn “numbers” into meaning and action."
                />
              </div>
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
                    <span className="text-sm text-gray-700 leading-relaxed">{o}</span>
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
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-teal/10 text-collin-teal"
                      aria-hidden="true"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Tools we work with
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
                  Discuss your dashboard needs
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

function Principle({ title, desc }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-semibold text-collin-navy">{title}</p>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">{desc}</p>
    </div>
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