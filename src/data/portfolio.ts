import type { About, Contacts, Home, Project } from "@/types/portfolio";

export const identity = {
  domain: "pedrolcs.dev",
  role: "Backend Developer",
  tagline: "APIs. Systems. Solutions.",
};

export const home: Home = {
  name: "Pedro Lucas",
  role: identity.role,
  headline: identity.tagline,
  introduction: "Desenvolvimento de APIs, arquiteturas e soluções de software.",
};

export const projects: Project[] = [
  {
    slug: "sp-spaces",
    name: "SP Spaces",
    summary: "Plataforma de reservas de espaços do Grupo São Paulo.",
    description:
      "A space reservation platform with a REST API, persistence, and integrations.",
    technologies: ["Java", "Spring Boot", "PostgreSQL"],
    contribution: "REST API development, data persistence, and integrations.",
  },
  {
    slug: "gestao-portuaria",
    name: "Gestão Portuária",
    summary: "Plataforma de gestão e controle de operações portuárias.",
    description:
      "A port management platform currently in development, with a Java and Spring Boot backend.",
    technologies: ["Java", "Spring Boot"],
    status: "In development",
  },
  {
    slug: "adequa",
    name: "Adequa",
    summary: "Plataforma de adequação à LGPD.",
    description: "Plataforma de adequação à LGPD.",
    technologies: ["Java", "Spring Boot"],
  },
  {
    slug: "librascam",
    name: "LibrasCam",
    summary: "Solução de acessibilidade com IA.",
    description: "Solução de acessibilidade com IA.",
    technologies: ["Python", "OpenCV"],
  },
  {
    slug: "lifepilot",
    name: "LifePilot (MVP)",
    summary: "Assistente pessoal com IA.",
    description: "Assistente pessoal com IA.",
    technologies: ["Python", "FastAPI"],
  },
];

export const about: About = {
  title: "Behind the interface.",
  introduction:
    "Estudante de Engenharia de Software, com foco em desenvolvimento backend e interesse em Inteligência Artificial. Gosto de transformar ideias em soluções reais, combinando tecnologia, produto e impacto.",
  focus: [
    "Backend development",
    "REST APIs",
    "Data persistence & integrations",
  ],
  technologies: ["Java", "Spring Boot", "PostgreSQL", "TypeScript", "React", "Docker", "Git"],
};

// Add your real contact details here; empty values are never rendered as links.
export const contacts: Contacts = {};
