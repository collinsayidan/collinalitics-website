"use client";
import { useState } from "react";
import BlogCard from "@/components/insights/BlogCard";

export default function InsightsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ✅ POSTS ARRAY — REQUIRED
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
      title: "The 5‑Step Framework for Operational Clarity",
      excerpt: "A simple method to bring structure and visibility.",
      date: "Jan 2026",
      slug: "operational-clarity-framework",
      category: "Operations",
    },
    {
      title: "The Anatomy of a High‑Clarity Dashboard",
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

  // Categories
  const categories = ["All", "KPIs", "Dashboards", "Strategy", "Operations"];

  // Filtering logic
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = filter === "All" || p.category === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-28 container-wrapper">
      <h1 className="text-4xl font-bold text-collin-navy text-center">
        Insights
      </h1>

      <p className="text-collin-slate text-center mt-4 max-w-2xl mx-auto">
        Practical thinking on analytics, dashboards, KPIs, and operational clarity.
      </p>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mt-12">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:border-collin-teal focus:ring-collin-teal"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full border transition ${
              filter === c
                ? "bg-collin-teal text-white border-collin-teal"
                : "border-gray-300 text-gray-700 hover:border-collin-teal"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid md:grid-cols-2 gap-12 mt-20">
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
    </section>
  );
}
