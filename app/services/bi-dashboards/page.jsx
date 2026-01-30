import React from "react";
import Link from "next/link";

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

  const tools = [
    "Power BI",
    "Tableau",
    "Looker Studio",
    "Excel (where needed)",
    "SQL-backed reporting layer",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 md:py-28">
      {/* Subtle background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/14 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Top nav row (Home / Services) */}
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
            <span className="text-collin-navy font-semibold">BI Dashboards</span>
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
            BI Dashboards
          </h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            We design clear, decision-ready dashboards that give leaders and teams the visibility they need —
            without noise, clutter, or unnecessary complexity. The focus is usability, trust, and outcomes.
          </p>

          {/* Micro-proof row */}
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <ProofPill>Decision-ready design</ProofPill>
            <ProofPill>Governed KPI definitions</ProofPill>
            <ProofPill>Drill-down without clutter</ProofPill>
            <ProofPill>Automation-friendly</ProofPill>
          </div>

          <div className="mt-8 h-px w-full bg-gray-200" aria-hidden="true" />
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left: What we build */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                What we build
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
                      <p className="text-base font-semibold text-collin-navy">{c.title}</p>
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UX Principles */}
            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                  Dashboard UX principles (how we avoid clutter)
                </h2>

                <span className="hidden sm:inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-collin-navy">
                  Premium usability
                </span>
              </div>

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

            {/* Conversion band */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-collin-teal/10 blur-3xl"
              />
              <div className="relative">
                <h3 className="text-h4 text-collin-navy">Want a dashboard people actually use?</h3>
                <p className="mt-2 text-body text-collin-slate leading-relaxed max-w-2xl">
                  Share what you track today — we’ll recommend a cleaner KPI structure, a better layout,
                  and a practical path to trusted reporting.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
                  >
                    Discuss your dashboard needs
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

          {/* Right: Outcomes + Deliverables */}
          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
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

            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
              <h2 className="text-sm font-semibold tracking-widest text-collin-slate uppercase">
                Typical deliverables
              </h2>

              <ul className="mt-6 space-y-3">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-collin-teal/10 text-collin-teal border border-collin-teal/10 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-[0_18px_60px_rgba(2,12,27,0.08)]">
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

                <Link
                  href="/services"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
                >
                  View all services
                </Link>
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