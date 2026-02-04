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
  return text.length > 180 ? text.slice(0, 180).trimEnd() + "…" : text;
}

export default function BlogLayout({ content, headings, author, title, subtitle }) {
  const { html, takeaways } = useMemo(() => {
    const seen = new Map();
    const blocks = (content || "").trim().split(/\n\s*\n/);

    // Take first 3 H2 headings as takeaways (your current approach)
    const takeawayBlocks = blocks
      .filter((b) => b.trim().startsWith("## "))
      .slice(0, 3)
      .map((b) => b.replace(/^##\s+/g, "").trim())
      .filter(Boolean);

    const html = (content || "")
      .replace(/##\s+(.*)/g, (_match, rawTitle) => {
        const base = slugify(rawTitle);
        const count = (seen.get(base) ?? 0) + 1;
        seen.set(base, count);
        const id = count === 1 ? base : `${base}-${count}`;
        return `<h2 id="${id}">${rawTitle}</h2>`;
      })
      .split(/\n\s*\n/)
      .map((chunk) => {
        const c = chunk.trim();
        if (!c) return "";
        if (c.startsWith("<h2")) return c;

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

  const intro = useMemo(
    () => (subtitle ? subtitle : extractFirstParagraph(content)),
    [subtitle, content]
  );

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      aria-label="Article content"
    >
      {/* Background: glows + grid (matches Services/Footer style) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-collin-teal/12 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-collin-teal-light/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="container-wrapper relative z-10 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Optional internal header */}
          {(title || intro) && (
            <header className="mx-auto max-w-4xl mb-10 sm:mb-12 text-center">
              {title && (
                <h1 className="text-[2rem] sm:text-[2.4rem] md:text-[2.7rem] font-semibold tracking-tight text-white leading-tight">
                  {title}
                </h1>
              )}
              {intro && (
                <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                  {intro}
                </p>
              )}
              <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-collin-teal" aria-hidden="true" />
            </header>
          )}

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 items-start">
            {/* Main */}
            <main className="min-w-0">
              {/* Key takeaways */}
              {takeaways.length > 0 && (
                <section
                  aria-label="Key takeaways"
                  className={[
                    "mb-10 rounded-3xl border border-slate-800",
                    "bg-slate-900/60 backdrop-blur-xl",
                    "p-7 sm:p-8 shadow-[0_22px_70px_rgba(0,0,0,0.35)]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                        Key takeaways
                      </p>
                      <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">
                        The most useful points, upfront — so you can skim with confidence.
                      </p>
                    </div>

                    <div
                      className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-collin-teal/12 text-collin-teal"
                      aria-hidden="true"
                    >
                      <BoltIcon className="h-6 w-6" />
                    </div>
                  </div>

                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {takeaways.map((t) => (
                      <li
                        key={t}
                        className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/35 p-4"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-collin-teal/12 text-collin-teal">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        <span className="text-sm text-slate-200 leading-relaxed">
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
                  <details className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.30)]">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                            On this page
                          </p>
                          <p className="mt-1 text-sm text-slate-300">
                            Jump to a section
                          </p>
                        </div>
                        <span className="text-white/70" aria-hidden="true">
                          <ChevronDownIcon className="h-5 w-5" />
                        </span>
                      </div>
                    </summary>

                    <div className="mt-5">
                      {/* Ensure your TOC link styles work on dark */}
                      <TableOfContents headings={headings} />
                    </div>
                  </details>
                </div>
              )}

              {/* Article */}
              <article
                className={[
                  "rounded-3xl border border-slate-800",
                  "bg-slate-900/60 backdrop-blur-xl",
                  "p-7 sm:p-9 shadow-[0_22px_70px_rgba(0,0,0,0.35)]",
                  "prose prose-lg max-w-none",
                  "prose-headings:font-semibold prose-headings:text-white",
                  "prose-h2:scroll-mt-28 prose-h3:scroll-mt-28",
                  "prose-p:text-slate-200/90",
                  "prose-strong:text-white",
                  "prose-a:text-collin-teal prose-a:no-underline hover:prose-a:underline",
                  "prose-li:text-slate-200/90",
                  "prose-hr:border-slate-800",
                  "leading-relaxed",
                ].join(" ")}
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Author */}
              <div className="mt-12">
                <div className="h-px bg-slate-800 mb-10" aria-hidden="true" />
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.30)]">
                  <AuthorBox author={author} />
                </div>
              </div>
            </main>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block sticky top-24 h-fit">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 shadow-[0_18px_60px_rgba(0,0,0,0.30)]">
                <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                  On this page
                </p>

                <div className="mt-4">
                  <TableOfContents headings={headings} />
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                    Next step
                  </p>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
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
                    className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-slate-900/60 transition"
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