"use client";

import CategoryBadge from "./CategoryBadge";

export default function BlogHero({ title, date, category, subtitle }) {
  return (
    <header className="relative overflow-hidden text-white">
      {/* Base background (navy) */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />

      {/* Deepen the whole hero (prevents “not changing” look) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/40"
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]
        [background-size:72px_72px]"
        aria-hidden="true"
      />

      {/* Glows (teal only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-collin-teal/16 blur-[120px]" />
        <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-collin-teal-light/12 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/4 blur-[160px]" />
      </div>

      {/* Content */}
      <div className="container-wrapper relative z-10 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Back */}
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <a
              href="/insights"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
                <ArrowLeftIcon />
              </span>
              Back to Insights
            </a>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <CategoryBadge category={category} />
            {date && (
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                {date}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-6 text-[2.2rem] leading-[1.12] sm:text-[2.8rem] md:text-[3.2rem] font-semibold tracking-tight text-white">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle ? (
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed mx-auto max-w-3xl">
              {subtitle}
            </p>
          ) : (
            <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed mx-auto max-w-3xl">
              Practical thinking on KPIs, dashboards, and operational clarity — written for real-world use.
            </p>
          )}

          {/* Trust cues */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="h-1 w-16 rounded-full bg-collin-teal" aria-hidden="true" />

            <div className="flex flex-wrap justify-center gap-2">
              <HeroPill>Decision-ready</HeroPill>
              <HeroPill>Practical steps</HeroPill>
              <HeroPill>Clear definitions</HeroPill>
              <HeroPill>UK-based delivery</HeroPill>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-auto mt-10 h-px w-28 bg-white/20" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

/* ---------- Small UI bits ---------- */

function HeroPill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

/* ---------- Icons ---------- */

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}