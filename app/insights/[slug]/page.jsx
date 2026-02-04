import { notFound } from "next/navigation";

import BlogLayout from "@/components/insights/BlogLayout";
import BlogHero from "@/components/insights/BlogHero";
import ReadingProgress from "@/components/insights/ReadingProgress";
import BlogCard from "@/components/insights/BlogCard";

import { authors } from "@/components/data/authors";
import { getReadingTime } from "@/components/utils/readingTime";

/* ------------------ Content store ------------------ */

const ARTICLES = {
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
    title: "The 5-Step Framework for Operational Clarity",
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

  "anatomy-of-high-clarity-dashboard": {
    title: "The Anatomy of a High-Clarity Dashboard",
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

const POSTS = Object.entries(ARTICLES).map(([slug, a]) => ({
  slug,
  title: a.title,
  date: a.date,
  category: a.category,
  author: a.author,
  excerpt: makeExcerpt(a.content, 150),
}));

/* ------------------ Page ------------------ */

export default async function Page({ params }) {
  // ✅ Next may provide params as a Promise in some versions/routes
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const slug = resolvedParams?.slug;

  const article = ARTICLES[slug];
  if (!article) return notFound();

  const metaLine = `${article.date} • ${getReadingTime(article.content)}`;
  const headings = buildHeadings(article.content);
  const related = getRelatedPosts(slug, article.category);

  return (
    <>
      <ReadingProgress />

      <BlogHero title={article.title} date={metaLine} category={article.category} />

      <BlogLayout
        content={article.content}
        headings={headings}
        author={authors[article.author]}
      />

      {/* Related (dark navy/teal/slate – no glass) */}
      <section className="relative mt-24 sm:mt-28 overflow-hidden">
        {/* Dark brand background */}
        <div className="absolute inset-0 bg-collin-navy-gradient" aria-hidden="true" />

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]
          [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:72px_72px]"
          aria-hidden="true"
        />

        {/* Glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-collin-teal/16 blur-[120px]" />
          <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-collin-teal-light/12 blur-[120px]" />
        </div>

        <div className="container-wrapper relative z-10 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {/* Solid pill (no blur) */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
                  <p className="text-xs font-semibold tracking-widest text-white/80 uppercase">
                    Keep reading
                  </p>
                </div>

                <h3 className="mt-5 text-h3 text-white">Related articles</h3>

                <p className="mt-2 text-body text-white/70">
                  More on{" "}
                  <span className="font-semibold text-white">{article.category}</span>.
                </p>
              </div>

              <a
                href="/insights"
                className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10 transition w-full sm:w-auto"
              >
                View all insights <span className="ml-2" aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
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

            {/* CTA box (dark, brand-consistent) */}
            <div className="mt-12 rounded-3xl border border-white/10 bg-black/20 p-7 sm:p-9 shadow-2xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                    Want help applying this?
                  </p>
                  <h4 className="mt-2 text-h4 text-white">
                    Turn this insight into a practical reporting improvement.
                  </h4>
                  <p className="mt-3 text-body text-white/70 leading-relaxed">
                    If you’re dealing with manual reporting, unclear KPIs, or low confidence in numbers,
                    we can recommend the fastest first step to improve clarity.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <a href="/#contact" className="cta-primary cta-full">
                    Book a discovery call
                  </a>
                  <a href="/services" className="cta-secondary cta-full">
                    View services
                  </a>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Chip>KPIs</Chip>
                <Chip>Dashboards</Chip>
                <Chip>Automation</Chip>
                <Chip>Single source of truth</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------ helpers ------------------ */

function makeExcerpt(markdown, maxLen = 140) {
  const plain = (markdown || "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[`*_>#-]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  return plain.length <= maxLen ? plain : plain.slice(0, maxLen).trimEnd() + "…";
}

function buildHeadings(markdown) {
  const matches = Array.from((markdown || "").matchAll(/^##\s+(.*)$/gm));
  const seen = new Map();

  return matches.map((m) => {
    const text = (m[1] || "").trim();
    const base = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

    const count = (seen.get(base) || 0) + 1;
    seen.set(base, count);

    const id = count === 1 ? base : `${base}-${count}`;
    return { id, text };
  });
}

function getRelatedPosts(currentSlug, category) {
  const sameCategory = POSTS.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 2);
  if (sameCategory.length >= 2) return sameCategory;

  const fill = POSTS.filter((p) => p.slug !== currentSlug && !sameCategory.some((x) => x.slug === p.slug))
    .slice(0, 2 - sameCategory.length);

  return [...sameCategory, ...fill];
}

/* ------------------ small UI ------------------ */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}