import Link from "next/link";
import { copy } from "@/data/interface-copy";

export function NotFoundPreview() {
  return (
    <section className="section-preview">
      <h1>{copy.notFoundTitle}</h1>
      <p>{copy.notFoundDescription}</p>
      <Link className="preview-back" href="/">
        {copy.returnHome}
      </Link>
    </section>
  );
}
