"use client";
// НАМ ДОВЕРЯЮТ — заголовок с бейджем-эйброу и акцентом, ниже бесконечная бегущая
// лента брендов. Каждый бренд в СВОЁМ типографическом стиле (микс), между ними —
// росчерк. Пауза при наведении. Двуязычно (RU/EN).
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

// Каждый бренд — со своим стилем, приближённым к его вордмарку
const BRANDS: ReactNode[] = [
  <span key="e5" className="flex items-center gap-2.5 text-[#17191a]">
    <span className="font-thunder text-[28px] font-bold leading-none tracking-tight">E5</span>
    <span className="text-[9px] font-medium uppercase leading-[1.15] tracking-[0.12em] text-[#17191a]/70">
      show
      <br />
      event
      <br />
      wedding
    </span>
  </span>,
  // Логотипы партнёров — оригинальные файлы от заказчицы
  // eslint-disable-next-line @next/next/no-img-element
  <img key="nitochka" src="/assets/brands/nitochka.png" alt="Ниточка" className="h-7 w-auto object-contain" draggable={false} />,
  // eslint-disable-next-line @next/next/no-img-element
  <img key="paloma" src="/assets/brands/paloma.png" alt="PALOMA — flowers coffee you" className="h-10 w-auto object-contain" draggable={false} />,
  // eslint-disable-next-line @next/next/no-img-element
  <img key="wa" src="/assets/brands/wa-yug.png" alt="WA Юг" className="h-11 w-auto object-contain" draggable={false} />,
  <span key="talu" className="font-serif text-[19px] uppercase tracking-[0.14em] text-[#17191a]">
    Château <span className="lowercase italic tracking-normal">de</span> Talu
  </span>,
  <span key="fione" className="flex items-baseline gap-2 text-[#17191a]">
    <span className="text-[22px] tracking-[0.26em]">FiONE</span>
    <span className="text-[8px] uppercase tracking-[0.2em] text-[#17191a]/55">
      luxury resort &amp; spa
    </span>
  </span>,
  // eslint-disable-next-line @next/next/no-img-element
  <img key="weddywood" src="/assets/brands/weddywood-2026.png" alt="Weddywood — Wedding vendor 2026" width={44} height={44} className="h-11 w-11 object-contain" draggable={false} />,
  <span key="eldayana" className="flex flex-col items-center leading-none text-[#17191a]">
    <span className="font-serif text-[21px] uppercase tracking-[0.2em]">EL&apos;DAYANA</span>
    <span className="mt-1 text-[8px] uppercase tracking-[0.22em] text-[#17191a]/55">
      event &amp; weddings
    </span>
  </span>,
  <span
    key="mkrtchyan"
    className="text-[26px] italic text-[#17191a]"
    style={{ fontFamily: "'Segoe Script','Brush Script MT',cursive" }}
  >
    S. Mkrtchyan
  </span>,
];

function Sep() {
  return <span aria-hidden className="mx-10 text-[14px] text-[#17191a]/25 lg:mx-14">✦</span>;
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
          <span className="flex h-11 items-center">{b}</span>
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
