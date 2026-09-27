"use client";
// БЛОК «ФОТО-ВЫСКАЗЫВАНИЕ» по референсу revatiwear.ru (блок «Больше о нас»):
// размытое фото на весь экран, по центру — вертикальное фото с логотипом,
// под ним короткий текст и подчёркнутая ссылка. Размеры сняты с референса
// при ширине 1440: блок 809px, фото 253×380, текст 13/17px шириной 479px,
// ссылка 12px. Используется на главной (вместо блока консьерж-сервиса) и в магазине.
import { LogoWord } from "@/components/Logo";
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
    <section className="gap-top relative isolate flex min-h-[clamp(480px,42vw,680px)] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center text-white">
      {/* Размытый фон — то же (или другое) фото, сильно размыто и затемнено */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bg ?? photo}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-[18px]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/35" />

      {/* Вертикальное фото с логотипом */}
      <div className="r-reveal relative w-[170px] overflow-hidden rounded-[12px] sm:w-[190px] lg:w-[clamp(180px,13vw,230px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" loading="lazy" className="aspect-[253/380] w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoWord variant="cream" className="h-auto w-[33%] drop-shadow-[0_1px_6px_rgba(0,0,0,.25)]" />
        </div>
      </div>

      {/* Текст и ссылка */}
      <p className="r-reveal mt-5 max-w-[479px] text-[13px] leading-[17px] text-white lg:text-[14px] lg:leading-[19px]">
        {text[lang]}
      </p>
      <a
        href={link.href}
        className="r-reveal mt-4 text-[12px] text-white underline decoration-1 underline-offset-[5px] transition-opacity hover:opacity-70"
      >
        {link.label[lang]}
      </a>
    </section>
  );
}
