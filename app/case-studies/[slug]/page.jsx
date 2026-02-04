import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const caseStudies = {
  "public-sector-reporting": {
    title: "Public Sector Reporting Transformation",
    sector: "Public Sector",
    outcome: "Reduced reporting time from days to minutes",
    image: "/case-studies/Publicsector.jpg",
    body: `
Collinalitics partnered with a government agency to overhaul their legacy reporting workflows.
By implementing automated Power BI dashboards and streamlining data pipelines, we reduced
reporting time from 3 days to under 15 minutes — enabling faster decisions and improved transparency.
    `,
    challenge: [
      "Manual, spreadsheet-heavy reporting with inconsistent definitions",
      "Slow reporting cycles (multiple days) and limited transparency",
      "Hard to drill down from exec metrics to operational drivers",
    ],
    approach: [
      "Defined KPI ownership and agreed metric logic with stakeholders",
      "Built automated Power BI reporting with repeatable data modelling",
      "Introduced QA checks and documentation for long-term maintainability",
    ],
    impact: [
      "Reporting cycle reduced from days to minutes",
      "Improved leadership confidence in KPI accuracy",
      "Better performance visibility across teams",
    ],
    highlights: [
      { label: "Primary focus", value: "Reporting & KPI clarity" },
      { label: "Deliverables", value: "Dashboard + reporting layer" },
      { label: "Tools (example)", value: "Power BI • SQL models" },
    ],
  },

  "operations-kpi-dashboard": {
    title: "Operational KPI Dashboard",
    sector: "Private Sector",
    outcome: "Improved visibility across operations",
    image: "/images/case-studies/project_02.jpg",
    body: `
A private logistics firm needed real-time visibility across its operational KPIs.
Collinalitics designed a scalable dashboard architecture that unified data from multiple systems,
giving executives instant clarity and enabling proactive performance management.
    `,
    challenge: [
      "Data spread across multiple systems with inconsistent refresh cycles",
      "Limited ability to monitor trends and identify issues early",
      "No single source of truth for operational KPIs",
    ],
    approach: [
      "Unified core data sources into a consistent reporting layer",
      "Designed a KPI framework aligned to operational objectives",
      "Delivered a scalable dashboard structure with clear drill-down paths",
    ],
    impact: [
      "Improved operational visibility and faster issue detection",
      "Consistent KPI definitions shared across stakeholders",
      "Executives gained instant clarity on performance trends",
    ],
    highlights: [
      { label: "Primary focus", value: "Operational KPIs" },
      { label: "Deliverables", value: "KPI framework + dashboards" },
      { label: "Tools (example)", value: "BI dashboards • reporting layer" },
    ],
  },
};

// ✅ Next.js: params is sync in most setups; keep as you had if your build requires await
export default async function CaseStudyDetail({ params }) {
  const { slug } = await params;

  const study = caseStudies[slug];
  if (!study) return notFound();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 text-white"
      aria-label={`${study.title} case study`}
    >
      {/* ✅ Dark brand background */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />

      {/* Grid overlay (subtle) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:72px_72px]"
        aria-hidden="true"
      />

      {/* Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/16 blur-[120px]" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-collin-teal-light/12 blur-[120px]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-white/70 mb-10 flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="hover:text-white transition font-medium">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <Link href="/case-studies" className="hover:text-white transition font-medium">
            Case Studies
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-semibold">{study.title}</span>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Image */}
          <div className="lg:col-span-7">
            {study.image && (
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
                <div className="relative w-full h-64 sm:h-80 md:h-[28rem]">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                    aria-hidden="true"
                  />
                </div>
              </div>
            )}

            {/* Results strip */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <ResultStatDark label="Outcome" value={study.outcome} />
              <ResultStatDark label="Sector" value={study.sector} />
              <ResultStatDark label="Delivery style" value="UK-based • practical • clear" />
            </div>
          </div>

          {/* Sticky summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-7 sm:p-8 shadow-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-collin-teal/25 bg-collin-teal/10 px-4 py-1 text-xs font-semibold text-collin-teal">
                  {study.sector}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-white/85">
                  Case study
                </span>
              </div>

              <h1 className="mt-4 text-h2 text-white leading-tight">{study.title}</h1>
              <p className="mt-3 text-bodylg text-white/75 font-medium">{study.outcome}</p>

              <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Engagement summary
                </p>

                <dl className="mt-4 space-y-4">
                  {(study.highlights || []).map((h) => (
                    <div key={h.label} className="flex items-start justify-between gap-6">
                      <dt className="text-sm text-white/60">{h.label}</dt>
                      <dd className="text-sm font-semibold text-white text-right">{h.value}</dd>
                    </div>
                  ))}

                  <div className="flex items-start justify-between gap-6">
                    <dt className="text-sm text-white/60">Result</dt>
                    <dd className="text-sm font-semibold text-white text-right">{study.outcome}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a href="#contact" className="cta-primary cta-full">
                  Book a discovery call
                </a>
                <Link href="/case-studies" className="cta-secondary cta-full">
                  Back to case studies
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/60 leading-relaxed">
                If you’re dealing with manual reporting, inconsistent KPIs, or low confidence in numbers,
                we can help you build a reliable reporting foundation.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Overview */}
          <div className="lg:col-span-7">
            <article className="rounded-3xl border border-white/10 bg-black/20 p-7 sm:p-9 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
                <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Overview
                </p>
              </div>

              <p className="mt-5 text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {study.body}
              </p>

              <div className="mt-10 pt-8 border-t border-white/10">
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
                  What changed
                </h2>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  We replaced manual, fragmented reporting with a structured KPI framework, a reliable reporting
                  layer, and dashboards designed for decision-making.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <MiniCalloutDark
                    title="Consistency"
                    desc="Shared definitions and repeatable delivery remove KPI confusion."
                    icon={<IconCheck />}
                  />
                  <MiniCalloutDark
                    title="Speed"
                    desc="Automation reduces cycle time and frees teams from manual work."
                    icon={<IconBolt />}
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Side blocks */}
          <div className="lg:col-span-5 space-y-8">
            <InfoBlockDark title="Challenge" items={study.challenge} icon={<IconAlert />} tone="neutral" />
            <InfoBlockDark title="Approach" items={study.approach} icon={<IconTools />} tone="neutral" />
            <InfoBlockDark title="Impact" items={study.impact} icon={<IconSpark />} tone="accent" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-8 sm:p-10 shadow-2xl text-center">
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-collin-teal/12 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="text-h4 text-white">Want results like this?</h2>
              <p className="mt-3 text-body text-white/75 leading-relaxed">
                Share what you’re trying to improve — we’ll recommend a practical first step and outline what
                “good” could look like for your reporting, KPIs, and automation.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#contact" className="cta-primary cta-full">
                  Book a discovery call
                </a>
                <Link href="/case-studies" className="cta-secondary cta-full">
                  Back to case studies
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/60">
                UK-based delivery • Clear scope • Practical outcomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark small components ---------- */

function ResultStatDark({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white leading-snug">{value}</p>
    </div>
  );
}

function MiniCalloutDark({ title, desc, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-collin-teal/10 text-collin-teal">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm text-white/75 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function InfoBlockDark({ title, items = [], icon, tone = "neutral" }) {
  const accent = tone === "accent";

  return (
    <aside
      className={[
        "rounded-3xl border p-7 sm:p-8 shadow-2xl",
        "bg-black/20",
        accent ? "border-collin-teal/25" : "border-white/10",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">{title}</p>
          <p className="mt-2 text-sm font-semibold text-white">
            {accent ? "What improved" : "Key points"}
          </p>
        </div>

        <span
          className={[
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
            accent ? "bg-collin-teal/10 text-collin-teal" : "bg-white/5 text-white/85",
          ].join(" ")}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span
              className={[
                "mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0",
                accent ? "bg-collin-teal" : "bg-collin-teal-light",
              ].join(" ")}
              aria-hidden="true"
            />
            <span className="text-sm text-white/75 leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ---------- Icons ---------- */

function IconCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function IconTools() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7l2 2" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.2 3.6L17 7l-3.8 1.4L12 12l-1.2-3.6L7 7l3.8-1.4L12 2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12l.8 2.4L22 15l-2.2.6L19 18l-.8-2.4L16 15l2.2-.6L19 12Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l.8 2.4L8 15l-2.2.6L5 18l-.8-2.4L2 15l2.2-.6L5 12Z" />
    </svg>
  );
}