import { notFound } from "next/navigation";

const caseStudies = {
  "public-sector-reporting": {
    title: "Public Sector Reporting Transformation",
    sector: "Public Sector",
    outcome: "Reduced reporting time from days to minutes",
    image: "/images/case-studies/project_01.jpg",
    body: `
      Collinalitics partnered with a government agency to overhaul their legacy reporting workflows.
      By implementing automated Power BI dashboards and streamlining data pipelines, we reduced
      reporting time from 3 days to under 15 minutes — enabling faster decisions and improved transparency.
    `,
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
  },
};

export default function CaseStudyDetail({ params }) {
  const study = caseStudies[params.slug];

  if (!study) return notFound();

  return (
    <section className="py-28 container-wrapper">

      {/* Breadcrumb */}
      <nav className="text-sm text-collin-slate mb-10 flex items-center gap-2">
        <a href="/" className="hover:text-collin-navy transition">
          Home
        </a>
        <span>/</span>
        <a href="/case-studies" className="hover:text-collin-navy transition">
          Case Studies
        </a>
        <span>/</span>
        <span className="text-collin-navy font-medium">
          {study.title}
        </span>
      </nav>

      {/* Hero image */}
      {study.image && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Sector chip */}
      <span className="inline-block px-4 py-1 rounded-full text-caption font-medium bg-collin-teal/10 text-collin-teal">
        {study.sector}
      </span>

      {/* Title */}
      <h1 className="mt-4 text-4xl font-bold text-collin-navy leading-tight">
        {study.title}
      </h1>

      {/* Outcome */}
      <p className="mt-3 text-lg text-collin-slate font-medium">
        {study.outcome}
      </p>

      {/* Body */}
      <div className="mt-8 text-body text-gray-700 leading-relaxed whitespace-pre-line">
        {study.body}
      </div>
    </section>
  );
}
