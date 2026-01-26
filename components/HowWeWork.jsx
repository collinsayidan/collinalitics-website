
"use client";
import React, { useEffect, useRef, useState } from "react";

/** Small, dependency-free hook:
 *  Flags true once the element has entered the viewport (then disconnects).
 */
function useInViewOnce(options = { threshold: 0.25, rootMargin: "0px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, options);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [options]);

  return { ref, visible };
}

export default function HowWeWork() {
  const steps = [
    {
      title: "Discovery",
      desc:
        "We take time to understand your organisation, your goals, and the challenges behind your data and systems.",
      accent: "teal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      ),
    },
    {
      title: "Design",
      desc:
        "We define KPIs, reporting structures, and the technical approach needed to deliver meaningful insight.",
      accent: "lightTeal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      title: "Build",
      desc:
        "We develop dashboards, data models, and digital tools that are practical, reliable, and easy to use.",
      accent: "navy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 7l-4 4 6 6 4-4-6-6z" />
          <path d="M9 13l-3 3 6 6 3-3" />
        </svg>
      ),
    },
    {
      title: "Support",
      desc:
        "We provide ongoing improvements, insight, and technical support to keep your reporting effective.",
      accent: "teal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 10a6 6 0 1 0-12 0v4a6 6 0 1 0 12 0v-4z" />
          <path d="M12 18v2" />
        </svg>
      ),
    },
  ];

  const accentMap = {
    teal: {
      text: "text-collin-teal",
      bg: "bg-collin-teal/15",
      border: "hover:border-collin-teal/40",
      glow: "group-hover:shadow-[0_0_0_6px_rgba(0,151,167,0.08)]",
    },
    lightTeal: {
      text: "text-collin-lightTeal",
      bg: "bg-collin-lightTeal/25",
      border: "hover:border-collin-lightTeal/40",
      glow: "group-hover:shadow-[0_0_0_6px_rgba(128,222,234,0.10)]",
    },
    navy: {
      text: "text-collin-navy",
      bg: "bg-collin-navy/15",
      border: "hover:border-collin-navy/40",
      glow: "group-hover:shadow-[0_0_0_6px_rgba(26,62,95,0.10)]",
    },
  };

  // Per-card animation delay
  const STAGGER = 0.12;

  return (
    <section id="how" className="relative overflow-hidden py-24 sm:py-28 md:py-32 text-white">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />
      {/* Subtle glow accents */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-60 w-60 md:h-72 md:w-72 rounded-full bg-collin-teal/20 blur-[90px] md:blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-60 w-60 md:h-72 md:w-72 rounded-full bg-collin-lightTeal/20 blur-[90px] md:blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-wrapper relative z-10">
        {/* Header (centered) */}
        <header className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 md:mb-20">
          <div className="w-14 h-1 sm:w-16 bg-collin-teal mx-auto mb-5 sm:mb-6 rounded-full" />
          <h2 className="text-h2 text-white">How We Work</h2>
          <p className="text-bodylg text-white/85 mt-3 sm:mt-4 leading-relaxed">
            A clear, collaborative approach designed to give UK organisations confidence at every stage.
          </p>
          <p className="text-caption text-white/70 mt-2 sm:mt-3">
            Transparent, structured, and aligned with best practice.
          </p>
        </header>

        {/* Process Flow */}
        <div className="relative mt-6 sm:mt-8">
          {/* Connector lines */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full"
            aria-hidden="true"
          />
          <div
            className="lg:hidden absolute left-1/2 top-0 h-full w-1 bg-white/10 -translate-x-1/2 rounded-full"
            aria-hidden="true"
          />

          <div className="grid gap-8 sm:gap-10 lg:gap-14 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((s, i) => {
              const accent = accentMap[s.accent];
              const initialOffset =
                i % 3 === 0
                  ? "translate-y-5 -rotate-[0.25deg]"
                  : i % 3 === 1
                  ? "-translate-y-5 rotate-[0.25deg]"
                  : "translate-y-6";

              const { ref, visible } = useInViewOnce({ threshold: 0.25 });

              return (
                <article
                  key={s.title}
                  ref={ref}
                  className={[
                    "group card card-pad backdrop-blur-sm",
                    "bg-white/95 border border-white/10 rounded-2xl shadow-lg",
                    // Hover: lift + shadow + border accent + soft glow
                    "transition-transform duration-300 ease-out",
                    "hover:-translate-y-1.5 hover:shadow-2xl",
                    accent.border,
                    accent.glow,
                    // Pre-inview start state
                    !visible && ["opacity-0", initialOffset].join(" "),
                    // In-view squeeze-in animation
                    visible && "animate-hww-squeeze-in",
                  ].join(" ")}
                  style={{ animationDelay: `${i * STAGGER}s` }}
                >
                  {/* Icon ring (slightly smaller on mobile) */}
                  <div
                    className={[
                      "h-12 w-12 sm:h-14 sm:w-14 rounded-full",
                      accent.bg,
                      "flex items-center justify-center mb-6",
                      "transition-transform duration-300 group-hover:scale-110",
                    ].join(" ")}
                  >
                    <span className={accent.text}>{s.icon}</span>
                  </div>

                  {/* Step chip */}
                  <span className="inline-flex px-3 py-1 rounded-full bg-white/70 text-caption font-medium text-collin-navy">
                    Step {i + 1}
                  </span>

                  {/* Title & copy */}
                  <h3 className="mt-3 sm:mt-4 text-h4 text-collin-navy leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-body text-gray-700 leading-relaxed">
                    {s.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* CTA (full-width on mobile) */}
        <div className="text-center mt-16 sm:mt-20">
          <a href="#contact" className="ctaConsultation cta-full" aria-label="Get started with Collinalitics">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
