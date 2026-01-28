import Link from "next/link";

export default function Page() {
  const capabilities = [
    {
      title: "AI-powered insight generation",
      desc: "Convert reporting outputs into plain-English insights: key changes, drivers, and suggested next steps aligned to your KPIs.",
    },
    {
      title: "Natural-language querying for dashboards",
      desc: "Ask questions in natural language and get consistent answers backed by governed metrics — with guardrails to reduce hallucinations.",
    },
    {
      title: "Custom LLM workflows for operations",
      desc: "Automate repetitive work: triage, drafting, classification, routing, summarisation, and internal knowledge lookup — safely and auditable.",
    },
    {
      title: "Secure, organisation-ready AI integrations",
      desc: "Implement AI with privacy, access controls, and data boundaries — plus monitoring and clear governance.",
    },
  ];

  const outcomes = [
    "Faster insight without increasing reporting overhead",
    "Reduced manual effort across operational workflows",
    "More consistent KPI explanations and narratives",
    "Clear governance: what AI can access, what it can’t, and why",
  ];

  const deliverables = [
    "Use-case shortlist (impact × feasibility)",
    "Security & access design (scope, roles, restrictions)",
    "Prototype with evaluation criteria",
    "Production workflow with logging + monitoring",
    "Handover: documentation and operating model",
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-28">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/18 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/patterns/grid.svg')]" />
      </div>

      <div className="container-wrapper relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-collin-slate mb-10 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-collin-navy transition font-medium">
            Home
          </Link>
          <span className="text-collin-slate/60">/</span>
          <Link href="/services" className="hover:text-collin-navy transition font-medium">
            Services
          </Link>
          <span className="text-collin-slate/60">/</span>
          <span className="text-collin-navy font-semibold">LLM &amp; AI Solutions</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Service</p>

          <h1 className="mt-3 text-h2 text-collin-navy font-semibold">LLM &amp; AI Solutions</h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            Practical, secure AI solutions that reduce manual effort and unlock insight using natural-language interaction —
            without unnecessary complexity or risk.
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-collin-teal/40" aria-hidden="true" />
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">What we build</p>

              <div className="mt-6 grid gap-5">
                {capabilities.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-collin-teal/10 text-collin-teal" aria-hidden="true">
                      ✦
                    </span>
                    <div>
                      <p className="text-base font-semibold text-collin-navy">{c.title}</p>
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">How we keep it safe</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                {[
                  "Governed metrics: answers map to agreed definitions",
                  "Least-privilege access: AI sees only what it needs",
                  "Human-in-the-loop: sensitive actions require review",
                  "Auditability: logging, evaluation, and monitoring",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
                    <span className="text-sm leading-relaxed">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Outcomes</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-collin-teal" aria-hidden="true" />
                    <span className="text-sm leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Typical deliverables</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-teal/10 text-collin-teal" aria-hidden="true">
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a href="/#contact" className="cta-primary w-full inline-flex items-center justify-center">
                  Explore an AI use case
                </a>
                <Link href="/services" className="mt-3 cta-secondary w-full inline-flex items-center justify-center">
                  View all services
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}