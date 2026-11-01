import { copy } from "@/data/interface-copy";
import type { Contacts } from "@/types/portfolio";

export function ContactPreview({ data }: { data: Contacts }) {
  const links = [
    { label: "GitHub", href: data.github },
    { label: "LinkedIn", href: data.linkedin },
    { label: "Email", href: data.email ? `mailto:${data.email}` : undefined },
  ].filter((link) => link.href);

  return (
    <section className="section-preview">
      <h1>Contact</h1>
      {links.length ? (
        <ul className="preview-links">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>{copy.contactEmpty}</p>
      )}
    </section>
  );
}
