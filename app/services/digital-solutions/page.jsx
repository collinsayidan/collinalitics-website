import Link from "next/link";

export default function Page() {
  const capabilities = [
    {
      title: "Web apps & internal tools",
      desc: "Simple, fast interfaces that help teams execute work reliably — from portals and trackers to dashboards and admin tools.",
      icon: <WindowIcon />,
    },
    {
      title: "Workflow automation",
      desc: "Reduce repetitive tasks with automated triggers, alerts, routing, and scheduled reporting — designed for maintainability.",
      icon: <BoltIcon />,
    },
    {
      title: "System integrations",
      desc: "Connect platforms and data sources cleanly (APIs, exports, event-driven flows) so information moves without manual effort.",
      icon: <PlugIcon />,
    },
    {
      title: "Secure delivery & handover",
      desc: "Role-based access, auditability, documentation, and clean ownership — so what we build stays usable long-term.",
      icon: <ShieldIcon />,
    },
  ];

  const useCases = [
    { title: "Ops intake portal", desc: "Replace email chaos with structured intake, routing, and visibility." },
    { title: "Automated reporting packs", desc: "Generate and distribute KPI reports on a reliable cadence." },
    { title: "Client / stakeholder dashboards", desc: "Share controlled views with the right access boundaries." },
    { title: "System-to-system sync", desc: "Keep tools aligned via API integrations and scheduled jobs." },
  ];

  const outcomes = [
    "Fewer manual steps and less operational friction",
    "Cleaner, auditable processes with clear ownership",
    "Better visibility for teams and leadership",
    "Reduced risk from spreadsheet-driven workflows",
  ];

  const deliverables = [
    "Process mapping + pain point analysis",
    "Solution design (UX, data flow, permissions)",
    "Build + integration (API, data, automation)",
    "Testing + QA + rollout plan",
    "Documentation + handover + support options",
  ];

  const stack = [
    "Next.js (web apps)",
    "APIs + integrations",
    "SQL + reporting layer",
    "Role-based access control",
    "Scheduling / automation",
    "Cloud deployment (as required)",
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
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-collin-slate mb-10 flex flex-wrap items-center gap-2"
        >
          <Link href="/" className="hover:text-collin-navy transition font-medium">
            Home
          </Link>
          <span className="text-collin-slate/60">/</span>
          <Link href="/services" className="hover:text-collin-navy transition font-medium">
            Services
          </Link>
          <span className="text-collin-slate/60">/</span>
          <span className="text-collin-navy font-semibold">Digital Solutions</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Service</p>

          <h1 className="mt-3 text-h2 text-collin-navy font-semibold">Digital Solutions</h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            We build practical digital tools and workflows that reduce friction, improve visibility,
            and make day-to-day operations more reliable — without over-engineering.
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-collin-teal/40" aria-hidden="true" />

          {/* Quick chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>Internal tools</Chip>
            <Chip>Automation</Chip>
            <Chip>Integrations</Chip>
            <Chip>Secure delivery</Chip>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-7 space-y-8">
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">What we build</p>

              <div className="mt-6 grid gap-5">
                {capabilities.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <span
                      className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-collin-teal/10 text-collin-teal"
                      aria-hidden="true"
                    >
                      {c.icon}
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
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Common use cases</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {useCases.map((u) => (
                  <div key={u.title} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <p className="text-sm font-semibold text-collin-navy">{u.title}</p>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-gray-500 leading-relaxed">
                If you’re currently depending on spreadsheets + manual handoffs, this is usually where the biggest ROI sits.
              </p>
            </div>

            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">How we approach delivery</p>

              <ol className="mt-6 space-y-4">
                {[
                  { t: "Discovery", d: "Understand the workflow, constraints, stakeholders, and where friction is introduced." },
                  { t: "Design", d: "Define the simplest viable solution, UX flow, permissions, and success criteria." },
                  { t: "Build", d: "Implement in small increments with testing and clear rollback options." },
                  { t: "Rollout", d: "Document, train, and ensure adoption with practical handover and support." },
                ].map((s, i) => (
                  <li key={s.t} className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-collin-teal/10 text-xs font-semibold text-collin-teal">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-collin-navy">{s.t}</p>
                      <p className="mt-1 text-sm text-gray-700 leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
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
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-teal/10 text-collin-teal"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Typical stack</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-collin-navy"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a
                  href="/#contact"
                  className="cta-primary w-full inline-flex items-center justify-center"
                >
                  Discuss a digital solution
                  <span className="ml-2" aria-hidden="true">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </a>

                <Link
                  href="/services"
                  className="mt-3 cta-secondary w-full inline-flex items-center justify-center"
                >
                  View all services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-collin-teal/15 bg-collin-teal/5 p-7 sm:p-9">
              <p className="text-sm font-semibold text-collin-navy">Practical by default</p>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                We prioritise clarity, adoption, and maintainability. If a workflow can be improved with a simpler
                solution, we’ll recommend it — and still deliver measurable impact.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI ---------- */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-collin-navy">
      {children}
    </span>
  );
}

/* ---------- Icons ---------- */

function ArrowRightIcon({ className = "" }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3h18v14H3z" />
      <path d="M3 10h18" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v6m6-6v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h10v4a5 5 0 01-10 0V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}