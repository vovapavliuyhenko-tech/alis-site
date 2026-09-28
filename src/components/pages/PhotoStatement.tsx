"use client";
// БЛОК «КАРТОЧКА НА ФОТО» по формату paloma.website («Цветы по подписке»), в стиле
// ÁLIS BEAUTY: фото почти на весь экран, по центру — квадратная белая карточка.
// Внутри сверху вниз, с ровным воздухом между строками, как у PALOMA:
// заголовок → короткий текст → подчёркнутая ссылка → мелкая подпись внизу.
// Ч/б. Используется на главной (консьерж-сервис) и в магазине.

import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function PhotoStatement({
  photo,
  bg,
  text,
  note,
  foot,
  link,
}: {
  photo: string;
  bg?: string;
  text: Loc; // заголовок
  note?: Loc; // короткий текст под заголовком
  foot?: Loc; // мелкая подпись внизу карточки
  link: { label: Loc; href: string };
}) {
  const { lang } = useLang();

  return (
    <section className="gap-top relative isolate flex min-h-[92svh] items-center justify-center overflow-hidden px-4 py-16 lg:py-20">
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

      {/* Квадратная белая карточка */}
      <div className="r-reveal flex aspect-square w-full max-w-[min(400px,68svh)] flex-col items-center justify-between rounded-[12px] bg-white px-7 py-8 text-center text-[#17191a] lg:max-w-[min(440px,68svh)] lg:px-10 lg:py-10">
        {/* Заголовок */}
        <h2 className="!text-[19px] !font-light !leading-[1.25] text-[#17191a] lg:!text-[22px]">{text[lang]}</h2>

        {/* Текст */}
        {note && (
          <p className="max-w-[300px] text-[13px] leading-[1.55] text-[#242424]">{note[lang]}</p>
        )}

        {/* Ссылка */}
        <a
          href={link.href}
          className="inline-block border-b border-[#17191a] pb-0.5 text-[13px] text-[#17191a] transition-opacity hover:opacity-60"
        >
          {link.label[lang]}
        </a>

        {/* Мелкая подпись внизу */}
        {foot && <p className="text-[11px] text-[#17191a]/40">{foot[lang]}</p>}
      </div>
    </section>
  );
}
