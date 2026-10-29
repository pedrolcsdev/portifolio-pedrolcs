export type Section = "home" | "projects" | "about" | "contact";

export interface Project {
  slug: string;
  name: string;
  summary: string;
  description: string;
  technologies: string[];
  status?: string;
  contribution?: string;
  architecture?: string;
  challenges?: string[];
  repositoryUrl?: string;
  documentationUrl?: string;
}

export interface Home {
  name: string;
  role: string;
  headline: string;
  introduction: string;
}

export interface About {
  title: string;
  introduction: string;
  focus: string[];
  technologies: string[];
}

export interface Contacts {
  github?: string;
  linkedin?: string;
  email?: string;
}

type ResponseContent =
  | { kind: "home"; data: Home }
  | { kind: "projects"; data: Project[] }
  | { kind: "project"; data: Project }
  | { kind: "about"; data: About }
  | { kind: "contact"; data: Contacts }
  | { kind: "not-found"; data: { error: string; message: string } };

export type PortfolioResponse = ResponseContent & {
  endpoint: string;
  section: Section | null;
  status: 200 | 404;
  statusText: "OK" | "Not Found";
};
