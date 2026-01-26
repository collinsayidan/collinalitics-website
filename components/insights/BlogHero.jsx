import CategoryBadge from "./CategoryBadge";

export default function BlogHero({ title, date, category }) {
  return (
    <div className="relative py-24 bg-gradient-to-b from-collin-navy to-collin-teal/60 text-white rounded-3xl overflow-hidden mb-16">
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/patterns/grid.svg')]" />

      <div className="relative z-10 container-wrapper max-w-3xl mx-auto">
        <CategoryBadge category={category} />

        <p className="text-sm opacity-80 mt-4">{date}</p>

        <h1 className="text-4xl font-bold mt-3 leading-tight">{title}</h1>

        <div className="h-px w-24 bg-white/40 mt-6" />
      </div>
    </div>
  );
}
