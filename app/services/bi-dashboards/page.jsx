export default function BIDashboards() {
  const bullets = [
    "Executive‑level KPI dashboards",
    "Team and operational reporting",
    "Interactive drill‑downs and segmentation",
    "Performance tracking and trend analysis",
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container-wrapper max-w-3xl">

        {/* Header */}
        <header>
          <h1 className="text-h2 text-collin-navy font-semibold">
            BI Dashboards
          </h1>

          <p className="text-bodylg text-collin-slate mt-4 leading-relaxed max-w-2xl">
            We design clear, decision‑ready dashboards that give leaders and teams
            the visibility they need — without noise, clutter, or unnecessary complexity.
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
