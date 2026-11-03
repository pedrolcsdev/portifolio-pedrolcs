import { about, contacts, home, projects } from "@/data/portfolio";
import { HomePreview } from "@/presentation/modules/home/components/home-preview";

export default function HomePage() {
  return <HomePreview data={home} projects={projects} about={about} contacts={contacts} />;
}
