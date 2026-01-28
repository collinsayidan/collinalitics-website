export function getReadingTime(content = "") {
  if (!content || typeof content !== "string") {
    return "1 min read";
  }

  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}