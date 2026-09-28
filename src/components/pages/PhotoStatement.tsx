"use client";
// БЛОК «КАРТОЧКА НА ФОТО» по формату paloma.website («Цветы по подписке»), в стиле
// ÁLIS BEAUTY: фото на весь экран, по центру — белая карточка со скруглением,
// сверху полный логотип (вензель + ÁLIS BEAUTY), фраза и подчёркнутая ссылка —
// компактно и мелко, как подписи в магазине. Ч/б.
// Используется на главной (консьерж-сервис) и в магазине.
import { LogoEmblem, LogoWord } from "@/components/Logo";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function PhotoStatement({
  photo,
  bg,
  text,
  link,
}: {
  photo: string;
  bg?: string;
  text: Loc;
  link: { label: Loc; href: string };
}) {
  const { lang } = useLang();

  return (
    <section className="gap-top relative isolate flex min-h-[clamp(460px,38vw,620px)] items-center justify-center overflow-hidden px-4 py-16 lg:py-20">
      {/* Фон — фото на весь экран, слегка затемнено */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bg ?? photo}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/30" />

      {/* Белая карточка */}
      <div className="r-reveal relative w-full max-w-[460px] rounded-[12px] bg-white px-8 py-10 text-center text-[#17191a] lg:px-12 lg:py-12">
        {/* Полный логотип: вензель + надпись ÁLIS BEAUTY */}
        <LogoEmblem variant="wine" className="mx-auto !block h-[30px] w-auto" />
        <LogoWord variant="wine" className="mx-auto mt-2.5 !block h-[11px] w-auto" />

        <p className="mx-auto mt-7 max-w-[340px] text-[15px] leading-[1.4] text-[#242424] lg:text-[16px]">
          {text[lang]}
        </p>

        <a
          href={link.href}
          className="mt-6 inline-block border-b border-[#17191a] pb-0.5 text-[13px] text-[#17191a] transition-opacity hover:opacity-60"
        >
          {link.label[lang]}
        </a>
      </div>
    </section>
  );
}
