"use client";
// БЛОК «КАРТОЧКА НА ФОТО» по формату paloma.website («Цветы по подписке»), в стиле
// ÁLIS BEAUTY: фото на весь экран, по центру — белая карточка со скруглением,
// сверху вензель, крупная фраза, подчёркнутая ссылка. Маленькое вертикальное фото
// «выходит» за нижний правый край карточки (как жираф у PALOMA). Ч/б.
// Используется на главной (консьерж-сервис) и в магазине.
import { LogoEmblem } from "@/components/Logo";
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
    <section className="gap-top relative isolate flex min-h-[clamp(560px,48vw,760px)] items-center justify-center overflow-hidden px-4 py-16 lg:py-20">
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
      <div className="r-reveal relative w-full max-w-[800px] rounded-[12px] bg-white px-6 pb-14 pt-12 text-center text-[#17191a] sm:px-12 lg:pb-20 lg:pt-16">
        <LogoEmblem variant="wine" className="mx-auto h-[42px] w-auto lg:h-[52px]" />

        <p className="mx-auto mt-8 max-w-[560px] text-[24px] font-light leading-[1.25] lg:mt-10 lg:text-[34px]">
          {text[lang]}
        </p>

        <a
          href={link.href}
          className="mt-10 inline-block border-b border-[#17191a] pb-1 text-[14px] text-[#17191a] transition-opacity hover:opacity-60 lg:mt-14 lg:text-[16px]"
        >
          {link.label[lang]}
        </a>

        {/* Маленькое фото, выходящее за нижний правый край карточки */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute -bottom-8 right-6 hidden aspect-[3/4] w-[120px] rotate-[4deg] rounded-[12px] object-cover shadow-[0_18px_40px_rgba(0,0,0,0.25)] sm:block lg:-bottom-12 lg:right-10 lg:w-[160px]"
        />
      </div>
    </section>
  );
}
