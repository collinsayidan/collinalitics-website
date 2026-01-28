import Link from "next/link";

export default function BlogCard({ title, excerpt, date, href, tag }) {
  return (
    <Link
      href={href}
      className={[
        "group card card-pad bg-white/95",
        "rounded-2xl",
        "hover:border-collin-teal/30",
        "transition-all",
      ].join(" ")}
      aria-label={`Read article: ${title}`}
    >
      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-caption text-collin-slate">{date}</p>

        {tag && (
          <span className="inline-flex items-center rounded-full border border-collin-teal/20 bg-collin-teal/10 px-3 py-1 text-xs font-medium text-collin-teal">
            {tag}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-3 text-h4 text-collin-navy leading-snug transition-colors group-hover:text-collin-teal">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="mt-4 text-body text-gray-700 leading-relaxed">
        {excerpt}
      </p>

      {/* CTA */}
      <div className="mt-7 inline-flex items-center gap-2 text-collin-teal font-semibold">
        <span className="text-sm">Read article</span>
        <span
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}