import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { copy } from "@/data/interface-copy";
import { Button } from "@/presentation/shared/components/ui/button";

export function NotFoundPreview() {
  return (
    <section className="preview-page">
      <div className="preview-eyebrow">404 / {copy.notFoundEyebrow}</div>
      <h1>{copy.notFoundTitle}</h1>
      <p className="preview-description">{copy.notFoundDescription}</p>
      <Button asChild className="preview-cta">
        <Link href="/">
          <ArrowLeft aria-hidden="true" />
          {copy.returnHome}
        </Link>
      </Button>
    </section>
  );
}
