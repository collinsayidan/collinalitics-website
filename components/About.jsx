"use client";

import React, { useCallback } from "react";

export default function About() {
  const calendlyUrl = "https://calendly.com/collinsayidan-collinalitics/30min";

  const openCalendly = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () => window.Calendly?.initPopupWidget({ url: calendlyUrl });

    // Load Calendly CSS once (styling)
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // If Calendly already available, open immediately
    if (window.Calendly) return openWidget();

    // Load Calendly script once
    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = openWidget;
      document.body.appendChild(script);
    } else {
      setTimeout(openWidget, 250);
    }
  }, [calendlyUrl]);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
      aria-labelledby="about-heading"
    >
      {/* Background: refined grid + layered glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.30] [background-image:linear-gradient(to_right,rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.055)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute -top-28 right-[-7rem] h-80 w-80 rounded-full bg-collin-lightTeal/30 blur-3xl" />
        <div className="absolute -bottom-28 left-[-7rem] h-80 w-80 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative">
        {/* Header */}
        <header className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-collin-lightTeal/50 bg-white/70 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              About Collinalitics
            </p>
          </div>

          <h2
            id="about-heading"
            className="mt-6 text-h2 text-collin-navy tracking-tight"
          >
            We turn complex data into{" "}
            <span className="bg-gradient-to-r from-collin-teal to-collin-lightTeal bg-clip-text text-transparent">
              decision-ready
            </span>{" "}
            insight.
          </h2>

          <p className="mt-5 max-w-3xl text-bodylg leading-relaxed text-collin-slate">
            Collinalitics is a UK-based analytics engineering and consulting firm helping teams
            replace fragmented reporting with automated, reliable insight — faster, with confidence,
            and at scale.
          </p>

          {/* CTA row (confident, premium) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={openCalendly}
              className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
              aria-label="Book a free discovery call via Calendly"
            >
              Book a free discovery call
              <ArrowIcon />
            </button>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
              aria-label="Explore services"
            >
              Explore services
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-collin-lightTeal/60 bg-white px-6 py-3 text-sm font-semibold text-collin-navy hover:bg-collin-lightTeal/10 transition"
              aria-label="Go to contact section"
            >
              Contact
            </a>
          </div>
        </header>

        {/* Stats row (more confident) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Built for" value="Reliability" sub="Versioned pipelines & definitions" />
          <Stat label="Designed for" value="Decisioning" sub="Aligned metrics & ownership" />
          <Stat label="Optimised for" value="Speed" sub="Less manual reporting effort" />
          <Stat label="Delivered as" value="Partnership" sub="Clear comms, measurable outcomes" />
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Main narrative */}
          <article className="lg:col-span-7">
            <div className="rounded-3xl border border-collin-lightTeal/40 bg-white/80 p-7 backdrop-blur shadow-[0_18px_60px_rgba(2,12,27,0.06)] sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold tracking-wider text-collin-slate uppercase">
                  What we do
                </h3>

                <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-collin-navy">
                  UK delivery • Clear scope • Practical outcomes
                </span>
              </div>

              <div className="mt-6 space-y-5">
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  Collinalitics Ltd is a UK-registered analytics and technology consultancy
                  specialising in analytics engineering, business intelligence, and systems analysis.
                  We design modern data foundations and deliver reporting that leadership teams can trust.
                </p>

                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  Our work sits at the intersection of data, systems, and operational clarity.
                  Everything we build is reproducible, scalable, and engineered for long-term value —
                  not one-off dashboards or short-term fixes.
                </p>
              </div>

              {/* Capabilities (polished) */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Capability
                  title="Analytics engineering"
                  desc="Clean models, governed metrics, maintainable pipelines."
                  icon={<IconLayers />}
                />
                <Capability
                  title="BI leaders trust"
                  desc="Decision-focused dashboards with definitions and ownership."
                  icon={<IconChart />}
                />
                <Capability
                  title="Systems analysis"
                  desc="Requirements, process clarity, scalable operating models."
                  icon={<IconWorkflow />}
                />
                <Capability
                  title="Automation & delivery"
                  desc="Reduce manual reporting with robust repeatable workflows."
                  icon={<IconSpark />}
                />
              </div>

              {/* Expectations */}
              <div className="mt-10">
                <h3 className="text-sm font-semibold tracking-wider text-collin-slate uppercase">
                  What you can expect
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Bullet text="Analytics engineering built for scale, reuse, and reliability" />
                  <Bullet text="Decision-ready dashboards trusted by leadership teams" />
                  <Bullet text="Modern data foundations and workflow automation" />
                  <Bullet text="Strategic systems thinking — not just reporting outputs" />
                </div>

                {/* Strong CTA band */}
                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-collin-navy">
                        Ready to improve reporting and KPI clarity?
                      </p>
                      <p className="mt-1 text-sm text-collin-slate leading-relaxed">
                        Book a quick discovery call — we’ll confirm fit and recommend a practical first step.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={openCalendly}
                      className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
                      aria-label="Open Calendly booking"
                    >
                      Book on Calendly
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>

                  <p className="mt-3 text-[11px] text-gray-500">
                    30 minutes • No obligation • Clear next steps
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Aside / Trust card (more confident) */}
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-collin-lightTeal/40 bg-white/90 p-8 shadow-xl backdrop-blur transition-shadow hover:shadow-2xl">
              <div className="flex flex-wrap gap-2">
                <Tag solid>UK Consulting</Tag>
                <Tag>Analytics Engineering</Tag>
                <Tag>BI & Systems</Tag>
              </div>

              <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5">
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Operating standard
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  Precision in definitions. Reliability in delivery. Maintainability by design.
                  Everything is built to last — and be understood by the next person.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Nugget label="Focus" value="Clarity • Reliability • Scale" />
                <Nugget
                  label="Typical outcomes"
                  value="Faster reporting • Fewer manual steps • Shared metrics"
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-5">
                <p className="text-sm font-semibold text-collin-navy">Collins Ayidan</p>
                <p className="mt-1 text-xs text-gray-500">
                  Founder & Lead Analytics Engineer • Edinburgh, United Kingdom
                </p>

                <div className="mt-5 grid gap-3">
                  <MiniLine icon={<IconCheck />} text="Clear scope, crisp delivery plans" />
                  <MiniLine icon={<IconCheck />} text="Documentation + ownership built-in" />
                  <MiniLine icon={<IconCheck />} text="Practical outcomes, not jargon" />
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={openCalendly}
                    className="w-full inline-flex items-center justify-center rounded-xl border border-collin-teal/25 bg-collin-teal/10 px-5 py-3 text-sm font-semibold text-collin-teal hover:bg-collin-teal/15 transition"
                    aria-label="Book a discovery call from the founder card"
                  >
                    Book a discovery call
                    <ArrowIcon />
                  </button>
                  <p className="mt-2 text-[11px] text-gray-500 text-center">
                    Direct with the founder • Practical advice • Next steps
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small components ---------- */

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur shadow-[0_12px_40px_rgba(2,12,27,0.05)]">
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">{label}</p>
      <p className="mt-2 text-lg font-semibold text-collin-navy">{value}</p>
      <p className="mt-1 text-xs text-collin-slate">{sub}</p>
    </div>
  );
}

function Capability({ title, desc, icon }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-collin-lightTeal/70 hover:shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-collin-lightTeal/25 text-collin-teal">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold text-collin-navy">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-collin-slate">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Bullet({ text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <span
        className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-lightTeal/25 text-collin-teal"
        aria-hidden="true"
      >
        <IconCheck />
      </span>
      <p className="text-sm leading-relaxed text-gray-700">{text}</p>
    </div>
  );
}

function Tag({ children, solid }) {
  return (
    <span
      className={
        solid
          ? "inline-flex items-center rounded-full bg-collin-teal px-3 py-1 text-xs font-medium text-white"
          : "inline-flex items-center rounded-full border border-collin-lightTeal/60 bg-white px-3 py-1 text-xs font-medium text-collin-navy"
      }
    >
      {children}
    </span>
  );
}

function Nugget({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-collin-navy">{value}</p>
    </div>
  );
}

function MiniLine({ icon, text }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <span className="mt-0.5 text-collin-teal" aria-hidden="true">
        {icon}
      </span>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
}

/* ---------- Icons (no deps) ---------- */

function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 19v-6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19v-9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 19V8" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l10 5 10-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 16l10 5 10-5" />
    </svg>
  );
}

function IconWorkflow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17h10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 5v14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 5v12" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.5 6L20 10l-6.5 2L12 22l-1.5-10L4 10l6.5-2L12 2Z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-2 h-4 w-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
