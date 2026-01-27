import CaseStudyCard from "@/components/CaseStudyCard";

export default function CaseStudiesPage() {
  const studies = [
    {
      title: "Public Sector Reporting Transformation",
      sector: "Public Sector",
      outcome: "Reduced reporting time from days to minutes",
      slug: "public-sector-reporting",
      image: "/images/case-studies/public-sector.jpg",
    },
    {
      title: "Operational KPI Dashboard",
      sector: "Private Sector",
      outcome: "Improved visibility across operations",
      slug: "operations-kpi-dashboard",
      image: "/images/case-studies/kpi-dashboard.jpg",
    },
  ];

  return (
    <section className="py-28 container-wrapper">

      {/* Breadcrumb */}
      <nav className="text-sm text-collin-slate mb-10 flex items-center gap-2">
        <a href="/" className="hover:text-collin-navy transition">
          Home
        </a>
        <span>/</span>
        <span className="text-collin-navy font-medium">
          Case Studies
        </span>
      </nav>

      <h1 className="text-4xl font-bold text-collin-navy text-center">
        Case Studies
      </h1>

      <p className="text-collin-slate text-center mt-4 max-w-2xl mx-auto">
        Real examples of how Collinalitics helps organisations gain clarity,
        automate reporting, and make confident decisions.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mt-20">
        {studies.map((s) => (
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
    </section>
  );
}
