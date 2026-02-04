"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

export default function BeforeAfterReveal() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const prefersReduced = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.35 });

  // Start mostly "Before"
  const [percent, setPercent] = useState(80);

  // Intro animation (subtle) — disabled for reduced motion
  useEffect(() => {
    if (!inView || prefersReduced) return;
    const controls = animate(80, 45, {
      duration: 0.9,
      ease: [0.2, 0.65, 0.25, 1],
      onUpdate: (v) => setPercent(v),
    });
    return () => controls.stop();
  }, [inView, prefersReduced]);

  const clamp = useCallback((v, min, max) => Math.max(min, Math.min(max, v)), []);

  const setFromX = useCallback(
    (clientX) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = clamp(clientX - rect.left, 0, rect.width);
      setPercent((x / rect.width) * 100);
    },
    [clamp]
  );

  // Pointer dragging (track owns capture)
  const onPointerDown = useCallback(
    (e) => {
      e.preventDefault();
      trackRef.current?.setPointerCapture?.(e.pointerId);
      setFromX(e.clientX);
    },
    [setFromX]
  );

  const onPointerMove = useCallback(
    (e) => {
      // For mouse, only drag while pressed; touch can move freely.
      if (e.pointerType !== "touch" && e.buttons !== 1) return;
      setFromX(e.clientX);
    },
    [setFromX]
  );

  const onPointerUp = useCallback((e) => {
    trackRef.current?.releasePointerCapture?.(e.pointerId);
  }, []);

  // Keyboard support (slider)
  const step = 3;
  const onKeyDown = useCallback(
    (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();

      setPercent((p) => {
        if (e.key === "Home") return 0;
        if (e.key === "End") return 100;
        return clamp(p + (e.key === "ArrowRight" ? step : -step), 0, 100);
      });
    },
    [clamp]
  );

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };
  const handleLeft = `${percent}%`;

  const ariaValueText = useMemo(() => {
    const before = Math.round(percent);
    const after = 100 - before;
    return `${before}% Before, ${after}% After`;
  }, [percent]);

  const beforePct = Math.round(percent);
  const afterPct = 100 - beforePct;

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className={[
        "relative overflow-hidden py-24 sm:py-28",
        // ✅ Light mode default
        "bg-gray-50 text-gray-900",
        // ✅ Dark mode
        "dark:bg-gradient-to-br dark:from-collin-navy-darker dark:via-collin-navy-dark dark:to-collin-navy-darker dark:text-white",
      ].join(" ")}
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {/* Light glows */}
        <div className="absolute -top-28 right-[-8rem] h-80 w-80 rounded-full bg-collin-teal/12 blur-3xl dark:hidden" />
        <div className="absolute -bottom-28 left-[-8rem] h-96 w-96 rounded-full bg-collin-teal-light/18 blur-3xl dark:hidden" />

        {/* Dark glows */}
        <div className="absolute -top-28 right-[-8rem] h-80 w-80 rounded-full bg-collin-teal/14 blur-3xl hidden dark:block" />
        <div className="absolute -bottom-28 left-[-8rem] h-96 w-96 rounded-full bg-collin-teal-light/10 blur-3xl hidden dark:block" />

        {/* Grid */}
        <div
          className={[
            "absolute inset-0 opacity-[0.18]",
            "[background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)]",
            "dark:opacity-[0.18]",
            "dark:[background-image:linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]",
            "[background-size:72px_72px]",
          ].join(" ")}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 dark:from-black/35 dark:to-black/20" />
      </div>

      <div className="container-wrapper relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.header
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={baseTransition}
        >
          <div
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur",
              "border-gray-200 bg-white/70",
              "dark:border-white/15 dark:bg-white/5",
            ].join(" ")}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal dark:bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-gray-600 uppercase dark:text-white/80">
              Visual example
            </p>
          </div>

          <h2 id="before-after-heading" className="mt-6 text-h2 text-collin-navy dark:text-white">
            Before &amp; After:{" "}
            <span className="bg-gradient-to-r from-collin-teal to-collin-teal-light bg-clip-text text-transparent">
              decision-ready
            </span>{" "}
            dashboard
          </h2>

          <p className="text-bodylg mt-4 leading-relaxed text-gray-600 dark:text-white/85">
            Drag anywhere to compare or use your arrow keys.
          </p>
        </motion.header>

        {/* Glass Card Wrapper */}
        <motion.div
          className={[
            "mt-12 sm:mt-14 rounded-3xl border backdrop-blur-md shadow-2xl",
            "border-gray-200 bg-white/80",
            "dark:border-white/10 dark:bg-white/5",
          ].join(" ")}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={baseTransition}
        >
          {/* Top Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 sm:px-7 pt-5 sm:pt-6">
            <div className="flex items-center gap-3">
              <span
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-2xl border",
                  "bg-gray-900/5 border-gray-200",
                  "dark:bg-white/10 dark:border-white/10",
                ].join(" ")}
              >
                <IconCompare />
              </span>
              <div>
                <p className="text-sm font-semibold text-collin-navy dark:text-white">Drag to compare</p>
                <p className="text-xs text-gray-600 dark:text-white/70">
                  Click/drag anywhere • ← → for fine control • Home/End to jump
                </p>
              </div>
            </div>

            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-4 py-2",
                "border-gray-200 bg-white/70",
                "dark:border-white/10 dark:bg-black/20",
              ].join(" ")}
            >
              <span className="text-xs font-semibold text-gray-600 dark:text-white/70">Before</span>
              <span className="text-sm font-semibold text-collin-navy dark:text-white">{beforePct}%</span>
              <span className="text-gray-400 dark:text-white/40">•</span>
              <span className="text-xs font-semibold text-gray-600 dark:text-white/70">After</span>
              <span className="text-sm font-semibold text-collin-navy dark:text-white">{afterPct}%</span>
            </div>
          </div>

          {/* Reveal Track */}
          <motion.div
            ref={trackRef}
            className={[
              "relative mt-5 sm:mt-6",
              "w-full aspect-[16/9] md:aspect-[18/9]",
              "rounded-3xl overflow-hidden",
              "border",
              "mx-5 sm:mx-7",
              "shadow-[0_25px_70px_-35px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.85)]",
              "border-gray-200 dark:border-white/10",
            ].join(" ")}
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={baseTransition}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="group"
            aria-label="Before and after dashboard comparison"
            style={{ touchAction: "none" }}
          >
            {/* AFTER (base) */}
            <Image
              src="/images/project_02.jpg"
              alt="After: clean dashboard"
              fill
              sizes="100vw"
              className="object-cover"
            />

            {/* BEFORE (clipped overlay) */}
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${percent}%` }} aria-hidden="true">
              <Image
                src="/images/project_01.jpg"
                alt="Before: manual spreadsheet reporting"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Depth overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 dark:from-black/25 dark:to-black/10"
              aria-hidden="true"
            />

            {/* Divider */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-white/70 dark:bg-white/80"
              style={{ left: handleLeft, transform: "translateX(-1px)" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-10"
              style={{
                left: handleLeft,
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
              }}
              aria-hidden="true"
            />

            {/* Labels */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-md bg-black/25 px-2 py-1 text-xs sm:text-sm font-medium text-white/90 border border-white/10">
                Before
              </span>
            </div>
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center rounded-md bg-black/25 px-2 py-1 text-xs sm:text-sm font-medium text-white/90 border border-white/10">
                After
              </span>
            </div>

            {/* Handle */}
            <motion.button
              type="button"
              className={[
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                "h-12 w-12 sm:h-14 sm:w-14 rounded-full",
                "flex items-center justify-center",
                "transition hover:scale-[1.04] active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-collin-teal/40 focus:ring-offset-2 focus:ring-offset-transparent",
                // light
                "bg-white text-slate-900 border border-gray-200 shadow-xl",
                // dark
                "dark:border-white/70 dark:shadow-xl",
              ].join(" ")}
              style={{ left: handleLeft }}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              role="slider"
              aria-label="Reveal slider"
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(percent)}
              aria-valuetext={ariaValueText}
              title="Drag or use arrow keys"
              whileHover={prefersReduced ? undefined : { y: -1 }}
              transition={{ duration: 0.25 }}
            >
              <span className="sr-only">Use left and right arrow keys to adjust comparison.</span>

              <div className="absolute inset-0 rounded-full ring-2 ring-collin-teal/25" aria-hidden="true" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Bottom content */}
          <div className="px-5 sm:px-7 pb-6 sm:pb-7 pt-6 sm:pt-7">
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                title="Before"
                subtitle="Manual & inconsistent"
                points={["Disconnected spreadsheets", "Definitions vary across teams", "Slow reporting cycles"]}
              />
              <InfoCard
                title="After"
                subtitle="Clean & decision-ready"
                points={["Single source of truth", "Governed metrics & ownership", "Fast, reliable delivery"]}
                accent
              />
            </div>

            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={baseTransition}
            >
              <a href="#contact" className="ctaConsultation cta-full" aria-label="Book a live demo">
                Book a live demo
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Sub-components ---------- */

function InfoCard({ title, subtitle, points, accent }) {
  return (
    <div
      className={[
        "rounded-2xl border backdrop-blur p-5 sm:p-6",
        // light
        "border-gray-200 bg-white/70",
        // dark
        "dark:border-white/10 dark:bg-black/20",
        accent ? "ring-1 ring-collin-teal/25" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-collin-navy dark:text-white">{title}</p>
          <p className="mt-1 text-xs text-gray-600 dark:text-white/70">{subtitle}</p>
        </div>

        <span
          className={[
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border",
            accent
              ? "bg-collin-teal/15 text-collin-navy border-collin-teal/25 dark:bg-collin-teal/20 dark:text-white dark:border-collin-teal/30"
              : "bg-gray-900/5 text-gray-700 border-gray-200 dark:bg-white/10 dark:text-white/85 dark:border-white/10",
          ].join(" ")}
        >
          {accent ? "Outcome" : "Problem"}
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-gray-700 dark:text-white/85">
            <span className="mt-0.5 text-collin-teal" aria-hidden="true">
              <IconCheck />
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Icons ---------- */

function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconCompare() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.2"
      stroke="currentColor"
      className="h-5 w-5 text-collin-navy dark:text-white/90"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 18h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4v14Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
    </svg>
  );
}