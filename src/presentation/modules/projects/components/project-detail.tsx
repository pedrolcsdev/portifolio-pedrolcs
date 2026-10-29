import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { copy } from "@/data/interface-copy";
import type { Project } from "@/types/portfolio";
import { TechnologyList } from "@/presentation/shared/components/technology-list";
import { Button } from "@/presentation/shared/components/ui/button";

export function ProjectDetail({ data }: { data: Project }) {
  return (
    <article className="preview-page project-detail">
      <Link href="/projects" className="back-link">
        <ArrowLeft size={14} aria-hidden="true" />
        {copy.projectBack}
      </Link>
      <div className="preview-eyebrow">
        {copy.projectsEyebrow}
        {data.status ? (
          <span className="project-status">{data.status}</span>
        ) : null}
      </div>
      <h1>{data.name}</h1>
      <p className="preview-description">{data.description}</p>
      <TechnologyList technologies={data.technologies} />
      {data.contribution ? (
        <section className="detail-section">
          <h2>{copy.contribution}</h2>
          <p>{data.contribution}</p>
        </section>
      ) : null}
      {data.architecture ? (
        <section className="detail-section">
          <h2>{copy.architecture}</h2>
          <p>{data.architecture}</p>
        </section>
      ) : null}
      {data.challenges?.length ? (
        <section className="detail-section">
          <h2>{copy.challenges}</h2>
          <ul>
            {data.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {data.repositoryUrl || data.documentationUrl ? (
        <div className="project-links">
          {data.repositoryUrl ? (
            <Button asChild variant="outline">
              <a
                href={data.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.repository}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          {data.documentationUrl ? (
            <Button asChild variant="outline">
              <a
                href={data.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.documentation}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
