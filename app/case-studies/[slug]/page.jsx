export default function CaseStudyCard({ title, sector, outcome, href }) {
  return (
    <a
      href={href}
      className="block p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-collin-teal/40 transition-all"
    >
      <p className="text-sm text-collin-slate uppercase tracking-wide">{sector}</p>
      <h3 className="text-xl font-semibold text-collin-navy mt-2">{title}</h3>
      <p className="text-gray-700 mt-4">{outcome}</p>
      <p className="mt-6 text-collin-teal font-medium">Read case study →</p>
    </a>
  );
}
