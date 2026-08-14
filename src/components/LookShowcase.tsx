"use client";
// ВИТРИНА ОБРАЗОВ (по мотивам лукбука): с одной стороны — большое фото во всю
// высоту половины экрана, с другой — панель с листаемой карточкой (стрелки +
// миниатюры). Выбор миниатюры меняет и большое фото, и карточку. Проп mirror
// зеркалит раскладку (фото справа). Светлая тема, бордовые акценты. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
export type Look = { name: Loc; price: Loc; big: string; card: string };

export default function LookShowcase({
  title,
  subtitle,
  looks,
  mirror = false,
  href = "/request",
  cta,
}: {
  title: Loc;
  subtitle: Loc;
  looks: Look[];
  mirror?: boolean;
  href?: string;
  cta?: Loc;
}) {
  const { lang } = useLang();
  const en = lang === "en";
  const [sel, setSel] = useState(0);
  const go = (d: number) => setSel((s) => (s + d + looks.length) % looks.length);
  const cur = looks[sel];

  return (
    <div className="grid min-h-[500px] grid-cols-1 bg-white lg:min-h-[600px] lg:grid-cols-2">
      {/* Большое фото во всю сторону */}
      <div className={`relative min-h-[380px] overflow-hidden lg:min-h-full ${mirror ? "lg:order-2" : "lg:order-1"}`}>
        {looks.map((l, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            src={l.big}
            alt={l.name[lang]}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: sel === i ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Панель с карточкой */}
      <div className={`flex items-center justify-center px-6 py-14 lg:px-12 ${mirror ? "lg:order-1" : "lg:order-2"}`}>
        <div className="w-full max-w-[440px] text-center">
          <h2 className="font-serif text-[30px] leading-tight text-[#4E2126] lg:text-[40px]">{title[lang]}</h2>
          <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-[#17191a]/55">{subtitle[lang]}</p>

          {/* Карточка + стрелки */}
          <div className="relative mt-9">
            <button
              aria-label={en ? "Previous" : "Назад"}
              onClick={() => go(-1)}
              className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#17191a]/15 bg-white text-[#17191a] transition-colors hover:border-[#4E2126] hover:bg-[#4E2126] hover:text-[#f4efe6] lg:-translate-x-1/3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              aria-label={en ? "Next" : "Вперёд"}
              onClick={() => go(1)}
              className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[#17191a]/15 bg-white text-[#17191a] transition-colors hover:border-[#4E2126] hover:bg-[#4E2126] hover:text-[#f4efe6] lg:translate-x-1/3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div className="relative mx-auto aspect-[4/5] w-[78%] overflow-hidden rounded-[16px] bg-[#f1ede6]">
              {looks.map((l, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={l.card}
                  alt={l.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
                  style={{ opacity: sel === i ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          {/* Название + цена */}
          <div className="mt-5 flex items-center justify-between px-2 text-left">
            <span className="text-[15px] text-[#17191a]">{cur.name[lang]}</span>
            <span className="text-[15px] font-medium text-[#4E2126]">{cur.price[lang]}</span>
          </div>

          {/* Миниатюры */}
          <div className="mt-5 flex justify-center gap-3">
            {looks.map((l, i) => (
              <button
                key={i}
                onClick={() => setSel(i)}
                aria-label={l.name[lang]}
                className={`h-16 w-14 overflow-hidden rounded-[8px] ring-2 transition-all ${
                  sel === i ? "ring-[#4E2126]" : "ring-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.card} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <a
            href={href}
            className="mt-9 inline-block border-b border-[#4E2126] pb-1 text-[13px] uppercase tracking-[0.14em] text-[#4E2126] transition-opacity hover:opacity-70"
          >
            {cta ? cta[lang] : en ? "To catalog" : "В каталог"}
          </a>
        </div>
      </div>
    </div>
  );
}
