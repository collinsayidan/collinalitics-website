export default function TableOfContents({ headings }) {
  return (
    <aside className="sticky top-32 hidden lg:block w-64">
      <h4 className="text-collin-navy font-semibold mb-4">On this page</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-collin-teal hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
