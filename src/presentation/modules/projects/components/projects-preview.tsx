import Link from "next/link";
import { copy } from "@/data/interface-copy";
import type { Project } from "@/types/portfolio";

export function ProjectsPreview({ data }: { data: Project[] }) {
  return (
    <section className="section-preview">
      <h1>Projects</h1>
      <p>
        {data.length} {copy.projectsCount}
      </p>
      <ul className="preview-links">
        {data.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${copy.projectDetails}: ${project.name}`}
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
