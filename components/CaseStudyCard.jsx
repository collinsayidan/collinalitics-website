import Link from "next/link";
import Image from "next/image";

export default function CaseStudyCard({ title, sector, outcome, href, image }) {
  return (
    <Link
      href={href}
      className={[
        "group block overflow-hidden rounded-3xl",
        "border border-gray-200 bg-white/95",
        "shadow-[0_18px_50px_-35px_rgba(0,0,0,0.35)]",
        "transition duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_28px_70px_-40px_rgba(0,0,0,0.45)]",
        "hover:border-collin-teal/35",
        "ring-1 ring-transparent hover:ring-collin-teal/10",
      ].join(" ")}
      aria-label={`Read case study: ${title}`}
    >
      {/* Image / Preview */}
      {image ? (
        <div className="relative">
          {/* “Browser chrome” header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            </div>

            <span className="hidden sm:inline-flex items-center rounded-full bg-collin-teal/10 px-3 py-1 text-xs font-semibold text-collin-teal">
              Case study
            </span>
          </div>

          <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              priority={false}
            />

            {/* Premium overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
              aria-hidden="true"
            />
          </div>

          {/* Accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-collin-teal to-collin-teal-light" />
        </div>
      ) : (
        <div className="h-1.5 w-full bg-gradient-to-r from-collin-teal to-collin-teal-light" />
      )}

      {/* Content */}
      <div className="p-6 sm:p-7">
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-collin-teal/20 bg-collin-teal/10 px-3 py-1 text-xs font-semibold text-collin-teal">
            {sector}
          </span>

          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-collin-navy">
            Outcome
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-h4 text-collin-navy leading-snug transition-colors group-hover:text-collin-teal">
          {title}
        </h3>

        {/* Outcome */}
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {outcome}
        </p>

        {/* Footer CTA */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-collin-teal">
            Read case study
          </span>

          <span
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
              "border border-gray-200 bg-white",
              "text-collin-navy",
              "transition group-hover:border-collin-teal/30 group-hover:text-collin-teal",
            ].join(" ")}
            aria-hidden="true"
          >
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6" />
    </svg>
  );
}