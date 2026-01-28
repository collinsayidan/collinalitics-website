import CategoryBadge from "./CategoryBadge";

export default function BlogHero({ title, date, category, subtitle }) {
  return (
    <header className="relative overflow-hidden text-white">
      {/* Premium background */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('/patterns/grid.svg')] mix-blend-soft-light"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/20 blur-[110px]" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-collin-teal-light/18 blur-[110px]" />
      </div>

      <div className="container-wrapper relative z-10 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Breadcrumb / back */}
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <a
              href="/insights"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition backdrop-blur"
            >
              <span aria-hidden="true">
                <ArrowLeftIcon />
              </span>
              Back to Insights
            </a>
          </nav>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <CategoryBadge category={category} />
            {date && (
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                {date}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-6 text-[2.15rem] leading-[1.12] sm:text-[2.65rem] md:text-[3rem] font-semibold tracking-tight text-white">
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

          {/* Reading cues */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="h-1 w-16 rounded-full bg-collin-teal" aria-hidden="true" />

            <div className="flex flex-wrap justify-center gap-2">
              <HeroPill>Decision-ready</HeroPill>
              <HeroPill>Practical steps</HeroPill>
              <HeroPill>UK-focused delivery</HeroPill>
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
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
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