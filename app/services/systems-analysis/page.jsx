import Link from "next/link";

export default function Page() {
  const capabilities = [
    {
      title: "Process mapping & workflow clarity",
      desc: "We document how work actually happens (not how it’s supposed to), identify bottlenecks, and design a cleaner future state.",
      icon: <MapIcon />,
    },
    {
      title: "Requirements & specification",
      desc: "Clear user stories, acceptance criteria, and scope boundaries — so delivery stays aligned and decision-making is simpler.",
      icon: <ClipboardIcon />,
    },
    {
      title: "System + data flow analysis",
      desc: "We map systems, handoffs, integrations, and data definitions to reduce fragmentation and eliminate hidden dependencies.",
      icon: <FlowIcon />,
    },
    {
      title: "Operating model & governance",
      desc: "Define ownership, KPI stewardship, change control, and documentation practices to keep improvements sustainable.",
      icon: <ShieldIcon />,
    },
  ];

  const useCases = [
    { title: "Reporting is inconsistent", desc: "Different teams define metrics differently and leadership doesn’t trust the numbers." },
    { title: "Too many manual handoffs", desc: "Processes rely on spreadsheets, email, and memory — creating delays and errors." },
    { title: "Systems don’t join up", desc: "Data is spread across tools with unclear ownership and unreliable refresh cycles." },
    { title: "You need a clean spec", desc: "Before building dashboards or tooling, you need clarity on scope, logic, and success criteria." },
  ];

  const outcomes = [
    "Clear process visibility and fewer failure points",
    "Shared definitions, ownership, and decision-ready KPIs",
    "Reduced operational friction and manual effort",
    "Stronger alignment between stakeholders, tech, and delivery",
  ];

  const deliverables = [
    "Current-state mapping (process + systems + data)",
    "Pain points + root cause analysis",
    "Future-state design + recommendations",
    "Requirements pack (user stories + acceptance criteria)",
    "Data definitions + KPI ownership framework",
    "Implementation roadmap (quick wins + longer-term plan)",
  ];

  const methods = [
    "Stakeholder interviews",
    "Process mapping (as-is / to-be)",
    "Service & workflow design",
    "Data definition workshops",
    "Risk + dependency mapping",
    "Pragmatic roadmap planning",
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
          <span className="text-collin-navy font-semibold">Systems Analysis</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Service</p>

          <h1 className="mt-3 text-h2 text-collin-navy font-semibold">Systems Analysis</h1>

          <p className="mt-4 text-bodylg text-collin-slate leading-relaxed max-w-2xl">
            We bring structure to complex operations — clarifying workflows, systems, and data so your reporting,
            automation, and delivery decisions become easier and more reliable.
          </p>

          <div className="mt-6 h-1 w-16 rounded-full bg-collin-teal/40" aria-hidden="true" />

          {/* Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>Process mapping</Chip>
            <Chip>Requirements</Chip>
            <Chip>Data definitions</Chip>
            <Chip>Roadmaps</Chip>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-8">
            {/* What we do */}
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">What we do</p>

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

            {/* When it helps */}
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">When this helps most</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {useCases.map((u) => (
                  <div key={u.title} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <p className="text-sm font-semibold text-collin-navy">{u.title}</p>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs text-gray-500 leading-relaxed">
                This is often the highest-impact starting point before dashboards, automation, or AI — because it removes ambiguity.
              </p>
            </div>

            {/* Approach */}
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">How we work</p>

              <ol className="mt-6 space-y-4">
                {[
                  {
                    t: "Align",
                    d: "Clarify goals, stakeholders, constraints, and what success looks like (outcomes, not outputs).",
                  },
                  {
                    t: "Map",
                    d: "Capture current process, systems, handoffs, and data definitions. Identify bottlenecks and risks.",
                  },
                  {
                    t: "Design",
                    d: "Define future state: ownership, KPI definitions, workflow improvements, and dependency reductions.",
                  },
                  {
                    t: "Specify",
                    d: "Write a clean requirements pack and roadmap so build work is predictable, testable, and aligned.",
                  },
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

          {/* Right column */}
          <aside className="lg:col-span-5 space-y-8">
            {/* Outcomes */}
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

            {/* Deliverables */}
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

              <div className="mt-8 pt-6 border-t border-gray-200">
                <a href="/#contact" className="cta-primary w-full inline-flex items-center justify-center">
                  Discuss your workflow
                  <span className="ml-2" aria-hidden="true">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </a>
                <Link href="/services" className="mt-3 cta-secondary w-full inline-flex items-center justify-center">
                  View all services
                </Link>
              </div>
            </div>

            {/* Methods */}
            <div className="card card-pad bg-white/95">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">Methods we use</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {methods.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-collin-navy"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Premium note */}
            <div className="rounded-3xl border border-collin-teal/15 bg-collin-teal/5 p-7 sm:p-9">
              <p className="text-sm font-semibold text-collin-navy">Clarity first</p>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Systems analysis removes ambiguity — so dashboards, automation, and AI are built on stable definitions,
                clean ownership, and processes people actually follow.
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

function MapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6v15" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5a3 3 0 006 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6" />
    </svg>
  );
}

function FlowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h4v4H6zM14 14h4v4h-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 8h4a2 2 0 012 2v4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10v4a2 2 0 002 2h4" />
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