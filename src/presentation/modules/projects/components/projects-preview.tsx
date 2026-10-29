import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/data/interface-copy";
import type { Project } from "@/types/portfolio";
import { TechnologyList } from "@/presentation/shared/components/technology-list";

export function ProjectsPreview({ data }: { data: Project[] }) {
  return (
    <section className="preview-page projects-preview">
      <div className="preview-eyebrow">
        {copy.projectsEyebrow}
        <span className="eyebrow-count">
          {String(data.length).padStart(2, "0")}
        </span>
      </div>
      <h1>{copy.projectsTitle}</h1>
      <p className="preview-description">{copy.projectsDescription}</p>
      <ul className="project-list">
        {data.map((project, index) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="project-row"
              aria-label={`${copy.projectDetails}: ${project.name}`}
            >
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="project-row-content">
                <div className="project-name-line">
                  <h2>{project.name}</h2>
                  {project.status ? (
                    <span className="project-status">{project.status}</span>
                  ) : null}
                </div>
                <p>{project.summary}</p>
                <TechnologyList technologies={project.technologies} />
              </div>
              <ArrowUpRight
                className="project-arrow"
                size={19}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
      <p className="collection-count">
        <span className="small-dot" />
        {data.length} {copy.projectsCount}
      </p>
    </section>
  );
}
