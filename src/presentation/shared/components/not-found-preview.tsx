import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { copy } from "@/data/interface-copy";
import { Button } from "@/presentation/shared/components/ui/button";
import { FuzzyText } from "@/presentation/shared/components/fuzzy-text";

export function NotFoundPreview() {
  return (
    <section className="not-found-screen">
      <FuzzyText
        className="not-found-code"
        fontSize="clamp(6rem, 20vw, 15rem)"
        fontWeight={700}
        fontFamily="GeistMono, monospace"
        colorSplit={0}
        trigger="hover"
        direction="horizontal"
        baseIntensity={0.2}
        hoverIntensity={0.5}
        fuzzRange={18}
        sliceSize={1}
        fps={30}
        transitionDuration={0}
        intro
        introDuration={1400}
        letterSpacing={0}
        enableHover
        clickEffect={false}
        glitchMode={false}
      >
        404
      </FuzzyText>
      <div className="not-found-copy">
        <span className="not-found-label">HTTP · 404</span>
        <h1>{copy.notFoundTitle}</h1>
        <p>{copy.notFoundDescription}</p>
        <Button asChild className="not-found-home-button">
          <Link href="/">
            <ArrowLeft size={16} aria-hidden="true" />
            {copy.returnHome}
          </Link>
        </Button>
      </div>
    </section>
  );
}
