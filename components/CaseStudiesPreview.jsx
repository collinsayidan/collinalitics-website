import CaseStudyCard from "@/components/CaseStudyCard";

export default function CaseStudiesPreview() {
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
      <h2 className="text-3xl font-bold text-collin-navy text-center">
        Case Studies
      </h2>

      <p className="text-collin-slate text-center mt-4 max-w-2xl mx-auto">
        Real examples of how Collinalitics helps organisations gain clarity,
        automate reporting, and make confident decisions.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
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

      <div className="text-center mt-12">
        <a
          href="/case-studies"
          className="inline-block px-8 py-3 rounded-full bg-collin-teal text-white font-medium hover:bg-collin-teal-light transition"
        >
          View all case studies
        </a>
      </div>
    </section>
  );
}
