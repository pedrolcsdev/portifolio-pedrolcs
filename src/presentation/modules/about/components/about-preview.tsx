import type { About } from "@/types/portfolio";

export function AboutPreview({ data }: { data: About }) {
  return (
    <article className="section-preview">
      <h1>About</h1>
      <p>{data.technologies.join(" · ")}</p>
    </article>
  );
}
