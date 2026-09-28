"use client";
// БЛОК «КАРТОЧКА НА ФОТО» по формату paloma.website («Цветы по подписке»), в стиле
// ÁLIS BEAUTY: фото почти на весь экран, по центру — квадратная белая карточка.
// Внутри сверху вниз, с ровным воздухом между строками, как у PALOMA:
// логотип → заголовок → короткий текст → подчёркнутая ссылка → мелкая подпись внизу.
// Ч/б. Используется на главной (консьерж-сервис) и в магазине.
import { LogoEmblem, LogoWord } from "@/components/Logo";
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
      <div className="r-reveal flex aspect-square w-full max-w-[440px] flex-col items-center justify-between rounded-[12px] bg-white px-8 py-10 text-center text-[#17191a] sm:max-w-[520px] lg:max-w-[600px] lg:px-14 lg:py-14">
        {/* Логотип — вместо «звёздочки» PALOMA */}
        <div>
          <LogoEmblem variant="wine" className="mx-auto !block h-[26px] w-auto lg:h-[30px]" />
          <LogoWord variant="wine" className="mx-auto mt-2 !block h-[9px] w-auto lg:h-[10px]" />
        </div>

        {/* Заголовок */}
        <h2 className="!text-[22px] !font-light !leading-[1.2] text-[#17191a] lg:!text-[30px]">{text[lang]}</h2>

        {/* Текст */}
        {note && (
          <p className="max-w-[400px] text-[14px] leading-[1.6] text-[#242424] lg:text-[15px]">{note[lang]}</p>
        )}

        {/* Ссылка */}
        <a
          href={link.href}
          className="inline-block border-b border-[#17191a] pb-0.5 text-[14px] text-[#17191a] transition-opacity hover:opacity-60 lg:text-[15px]"
        >
          {link.label[lang]}
        </a>

        {/* Мелкая подпись внизу */}
        {foot && <p className="text-[12px] text-[#17191a]/40">{foot[lang]}</p>}
      </div>
    </section>
  );
}
