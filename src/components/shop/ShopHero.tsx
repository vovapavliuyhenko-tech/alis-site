"use client";
// ВИТРИНА-МАГАЗИН · ГЕРОЙ. По мотивам O'CARE («система ухода, а не набор банок»),
// но в стиле ALIS: сплит-раскладка — слева крупный serif-заголовок, справа фото
// с плавающей карточкой-статой. Светлая тема, бордовые акценты. Двуязычно.
import { useLang } from "@/lib/i18n";

export default function ShopHero() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="shop-top" className="scroll-mt-24 bg-white pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto grid w-[94%] max-w-[1280px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Текст */}
        <div className="order-2 lg:order-1">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {en ? "shop" : "магазин"}
          </span>
          <h1 className="mt-5 font-serif text-[40px] leading-[1.02] text-[#17191a] lg:text-[68px]">
            {en ? (
              <>Care as a system,<br />not a shelf of jars</>
            ) : (
              <>Уход как система,<br />а не набор банок</>
            )}
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#17191a]/55 lg:text-[16px]">
            {en
              ? "The cosmetics and skincare we use in the studio — now you can take them home. Compatible formulas, clear steps, a stable result."
              : "Косметику и уход, которыми мы работаем в студии, теперь можно забрать домой. Совместимые формулы, понятные этапы, стабильный результат."}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#bestsellers"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#4E2126] bg-[#4E2126] py-3.5 pl-6 pr-3 text-[13px] font-medium text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#4E2126]"
            >
              {en ? "Go to catalog" : "В каталог"}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f4efe6]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4E2126" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a
              href="#care-lines"
              className="text-[13px] uppercase tracking-[0.14em] text-[#17191a]/55 underline-offset-8 transition-colors hover:text-[#4E2126] hover:underline"
            >
              {en ? "Care lines" : "Линейки уходов"}
            </a>
          </div>

          {/* Мини-факты */}
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[#17191a]/10 pt-7">
            {[
              { v: "8", l: en ? "product types" : "типов средств" },
              { v: "9", l: en ? "care lines" : "линеек уходов" },
              { v: "100%", l: en ? "used in studio" : "в работе студии" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-[30px] leading-none text-[#4E2126] lg:text-[36px]">{s.v}</div>
                <div className="mt-2 text-[11px] uppercase leading-tight tracking-[0.12em] text-[#17191a]/45">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Фото */}
        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(23,25,26,0.16)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/tild6536-613_-2___1__4.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          {/* Плавающая карточка */}
          <div className="absolute -bottom-6 -left-4 w-[62%] max-w-[260px] rounded-[20px] border border-[#17191a]/8 bg-white/85 p-5 shadow-[0_18px_50px_rgba(23,25,26,0.14)] backdrop-blur-md lg:-left-10">
            <p className="font-serif text-[17px] leading-snug text-[#17191a]">
              {en ? "Умная-система" : "Умная-система"}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#17191a]/55">
              {en
                ? "Minimum steps — maximum sense. Formulas that work together."
                : "Минимум шагов — максимум смысла. Формулы, что работают вместе."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
