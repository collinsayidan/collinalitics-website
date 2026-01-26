"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
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

  return (
    <footer className="hero-bg text-white border-t border-white/10">
      <div className="container-wrapper py-16">
        <div className="flex flex-col gap-12">

          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            {/* Left */}
            <div className="space-y-1">
              <p className="text-bodysm text-white/90 font-medium">
                © {new Date().getFullYear()} Collinalitics Ltd
              </p>
              <p className="text-bodysm text-white/80">
                Registered in England & Wales — Company Number: SC874504
              </p>
            </div>

            {/* Right */}
            <button
              onClick={openCalendly}
              className="
                inline-flex items-center gap-2 px-5 py-2 rounded-lg
                bg-white/10 text-white border border-white/20
                hover:bg-white/15 transition
                text-bodysm font-medium
              "
              aria-label="Book a free discovery call"
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
              Book a Free Discovery Call
            </button>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <p className="text-caption text-white/70 max-w-md leading-relaxed">
              Collinalitics is a founder‑led analytics and engineering consultancy
              focused on clarity, practical outcomes, and modern technical excellence.
            </p>

            <nav className="flex items-center gap-6 text-bodysm" aria-label="Legal">
              <Link
                href="/privacy-policy"
                className="text-white/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/cookies"
                className="text-white/80 hover:text-white transition-colors"
              >
                Cookies
              </Link>

              <a
                href="mailto:collinsayidan@collinalitics.co.uk"
                className="text-white/80 hover:text-white transition-colors"
              >
                Email Us
              </a>
            </nav>
          </div>

        </div>
      </div>
    </footer>
  );
}
