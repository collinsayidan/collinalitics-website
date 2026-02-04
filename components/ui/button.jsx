// components/ui/button.jsx
import React from "react";

// Small utility (no dependency)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? "span" : "button";

  return (
    <Comp className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Comp>
  );
}

/* ---------------- Styles ---------------- */

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30",
  outline:
    "border border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800 hover:text-white",
  subtle:
    "bg-white/5 border border-white/15 text-white hover:bg-white/10",
  ghost:
    "text-slate-300 hover:bg-slate-800/60 hover:text-white",
  dark:
    "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-black/20",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};
