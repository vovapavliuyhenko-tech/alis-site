"use client";
// БЛОК УСЛУГ на главной — bento-галерея категорий: одна крупная карточка слева
// и сетка меньших справа. У каждой — фон-фото, надстрочник «категория», название
// и стрелка; зум при наведении. Ведут в услуги салона. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Cat = { title: Loc; img: string; span: string };

const CATS: Cat[] = [
  { title: { ru: "Волосы", en: "Hair" }, img: "/assets/tild6530-383_-2___1_.jpg", span: "lg:col-start-1 lg:row-start-1 lg:row-span-2" },
  { title: { ru: "Ногти", en: "Nails" }, img: "/assets/tild3638-373_-2___1__3.jpg", span: "lg:col-start-2 lg:row-start-1" },
  { title: { ru: "Брови и ресницы", en: "Brows & lashes" }, img: "/assets/tild3236-393__.jpg", span: "lg:col-start-3 lg:row-start-1" },
  { title: { ru: "Макияж", en: "Makeup" }, img: "/assets/tild6230-643__.jpg", span: "lg:col-start-2 lg:row-start-2" },
  { title: { ru: "Уход", en: "Care" }, img: "/assets/tild3561-646_-2___1__5.jpg", span: "lg:col-start-3 lg:row-start-2" },
];

export default function ServiceBento() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="services" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1440px]">
        <div className="r-reveal mb-12 max-w-2xl lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "services" : "услуги"}
          </span>
          <h2 className="mt-5 font-display text-[28px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-[#3B0D1A] lg:text-[42px]">
            {en ? "Everything for your look" : "Всё для вашего образа"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:h-[720px] lg:grid-cols-3 lg:grid-rows-2">
          {CATS.map((c, i) => (
            <a
              key={c.title.ru}
              href="/salon#uslugi"
              className={`r-reveal group relative overflow-hidden rounded-[20px] ${c.span} ${i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:aspect-auto lg:h-full" : "aspect-[4/5] lg:aspect-auto lg:h-full"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/20" />

              {/* Стрелка справа сверху */}
              <span className="absolute right-5 top-5 font-display text-[18px] text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 lg:text-[20px]">
                ↗
              </span>

              {/* Надстрочник + название слева сверху */}
              <div className="absolute left-6 top-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
                  {en ? "category" : "категория"}
                </span>
                <h3 className="mt-1 font-display text-[22px] uppercase tracking-[0.03em] text-white lg:text-[28px]">
                  {c.title[lang]}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
