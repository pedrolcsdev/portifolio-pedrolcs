import type { About, Contacts, Home, Project } from "@/types/portfolio";

export const identity = {
  domain: "pedrolcs.dev",
  role: "Backend Developer",
  tagline: "APIs. Systems. Solutions.",
};

export const home: Home = {
  name: "Pedro Lucas",
  role: identity.role,
  headline: "Building what you don’t see.",
  introduction:
    "I’m Pedro, a backend developer focused on the systems behind the interface. Explore my work through a different kind of API.",
};

export const projects: Project[] = [
  {
    slug: "sp-spaces",
    name: "SP Spaces",
    summary: "A platform for booking spaces.",
    description:
      "A space reservation platform with a REST API, persistence, and integrations.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    contribution: "REST API development, data persistence, and integrations.",
  },
  {
    slug: "gestao-portuaria",
    name: "Gestão Portuária",
    summary: "A port management platform.",
    description:
      "A port management platform currently in development, with a Java and Spring Boot backend.",
    technologies: ["Java", "Spring Boot"],
    status: "In development",
  },
];

export const about: About = {
  title: "Behind the interface.",
  introduction:
    "I’m Pedro, a backend developer interested in how software works beneath the surface: APIs, data, and the systems that connect them.",
  focus: [
    "Backend development",
    "REST APIs",
    "Data persistence & integrations",
  ],
  technologies: ["Java", "Spring Boot", "PostgreSQL"],
};

// Add your real contact details here; empty values are never rendered as links.
export const contacts: Contacts = {};
