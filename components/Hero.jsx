"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Shield,
  Gauge,
  Calendar,
  Check,
  ArrowUpRight,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/collinsayidan-collinalitics/30min";

export default function Hero() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const rafBgRef = useRef(0);
  const rafTiltRef = useRef(0);
  const readyTimerRef = useRef(0);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  // Detect reduced motion + fine pointer
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

    // Script exists but Calendly not ready: retry then fallback
    window.clearTimeout(readyTimerRef.current);
    readyTimerRef.current = window.setTimeout(() => {
      const ok = openWidget();
      if (!ok) window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
    }, 250);
  }, []);

  // Background parallax
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

  useEffect(() => {
    return () => {
      if (rafBgRef.current) cancelAnimationFrame(rafBgRef.current);
      if (rafTiltRef.current) cancelAnimationFrame(rafTiltRef.current);
      if (readyTimerRef.current) window.clearTimeout(readyTimerRef.current);
    };
  }, []);

  const scrollToServices = useCallback(() => {
    const el = document.getElementById("services");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      role="banner"
      aria-labelledby="hero-title"
      onPointerMove={onPointerMoveBg}
      onPointerLeave={onPointerLeaveBg}
      className={[
        "relative min-h-screen flex items-center overflow-hidden",
        // ✅ Light mode background
        "bg-gradient-to-b from-white via-gray-50 to-white",
        // ✅ Dark mode background
        "dark:bg-gradient-to-b dark:from-collin-navy-darker dark:via-collin-navy-dark dark:to-collin-navy-darker",
      ].join(" ")}
      style={{ backgroundPosition: "var(--bg-x, 50%) var(--bg-y, 50%)" }}
    >
      {/* Background system */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-collin-teal/10 dark:bg-collin-teal/14" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-collin-teal-light/12 dark:bg-collin-teal-light/16" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-3xl bg-collin-navy/5 dark:bg-white/5" />

        {/* Grid */}
        <div
          className={[
            "absolute inset-0",
            "bg-[linear-gradient(rgba(10,37,64,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.05)_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
            "bg-[size:72px_72px]",
          ].join(" ")}
        />

        {/* Parallax highlight overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px circle at var(--bg-x,50%) var(--bg-y,50%), rgba(15,181,186,0.14), transparent 55%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div
              className={[
                "inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8",
                "bg-collin-teal/10 border-collin-teal/20",
                "dark:bg-white/5 dark:border-white/10",
              ].join(" ")}
            >
              <span className="text-collin-navy dark:text-white/85 text-sm font-medium tracking-wide">
                Analytics Engineering • BI • Systems
              </span>
            </div>

            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight mb-6 text-collin-navy dark:text-white"
            >
              Turn complex data into{" "}
              <span className="bg-gradient-to-r from-collin-teal via-collin-teal-light to-collin-teal bg-clip-text text-transparent">
                clear decisions
              </span>{" "}
              your team can act on.
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-xl text-collin-slate dark:text-white/70">
              We help UK organisations replace manual reporting with reliable metrics,
              decision-ready dashboards, and scalable data foundations built for long-term clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Primary */}
              <Button size="lg" onClick={openCalendly} className="gap-2">
                <Calendar className="h-5 w-5" />
                Free Strategy Call
                <ArrowRight className="h-5 w-5" />
              </Button>

              {/* Secondary */}
              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={scrollToServices}
                className={[
                  "border-gray-200 text-collin-navy hover:bg-gray-50",
                  "dark:border-white/15 dark:text-white dark:hover:bg-white/5",
                ].join(" ")}
              >
                View Services
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Gauge, label: "Faster reporting cycles" },
                { icon: Shield, label: "Trusted single source of truth" },
                { icon: Zap, label: "Less manual effort" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 text-collin-slate dark:text-white/70"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-collin-teal" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div
                ref={cardRef}
                onPointerMove={onPointerMoveTilt}
                onPointerLeave={resetTilt}
                className={[
                  "rounded-2xl border p-6 shadow-2xl transition-transform duration-200 ease-out will-change-transform backdrop-blur-xl",
                  "bg-white/85 border-gray-200",
                  "dark:bg-white/5 dark:border-white/10 dark:shadow-softDark",
                ].join(" ")}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Revenue", value: "£2.4M", change: "+12%" },
                      { label: "Efficiency", value: "94%", change: "+8%" },
                      { label: "Reports", value: "847", change: "+23%" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl p-4 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10"
                      >
                        <p className="text-gray-500 dark:text-white/55 text-xs mb-1">{stat.label}</p>
                        <p className="text-collin-navy dark:text-white font-semibold text-lg">{stat.value}</p>
                        <p className="text-collin-teal text-xs">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10">
                    <div className="flex items-end gap-2 h-32">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                          className="flex-1 rounded-sm bg-gradient-to-t from-collin-navy to-collin-teal"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl p-4 bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10">
                    <p className="text-collin-slate dark:text-white/80 text-sm font-medium mb-3">
                      What we deliver
                    </p>

                    <ul className="space-y-2 text-sm text-gray-700 dark:text-white/70">
                      {[
                        "Decision-ready dashboards",
                        "KPI governance & ownership",
                        "Systems + process analysis",
                        "Reporting automation",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10">
                            <Check className="h-4 w-4 text-collin-teal" strokeWidth={2.5} />
                          </span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#about"
                      className="mt-4 inline-flex items-center text-sm font-medium text-collin-teal hover:opacity-90 transition"
                    >
                      Why Collinalitics
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-8 top-1/4 rounded-xl px-4 py-3 shadow-xl bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10"
              >
                <p className="text-collin-navy dark:text-white font-semibold text-sm">UK-based delivery</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -right-4 bottom-1/4 rounded-xl px-4 py-3 shadow-xl bg-collin-teal"
              >
                <p className="text-white font-semibold text-sm">Automation-first</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
