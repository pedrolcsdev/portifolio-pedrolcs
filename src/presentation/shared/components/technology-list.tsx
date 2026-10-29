export function TechnologyList({ technologies }: { technologies: string[] }) {
  return (
    <ul className="technology-list" aria-label="Technologies">
      {technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}
