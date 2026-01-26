import CaseStudyCard from "@/components/case-studies/CaseStudyCard";

export default function CaseStudiesPage() {
  const studies = [
    {
      title: "Public Sector Reporting Transformation",
      sector: "Public Sector",
      outcome: "Reduced reporting time from days to minutes",
      slug: "public-sector-reporting",
    },
    {
      title: "Operational KPI Dashboard",
      sector: "Private Sector",
      outcome: "Improved visibility across operations",
      slug: "operations-kpi-dashboard",
    },
  ];

  return (
    <section className="py-28 container-wrapper">
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
          />
        ))}
      </div>
    </section>
  );
}
