// НАС ВЫБИРАЮТ — бесконечная бегущая лента брендов. Каждый бренд в СВОЁМ
// типографическом стиле (микс), между ними — росчерк-ромб. Пауза при наведении.
// Названия набраны типографикой (не реальные лого) — заменить на SVG/лого при наличии.
import type { ReactNode } from "react";

// Каждый бренд — со своим стилем, приближённым к его вордмарку
const BRANDS: ReactNode[] = [
  <span key="e5" className="flex items-center gap-2.5 text-[#f4efe6]">
    <span className="font-thunder text-[30px] font-bold leading-none tracking-tight">E5</span>
    <span className="text-[9px] font-medium uppercase leading-[1.15] tracking-[0.12em] text-[#f4efe6]/70">
      show
      <br />
      event
      <br />
      wedding
    </span>
  </span>,
  <span key="nitochka" className="font-serif text-[28px] italic text-[#f4efe6]">
    Nitochka
  </span>,
  <span key="talu" className="font-serif text-[20px] uppercase tracking-[0.16em] text-[#f4efe6]">
    Château <span className="lowercase italic tracking-normal">de</span> Talu
  </span>,
  <span key="fione" className="flex items-baseline gap-2 text-[#f4efe6]">
    <span className="text-[24px] tracking-[0.28em]">FiONE</span>
    <span className="text-[8px] uppercase tracking-[0.2em] text-[#f4efe6]/55">
      luxury resort &amp; spa
    </span>
  </span>,
  <span key="weddywood" className="text-[27px] font-semibold lowercase tracking-tight text-[#f4efe6]">
    weddywood
  </span>,
  <span key="eldayana" className="flex flex-col items-center leading-none text-[#f4efe6]">
    <span className="font-serif text-[21px] uppercase tracking-[0.2em]">EL&apos;DAYANA</span>
    <span className="mt-1 text-[8px] uppercase tracking-[0.22em] text-[#f4efe6]/55">
      event &amp; weddings
    </span>
  </span>,
  <span
    key="mkrtchyan"
    className="text-[30px] italic text-[#f4efe6]"
    style={{ fontFamily: "'Segoe Script','Brush Script MT',cursive" }}
  >
    S. Mkrtchyan
  </span>,
];

function Sep() {
  return <span aria-hidden className="mx-10 text-[14px] text-[#f4efe6]/25 lg:mx-14">✦</span>;
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
  return (
    <section className="overflow-hidden bg-[#17191a] pt-8 pb-16 lg:pt-10 lg:pb-24">
      <div className="mb-12 flex flex-col items-center gap-3">
        <p className="text-center font-serif text-[13px] uppercase tracking-[0.4em] text-[#f4efe6]/60">
          нас выбирают
        </p>
        <span className="h-[2px] w-10 rounded-full bg-[#4E2126]" />
      </div>

      <div className="group relative flex overflow-hidden">
        <Track />
        <Track hidden />

        {/* Растушёвка по краям */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#17191a] to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#17191a] to-transparent lg:w-40" />
      </div>
    </section>
  );
}
