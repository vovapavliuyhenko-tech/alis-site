// Логотип ÁLIS BEAUTY — настоящие файлы (вензель + надпись), обрезанные и
// перекрашенные под фон: wine — для светлого фона, cream — для тёмного.

import type { CSSProperties } from "react";

type Variant = "wine" | "cream";

// Оливковый акцент вместо бордового «wine»: PNG используется как маска, форма
// заливается оливковым. Пропорции сохраняем через aspect-ratio.
const OLIVE = "#6E7248";
const EMBLEM_RATIO = 734 / 1108;
const WORD_RATIO = 1515 / 234;

function maskStyle(src: string, ratio: number): CSSProperties {
  return {
    aspectRatio: String(ratio),
    backgroundColor: OLIVE,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
}

// Вензель-монограмма в овале
export function LogoEmblem({ variant = "wine", className = "" }: { variant?: Variant; className?: string }) {
  if (variant === "wine") {
    return <span role="img" aria-label="ÁLIS BEAUTY" className={`inline-block ${className}`} style={maskStyle("/assets/logo-emblem-wine.png", EMBLEM_RATIO)} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/assets/logo-emblem-${variant}.png`} alt="ÁLIS BEAUTY" className={className} draggable={false} />;
}

// Надпись ÁLIS BEAUTY
export function LogoWord({ variant = "wine", className = "" }: { variant?: Variant; className?: string }) {
  if (variant === "wine") {
    return <span role="img" aria-label="ÁLIS BEAUTY" className={`inline-block ${className}`} style={maskStyle("/assets/logo-word-wine.png", WORD_RATIO)} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/assets/logo-word-${variant}.png`} alt="ÁLIS BEAUTY" className={className} draggable={false} />;
}

// Полный логотип: вензель над надписью
export function LogoLockup({ variant = "wine", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <LogoEmblem variant={variant} className="h-[92px] w-auto" />
      <LogoWord variant={variant} className="mt-5 h-[26px] w-auto" />
    </div>
  );
}
