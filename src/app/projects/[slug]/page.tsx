import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { resolvePortfolioRoute } from "@/lib/portfolio-routes";
import { ProjectDetail } from "@/presentation/modules/projects/components/project-detail";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  return { title: project?.name ?? "Project not found" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = resolvePortfolioRoute(`/projects/${slug}`);
  if (response.kind !== "project") notFound();
  return <ProjectDetail data={response.data} />;
}
