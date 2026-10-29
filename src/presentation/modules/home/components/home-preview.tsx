import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { copy } from "@/data/interface-copy";
import { identity } from "@/data/portfolio";
import type { Home } from "@/types/portfolio";
import { Button } from "@/presentation/shared/components/ui/button";

export function HomePreview({ data }: { data: Home }) {
  return (
    <article className="preview-page home-preview">
      <div className="preview-eyebrow">
        <span className="small-dot" />
        {copy.homeEyebrow} {data.name}
      </div>
      <div className="home-heading">
        <p className="role-label">{data.role}</p>
        <h1>{data.headline}</h1>
      </div>
      <p className="preview-description">{data.introduction}</p>
      <Button asChild className="preview-cta">
        <Link href="/projects">
          {copy.exploreProjects}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </Button>
      <div className="home-note">
        <span aria-hidden="true">{`{ }`}</span>
        <p>{identity.tagline}</p>
      </div>
    </article>
  );
}
