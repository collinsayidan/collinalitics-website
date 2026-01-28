import React from "react";

export default function StatsRow() {
  const stats = [
    { value: "5+ Years", label: "Analytics & Engineering Experience", icon: <IconTrend /> },
    { value: "20+ Dashboards", label: "Delivered Across UK Teams", icon: <IconDashboard /> },
    { value: "100% UK-Based", label: "Professional Consulting", icon: <IconPin /> },
    { value: "Hours Saved", label: "Through Reporting Automation", icon: <IconBolt /> },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24"
      aria-label="Key statistics"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:72px_72px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-[-6rem] h-64 w-64 rounded-full bg-collin-teal-light/18 blur-3xl" />
        <div className="absolute -bottom-24 left-[-6rem] h-64 w-64 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative z-10">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              Quick proof
            </p>
          </div>

          <h2 className="mt-6 text-h3 text-collin-navy">
            Measurable results, delivered clearly
          </h2>

          <p className="mt-4 text-body text-collin-slate">
            A snapshot of experience and outcomes we focus on across engagements.
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
            Figures are representative of typical engagements and vary by scope, data maturity, and delivery model.
          </p>

          <a
            href="#case-studies"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
          >
            View case studies
            <span className="ml-2" aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <div
      className={[
        "group rounded-3xl border border-gray-200 bg-white/95 p-6 sm:p-7",
        "shadow-[0_18px_50px_-35px_rgba(0,0,0,0.35)]",
        "transition hover:-translate-y-1 hover:shadow-[0_26px_70px_-40px_rgba(0,0,0,0.45)]",
        "hover:border-collin-teal/35",
        "relative overflow-hidden",
      ].join(" ")}
    >
      {/* Soft corner highlight */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-collin-teal/10 blur-3xl opacity-0 group-hover:opacity-100 transition"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-collin-teal/10 text-collin-teal">
          {icon}
        </span>

        {/* Small “signal” line */}
        <span
          className="mt-1 h-1.5 w-14 rounded-full bg-gradient-to-r from-collin-teal/60 to-collin-teal-light/60"
          aria-hidden="true"
        />
      </div>

      <p className="mt-6 text-3xl sm:text-4xl font-bold text-collin-navy tracking-tight">
        {value}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-collin-slate">
        {label}
      </p>
    </div>
  );
}

/* ---------- Icons ---------- */

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function IconTrend() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 7-7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 8h6v6" />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20V10" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}