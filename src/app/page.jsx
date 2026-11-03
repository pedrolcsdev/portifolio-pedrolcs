'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { background, estuary } from "asciify-engine/kit";
import TextType from "../components/react-bits/text-type/TextType";
import TargetCursor from "../components/react-bits/target-cursor/TargetCursor";

const languages = [
  {
    code: "pt-BR",
    label: "Português",
    flag: "/flags/brazil.svg",
  },
  {
    code: "en",
    label: "English",
    flag: "/flags/uk.svg",
  }
];

export default function LanguagePage() {
  const heroRef = useRef(null);
  const copyRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const hero = heroRef.current;
    const copy = copyRef.current;
    if (!hero || !copy) return;

    let field;
    try {
      field = background(hero, {
        preset: estuary,
        clear: copy,
        palette: "#f2f0ea",
        cellSize: 11,
        charset: " .:-=+*#%@",
        speed: 1,
        opacity: 1,
        cursor: "trail",
        mark: "glyph",
        dither: 0,
        look: { scene: "flow" }
      });
    } catch {
      return;
    }

    return () => field.destroy();
  }, []);

  return (
    <main id="hero" ref={heroRef} className="language-page">
      <TargetCursor
        container={heroRef}
        cursorColor="#f2f0ea"
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
      />
      <section className="language-picker" aria-labelledby="language-title">
        <div ref={copyRef} className="language-copy copy">
          <TextType
            as="h1"
            id="language-title"
            className="language-typing"
            text={["Escolha seu idioma", "Choose your language"]}
            typingSpeed={65}
            pauseDuration={1300}
            deletingSpeed={20}
            deleteMode="select"
            typeEffect="blur"
            mistakes={0.2}
            cursorStyle="bar"
            cursorGlide
            showCursor
            cursorBlinkDuration={0.35}
          />
        </div>

        <div className="language-options" role="group" aria-label="Seleção de idioma">
          {languages.map((language, index) => (
            <button
              className={`language-choice cursor-target${selectedLanguage === language.code ? " language-choice--selected" : ""}`}
              key={language.code}
              type="button"
              aria-pressed={selectedLanguage === language.code}
              data-cursor-label={language.code === "pt-BR" ? "Selecionar" : "Select"}
              onClick={() => setSelectedLanguage(language.code)}
              style={{ "--enter-delay": `${index * 100}ms` }}
            >
              <span className="language-index" aria-hidden="true">0{index + 1}</span>
              <Image className="language-flag" src={language.flag} alt="" aria-hidden="true" draggable={false} width={44} height={31} loading="eager" />
              <span className="language-label">{language.label}</span>
              <span className="language-code" aria-hidden="true">{language.code === "pt-BR" ? "PT-BR" : "EN"}</span>
              <span className="language-arrow" aria-hidden="true">↗︎</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
