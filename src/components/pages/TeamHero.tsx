"use client";
// ГЕРОЙ-СПЛИТ страницы команды (по мотивам PALOMA): фото + кремовая панель с
// заголовком и кнопкой. Блоки ЗАКРЕПЛЕНЫ (sticky под шапкой) — каждый следующий
// наезжает поверх предыдущего при скролле. Фото можно ставить слева или справа.
// Высота — экран минус шапка, чтобы блок помещался и не перекрывался шапкой.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function TeamHero({
  photo,
  eyebrow,
  title,
  sub,
  cta,
  reverse = false,
}: {
  photo: string;
  eyebrow: Loc;
  title: Loc;
  sub: Loc;
  cta: { label: Loc; href: string };
  reverse?: boolean;
}) {
  const { lang } = useLang();
  const en = lang === "en";

  const Photo = (
    <div className="relative hidden lg:block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );

  const Panel = (
    <div className="relative flex flex-col items-center justify-center bg-[#f4efe6] px-8 py-16 text-center lg:px-16">
      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#4A4B33]">
        {eyebrow[lang]}
      </span>
      <h2 className="mt-5 max-w-[15ch] font-display text-[24px] font-normal uppercase leading-[1.12] tracking-[0.02em] text-[#3B0D1A] sm:text-[30px] lg:text-[38px]">
        {title[lang]}
      </h2>
      <p className="mt-5 max-w-md text-[13px] leading-relaxed text-[#2a2320]/70 sm:text-[14px]">
        {sub[lang]}
      </p>
      <a
        href={cta.href}
        className="mt-8 inline-flex items-center justify-center rounded-2xl border border-[#3B0D1A] bg-[#3B0D1A] px-12 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#3B0D1A] sm:text-[14px]"
      >
        {en ? cta.label.en : cta.label.ru}
      </a>
    </div>
  );

  return (
    <section
      data-hide-fab
      className="sticky top-[72px] z-0 grid h-[calc(100svh-72px)] min-h-[540px] grid-cols-1 overflow-hidden lg:grid-cols-2"
    >
      {reverse ? (
        <>
          {Panel}
          {Photo}
        </>
      ) : (
        <>
          {Photo}
          {Panel}
        </>
      )}
    </section>
  );
}
