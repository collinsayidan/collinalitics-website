export default function AnalyticsEngineering() {
  const bullets = [
    "Data modelling & transformation",
    "Pipeline optimisation",
    "Source system integration",
    "Automated reporting foundations",
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container-wrapper max-w-3xl">

        {/* Header */}
        <header>
          <h1 className="text-h2 text-collin-navy font-semibold">
            Analytics Engineering
          </h1>

          <p className="text-bodylg text-collin-slate mt-4 leading-relaxed max-w-2xl">
            We build clean, scalable data foundations that power dashboards,
            reporting, and confident decision‑making.
          </p>

          <div className="mt-6 h-px w-24 bg-collin-lightTeal/40" />
        </header>

        {/* Bullet List */}
        <ul className="mt-10 space-y-5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="text-collin-teal mt-1 text-lg">✔</span>
              <span className="text-body text-gray-700 leading-relaxed">
                {b}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
