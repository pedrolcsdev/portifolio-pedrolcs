import { ArrowUpRight, CodeXml, BriefcaseBusiness, Mail } from "lucide-react";
import { copy } from "@/data/interface-copy";
import type { Contacts } from "@/types/portfolio";

export function ContactPreview({ data }: { data: Contacts }) {
  const links = [
    { label: "GitHub", href: data.github, icon: CodeXml },
    { label: "LinkedIn", href: data.linkedin, icon: BriefcaseBusiness },
    {
      label: "Email",
      href: data.email ? `mailto:${data.email}` : undefined,
      icon: Mail,
    },
  ].filter((link) => link.href);

  return (
    <section className="preview-page contact-preview">
      <div className="preview-eyebrow">{copy.contactEyebrow}</div>
      <h1>{copy.contactTitle}</h1>
      <p className="preview-description">{copy.contactDescription}</p>
      {links.length ? (
        <ul className="contact-list">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                <Icon size={18} aria-hidden="true" />
                {label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="contact-empty">
          <Mail size={20} strokeWidth={1.4} aria-hidden="true" />
          <p>{copy.contactEmpty}</p>
        </div>
      )}
    </section>
  );
}
