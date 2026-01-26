"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#top", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#how", label: "How we work" },
    { href: "#use-case", label: "Demo" },
    { href: "#why", label: "Why us" },
    { href: "/insights", label: "Insights" },
    { href: "#contact", label: "Contact" },
  ];

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/YOUR-LINK",
      });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200">
      <div className="container-wrapper">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-2"
            aria-label="Collinalitics home"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-collin-teal text-white font-bold">
              C
            </span>
            <span className="text-lg font-semibold text-collin-navy">
              Collinalitics Ltd
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-collin-slate hover:text-collin-teal transition"
              >
                {l.label}
              </a>
            ))}

            {/* Calendly Button (Desktop) */}
            <button
              onClick={openCalendly}
              className="cta-primary text-sm inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm9-6l-2 2-1-1"
                />
              </svg>
              Book a Free Discovery Call
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-collin-slate hover:bg-gray-100"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-collin-slate hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}

              {/* Calendly Button (Mobile) */}
              <button
                onClick={() => {
                  openCalendly();
                  setOpen(false);
                }}
                className="cta-primary text-sm inline-flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-4 w-4"
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
          </div>
        )}
      </div>
    </header>
  );
}
