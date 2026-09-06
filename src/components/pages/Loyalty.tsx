"use client";
// БЛОК «ЛОЯЛЬНОСТЬ» (страница «Салон») — бесконечная бегущая лента привилегий
// (как «Нам доверяют» на главной), подогнанная по смыслу: перечень бонусов
// программы лояльности бежит горизонтально, пауза при наведении. Двуязычно.
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

// Каждая привилегия — в своём типографическом стиле (микс), между ними росчерк.
function items(en: boolean): ReactNode[] {
  return [
    <span key="p1" className="font-display text-[28px] uppercase tracking-[0.04em] text-[#3B0D1A] lg:text-[38px]">
      {en ? "−10% on the first visit" : "−10% на первый визит"}
    </span>,
    <span key="p2" className="font-serif text-[26px] italic text-[#4A4B33] lg:text-[34px]">
      {en ? "perks for regulars" : "бонусы постоянным гостям"}
    </span>,
    <span key="p3" className="font-display text-[24px] uppercase tracking-[0.12em] text-[#17191a] lg:text-[32px]">
      {en ? "gift certificates" : "подарочные сертификаты"}
    </span>,
    <span key="p4" className="font-serif text-[26px] italic text-[#3B0D1A] lg:text-[34px]">
      {en ? "care in every detail" : "внимание к деталям"}
    </span>,
    <span key="p5" className="font-display text-[24px] lowercase tracking-[0.02em] text-[#4A4B33] lg:text-[32px]">
      {en ? "special terms for our own" : "особые условия для своих"}
    </span>,
  ];
}

function Sep() {
  return <span aria-hidden className="mx-8 text-[16px] text-[#3B0D1A]/25 lg:mx-12">✦</span>;
}

function Track({ en, hidden = false }: { en: boolean; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="marquee flex shrink-0 items-center group-hover:[animation-play-state:paused]">
      {items(en).map((b, i) => (
        <li key={i} className="flex items-center">
          {b}
          <Sep />
        </li>
      ))}
    </ul>
  );
}

export default function Loyalty() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="loyalty" className="scroll-mt-24 overflow-hidden bg-[#f7f3ed] py-24 lg:py-28">
      {/* Заголовок */}
      <div className="mx-auto mb-14 w-[92%] max-w-[1200px] text-center lg:mb-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {en ? "loyalty" : "лояльность"}
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-[26px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-[#3B0D1A] lg:text-[40px]">
          {en ? "We value those who value themselves" : "Ценим тех, кто ценит себя"}
        </h2>
      </div>

      {/* Бегущая лента привилегий */}
      <div className="group relative flex overflow-hidden">
        <Track en={en} />
        <Track en={en} hidden />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f7f3ed] to-transparent lg:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f7f3ed] to-transparent lg:w-40" />
      </div>
    </section>
  );
}
