import TableOfContents from "./TableOfContents";
import AuthorBox from "./AuthorBox";

export default function BlogLayout({ content, headings, author }) {
  const parsed = content.replace(/## (.*)/g, (match, title) => {
    const id = title.toLowerCase().replace(/\s+/g, "-");
    return `<h2 id="${id}">${title}</h2>`;
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 flex gap-12">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
        <TableOfContents headings={headings} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto">
        <article
          className="prose prose-lg prose-headings:font-semibold prose-headings:text-gray-900 
                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                     text-gray-700 leading-relaxed tracking-wide"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />

        {/* Divider */}
        <div className="my-12 h-px bg-gray-200" />

        {/* Author */}
        <AuthorBox author={author} />
      </div>
    </section>
  );
}
