import Link from "next/link";
import { copy } from "@/data/interface-copy";
import type { Project } from "@/types/portfolio";

export function ProjectDetail({ data }: { data: Project }) {
  return (
    <article className="section-preview">
      <h1>{data.name}</h1>
      <p>{data.summary}</p>
      <Link className="preview-back" href="/projects">
        {copy.projectBack}
      </Link>
    </article>
  );
}
