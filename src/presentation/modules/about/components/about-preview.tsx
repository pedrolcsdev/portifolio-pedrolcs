import { copy } from "@/data/interface-copy";
import type { About } from "@/types/portfolio";
import { TechnologyList } from "@/presentation/shared/components/technology-list";

export function AboutPreview({ data }: { data: About }) {
  return (
    <article className="preview-page about-preview">
      <div className="preview-eyebrow">{copy.aboutEyebrow}</div>
      <h1>{data.title}</h1>
      <p className="preview-description">{data.introduction}</p>
      <section className="detail-section">
        <h2>{copy.focus}</h2>
        <ul className="focus-list">
          {data.focus.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="detail-section">
        <h2>{copy.technologies}</h2>
        <TechnologyList technologies={data.technologies} />
      </section>
    </article>
  );
}
