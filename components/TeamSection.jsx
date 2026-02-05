"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Premium Team Section (Light + Dark)
 * - Light mode default
 * - Dark mode matches your current dark premium design
 * - Featured leader card
 * - Card click opens modal
 * - ESC closes
 */

const TEAM = [
  {
    id: "collins",
    name: "Collins Ayidan",
    role: "Founder & Lead Analytics Engineer",
    school: "University of Stirling (UK)",
    degree: "MSc. Mathematics and Data Science",
    image: "/images/team/Founder06.jpg",
    linkedin: "https://www.linkedin.com/in/collins-ayidan/",
    featured: true,
    bio:
      "Collins leads delivery across analytics engineering and BI helping teams replace fragmented reporting with reliable metrics, automated pipelines, and decision-ready dashboards.",
    expertise: [
      "Analytics engineering",
      "KPI frameworks",
      "Power BI delivery",
      "Stakeholder reporting",
      "Data governance",
    ],
    strengths: ["Clear scope", "Maintainable foundations", "Executive-ready insight"],
  },
  {
    id: "aisha",
    name: "Aisha Khan",
    role: "BI Consultant",
    school: "University of Glasgow (UK)",
    image: "/images/team/aisha-khan.jpg",
    linkedin: "https://www.linkedin.com/in/your-link",
    bio:
      "Aisha designs dashboards leaders trust focusing on crisp metric definitions, clean layouts, and reporting packs that reduce manual effort.",
    expertise: ["Power BI", "Executive dashboards", "Reporting automation", "Data QA"],
    strengths: ["Stakeholder clarity", "Strong UX for data", "Outcome-led delivery"],
  },
  {
    id: "david",
    name: "David Okoye",
    role: "Data Analyst",
    school: "Heriot-Watt University (UK)",
    image: "/images/team/david-okoye.jpg",
    linkedin: "https://www.linkedin.com/in/your-link",
    bio:
      "David turns raw data into sharp insight using SQL, modelling, and clear storytelling to help teams track performance with confidence.",
    expertise: ["SQL", "Data modelling", "Insight storytelling", "Operational analytics"],
    strengths: ["Clarity", "Accuracy", "Pragmatic recommendations"],
  },
  {
    id: "Yaw",
    name: "Yaw Asante",
    role: "Data & Systems Consultant",
    school: "Kwame Nkrumah University of Science and Technology (Ghana/UK)",
    image: "/images/team/yaw-asante.png",
    linkedin: "https://www.linkedin.com/in/yasante7/",
    bio:
      "Asante improves systems and processes end-to-end aligning stakeholders, documenting requirements, and reducing friction across operations.",
    expertise: ["Systems analysis", "Requirements", "Process improvement", "Governance"],
    strengths: ["Structured discovery", "Practical delivery", "Stakeholder alignment"],
  },
];

export default function TeamSection() {
  const team = useMemo(() => TEAM, []);
  const featured = team.find((m) => m.featured) || team[0];
  const rest = team.filter((m) => m.id !== featured.id);

  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={[
        "relative overflow-hidden py-20 sm:py-24",
        // ✅ Light default
        "bg-gray-50 text-gray-900",
        // ✅ Dark mode (keeps your current look)
        "dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-white",
      ].join(" ")}
    >
      {/* Background: glows + grid */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        {/* Light glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl dark:hidden" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl dark:hidden" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl dark:hidden" />

        {/* Dark glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl hidden dark:block" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl hidden dark:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl hidden dark:block" />

        {/* Grid */}
        <div
          className={[
            "absolute inset-0 opacity-[0.14]",
            "[background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)]",
            "dark:opacity-[0.18]",
            "dark:[background-image:linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)]",
            "[background-size:72px_72px]",
          ].join(" ")}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 dark:from-black/45 dark:to-black/10" />
      </div>

      <div className="container-wrapper relative">
        {/* Header */}
        <header className="max-w-3xl">
          <div
            className={[
              "inline-flex items-center gap-2 rounded-full border px-4 py-2",
              "border-gray-200 bg-white/70",
              "dark:border-slate-800 dark:bg-slate-950/40",
            ].join(" ")}
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-collin-teal" />
            <p className="text-xs font-semibold tracking-widest text-gray-600 uppercase dark:text-white/80">
              Team
            </p>
          </div>

          <h2 id="team-heading" className="mt-5 text-h2 text-collin-navy dark:text-white">
            Specialist delivery. Executive-grade clarity.
          </h2>

          <p className="mt-4 text-bodylg text-gray-700/90 dark:text-white/75 leading-relaxed">
            We combine analytics engineering, BI, and consulting to deliver reporting leaders trust
            with maintainable foundations and measurable outcomes.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Pill>UK-based delivery</Pill>
            <Pill>Governed metrics</Pill>
            <Pill>Automation-first</Pill>
            <Pill>Stakeholder-ready outputs</Pill>
          </div>
        </header>

        {/* Featured Leader */}
        <div className="mt-12">
          <FeaturedLeader member={featured} onOpen={() => setActive(featured)} />
        </div>

        {/* Team grid */}
        <div className="mt-12">
          {/* Mobile scroll */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {rest.map((m) => (
                <div key={m.id} className="snap-start min-w-[86%]">
                  <TeamCard member={m} onOpen={() => setActive(m)} />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-white/60">Swipe to explore →</p>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((m) => (
              <TeamCard key={m.id} member={m} onOpen={() => setActive(m)} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={[
            "mt-14 rounded-3xl border p-6 sm:p-8",
            "border-gray-200 bg-white/70 shadow-[0_18px_70px_rgba(2,12,27,0.10)]",
            "dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
          ].join(" ")}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-collin-navy dark:text-white">
                Want a recommended first step?
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-white/70">
                Share your reporting or KPI challenge — we’ll propose a practical approach.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#contact" className="cta-primary cta-full">
                Book a discovery call
              </Link>
              <Link href="/case-studies" className="cta-secondary cta-full">
                View case studies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {active && <ProfileModal member={active} onClose={() => setActive(null)} />}
    </section>
  );
}

/* ---------------- Featured Leader ---------------- */

function FeaturedLeader({ member, onOpen }) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl border",
        "border-gray-200 bg-white/80 shadow-[0_18px_70px_rgba(2,12,27,0.10)]",
        "dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_18px_70px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      {/* top accent rail */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-collin-teal via-collin-teal-light to-collin-teal"
      />

      <div className="relative p-7 sm:p-9">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <div
              className={[
                "relative aspect-square w-24 sm:w-28 lg:w-full lg:max-w-[260px] overflow-hidden rounded-3xl border",
                "bg-gray-100 border-gray-200",
                "dark:bg-slate-950/30 dark:border-slate-800",
              ].join(" ")}
            >
              <Image
                src={member.image}
                alt={`${member.name} headshot`}
                fill
                sizes="(min-width: 1024px) 260px, 120px"
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Leadership</Badge>
              <VerifiedBadge />
              <SoftPill>Delivery-led</SoftPill>
              <SoftPill>UK-based</SoftPill>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-h3 text-collin-navy dark:text-white">{member.name}</h3>
                <p className="mt-2 text-body text-gray-700 dark:text-white/70">{member.role}</p>
              </div>

              {member.linkedin ? (
                <IconButton href={member.linkedin} label={`Open ${member.name}'s LinkedIn`} title="LinkedIn">
                  <LinkedInIcon className="h-5 w-5" />
                </IconButton>
              ) : null}
            </div>

            <p className="mt-4 text-sm text-gray-700 dark:text-white/75">
              <span className="font-semibold text-collin-navy dark:text-white">School:</span>{" "}
              {member.degree ? `${member.degree} • ${member.school}` : member.school}
            </p>

            <p className="mt-4 text-sm text-gray-700 dark:text-white/75 leading-relaxed">{member.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {member.expertise?.slice(0, 5).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpen}
                className={[
                  "inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold transition",
                  "bg-white border-gray-200 text-collin-navy hover:bg-gray-50",
                  "dark:bg-slate-950/60 dark:border-slate-800 dark:text-white dark:hover:bg-slate-950/75",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/30",
                ].join(" ")}
              >
                View profile <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-xl bg-collin-teal px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-collin-teal/20 hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/30"
              >
                Work with the team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Team Card ---------------- */

function TeamCard({ member, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        "group relative w-full text-left overflow-hidden rounded-3xl border transition",
        "border-gray-200 bg-white/80 shadow-[0_14px_55px_rgba(2,12,27,0.10)] hover:bg-white hover:-translate-y-0.5",
        "dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_14px_55px_rgba(0,0,0,0.30)] dark:hover:bg-slate-900/85",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/25",
      ].join(" ")}
      aria-label={`Open profile for ${member.name}`}
    >
      {/* accent rail */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-collin-teal/70 via-collin-teal-light/70 to-collin-teal/70 opacity-80"
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <div
              className={[
                "relative h-14 w-14 overflow-hidden rounded-2xl border",
                "bg-gray-100 border-gray-200",
                "dark:bg-slate-950/40 dark:border-slate-800",
              ].join(" ")}
            >
              <Image src={member.image} alt={`${member.name} headshot`} fill sizes="56px" className="object-cover" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-collin-navy dark:text-white truncate">{member.name}</h3>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-white/70 truncate">{member.role}</p>
            </div>
          </div>

          {/* LinkedIn icon reveal (desktop) */}
          {member.linkedin ? (
            <span
              className={[
                "hidden sm:inline-flex",
                "opacity-0 translate-y-1",
                "group-hover:opacity-100 group-hover:translate-y-0",
                "transition duration-200",
              ].join(" ")}
            >
              <span className="pointer-events-auto">
                <IconButton
                  href={member.linkedin}
                  label={`Open ${member.name}'s LinkedIn`}
                  title="LinkedIn"
                  onClickStopPropagation
                >
                  <LinkedInIcon className="h-5 w-5" />
                </IconButton>
              </span>
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-sm text-gray-700 dark:text-white/75">
          <span className="font-semibold text-collin-navy dark:text-white">School:</span>{" "}
          {member.degree ? `${member.degree} • ${member.school}` : member.school}
        </p>

        <p className="mt-3 text-sm text-gray-700 dark:text-white/75 leading-relaxed line-clamp-3">
          {member.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {member.expertise?.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-semibold text-collin-navy dark:text-white">View profile</span>
          <ArrowRightIcon className="h-4 w-4 text-gray-400 dark:text-white/60 group-hover:text-collin-teal transition" />
        </div>
      </div>
    </button>
  );
}

/* ---------------- Modal ---------------- */

function ProfileModal({ member, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200]">
      <button
        className="absolute inset-0 bg-black/55"
        aria-label="Close profile modal"
        onClick={onClose}
      />

      <div className="absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center p-3 sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${member.name} profile`}
          className={[
            "relative w-full sm:max-w-2xl overflow-hidden",
            "rounded-t-3xl sm:rounded-3xl border",
            "border-gray-200 bg-white shadow-[0_30px_90px_rgba(2,12,27,0.20)]",
            "dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_30px_90px_rgba(0,0,0,0.60)]",
          ].join(" ")}
        >
          {/* top rail */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-collin-teal via-collin-teal-light to-collin-teal"
          />

          {/* Header */}
          <div
            className={[
              "px-6 pt-7 pb-5 border-b",
              "border-gray-200 bg-white",
              "dark:border-slate-800 dark:bg-slate-950",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={[
                    "relative h-14 w-14 overflow-hidden rounded-2xl border",
                    "bg-gray-100 border-gray-200",
                    "dark:bg-slate-900 dark:border-slate-800",
                  ].join(" ")}
                >
                  <Image src={member.image} alt={`${member.name} headshot`} fill sizes="56px" className="object-cover" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-collin-navy dark:text-white">{member.name}</h3>
                    {member.featured ? <VerifiedBadge /> : null}
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-white/70">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {member.linkedin ? (
                  <IconButton href={member.linkedin} label={`Open ${member.name}'s LinkedIn`} title="LinkedIn">
                    <LinkedInIcon className="h-5 w-5" />
                  </IconButton>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  className={[
                    "inline-flex items-center justify-center h-10 w-10 rounded-xl border transition",
                    "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
                    "dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/25",
                  ].join(" ")}
                  aria-label="Close modal"
                  title="Close"
                >
                  <CloseMini />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="grid gap-6 sm:grid-cols-12">
              <div className="sm:col-span-7">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-white/75">{member.bio}</p>

                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-white/55">
                    Expertise
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.expertise?.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-5">
                <div
                  className={[
                    "rounded-2xl border p-5",
                    "border-gray-200 bg-gray-50",
                    "dark:border-slate-800 dark:bg-slate-900/60",
                  ].join(" ")}
                >
                  <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-white/55">
                    Education
                  </p>
                  <p className="mt-2 text-sm font-semibold text-collin-navy dark:text-white">
                    {member.degree ? `${member.degree}` : null}
                  </p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-white/75">{member.school}</p>

                  {member.strengths?.length ? (
                    <>
                      <div className="mt-5 h-px w-full bg-gray-200 dark:bg-slate-800" />
                      <p className="mt-5 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-white/55">
                        Delivery style
                      </p>
                      <ul className="mt-3 space-y-2">
                        {member.strengths.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-gray-700 dark:text-white/75">
                            <CheckIcon className="mt-[2px] h-4 w-4 text-collin-teal" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <Link href="/#contact" className="cta-primary cta-full">
                    Work with Collinalitics
                  </Link>
                  <button type="button" onClick={onClose} className="cta-secondary cta-full">
                    Back to team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="px-6 pb-7">
            <p className="text-xs text-gray-500 dark:text-white/55">
              Tip: Press <span className="font-semibold text-gray-800 dark:text-white">ESC</span> to close.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- UI bits (Theme-aware) ---------------- */

function Pill({ children }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        "border-gray-200 bg-white/70 text-gray-700",
        "dark:border-slate-800 dark:bg-slate-950/40 dark:text-white/85",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function SoftPill({ children }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        "border-gray-200 bg-white text-gray-700",
        "dark:border-slate-800 dark:bg-slate-900/60 dark:text-white/85",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-collin-teal/15 border border-collin-teal/20 px-3 py-1 text-xs font-semibold text-collin-teal">
      {children}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
        "border-gray-200 bg-white text-gray-700",
        "dark:border-slate-800 dark:bg-slate-900/60 dark:text-white/90",
      ].join(" ")}
    >
      <VerifiedIcon className="h-4 w-4 text-collin-teal" />
      Verified
    </span>
  );
}

function Tag({ children }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        "border-gray-200 bg-white text-gray-700",
        "dark:border-slate-800 dark:bg-slate-950/35 dark:text-white/85",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/**
 * IconButton (theme-aware)
 * - Optional stopPropagation for use inside clickable cards
 */
function IconButton({ href, label, title, children, onClickStopPropagation }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={title}
      onClick={(e) => {
        if (onClickStopPropagation) e.stopPropagation();
      }}
      className={[
        "inline-flex items-center justify-center h-10 w-10 rounded-xl border transition",
        "border-gray-200 bg-white text-gray-700 hover:text-collin-teal hover:bg-gray-50",
        "dark:border-slate-800 dark:bg-slate-950/40 dark:text-white/85 dark:hover:bg-slate-950/60",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-collin-teal/30",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

/* ---------------- Icons ---------------- */

function ArrowRightIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

function LinkedInIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.32V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function VerifiedIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.2 3.4 4 .9-2.7 3.2.4 4.1-3.9-1.5-3.9 1.5.4-4.1L5.8 6.3l4-.9L12 2zm-1.1 12.1l5-5a1 1 0 011.4 1.4l-5.7 5.7a1 1 0 01-1.4 0l-2.6-2.6a1 1 0 011.4-1.4l1.9 1.9z" />
    </svg>
  );
}

function CloseMini() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}