import React from "react";

export default function StatsRow() {
  const stats = [
    { value: "5+ Years", label: "Analytics & Engineering Experience" },
    { value: "20+ Dashboards", label: "Delivered Across UK Teams" },
    { value: "100% UK‑Based", label: "Professional Consulting" },
    { value: "Hours Saved", label: "Through Reporting Automation" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-wrapper">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((s) => (
            <div key={s.value} className="space-y-2">
              <p className="text-3xl font-bold text-collin-navy">{s.value}</p>
              <p className="text-collin-slate text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
