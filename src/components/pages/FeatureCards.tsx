"use client";
// FEATURE-CARDS — сетка карточек с иконкой, заголовком и описанием. Для форматов,
// возможностей, преимуществ. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Card = { icon: string; title: Loc; desc: Loc }; // icon — путь d для SVG (24x24)

export default function FeatureCards({
  eyebrow,
  title,
  cards,
}: {
  eyebrow: Loc;
  title: Loc;
  cards: Card[];
}) {
  const { lang } = useLang();
  return (
    <section className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#4A4B33]">{eyebrow[lang]}</span>
          <h2 className="mt-4 font-display text-[28px] uppercase tracking-[0.05em] leading-[1.1] text-[#3B0D1A] lg:text-[44px]">
            {title[lang]}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {cards.map((c) => (
            <div key={c.title.ru} className="rounded-[20px] border border-[#17191a]/8 bg-[#faf7f2] p-7 transition-colors hover:border-[#3B0D1A]/30 lg:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B0D1A] text-[#f4efe6]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={c.icon} strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 className="mt-5 font-display text-[19px] uppercase tracking-[0.04em] text-[#2a2320] lg:text-[22px]">{c.title[lang]}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#2a2320]/65 lg:text-[15px]">{c.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
