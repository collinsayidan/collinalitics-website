import TableOfContents from "./TableOfContents";
import AuthorBox from "./AuthorBox";

export default function BlogLayout({ content, headings, author }) {
  const parsed = content.replace(/## (.*)/g, (match, title) => {
    const id = title.toLowerCase().replace(/\s+/g, "-");
    return `<h2 id="${id}">${title}</h2>`;
  });

  return (
    <section className="container-wrapper max-w-6xl mx-auto flex gap-12">
      <TableOfContents headings={headings} />

      <div className="flex-1 max-w-3xl">
        <article
          className="prose prose-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />

        <AuthorBox author={author} />
      </div>
    </section>
  );
}
