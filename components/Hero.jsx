"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/collinsayidan-collinalitics/30min";

export default function Hero() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const rafBgRef = useRef(0);
  const rafTiltRef = useRef(0);
  const readyTimerRef = useRef(0);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  // Detect reduced-motion + pointer type
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const mqPointer = window.matchMedia?.("(pointer: fine)");

    const update = () => {
      setReduceMotion(!!mqReduce?.matches);
      setFinePointer(!!mqPointer?.matches);
    };

    update();
    mqReduce?.addEventListener?.("change", update);
    mqPointer?.addEventListener?.("change", update);

    return () => {
      mqReduce?.removeEventListener?.("change", update);
      mqPointer?.removeEventListener?.("change", update);
    };
  }, []);

  // Calendly loader (robust + fallback)
  const openCalendly = useCallback(() => {
    if (typeof window === "undefined") return;

    const openWidget = () => {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        return true;
      }
      return false;
    };

    // Ensure CSS
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link");
      link.id = "calendly-widget-css";
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    // If already available, open immediately
    if (openWidget()) return;

    // Ensure script
    let script = document.getElementById("calendly-widget-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;

      script.onload = () => {
        const ok = openWidget();
        if (!ok) window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      };

      script.onerror = () => {
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
      };

      document.body.appendChild(script);
      return;
    }

    // Script exists but object not ready -> short retry then fallback
    window.clearTimeout(readyTimerRef.current);
    readyTimerRef.current = window.setTimeout(() => {
      const ok = openWidget();
      if (!ok) window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }, 250);
  }, []);

  // Background parallax (only on fine pointer + no reduced motion)
  const onPointerMoveBg = useCallback(
    (e) => {
      if (reduceMotion || !finePointer) return;
      const section = sectionRef.current;
      if (!section) return;

      if (rafBgRef.current) cancelAnimationFrame(rafBgRef.current);

      rafBgRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        section.style.setProperty("--bg-x", `${x}%`);
        section.style.setProperty("--bg-y", `${y}%`);
      });
    },
    [reduceMotion, finePointer]
  );

  const onPointerLeaveBg = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.setProperty("--bg-x", "50%");
    section.style.setProperty("--bg-y", "50%");
  }, []);

  // Card tilt (desktop only)
  const onPointerMoveTilt = useCallback(
    (e) => {
      if (reduceMotion || !finePointer) return;
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rx = ((y - rect.height / 2) / rect.height) * 8;
      const ry = ((x - rect.width / 2) / rect.width) * -8;

      if (rafTiltRef.current) cancelAnimationFrame(rafTiltRef.current);

      rafTiltRef.current = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    },
    [reduceMotion, finePointer]
  );

  const resetTilt = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafBgRef.current) cancelAnimationFrame(rafBgRef.current);
      if (rafTiltRef.current) cancelAnimationFrame(rafTiltRef.current);
      if (readyTimerRef.current) window.clearTimeout(readyTimerRef.current);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      role="banner"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMoveBg}
      onPointerLeave={onPointerLeaveBg}
      className="relative overflow-hidden text-white min-h-[92vh] flex items-center"
      style={{ backgroundPosition: "var(--bg-x, 50%) var(--bg-y, 50%)" }}
    >
      {/* ===== COLOR CONTROL (Hero BG) =====
          Change these for “more blue / more navy”:
          - from-collin-navy/.. via-[#0B1E3B]/.. to-[#061225]/..
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_var(--bg-x,50%)_var(--bg-y,50%),rgba(56,189,248,0.18),transparent_45%),radial-gradient(900px_circle_at_20%_20%,rgba(45,212,191,0.14),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#061225] via-[#071B35] to-[#051126]"
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:88px_88px]"
      />

      {/* Teal glows (controlled, not noisy) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-collin-lightTeal/16 blur-[120px]" />
        <div className="absolute -bottom-36 left-[-8rem] h-[32rem] w-[32rem] rounded-full bg-collin-teal/10 blur-[140px]" />
      </div>

      <div className="container-wrapper relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-collin-lightTeal" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-widest text-white/85 uppercase">
                Analytics Engineering • BI • Systems
              </p>
            </div>

            <h1
              id="hero-title"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]"
            >
              Turn complex data into{" "}
              <span className="text-collin-lightTeal">clear decisions</span>
              <span className="block mt-2 text-white/95">your team can act on.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              We help UK organisations replace manual reporting with reliable metrics,
              decision-ready dashboards, and scalable data foundations built for long-term clarity.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <CheckMini />
                Faster reporting cycles
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckMini />
                Trusted single source of truth
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckMini />
                Less manual effort
              </span>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-collin-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-lightTeal/30"
                aria-label="Book a free strategy call (Calendly popup)"
              >
                <CalendarIcon />
                Free Strategy Call
                <ArrowIcon />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                aria-label="View services section"
              >
                View Services
              </a>

              <a
                href="#use-case"
                className="text-sm font-semibold text-white/85 hover:text-white transition self-center sm:self-auto sm:ml-2"
                aria-label="See demo section"
              >
                See demo <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-white/70">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-md">
                UK-based delivery
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-md">
                KPI frameworks & governance
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur-md">
                Automation-first approach
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div
              ref={cardRef}
              onPointerMove={onPointerMoveTilt}
              onPointerLeave={resetTilt}
              className={[
                "rounded-2xl border border-white/18 bg-white/[0.10] backdrop-blur-xl",
                "shadow-[0_30px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/10",
                "p-7 sm:p-8 transition-transform duration-200 ease-out will-change-transform",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                    What we deliver
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Outcomes your stakeholders feel
                  </h2>
                </div>

                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 border border-white/15">
                  UK-based
                </span>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-white/80 leading-relaxed">
                <li className="flex items-start gap-3">
                  <BulletCheck />
                  Decision-ready dashboards trusted by leadership teams
                </li>
                <li className="flex items-start gap-3">
                  <BulletCheck />
                  KPI frameworks aligned to real business objectives
                </li>
                <li className="flex items-start gap-3">
                  <BulletCheck />
                  Systems and process analysis to improve efficiency
                </li>
                <li className="flex items-start gap-3">
                  <BulletCheck />
                  Scalable reporting automation and digital tools
                </li>
              </ul>

              <div className="mt-7 pt-5 border-t border-white/15 flex items-center justify-between gap-4">
                <p className="text-xs text-white/65 leading-relaxed">
                  Supporting SMEs, charities, and public-sector teams across the UK.
                </p>
                <a
                  href="#about"
                  className="text-xs font-semibold text-white hover:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-md"
                >
                  Why Collinalitics →
                </a>
              </div>
            </div>

            <p className="mt-4 text-xs text-white/65">
              Prefer email?{" "}
              <a href="#contact" className="underline underline-offset-4 hover:opacity-90">
                Send a message
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Icons */
function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4 text-collin-lightTeal" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BulletCheck() {
  return (
    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-collin-lightTeal border border-white/15">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}