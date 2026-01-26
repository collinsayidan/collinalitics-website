export default function LLMSolutions() {
  const bullets = [
    "AI‑powered insight generation",
    "Natural‑language querying for dashboards",
    "Custom LLM workflows for operations",
    "Secure, organisation‑ready AI integrations",
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container-wrapper max-w-3xl">

        {/* Header */}
        <header>
          <h1 className="text-h2 text-collin-navy font-semibold">
            LLM & AI Solutions
          </h1>

          <p className="text-bodylg text-collin-slate mt-4 leading-relaxed max-w-2xl">
            We design practical, secure AI solutions that help teams work faster,
            reduce manual effort, and unlock insight using natural‑language
            interaction — without unnecessary complexity or risk.
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
