import type { Home } from "@/types/portfolio";

export function HomePreview({ data }: { data: Home }) {
  return (
    <article className="section-preview">
      <h1>Home</h1>
      <p>
        {data.name} · {data.role}
      </p>
    </article>
  );
}
