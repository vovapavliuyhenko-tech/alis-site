"use client";
// НАМ ДОВЕРЯЮТ — заголовок с бейджем-эйброу и акцентом, ниже бесконечная бегущая
// лента брендов. Каждый бренд в СВОЁМ типографическом стиле (микс), между ними —
// росчерк. Пауза при наведении. Двуязычно (RU/EN).
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

// Каждый бренд — со своим стилем, приближённым к его вордмарку
const BRANDS: ReactNode[] = [
  <span key="e5" className="flex items-center gap-2.5 text-[#6b6459]">
    <span className="font-thunder text-[30px] font-bold leading-none tracking-tight">E5</span>
    <span className="text-[9px] font-medium uppercase leading-[1.15] tracking-[0.12em] text-[#6b6459]/70">
      show
      <br />
      event
      <br />
      wedding
    </span>
  </span>,
  <span key="nitochka" className="font-serif text-[30px] leading-none text-[#17191a]">
    н<span className="italic">и&#769;</span>точка
  </span>,
  // PALOMA — тонкие капители с засечками и подпись «FLOWERS COFFEE YOU»
  <span key="paloma" className="flex flex-col items-center leading-none text-[#17191a]">
    <span className="font-serif text-[30px] font-light tracking-[0.06em]">PALOMA</span>
    <span className="mt-1.5 font-serif text-[9px] tracking-[0.16em]">FLOWERS COFFEE YOU</span>
  </span>,
  // WA ЮГ — крупные тонкие геометричные буквы и «ЮГ» ниже
  <span key="wa" className="flex flex-col items-center leading-none text-[#17191a]">
    <span className="text-[34px] font-light tracking-[-0.06em]">WA</span>
    <span className="mt-1 text-[10px] tracking-[0.12em]">ЮГ</span>
  </span>,
  <span key="talu" className="font-serif text-[20px] uppercase tracking-[0.16em] text-[#6b6459]">
    Château <span className="lowercase italic tracking-normal">de</span> Talu
  </span>,
  <span key="fione" className="flex items-baseline gap-2 text-[#6b6459]">
    <span className="text-[24px] tracking-[0.28em]">FiONE</span>
    <span className="text-[8px] uppercase tracking-[0.2em] text-[#6b6459]/55">
      luxury resort &amp; spa
    </span>
  </span>,
  // eslint-disable-next-line @next/next/no-img-element
  <img key="weddywood" src="/assets/brands/weddywood-2026.png" alt="Weddywood — Wedding vendor 2026" width={64} height={64} className="h-16 w-16 object-contain" draggable={false} />,
  <span key="eldayana" className="flex flex-col items-center leading-none text-[#6b6459]">
    <span className="font-serif text-[21px] uppercase tracking-[0.2em]">EL&apos;DAYANA</span>
    <span className="mt-1 text-[8px] uppercase tracking-[0.22em] text-[#6b6459]/55">
      event &amp; weddings
    </span>
  </span>,
  <span
    key="mkrtchyan"
    className="text-[30px] italic text-[#6b6459]"
    style={{ fontFamily: "'Segoe Script','Brush Script MT',cursive" }}
  >
    S. Mkrtchyan
  </span>,
];

function Sep() {
  return <span aria-hidden className="mx-10 text-[14px] text-[#6b6459]/25 lg:mx-14">✦</span>;
}

// Одна дорожка со всеми брендами (дублируется для бесшовности)
function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="marquee flex shrink-0 items-center group-hover:[animation-play-state:paused]"
    >
      {BRANDS.map((b, i) => (
        <li key={i} className="flex items-center">
          {b}
          <Sep />
        </li>
      ))}
    </ul>
  );
}

export default function Brands({ heading = false, title, label }: { heading?: boolean; title?: { ru: string; en: string }; label?: { ru: string; en: string } }) {
  const { lang } = useLang();
  return (
    <section className="overflow-hidden bg-white section-y">
      {heading && (
        <div className="mx-auto mb-12 w-[92%] max-w-[1280px] text-center lg:mb-16">
          <h2 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[28px]">
            {lang === "en" ? "Who trusts us" : "Кто нам доверяет"}
          </h2>
        </div>
      )}
      {/* Маленькая подпись капсом — чтобы было понятно, что за логотипы */}
      {title && <h2 className="r-reveal mx-auto mb-8 w-[92%] text-center text-[#17191a] lg:mb-10">{title[lang]}</h2>}
      {/* На телефоне вся строка с логотипами компактнее (масштаб 0.68) */}
      <div className="group relative flex overflow-hidden max-sm:[zoom:0.68]">
        <Track />
        <Track hidden />

        {/* Растушёвка по краям */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent lg:w-40" />
      </div>
    </section>
  );
}
