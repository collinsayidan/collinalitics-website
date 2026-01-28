"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(true);

  const rafRef = useRef(null);

  const safeHeadings = useMemo(() => {
    return (headings || [])
      .filter((h) => h?.id && h?.text)
      .map((h) => ({ id: h.id, text: h.text }));
  }, [headings]);

  // Optional: auto-collapse on small screens (keeps UX clean)
  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 1024px)");
    if (!mq) return;

    const apply = () => setOpen(!mq.matches);
    apply();

    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Active section highlight
  useEffect(() => {
    if (!safeHeadings.length || typeof IntersectionObserver === "undefined") return;

    const els = safeHeadings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!els.length) return;

    if (!activeId && els[0]?.id) setActiveId(els[0].id);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-22% 0px -62% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeHeadings]);

  if (!safeHeadings.length) {
    return <p className="text-sm text-collin-slate">No sections found.</p>;
  }

  const onJump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    // Smooth scroll (headings should use scroll-mt for sticky header offset)
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Update URL hash without jump
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }

    // Snap highlight immediately (feels responsive)
    setActiveId(id);

    // Optional: close on mobile after click (clean UX)
    if (window.innerWidth < 1024) setOpen(false);
  };

  const scrollToTop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <nav aria-label="Table of contents" className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
            On this page
          </p>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            Jump to a section — updates as you scroll.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-collin-navy hover:bg-gray-50 transition"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-collin-navy hover:bg-gray-50 transition"
            aria-expanded={open}
            aria-label={open ? "Collapse table of contents" : "Expand table of contents"}
          >
            {open ? "Hide" : "Show"}
            <ChevronDownIcon className={["h-4 w-4 transition-transform", open ? "rotate-180" : ""].join(" ")} />
          </button>
        </div>
      </div>

      {/* List */}
      {open && (
        <div className="mt-4">
          <ul className="space-y-1.5">
            {safeHeadings.map((h) => {
              const isActive = activeId === h.id;

              return (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={onJump(h.id)}
                    className={[
                      "group flex items-start gap-3 rounded-2xl px-3 py-2 transition",
                      "border border-transparent",
                      isActive
                        ? "bg-collin-teal/10 border-collin-teal/15"
                        : "hover:bg-gray-50 hover:border-gray-200",
                    ].join(" ")}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {/* Indicator */}
                    <span
                      className={[
                        "mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 transition",
                        isActive ? "bg-collin-teal" : "bg-gray-300 group-hover:bg-gray-400",
                      ].join(" ")}
                      aria-hidden="true"
                    />

                    <span
                      className={[
                        "text-sm leading-snug transition",
                        isActive ? "text-collin-teal font-semibold" : "text-collin-slate",
                      ].join(" ")}
                    >
                      {h.text}
                    </span>

                    <span className="ml-auto mt-0.5 text-gray-300 group-hover:text-gray-400 transition" aria-hidden="true">
                      <ArrowRightMini className="h-4 w-4" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Helper */}
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              Tip
            </p>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Use the TOC to skim quickly. Headings are offset for your sticky header, so sections land cleanly.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---------- Icons ---------- */

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowRightMini({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ArrowUpIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
    </svg>
  );
}