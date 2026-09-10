"use client";
// ФИЛОСОФИЯ САЛОНА — редакционная подача в духе топовых Tilda-дизайнов:
// крупное фото основателя слева, справа большое кредо-цитата + структурированные
// принципы 01/02/03 с тонкими линиями-разделителями. Фирменные цвета/шрифты ÁLIS.
import { useLang } from "@/lib/i18n";

const PHOTO = "/shop/ss-portrait.jpg";

type Loc = { ru: string; en: string };
type Principle = { n: string; title: Loc; sub: Loc };

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: { ru: "Всё в одном месте", en: "Everything in one place" },
    sub: {
      ru: "Волосы, ногти, брови, макияж и уход — за один визит.",
      en: "Hair, nails, brows, makeup and care — in a single visit.",
    },
  },
  {
    n: "02",
    title: { ru: "Честно, без трендов ради трендов", en: "Honest, no trends for their own sake" },
    sub: {
      ru: "Скажем прямо, что подойдёт именно вам, а что — нет.",
      en: "We tell you straight what suits you and what doesn't.",
    },
  },
  {
    n: "03",
    title: { ru: "Вы выходите собой", en: "You leave still yourself" },
    sub: {
      ru: "Только отдохнувшей и уверенной в отражении.",
      en: "Only rested and sure of your reflection.",
    },
  },
];

export default function Philosophy() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="bg-[#f4efe6] py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        {/* Надстрочник + заголовок */}
        <span className="r-reveal inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8a5a3c]" />
          {en ? "philosophy" : "философия"}
        </span>
        <h2 className="r-reveal mt-4 font-display text-[34px] font-normal leading-[1.04] tracking-[0.01em] text-[#2a2320] sm:text-[46px] lg:text-[56px]">
          {en ? "What " : "Что такое "}
          <span className="text-[#3B0D1A]">«ÁLIS BEAUTY»</span>
          {en ? " is" : ""}
        </h2>

        <div className="mt-10 grid items-stretch gap-10 lg:mt-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          {/* Фото основателя */}
          <figure className="r-reveal m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt=""
              draggable={false}
              className="aspect-[4/5] w-full rounded-[26px] object-cover"
            />
            <figcaption className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#2a2320]/55">
              <span className="h-px w-6 bg-[#8a5a3c]" />
              {en ? "founder of ÁLIS BEAUTY" : "основатель ÁLIS BEAUTY"}
            </figcaption>
          </figure>

          {/* Правая колонка */}
          <div className="flex flex-col justify-between">
            {/* Кредо-цитата */}
            <div className="r-reveal">
              <span className="font-display text-[40px] leading-none text-[#8a5a3c]/40">“</span>
              <p className="-mt-4 font-serif text-[26px] italic leading-[1.28] text-[#3B0D1A] sm:text-[30px] lg:text-[36px]">
                {en
                  ? "Beauty without the fuss — your whole look, gathered in one pair of hands."
                  : "Красота без суеты — весь ваш образ, собранный в одних руках."}
              </p>
            </div>

            {/* Принципы 01 / 02 / 03 */}
            <ul className="mt-10 lg:mt-12">
              {PRINCIPLES.map((p) => (
                <li
                  key={p.n}
                  className="r-reveal flex gap-5 border-t border-[#2a2320]/12 py-5 first:border-t-0 first:pt-0 lg:gap-7"
                >
                  <span className="mt-0.5 font-display text-[18px] leading-none text-[#8a5a3c] lg:text-[20px]">
                    {p.n}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium leading-snug text-[#2a2320] lg:text-[16px]">
                      {p.title[lang]}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#2a2320]/60 lg:text-[13.5px]">
                      {p.sub[lang]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
