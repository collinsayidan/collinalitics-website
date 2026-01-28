"use client";

import React, { useMemo } from "react";
import TableOfContents from "./TableOfContents";
import AuthorBox from "./AuthorBox";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractFirstParagraph(markdown) {
  const text = (markdown || "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[`*_>#-]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "";
  // Grab a reasonable intro sentence/line
  return text.length > 180 ? text.slice(0, 180).trimEnd() + "…" : text;
}

export default function BlogLayout({ content, headings, author, title, subtitle }) {
  const { html, takeaways } = useMemo(() => {
    const seen = new Map();

    const blocks = (content || "").trim().split(/\n\s*\n/);

    const takeawayBlocks = blocks
      .filter((b) => b.trim().startsWith("## "))
      .slice(0, 3)
      .map((b) => b.replace(/^##\s+/g, "").trim())
      .filter(Boolean);

    // Basic markdown -> HTML for the content you currently use (## headings + paragraphs)
    const html = (content || "")
      // Headings -> h2 with unique ids
      .replace(/##\s+(.*)/g, (_match, rawTitle) => {
        const base = slugify(rawTitle);
        const count = (seen.get(base) ?? 0) + 1;
        seen.set(base, count);
        const id = count === 1 ? base : `${base}-${count}`;
        return `<h2 id="${id}">${rawTitle}</h2>`;
      })
      // Paragraphs (simple)
      .split(/\n\s*\n/)
      .map((chunk) => {
        const c = chunk.trim();
        if (!c) return "";
        if (c.startsWith("<h2")) return c;
        // bullets (very light support)
        if (c.startsWith("- ")) {
          const items = c
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.startsWith("- "))
            .map((l) => `<li>${l.replace(/^-+\s+/, "")}</li>`)
            .join("");
          return `<ul>${items}</ul>`;
        }
        return `<p>${c.replace(/\n/g, " ")}</p>`;
      })
      .join("");

    return { html, takeaways: takeawayBlocks };
  }, [content]);

  const intro = useMemo(() => (subtitle ? subtitle : extractFirstParagraph(content)), [subtitle, content]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle texture for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-[url('/patterns/grid.svg')] pointer-events-none"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-collin-teal-light/14 blur-3xl" />
        <div className="absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-collin-teal/10 blur-3xl" />
      </div>

      <div className="container-wrapper relative z-10 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Optional internal header */}
          {(title || intro) && (
            <header className="mx-auto max-w-4xl mb-10 sm:mb-12">
              {title && (
                <h1 className="text-h2 text-collin-navy leading-tight">
                  {title}
                </h1>
              )}
              {intro && (
                <p className="mt-4 text-bodylg text-collin-slate leading-relaxed">
                  {intro}
                </p>
              )}
            </header>
          )}

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 items-start">
            {/* Main */}
            <main className="min-w-0">
              {/* Key takeaways (professional UX) */}
              {takeaways.length > 0 && (
                <section
                  aria-label="Key takeaways"
                  className="mb-10 rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-8 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                        Key takeaways
                      </p>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        The most useful points, upfront — so you can skim with confidence.
                      </p>
                    </div>

                    <div
                      className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-collin-teal/10 text-collin-teal"
                      aria-hidden="true"
                    >
                      <BoltIcon className="h-6 w-6" />
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {takeaways.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-teal/10 text-collin-teal">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Mobile TOC */}
              {headings?.length > 0 && (
                <div className="lg:hidden mb-10">
                  <details className="rounded-3xl border border-gray-200 bg-white/95 p-6 shadow-soft">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                            On this page
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            Jump to a section
                          </p>
                        </div>
                        <span className="text-collin-navy/70" aria-hidden="true">
                          <ChevronDownIcon className="h-5 w-5" />
                        </span>
                      </div>
                    </summary>
                    <div className="mt-5">
                      <TableOfContents headings={headings} />
                    </div>
                  </details>
                </div>
              )}

              {/* Article */}
              <article
                className={[
                  "rounded-3xl border border-gray-200 bg-white/95 p-7 sm:p-9 shadow-soft",
                  "prose prose-lg max-w-none",
                  "prose-headings:font-semibold prose-headings:text-collin-navy",
                  "prose-h2:scroll-mt-28 prose-h3:scroll-mt-28",
                  "prose-p:text-gray-700",
                  "prose-strong:text-collin-navy",
                  "prose-a:text-collin-teal prose-a:no-underline hover:prose-a:underline",
                  "prose-li:text-gray-700",
                  "prose-hr:border-gray-200",
                  "leading-relaxed",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Author */}
              <div className="mt-12">
                <div className="h-px bg-gray-200 mb-10" aria-hidden="true" />
                <AuthorBox author={author} />
              </div>
            </main>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block sticky top-24 h-fit">
              <div className="rounded-3xl border border-gray-200 bg-white/95 p-6 shadow-soft">
                <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                  On this page
                </p>

                <div className="mt-4">
                  <TableOfContents headings={headings} />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold tracking-widest text-collin-slate uppercase">
                    Next step
                  </p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Want help applying this to your reporting and KPIs?
                  </p>

                  <a
                    href="/#contact"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-collin-teal px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition"
                  >
                    Book a discovery call
                    <span className="ml-2" aria-hidden="true">
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </a>

                  <a
                    href="/services"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-collin-navy hover:bg-gray-50 transition"
                  >
                    View services
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Icons ---------- */

function CheckIcon({ className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BoltIcon({ className = "" }) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h7l-1 8 11-14h-7l1-6Z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

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