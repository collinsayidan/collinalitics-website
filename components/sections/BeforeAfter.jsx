
"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

export default function BeforeAfterReveal() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const handleRef = useRef(null);

  const prefersReduced = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.35 });

  const [percent, setPercent] = useState(80); // start mostly "before"

  useEffect(() => {
    if (!inView || prefersReduced) return;
    const controls = animate(80, 45, {
      duration: 0.9,
      ease: [0.2, 0.65, 0.25, 1],
      onUpdate: (v) => setPercent(v),
    });
    return () => controls.stop();
  }, [inView, prefersReduced]);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const setFromX = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clamp(clientX - rect.left, 0, rect.width);
    setPercent((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    (e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId));
    setFromX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (e.buttons !== 1) return;
    setFromX(e.clientX);
  };
  const onKeyDown = (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    setPercent((p) => clamp(p + (e.key === "ArrowRight" ? 3 : -3), 0, 100));
  };

  const baseTransition = { duration: 0.6, ease: [0.2, 0.65, 0.25, 1] };
  const handleLeft = `${percent}%`;

  return (
    <section id="before-after" className="relative overflow-hidden py-24 sm:py-28 md:py-32 text-white">
      <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/20 blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-collin-lightTeal/20 blur-[100px]" aria-hidden="true" />

      <div className="container-wrapper relative z-10" ref={containerRef}>
        <motion.header
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={baseTransition}
        >
          <div className="w-16 h-1 bg-collin-teal mx-auto mb-6 rounded-full" />
          <h2 className="text-h2 text-white">Before &amp; After: Clean Dashboard</h2>
          <p className="text-bodylg text-white/85 mt-4 leading-relaxed">
            See how manual, inconsistent reporting transforms into a clean, decision‑ready dashboard.
          </p>
        </motion.header>

        <motion.div
          ref={trackRef}
          className="relative w-full h-64 sm:h-80 md:h-[28rem] rounded-2xl overflow-hidden border border-white/10 shadow-xl"
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={baseTransition}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          role="region"
          aria-label="Before and after dashboard comparison"
        >
          {/* AFTER (base) */}
          <Image
            src="/images/after-dashboard.svg"
            alt="After: clean dashboard"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />

          {/* BEFORE (clipped overlay) */}
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${percent}%` }} aria-hidden="true">
            <Image
              src="/images/before-dashboard.svg"
              alt="Before: manual/spreadsheet reporting"
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Divider line */}
          <div className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none" style={{ left: handleLeft, transform: "translateX(-0.5px)" }} aria-hidden="true" />

          {/* Handle */}
          <button
            ref={handleRef}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                       h-10 w-10 sm:h-12 sm:w-12 rounded-full
                       bg-white text-collin-navy shadow-lg border border-white/70
                       flex items-center justify-center
                       hover:scale-105 active:scale-95 transition"
            style={{ left: handleLeft }}
            aria-label="Reveal slider handle"
            title="Drag or use arrow keys"
            onKeyDown={onKeyDown}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </button>

          {/* Labels */}
          <div className="absolute left-4 top-4 text-xs sm:text-sm font-medium text-white/90 bg-black/30 rounded-md px-2 py-1">Before</div>
          <div className="absolute right-4 top-4 text-xs sm:text-sm font-medium text-white/90 bg-black/30 rounded-md px-2 py-1">After</div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={baseTransition}
        >
          <a href="#contact" className="ctaConsultation cta-full">
            Book a Live Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
