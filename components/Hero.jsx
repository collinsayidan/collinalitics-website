"use client";
import React from "react";

export default function Hero() {

  const openCalendly = () => {
    if (typeof window === "undefined") return;

    if (!window.Calendly && !document.getElementById("calendly-script")) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        window.Calendly?.initPopupWidget({
          url: "https://calendly.com/YOUR-LINK",
        });
      };
      document.body.appendChild(script);
    } else {
      window.Calendly?.initPopupWidget({
        url: "https://calendly.com/YOUR-LINK",
      });
    }
  };

  // 3D Tilt Effect
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * 10;
    const rotateY = ((x - rect.width / 2) / rect.width) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      id="top"
      role="banner"
      className="hero-bg text-white h-screen flex items-center relative overflow-hidden"
      onMouseMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        e.currentTarget.style.backgroundPosition = `${x}% ${y}%`;
      }}
    >

      {/* ⭐ Animated Gradient Layer */}
      <div
        className="
          absolute inset-0 
          bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,200,0.15),transparent_60%), 
             radial-gradient(circle_at_80%_80%,rgba(0,150,255,0.15),transparent_60%)]
          animate-gradientMove
          pointer-events-none
        "
      />

      {/* Premium Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-collin-navy/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wrapper relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Column */}
          <div data-aos="fade-up" data-aos-duration="800">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Turning Complex Data Into
              <br />
              <span className="text-collin-lightTeal block mt-1">
                Clear, Confident Business Decisions
              </span>
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-gray-100 max-w-xl leading-relaxed">
              Analytics engineering, business intelligence, and digital solutions
              for UK organisations that need clarity, operational efficiency,
              and insight leaders can act on — without unnecessary complexity.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={openCalendly}
                aria-label="Book a free strategy call"
                className="cta-primary inline-flex items-center gap-2 shadow-lg shadow-black/20 hover:shadow-xl transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm9-6l-2 2-1-1"
                  />
                </svg>
                Free Strategy Call
              </button>

              <a
                href="/services"
                className="cta-secondary inline-flex items-center gap-2 hover:bg-white/10 transition-all"
                aria-label="View Services"
              >
                View Services
              </a>
            </div>
          </div>

          {/* Right Column — Glassmorphism + 3D Tilt */}
          <div data-aos="fade-left" data-aos-delay="150" data-aos-duration="800">
            <div
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="
                card p-8 
                bg-white/10 
                backdrop-blur-xl 
                text-gray-900 
                rounded-2xl 
                shadow-2xl 
                border border-white/20 
                ring-1 ring-white/10
                transition-transform duration-200 ease-out
                hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]
                will-change-transform
              "
            >
              <h2 className="text-xl font-semibold text-collin-navy">
                What We Deliver
              </h2>

              <ul className="mt-6 space-y-4 text-sm text-gray-800 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-collin-teal text-lg">•</span>
                  Decision-ready dashboards trusted by leadership teams
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-collin-teal text-lg">•</span>
                  KPI frameworks aligned to real business objectives
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-collin-teal text-lg">•</span>
                  Systems and process analysis to improve efficiency
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-collin-teal text-lg">•</span>
                  Scalable reporting automation and digital tools
                </li>
              </ul>

              <div className="mt-7 pt-4 border-t border-white/20">
                <p className="text-xs text-gray-700 leading-relaxed">
                  Supporting SMEs, charities, and public-sector teams across the UK.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
