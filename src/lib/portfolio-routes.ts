import { about, contacts, home, projects } from "@/data/portfolio";
import { copy } from "@/data/interface-copy";
import type { PortfolioResponse, Section } from "@/types/portfolio";

export const portfolioRoutes: {
  section: Section;
  label: string;
  href: string;
}[] = [
  { section: "home", label: "Home", href: "/" },
  { section: "projects", label: "Projects", href: "/projects" },
  { section: "about", label: "About", href: "/about" },
  { section: "contact", label: "Contact", href: "/contact" },
];

export function getActiveSection(pathname: string): Section | null {
  return (
    portfolioRoutes.find(
      ({ href }) =>
        pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)),
    )?.section ?? null
  );
}

export function resolvePortfolioRoute(pathname: string): PortfolioResponse {
  const path = pathname.replace(/\/+$/, "") || "/";
  const endpoint = path === "/" ? "/api/home" : `/api${path}`;
  const base = {
    endpoint,
    section: getActiveSection(path),
    status: 200,
    statusText: "OK",
  } as const;

  if (path === "/") return { ...base, kind: "home", data: home };
  if (path === "/projects")
    return { ...base, kind: "projects", data: projects };
  if (path === "/about") return { ...base, kind: "about", data: about };
  if (path === "/contact") return { ...base, kind: "contact", data: contacts };

  const project = projects.find(({ slug }) => path === `/projects/${slug}`);
  if (project) return { ...base, kind: "project", data: project };

  return {
    ...base,
    kind: "not-found",
    status: 404,
    statusText: "Not Found",
    data: { error: "NOT_FOUND", message: copy.notFoundDescription },
  };
}
