"use client";
// НАМ ДОВЕРЯЮТ — заголовок с бейджем-эйброу и акцентом, ниже бесконечная бегущая
// лента брендов. Каждый бренд в СВОЁМ типографическом стиле (микс), между ними —
// росчерк. Пауза при наведении. Двуязычно (RU/EN).
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

// Каждый бренд — со своим стилем, приближённым к его вордмарку
const BRANDS: ReactNode[] = [
  <span key="e5" className="flex items-center gap-2.5 text-[#17191a]">
    <span className="font-thunder text-[30px] font-bold leading-none tracking-tight">E5</span>
    <span className="text-[9px] font-medium uppercase leading-[1.15] tracking-[0.12em] text-[#17191a]/70">
      show
      <br />
      event
      <br />
      wedding
    </span>
  </span>,
  <span key="nitochka" className="font-serif text-[28px] italic text-[#17191a]">
    Nitochka
  </span>,
  <span key="talu" className="font-serif text-[20px] uppercase tracking-[0.16em] text-[#17191a]">
    Château <span className="lowercase italic tracking-normal">de</span> Talu
  </span>,
  <span key="fione" className="flex items-baseline gap-2 text-[#17191a]">
    <span className="text-[24px] tracking-[0.28em]">FiONE</span>
    <span className="text-[8px] uppercase tracking-[0.2em] text-[#17191a]/55">
      luxury resort &amp; spa
    </span>
  </span>,
  <span key="weddywood" className="text-[27px] font-semibold lowercase tracking-tight text-[#17191a]">
    weddywood
  </span>,
  <span key="eldayana" className="flex flex-col items-center leading-none text-[#17191a]">
    <span className="font-serif text-[21px] uppercase tracking-[0.2em]">EL&apos;DAYANA</span>
    <span className="mt-1 text-[8px] uppercase tracking-[0.22em] text-[#17191a]/55">
      event &amp; weddings
    </span>
  </span>,
  <span
    key="mkrtchyan"
    className="text-[30px] italic text-[#17191a]"
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
          {b}
          <Sep />
        </li>
      ))}
    </ul>
  );
}

export default function Brands() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="overflow-hidden bg-white py-20 lg:py-28">
      {/* Заголовок с эйброу-бейджем и акцентом */}
      <div className="mx-auto mb-20 w-[92%] max-w-[1000px] text-center lg:mb-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {en ? "Clients" : "Клиенты"}
        </span>
        <h2 className="mt-5 font-display text-[28px] uppercase tracking-[0.06em] leading-[1.14] text-[#17191a] lg:text-[42px]">
          {en ? "Trusted by brands" : "Нам доверяют"}
          <br />
          <span className="font-script text-[38px] normal-case tracking-normal text-[#3B0D1A] lg:text-[54px]">{en ? "and venues since 2019" : "бренды и площадки с 2019 года"}</span>
        </h2>
      </div>

      <div className="group relative flex overflow-hidden">
        <Track />
        <Track hidden />

        {/* Растушёвка по краям */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent lg:w-40" />
      </div>
    </section>
  );
}
