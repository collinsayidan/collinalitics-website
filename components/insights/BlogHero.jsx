import CategoryBadge from "./CategoryBadge";

export default function BlogHero({ title, date, category }) {
  return (
    <div className="relative py-28 bg-gradient-to-b from-collin-navy to-collin-teal/70 text-white rounded-3xl overflow-hidden mb-20">

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('/patterns/grid.svg')]" />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 container-wrapper max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <CategoryBadge category={category} />
        </div>

        <p className="text-sm opacity-80 mt-6 tracking-wide">
          {date}
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight tracking-tight">
          {title}
        </h1>

        <div className="h-px w-28 bg-white/40 mt-8" />
      </div>
    </div>
  );
}
