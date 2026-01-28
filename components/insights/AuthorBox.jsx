import Image from "next/image";

export default function AuthorBox({ author }) {
  if (!author) return null;

  return (
    <div
      className={[
        "card card-pad",
        "mt-12",
        "flex items-center gap-5",
        "bg-white/95",
      ].join(" ")}
      aria-label="Author information"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Image
          src={author.avatar}
          alt={author.name}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
      </div>

      {/* Meta */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-collin-navy">
          {author.name}
        </p>

        {author.role && (
          <p className="text-sm text-collin-slate mt-0.5">
            {author.role}
          </p>
        )}

        {/* Optional credibility line */}
        {author.bio && (
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}