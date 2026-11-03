import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { About, Contacts, Home, Project } from "@/types/portfolio";

export function HomePreview({
  data,
  projects,
  about,
  contacts,
}: {
  data: Home;
  projects: Project[];
  about: About;
  contacts: Contacts;
}) {
  return (
    <article className="home-preview">
      <header className="home-hero">
        <div className="home-hero-copy">
          <h1>{data.name}<span className="home-cursor" aria-hidden="true">.</span></h1>
          <p className="home-role">{data.role}</p>
          <p className="home-intro">{data.introduction}</p>
          <div className="home-actions">
            <Link className="home-primary-link" href="/projects">
              Explorar projetos <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            {contacts.github && (
              <a className="home-secondary-link" href={contacts.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="home-section home-projects" aria-labelledby="home-projects-title">
        <div className="home-section-heading">
          <div>
            <h2 id="home-projects-title">Projetos em destaque</h2>
          </div>
          <Link className="home-text-link" href="/projects">Ver todos <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="home-project-grid">
          {projects.slice(0, 5).map((project, index) => (
            <Link className="home-project-card" href={`/projects/${project.slug}`} key={project.slug}>
              <span className="home-project-number">{String(index + 1).padStart(2, "0")}</span>
              <ArrowUpRight className="home-project-arrow" size={18} aria-hidden="true" />
              <div className="home-project-copy">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <ul className="home-tags" aria-label={`Tecnologias de ${project.name}`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section home-technologies" aria-labelledby="home-technologies-title">
        <h2 id="home-technologies-title">Tecnologias</h2>
        <ul className="home-tech-list">
          {about.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>

      <section className="home-section home-about" aria-labelledby="home-about-title">
        <div>
          <h2 id="home-about-title">Um pouco<br />sobre mim.</h2>
        </div>
        <p>{about.introduction}</p>
        <Link className="home-outline-link" href="/about">GET /about <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>

      <section className="home-contact" aria-labelledby="home-contact-title">
        <div>
          <h2 id="home-contact-title">Vamos construir algo juntos?</h2>
        </div>
        <Link className="home-primary-link" href="/contact">GET /contact <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>
    </article>
  );
}
