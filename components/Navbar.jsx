"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(isHome ? "#top" : pathname);

  const links = useMemo(
    () => [
      { href: "#top", label: "Home", type: "section" },
      { href: "#about", label: "About", type: "section" },
      { href: "#services", label: "Services", type: "section" },
      { href: "#how", label: "How we work", type: "section" },
      { href: "#use-case", label: "Demo", type: "section" },
      { href: "#why", label: "Why us", type: "section" },
      { href: "/insights", label: "Insights", type: "route" },
      { href: "#contact", label: "Contact", type: "section" },
    ],
    []
  );

  const resolveHref = (l) => {
    if (l.type === "route") return l.href;
    return isHome ? l.href : `/${l.href}`;
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActive(isHome ? "#top" : pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const ids = ["top", "about", "services", "how", "use-case", "why", "contact"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-25% 0px -55% 0px" }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const openCalendly = () => {
    if (typeof window === "undefined") return;

    const openWidget = () => {
      window.Calendly?.initPopupWidget({
        url: "https://calendly.com/collinsayidan-collinalitics/30min",
      });
    };

    if (window.Calendly) {
      openWidget();
      return;
    }

    if (!document.getElementById("calendly-script")) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = openWidget;
      document.body.appendChild(script);
    } else {
      setTimeout(openWidget, 250);
    }
  };

  const isLinkActive = (l) => {
    if (l.type === "route") return pathname === l.href || pathname.startsWith(`${l.href}/`);
    return isHome && active === l.href;
  };

  const onNavClick = (l) => {
    setOpen(false);
    if (isHome && l.type === "section") setActive(l.href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Backdrop bar */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200 dark:bg-slate-950/70 dark:border-white/10">
        <div className="container-wrapper">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href={isHome ? "#top" : "/#top"}
              className="flex items-center gap-2"
              aria-label="Collinalitics home"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-collin-teal text-white font-bold">
                C
              </span>
              <span className="text-sm sm:text-base font-semibold text-collin-navy dark:text-white">
                Collinalitics Ltd
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              {links.map((l) => {
                const href = resolveHref(l);
                const activeNow = isLinkActive(l);

                return (
                  <Link
                    key={`${l.label}-${l.href}`}
                    href={href}
                    onClick={() => onNavClick(l)}
                    className={[
                      "text-sm font-medium transition",
                      activeNow
                        ? "text-collin-teal"
                        : "text-collin-slate hover:text-collin-teal dark:text-white/75 dark:hover:text-collin-teal-light",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                );
              })}

              {/* ✅ Theme toggle */}
              <ThemeToggle />

              <button
                onClick={openCalendly}
                className="cta-primary text-sm inline-flex items-center gap-2"
                aria-label="Book a free discovery call"
                type="button"
              >
                <CalendarIcon className="h-4 w-4" />
                Book a free discovery call
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-collin-slate hover:bg-gray-100 transition dark:text-white/80 dark:hover:bg-white/10"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden">
          <button
            className="fixed inset-0 bg-black/25 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            type="button"
          />

          <div className="relative">
            <div className="container-wrapper">
              <div className="mt-3 card bg-white/95 p-4 dark:bg-slate-950/95 dark:border dark:border-white/10">
                <div className="grid gap-1">
                  {links.map((l) => {
                    const href = resolveHref(l);
                    const activeNow = isLinkActive(l);

                    return (
                      <Link
                        key={`${l.label}-${l.href}-mobile`}
                        href={href}
                        onClick={() => onNavClick(l)}
                        className={[
                          "rounded-lg px-3 py-2 text-sm font-medium transition",
                          activeNow
                            ? "bg-collin-teal/10 text-collin-teal"
                            : "text-collin-slate hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/10",
                        ].join(" ")}
                      >
                        {l.label}
                      </Link>
                    );
                  })}

                  {/* ✅ Mobile theme toggle row */}
                  <div className="mt-2 pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-collin-navy dark:text-white">
                      Theme
                    </span>
                    <ThemeToggle compact />
                  </div>

                  <div className="mt-2 pt-3 border-t border-gray-200 dark:border-white/10">
                    <button
                      onClick={() => {
                        openCalendly();
                        setOpen(false);
                      }}
                      className="cta-primary w-full inline-flex items-center justify-center gap-2 text-sm"
                      aria-label="Book a free discovery call"
                      type="button"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      Book a free discovery call
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-4" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Icons ---------- */

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}