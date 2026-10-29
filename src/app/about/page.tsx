import type { Metadata } from "next";
import { about } from "@/data/portfolio";
import { AboutPreview } from "@/presentation/modules/about/components/about-preview";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <AboutPreview data={about} />;
}
