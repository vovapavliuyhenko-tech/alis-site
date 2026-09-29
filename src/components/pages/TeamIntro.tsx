"use client";
// ОБЛОЖКА внутренних страниц — точно как первый блок главной (Hero), но без кнопки:
// фото на весь экран, затемнение снизу, заголовок капсом по центру в нижней части кадра.
// Используется на всех страницах, кроме главной и контактов.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

// Фото — заменить на съёмку. object-cover, тянется на весь экран.
const DEFAULT_PHOTO = "/assets/alis/img_6009.jpg";

export default function TeamIntro({
  title,
  photo = DEFAULT_PHOTO,
}: {
  title: Loc;
  kicker?: Loc; // больше не выводится — обложка как на главной, только заголовок
  photo?: string;
}) {
  const { lang } = useLang();

  return (
    // Белая подложка — чтобы под скруглёнными нижними углами был белый фон, как у страницы
    <div className="bg-white">
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-end overflow-hidden rounded-b-[28px] bg-[#b9b3a9] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo} alt="" aria-hidden className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      {/* Затемнение как на главной: сверху — под шапку, снизу — под заголовок */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,0) 22%), linear-gradient(to top, rgba(20,18,16,.5) 0%, rgba(20,18,16,.12) 45%, rgba(20,18,16,0) 70%)",
        }}
      />

      <div className="flex w-full max-w-[1320px] flex-col items-center px-6 pb-[clamp(56px,11vh,120px)] text-center">
        <h1 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[26px] lg:text-[clamp(26px,2.1vw,38px)]">
          {title[lang]}
        </h1>
      </div>
    </section>
    </div>
  );
}
