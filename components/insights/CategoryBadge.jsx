export default function CategoryBadge({ category }) {
  const colors = {
    KPIs: "bg-collin-teal/10 text-collin-teal",
    Dashboards: "bg-collin-navy/10 text-collin-navy",
    Strategy: "bg-collin-lightTeal/20 text-collin-navy",
    Operations: "bg-gray-200 text-gray-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[category]}`}>
      {category}
    </span>
  );
}
