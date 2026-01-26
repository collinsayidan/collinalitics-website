export default function AuthorBox({ author }) {
  return (
    <div className="flex items-center gap-4 mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <img src={author.avatar} className="h-14 w-14 rounded-full" />
      <div>
        <p className="font-semibold text-collin-navy">{author.name}</p>
        <p className="text-sm text-collin-slate">{author.role}</p>
      </div>
    </div>
  );
}
