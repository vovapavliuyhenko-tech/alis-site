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
  roundedTop = false,
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
  roundedTop?: boolean;
}) {
  const { lang } = useLang();
  const en = lang === "en";

  const Photo = (
    <div className="relative hidden lg:block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" draggable={false} loading={pinned ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );

  const Panel = (
    <div
      className={`relative flex h-full flex-col items-center justify-between bg-white px-8 text-center lg:px-14 ${
        logo
          ? "pt-32 pb-16 lg:pt-44 lg:pb-20" // 1-й блок: весь контент ниже
          : "pt-16 pb-8 lg:pt-20 lg:pb-10" // 2-й блок: кнопка ниже
      }`}
    >
      {/* Верх — логотип или надстрочник */}
      {logoTop ? (
        <LogoLockup variant="wine" className="scale-[0.6]" />
      ) : (
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#6E7248]">
          {eyebrow[lang]}
        </span>
      )}

      {/* Середина — крупный заголовок + текст */}
      <div className="flex flex-col items-center">
        <h2 className="max-w-[15ch] font-display text-[26px] font-normal uppercase leading-[1.14] tracking-[0.02em] text-[#6E7248] sm:text-[32px] lg:text-[40px]">
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
          className="flex w-full items-center justify-center rounded-2xl border border-[#6E7248] bg-[#6E7248] py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#6E7248] sm:text-[14px]"
        >
          {en ? cta.label.en : cta.label.ru}
        </a>
      )}
    </div>
  );

  return (
    <section
      data-hide-fab
      className={`${pinned ? "sticky top-0 z-0" : "relative z-10"} ${roundedTop ? "rounded-t-[40px]" : ""} grid h-svh min-h-[600px] grid-cols-1 overflow-hidden lg:grid-cols-2`}
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
