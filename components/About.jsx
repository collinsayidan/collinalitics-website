import React from "react";


export default function About() {
  return (
    <section
      id="about"
      className="section bg-white py-32"
      data-aos="fade-up"
      aria-labelledby="about-heading"
    >
      <div className="container-wrapper">

        {/* Header */}
        <header className="max-w-4xl mb-20">
          <h2
            id="about-heading"
            className="text-h2 text-collin-navy flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-7 w-7 text-collin-teal"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            About Collinalitics
          </h2>

          <p className="text-bodylg text-collin-slate mt-4 max-w-2xl leading-relaxed">
            A UK‑based analytics engineering and consulting firm helping
            organisations turn complex data into clear, decision‑ready insight —
            faster, with confidence, and at scale.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-16 items-start">

          {/* Main Content */}
          <article
            className="md:col-span-2 relative"
            role="region"
            aria-label="About Collinalitics core capabilities"
          >
            <div
              className="absolute left-0 top-0 h-full w-1.5 bg-collin-lightTeal/50 rounded-full hidden md:block"
              aria-hidden="true"
            />

            <div className="pl-6 md:pl-10 space-y-8">

              <p className="text-body text-gray-700 leading-relaxed">
                Collinalitics Ltd is a UK‑registered analytics and technology
                consultancy specialising in analytics engineering, business
                intelligence, and systems analysis. We help organisations
                eliminate manual, fragmented reporting and replace it with
                automated, reliable insight — so leaders can make confident,
                data‑driven decisions without hesitation.
              </p>

              <p className="text-body text-gray-700 leading-relaxed">
                Our work sits at the intersection of data, systems, and
                operational clarity. We engineer analytics solutions that are
                reproducible, scalable, and built for long‑term value — not
                short‑term fixes or one‑off dashboards.
              </p>

              <p className="text-body text-gray-700 leading-relaxed">
                We partner with growing businesses, charities, and public‑sector
                teams to modernise data foundations, streamline reporting
                workflows, and bring transparency to performance and planning.
                Every engagement is shaped around practical outcomes, measurable
                impact, and a commitment to clarity.
              </p>

              {/* Value Section */}
              <div className="pt-10">
                <h3 className="text-bodysm font-semibold tracking-wider text-collin-slate uppercase mb-6">
                  What you can expect
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <ValuePoint text="Analytics engineering built for scale, reuse, and reliability" />
                  <ValuePoint text="Decision‑ready dashboards trusted by leadership teams" />
                  <ValuePoint text="Modern data foundations and workflow automation" />
                  <ValuePoint text="Strategic systems thinking — not just reporting outputs" />
                </div>
              </div>

            </div>
          </article>

          {/* Highlight Card */}
          <aside
            className="p-10 bg-white/90 backdrop-blur-md border border-collin-lightTeal/40 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            data-aos="fade-left"
            role="complementary"
            aria-label="Collinalitics profile summary"
          >
            <span className="inline-flex items-center bg-collin-teal text-white px-3 py-1 text-xs rounded-full font-medium">
              UK Consulting & Analytics
            </span>

            <p className="mt-6 text-body text-gray-700 leading-relaxed">
              We combine analytics engineering, systems thinking, and modern
              digital practices to help organisations operate with clarity.
              Our standards prioritise precision, maintainability, and
              long‑term value.
            </p>

            <p className="mt-4 text-body text-gray-700 leading-relaxed">
              From early‑stage data maturity to established reporting
              environments, we support organisations at every stage of their
              analytics journey.
            </p>

            <div className="mt-8 pt-5 border-t border-gray-200">
              <p className="text-caption text-gray-500 leading-relaxed">
                Founder & Lead Analytics Engineer: <strong>Collins Ayidan</strong>
                <br />
                Edinburgh, United Kingdom
              </p>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

function ValuePoint({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="h-5 w-5 text-collin-teal/90 mt-0.5" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <p className="text-body text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
