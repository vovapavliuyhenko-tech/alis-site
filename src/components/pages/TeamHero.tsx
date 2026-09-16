"use client";
// ГЕРОЙ-СПЛИТ страницы команды (по мотивам PALOMA): фото + кремовая панель с
// заголовком и кнопкой. Блоки ЗАКРЕПЛЕНЫ (sticky под шапкой) — каждый следующий
// наезжает поверх предыдущего при скролле. Фото можно ставить слева или справа.
// Высота — экран минус шапка, чтобы блок помещался и не перекрывался шапкой.
import { useLang } from "@/lib/i18n";
import { LogoLockup } from "@/components/Logo";

type Loc = { ru: string; en: string };

export default function TeamHero({
  photo,
  eyebrow,
  title,
  sub,
  cta,
  reverse = false,
  pinned = false,
  logo = false,
  logoTop = false,
}: {
  photo: string;
  eyebrow: Loc;
  title: Loc;
  sub: Loc;
  cta: { label: Loc; href: string };
  reverse?: boolean;
  pinned?: boolean;
  logo?: boolean;
  logoTop?: boolean;
}) {
  const { lang } = useLang();
  const en = lang === "en";

  const Photo = (
    <div className="relative hidden overflow-hidden rounded-[26px] border border-[#46131E]/10 shadow-[0_14px_44px_rgba(23,25,26,0.10)] lg:block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" draggable={false} loading={pinned ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );

  const Panel = (
    <div
      className={`relative flex h-full flex-col items-center justify-between overflow-hidden rounded-[26px] border border-[#46131E]/10 bg-white px-8 text-center shadow-[0_14px_44px_rgba(23,25,26,0.10)] lg:px-14 ${
        logo
          ? "pt-14 pb-14 lg:pt-16 lg:pb-16" // 1-й блок: лого сверху и снизу
          : "pt-14 pb-10 lg:pt-16 lg:pb-12" // 2-й блок: кнопка ниже
      }`}
    >
      {/* Верх — логотип или надстрочник */}
      {logoTop ? (
        <LogoLockup variant="wine" className="scale-[0.6]" />
      ) : (
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#46131E]">
          {eyebrow[lang]}
        </span>
      )}

      {/* Середина — крупный заголовок + текст */}
      <div className="flex flex-col items-center">
        <h2 className="max-w-[15ch] font-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#46131E] lg:text-[28px]">
          {title[lang]}
        </h2>
        <p className="mt-6 max-w-md text-[13px] leading-relaxed text-[#2a2320]/70 sm:text-[14px]">
          {sub[lang]}
        </p>
      </div>

      {/* Низ — логотип (первый блок) или кнопка во всю ширину панели */}
      {logo ? (
        <LogoLockup variant="wine" className="scale-[0.6]" />
      ) : (
        <a
          href={cta.href}
          className="flex w-full items-center justify-center rounded-2xl border border-[#46131E] bg-[#46131E] py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#46131E] sm:text-[14px]"
        >
          {en ? cta.label.en : cta.label.ru}
        </a>
      )}
    </div>
  );

  return (
    <section
      data-hide-fab
      className={`${pinned ? "sticky top-0 z-0 pt-[72px] lg:pt-[80px]" : "relative z-10 pt-2 lg:pt-2.5"} h-svh min-h-[600px] bg-white px-2 pb-2 lg:px-2.5 lg:pb-2.5`}
    >
      {/* Две отдельные скруглённые карточки (фото + панель) с минимальным зазором */}
      <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2.5">
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
      </div>
    </section>
  );
}
