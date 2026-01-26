export default function ServicesPage() {
  const services = [
    { name: "Analytics Engineering", slug: "analytics-engineering" },
    { name: "BI Dashboards", slug: "bi-dashboards" },
    { name: "Systems Analysis", slug: "systems-analysis" },
    { name: "Digital Solutions", slug: "digital-solutions" },
  ];

  return (
    <section className="py-28 container-wrapper">
      <h1 className="text-4xl font-bold text-collin-navy text-center">
        Our Services
      </h1>
      <p className="text-collin-slate text-center mt-4 max-w-2xl mx-auto">
        Practical, modern analytics and systems solutions designed to bring clarity and confidence.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mt-20">
        {services.map((s) => (
          <a
            key={s.slug}
            href={`/services/${s.slug}`}
            className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-collin-teal/40 transition-all"
          >
            <h3 className="text-xl font-semibold text-collin-navy">{s.name}</h3>
            <p className="text-collin-teal mt-4">Learn more →</p>
          </a>
        ))}
      </div>
    </section>
  );
}
