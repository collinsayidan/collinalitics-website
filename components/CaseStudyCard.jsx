export default function CaseStudyCard({ title, sector, outcome, href, image }) {
  return (
    <a
      href={href}
      className={[
        "group block rounded-2xl overflow-hidden",
        "bg-white border border-gray-200 shadow-sm",
        "transition-all duration-300 ease-out",
        "hover:shadow-xl hover:-translate-y-1 hover:border-collin-teal/40",
      ].join(" ")}
    >
      {/* Optional image */}
      {image && (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Gradient accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-collin-teal to-collin-teal-light" />

      {/* Content */}
      <div className="p-6 sm:p-7">
        {/* Sector chip */}
        <span className="inline-flex items-center px-3 py-1 rounded-full text-caption font-medium bg-collin-teal/10 text-collin-teal">
          {sector}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-h4 text-collin-navy leading-snug transition-colors group-hover:text-collin-teal">
          {title}
        </h3>

        {/* Outcome */}
        <p className="mt-3 text-body text-gray-700 leading-relaxed">
          {outcome}
        </p>

        {/* CTA */}
        <div className="mt-5 flex items-center gap-2 text-collin-teal font-medium">
          <span>Read case study</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </a>
  );
}
