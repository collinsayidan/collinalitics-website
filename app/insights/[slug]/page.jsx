"use client";

import BlogLayout from "@/components/insights/BlogLayout";
import BlogHero from "@/components/insights/BlogHero";
import ReadingProgress from "@/components/insights/Readingprogress"; 
import BlogCard from "@/components/insights/BlogCard";
import { authors } from "@/components/data/authors";
import { getReadingTime } from "@/components/utils/readingTime";


export default function BlogArticle({ params }) {
  const { slug } = params;

  // FULL ARTICLE CONTENT
  const articles = {
    "define-kpis-that-matter": {
      title: "How to Define KPIs That Actually Matter",
      date: "Jan 2026",
      category: "KPIs",
      author: "collins",
      content: `
## Why KPIs Fail
Most organisations track too many KPIs — and most of them don’t drive decisions.

## What Makes a Good KPI
A good KPI is clear, actionable, and tied to a real business outcome.

## How to Choose KPIs
Start with decisions, not data. Work backwards from what leaders need to know.
      `,
    },

    "why-dashboards-fail": {
      title: "Why Dashboards Fail (And How to Fix Them)",
      date: "Jan 2026",
      category: "Dashboards",
      author: "collins",
      content: `
## The Real Reason Dashboards Fail
Dashboards fail because they try to show everything.

## The Fix
Design dashboards around decisions, not data dumps.

## The Outcome
Clarity, trust, and faster decisions.
      `,
    },

    "operational-clarity-framework": {
      title: "The 5‑Step Framework for Operational Clarity",
      date: "Jan 2026",
      category: "Operations",
      author: "collins",
      content: `
## Step 1: Understand
Learn the goals, challenges, and data reality.

## Step 2: Design
Define KPIs and reporting structure.

## Step 3: Build
Create dashboards and automated workflows.

## Step 4: Refine
Iterate with teams to ensure clarity.

## Step 5: Maintain
Keep KPIs relevant and reporting consistent.
      `,
    },

    // NEW ARTICLES
    "anatomy-of-high-clarity-dashboard": {
      title: "The Anatomy of a High‑Clarity Dashboard",
      date: "Feb 2026",
      category: "Dashboards",
      author: "collins",
      content: `
## Layout
A clear dashboard starts with a predictable layout.

## Visual Hierarchy
Use size, colour, and spacing to guide attention.

## Decision Flow
Every element should support a decision.
      `,
    },

    "build-single-source-of-truth": {
      title: "How to Build a Single Source of Truth",
      date: "Feb 2026",
      category: "Strategy",
      author: "collins",
      content: `
## Why It Matters
A single source of truth builds trust.

## How to Build It
Unify systems, define ownership, and automate flows.

## The Result
Reliable reporting and confident decisions.
      `,
    },

    "hidden-cost-of-manual-reporting": {
      title: "The Hidden Cost of Manual Reporting",
      date: "Feb 2026",
      category: "Operations",
      author: "collins",
      content: `
## Time Cost
Manual reporting drains hours every week.

## Accuracy Cost
Human error creates confusion and rework.

## Confidence Cost
Leaders lose trust in the numbers.
      `,
    },

    "kpi-ownership-framework": {
      title: "A Simple Framework for KPI Ownership",
      date: "Feb 2026",
      category: "KPIs",
      author: "collins",
      content: `
## Why Ownership Matters
KPIs only work when someone owns them.

## The Framework
Assign responsibility, define cadence, and track actions.

## The Outcome
Clear accountability and better decisions.
      `,
    },

    "data-strategy-for-small-teams": {
      title: "Data Strategy for Small Teams",
      date: "Feb 2026",
      category: "Strategy",
      author: "collins",
      content: `
## Start Small
You don’t need a big team to build a strong data strategy.

## Focus on Impact
Prioritise decisions that matter most.

## Build Momentum
Small wins compound into clarity.
      `,
    },
  };

  // METADATA FOR RELATED ARTICLES
  const posts = Object.entries(articles).map(([slug, a]) => ({
    slug,
    title: a.title,
    excerpt: a.content.slice(0, 120) + "...",
    date: a.date,
    category: a.category,
  }));

  const article = articles[slug];

  // Extract headings for TOC
  const headings = Array.from(article.content.matchAll(/## (.*)/g)).map(
    (match) => ({
      id: match[1].toLowerCase().replace(/\s+/g, "-"),
      text: match[1],
    })
  );

  // Related articles
  const related = posts
    .filter((p) => p.slug !== slug && p.category === article.category)
    .slice(0, 2);

  return (
    <>
      <ReadingProgress />

      <BlogHero
        title={article.title}
        date={`${article.date} • ${getReadingTime(article.content)}`}
        category={article.category}
      />

      <BlogLayout
        content={article.content}
        headings={headings}
        author={authors[article.author]}
      />

      {/* Related Articles */}
      <section className="mt-28 container-wrapper max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-collin-navy mb-10">
          Related Articles
        </h3>

        <div className="grid md:grid-cols-2 gap-10">
          {related.map((r) => (
            <BlogCard
              key={r.slug}
              title={r.title}
              excerpt={r.excerpt}
              date={r.date}
              href={`/insights/${r.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
