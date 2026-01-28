export default function CategoryBadge({ category = "General", size = "md", subtle = false }) {
  const styles = {
    KPIs: {
      ring: "ring-collin-teal/15",
      bg: subtle ? "bg-white/10" : "bg-collin-teal/10",
      text: "text-collin-teal",
      border: "border-collin-teal/20",
      dot: "bg-collin-teal",
    },
    Dashboards: {
      ring: "ring-collin-navy/15",
      bg: subtle ? "bg-white/10" : "bg-collin-navy/10",
      text: "text-collin-navy",
      border: "border-collin-navy/20",
      dot: "bg-collin-navy",
    },
    Strategy: {
      ring: "ring-collin-teal-light/18",
      bg: subtle ? "bg-white/10" : "bg-collin-teal-light/20",
      text: "text-collin-navy",
      border: "border-collin-teal-light/30",
      dot: "bg-collin-teal-light",
    },
    Operations: {
      ring: "ring-gray-200/60",
      bg: subtle ? "bg-white/10" : "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-200",
      dot: "bg-gray-400",
    },
    General: {
      ring: "ring-gray-200/60",
      bg: subtle ? "bg-white/10" : "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-200",
      dot: "bg-gray-400",
    },
  };

  const s = styles[category] || styles.General;

  const sizeMap = {
    sm: {
      pad: "px-2.5 py-1",
      text: "text-[11px]",
      dot: "h-1.5 w-1.5",
    },
    md: {
      pad: "px-3 py-1.5",
      text: "text-xs sm:text-sm",
      dot: "h-1.5 w-1.5",
    },
    lg: {
      pad: "px-3.5 py-2",
      text: "text-sm",
      dot: "h-2 w-2",
    },
  };

  const z = sizeMap[size] || sizeMap.md;

  return (
    <span
      className={[
        "inline-flex items-center gap-2",
        "rounded-full border",
        "backdrop-blur-md",
        "shadow-sm",
        "ring-1",
        s.border,
        s.bg,
        s.text,
        s.ring,
        z.pad,
        z.text,
      ].join(" ")}
      aria-label={`Category: ${category}`}
    >
      <span className={["rounded-full", s.dot, z.dot].join(" ")} aria-hidden="true" />
      <span className="font-semibold tracking-wide">{category}</span>
    </span>
  );
}
