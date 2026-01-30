"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/insights/BlogCard";

export default function InsightsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const posts = [
    {
      title: "How to Define KPIs That Actually Matter",
      excerpt: "A practical guide to choosing KPIs that drive decisions.",
      date: "Jan 2026",
      slug: "define-kpis-that-matter",
      category: "KPIs",
    },
    {
      title: "Why Dashboards Fail (And How to Fix Them)",
      excerpt: "Most dashboards fail because they lack clarity.",
      date: "Jan 2026",
      slug: "why-dashboards-fail",
      category: "Dashboards",
    },
    {
      title: "The 5-Step Framework for Operational Clarity",
      excerpt: "A simple method to bring structure and visibility.",
      date: "Jan 2026",
      slug: "operational-clarity-framework",
      category: "Operations",
    },
    {
      title: "The Anatomy of a High-Clarity Dashboard",
      excerpt: "The design principles behind dashboards that drive decisions.",
      date: "Feb 2026",
      slug: "anatomy-of-high-clarity-dashboard",
      category: "Dashboards",
    },
    {
      title: "How to Build a Single Source of Truth",
      excerpt: "A roadmap for unifying scattered spreadsheets.",
      date: "Feb 2026",
      slug: "build-single-source-of-truth",
      category: "Strategy",
    },
    {
      title: "The Hidden Cost of Manual Reporting",
      excerpt: "Why manual processes drain time and accuracy.",
      date: "Feb 2026",
      slug: "hidden-cost-of-manual-reporting",
      category: "Operations",
    },
    {
      title: "A Simple Framework for KPI Ownership",
      excerpt: "How to assign responsibility and maintain clarity.",
      date: "Feb 2026",
      slug: "kpi-ownership-framework",
      category: "KPIs",
    },
    {
      title: "Data Strategy for Small Teams",
      excerpt: "How small teams can build strong data foundations.",
      date: "Feb 2026",
      slug: "data-strategy-for-small-teams",
      category: "Strategy",
    },
  ];

  const categories = ["All", "KPIs", "Dashboards", "Strategy", "Operations"];

  const categoryCounts = useMemo(() => {
    const counts = posts.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    return { ...counts, All: posts.length };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);

      const matchesCategory = filter === "All" || p.category === filter;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, filter]);

  const topResult = useMemo(() => {
    if (!search.trim()) return null;
    return filteredPosts[0] || null;
  }, [filteredPosts, search]);

  const reset = () => {
    setSearch("");
    setFilter("All");
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.32]
        [background-image:linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)]
        [background-size:72px_72px] pointer-events-none"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[-7rem] h-72 w-72 rounded-full bg-collin-teal-light/12 blur-3xl" />
        <div className="absolute -bottom-28 left-[-7rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative z-10 py-16 sm:py-20">
        {/* Top nav row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-collin-slate flex flex-wrap items-center gap-2"
          >
            <Link href="/" className="hover:text-collin-navy transition font-medium">
              Home
            </Link>
            <span className="text-collin-slate/60">/</span>
            <span className="text-collin-navy font-semibold">Insights</span>
          </nav>

          <div className="flex flex-wrap gap-2">
            <Link href="/services" className="navPill">
              Services
            </Link>
            <Link href="/case-studies" className="navPill">
              Case studies
            </Link>
            <a href="/#contact" className="navPill">
              Contact
            </a>
          </div>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center mt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
              Insights
            </p>
          </div>

          <h1 className="mt-6 text-h2 text-collin-navy">Practical thinking for clarity</h1>

          <p className="mt-4 text-bodylg text-collin-slate max-w-2xl mx-auto">
            Practical thinking on analytics, dashboards, KPIs, and operational clarity designed to
            be usable.
          </p>
        </header>

        {/* Sticky controls (premium UX) */}
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="sticky top-16 z-20 rounded-3xl border border-gray-200 bg-white/85 backdrop-blur-md shadow-sm p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              {/* Search */}
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                >
                  <SearchIcon className="h-5 w-5" />
                </span>

                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={[
                    "w-full rounded-2xl border border-gray-200 bg-white",
                    "pl-12 pr-12 py-4",
                    "text-sm text-gray-800 placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-collin-teal/35 focus:border-collin-teal/35",
                    "transition shadow-sm",
                  ].join(" ")}
                />

                {(search || filter !== "All") && (
                  <button
                    type="button"
                    onClick={reset}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-collin-navy hover:bg-gray-50 transition"
                    aria-label="Clear search and filters"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Count */}
              <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                  Showing
                </p>
                <p className="mt-1 text-sm font-semibold text-collin-navy">
                  {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {/* Category chips */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {categories.map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition",
                      active
                        ? "bg-collin-teal text-white border-collin-teal shadow-[0_10px_30px_-16px_rgba(0,151,167,0.55)]"
                        : "bg-white text-collin-navy border-gray-200 hover:bg-gray-50 hover:border-collin-teal/30",
                    ].join(" ")}
                  >
                    <span>{c}</span>
                    <span
                      className={[
                        "inline-flex min-w-[1.5rem] justify-center rounded-full px-2 py-0.5 text-[11px]",
                        active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700",
                      ].join(" ")}
                    >
                      {categoryCounts[c] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Optional: Top result card (premium feel when searching) */}
        {topResult && search.trim() && (
          <div className="mt-10 mx-auto max-w-4xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-7 sm:p-9 shadow-[0_18px_60px_-45px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    Top result
                  </p>
                  <h2 className="mt-2 text-h4 text-collin-navy">{topResult.title}</h2>
                  <p className="mt-2 text-sm text-collin-slate leading-relaxed">
                    {topResult.excerpt}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <span className="inline-flex items-center rounded-full border border-collin-teal/20 bg-collin-teal/10 px-4 py-1 text-xs font-semibold text-collin-teal">
                    {topResult.category}
                  </span>
                  <Link
                    href={`/insights/${topResult.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition"
                  >
                    Read article <span className="ml-2" aria-hidden="true">→</span>
                  </Link>
                  <p className="text-xs text-gray-500">{topResult.date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles */}
        <div className="mt-12 mx-auto max-w-4xl">
          {filteredPosts.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {filteredPosts.map((p) => (
                <BlogCard
                  key={p.slug}
                  title={p.title}
                  excerpt={p.excerpt}
                  date={p.date}
                  href={`/insights/${p.slug}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 sm:mt-20 mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-7 sm:p-9 shadow-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                Want help applying this?
              </p>
              <h2 className="mt-2 text-h4 text-collin-navy">Turn insight into better reporting.</h2>
              <p className="mt-3 text-body text-collin-slate leading-relaxed">
                If you’re dealing with manual reporting, unclear KPIs, or low confidence in numbers,
                we can recommend the fastest first step to improve clarity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href="/#contact" className="cta-primary cta-full">
                Book a discovery call
              </a>
              <Link href="/" className="cta-secondary cta-full">
                Back to home
              </Link>
            </div>
          </div>
        </div>

        {/* Tiny local helper class via Tailwind (no styled-jsx) */}
        <div className="hidden">
          {/* This block exists to keep the navPill class discoverable. */}
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI bits ---------- */

function EmptyState({ onReset }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-collin-teal/10 text-collin-teal">
        <SearchIcon className="h-6 w-6" />
      </div>
      <h3 className="text-h4 text-collin-navy">No matching articles</h3>
      <p className="mt-3 text-body text-collin-slate">
        Try a different keyword or reset filters to see everything.
      </p>
      <div className="mt-7 flex justify-center">
        <button type="button" onClick={onReset} className="cta-secondary cta-full">
          Reset
        </button>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */

function SearchIcon({ className = "" }) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3" />
    </svg>
  );
}

/* ---------- Tailwind “class alias” replacement ---------- */
/**
 * Replace your old styled-jsx NavPill with Tailwind directly:
 * className="navPill"
 *
 * Add this class in your globals.css OR just use the utilities inline.
 *
 * If you prefer NO globals, replace className="navPill" with this:
 * "inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-xs font-semibold text-collin-navy hover:bg-gray-50 hover:border-collin-teal/30 transition"
 */
