import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";

export default function CaseStudiesPage() {
  const studies = [
    {
      title: "Public Sector Reporting Transformation",
      sector: "Public Sector",
      outcome: "Reduced reporting time from days to minutes",
      slug: "public-sector-reporting",
      image: "/case-studies/Publicsector.jpg",
      featured: true,
      tags: ["Reporting automation", "Governance", "Leadership KPIs"],
    },
    {
      title: "Operational KPI Dashboard",
      sector: "Private Sector",
      outcome: "Improved visibility across operations",
      slug: "operations-kpi-dashboard",
      image: "/images/case-studies/operations-kpi-dashboard.jpg",
      featured: false,
      tags: ["KPI framework", "Dashboards", "Operational clarity"],
    },
  ];

  const featured = studies.find((s) => s.featured) || studies[0];
  const rest = studies.filter((s) => s.slug !== featured.slug);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 text-white">
      {/* ✅ Dark brand background */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />

      {/* ✅ Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:72px_72px]"
        aria-hidden="true"
      />

      {/* ✅ Glows */}
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
          <span className="text-white font-semibold">Case Studies</span>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          {/* ✅ Solid pill (no blur / no glass) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
              Results
            </p>
          </div>

          <h1 className="mt-6 text-h2 text-white">Case studies</h1>

          <p className="mt-4 text-bodylg text-white/75 leading-relaxed">
            Real examples of how Collinalitics helps organisations gain clarity, automate reporting,
            and make confident, insight-led decisions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Chip>Reporting automation</Chip>
            <Chip>KPI frameworks</Chip>
            <Chip>Dashboards leaders trust</Chip>
            <Chip>UK-based delivery</Chip>
          </div>
        </header>

        {/* Featured */}
        {featured && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-7 sm:p-9 shadow-2xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-collin-teal/25 bg-collin-teal/10 px-3 py-1 text-xs font-semibold text-collin-teal">
                    Featured
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85">
                    {featured.sector}
                  </span>
                </div>

                <h2 className="mt-4 text-h3 text-white">{featured.title}</h2>

                <p className="mt-3 text-body text-white/75 leading-relaxed">
                  Outcome:{" "}
                  <span className="font-semibold text-white">{featured.outcome}</span>
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.tags?.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/case-studies/${featured.slug}`}
                    className="cta-primary cta-full inline-flex items-center justify-center gap-2"
                    aria-label={`Read case study: ${featured.title}`}
                  >
                    Read case study
                    <ArrowIcon />
                  </Link>

                  <Link href="/services" className="cta-secondary cta-full">
                    View services
                  </Link>
                </div>
              </div>

              {/* Preview */}
              <Link
                href={`/case-studies/${featured.slug}`}
                className="group relative block w-full lg:w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                aria-label={`Open featured case study: ${featured.title}`}
              >
                <div
                  className="h-56 sm:h-64 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${featured.image})` }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-12">
          {rest.map((s) => (
            <CaseStudyCard
              key={s.slug}
              title={s.title}
              sector={s.sector}
              outcome={s.outcome}
              href={`/case-studies/${s.slug}`}
              image={s.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- UI helpers ---------- */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/85">
      {children}
    </span>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-white/75">
      {children}
    </span>
  );
}

function ArrowIcon() {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}