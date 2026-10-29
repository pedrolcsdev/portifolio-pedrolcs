import type { Metadata } from "next";
import { projects } from "@/data/portfolio";
import { ProjectsPreview } from "@/presentation/modules/projects/components/projects-preview";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return <ProjectsPreview data={projects} />;
}
