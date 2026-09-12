"use client";
// БЛОК УСЛУГ на главной — bento-галерея категорий: одна крупная карточка слева
// и сетка меньших справа. У каждой — фон-фото, надстрочник «категория», название
// и стрелка; зум при наведении. Ведут в услуги салона. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Cat = { title: Loc; note: Loc; img: string; span: string };

const CATS: Cat[] = [
  { title: { ru: "Волосы", en: "Hair" }, note: { ru: "Стрижка, цвет, укладка. Выходите с причёской, а не с обещанием.", en: "Cut, colour, styling. You leave with the hairstyle, not a promise." }, img: "/assets/tild6530-383_-2___1_.jpg", span: "lg:col-start-1 lg:row-start-1 lg:row-span-2" },
  { title: { ru: "Ногти", en: "Nails" }, note: { ru: "Маникюр и педикюр, которые держатся, а не облетают через неделю.", en: "Manicure and pedicure that last — not chip in a week." }, img: "/assets/tild3638-373_-2___1__3.jpg", span: "lg:col-start-2 lg:row-start-1" },
  { title: { ru: "Брови и ресницы", en: "Brows & lashes" }, note: { ru: "Форма под ваше лицо. Взгляд открытый уже на выходе.", en: "Shape made for your face. An open gaze the moment you leave." }, img: "/assets/tild3236-393__.jpg", span: "lg:col-start-3 lg:row-start-1" },
  { title: { ru: "Макияж", en: "Makeup" }, note: { ru: "Дневной, вечерний, свадебный. В тон всему образу.", en: "Day, evening, bridal. In tone with the whole look." }, img: "/assets/tild6230-643__.jpg", span: "lg:col-start-2 lg:row-start-2" },
  { title: { ru: "Уход", en: "Care" }, note: { ru: "Уход, после которого кожа и волосы говорят сами за себя.", en: "Care after which your skin and hair speak for themselves." }, img: "/assets/tild3561-646_-2___1__5.jpg", span: "lg:col-start-3 lg:row-start-2" },
];

export default function ServiceBento() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="mx-auto w-[94%] max-w-[1440px]">
        <div className="r-reveal mb-12 text-center lg:mb-16">
          <p className="text-[10px] lowercase tracking-[0.05em] text-[#6E7248]">
            {en ? "services" : "услуги"}
          </p>
          <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#6E7248] lg:text-[28px]">
            {en ? "Everything for your look" : "Всё для вашего образа"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:h-[560px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
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
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-out group-hover:scale-105 group-hover:blur-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/20 transition-colors duration-500 group-hover:from-black/55 group-hover:via-black/25 group-hover:to-black/45" />

              {/* Кружок со стрелкой справа сверху — на ховере светлеет, стрелка поворачивается */}
              <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-[15px] text-white transition-colors duration-300 group-hover:border-transparent group-hover:bg-[#F4F1EA] group-hover:text-[#6E7248] lg:h-10 lg:w-10">
                <span className="transition-transform duration-300 group-hover:rotate-12">↗</span>
              </span>

              {/* Название слева сверху + подпись, проявляется на наведении */}
              <div className="absolute inset-x-6 top-5">
                <h3 className="font-serif-display text-[22px] uppercase tracking-[0.03em] text-white lg:text-[24px]">
                  {c.title[lang]}
                </h3>
                <p className="mt-2 max-w-[260px] text-[12px] leading-[1.4] text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {c.note[lang]}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
