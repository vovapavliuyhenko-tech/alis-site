"use client";
// БЛОК УСЛУГ на главной — bento-галерея категорий: одна крупная карточка слева
// и сетка меньших справа. У каждой — фон-фото, надстрочник «категория», название
// и стрелка; зум при наведении. Ведут в услуги салона. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
// href — куда ведёт карточка: категория в услугах салона (раскрывается по якорю) или весь прайс
type Cat = { title: Loc; note: Loc; img: string; alt: Loc; span: string; href: string };

// Фото — работы по услуге (волны, маникюр, взгляд, макияж невесты, уход за волосами)
const CATS: Cat[] = [
  { href: "/salon#uslugi-hair", title: { ru: "Волосы", en: "Hair" }, note: { ru: "Стрижка, цвет, укладка. Выходите с причёской, а не с обещанием.", en: "Cut, colour, styling. You leave with the hairstyle, not a promise." }, img: "/assets/alis/img_3283.jpg", alt: { ru: "Укладка локонами на длинных тёмных волосах — работа ÁLIS BEAUTY", en: "Long dark hair styled in soft waves by ÁLIS BEAUTY" }, span: "lg:col-start-1 lg:row-start-1 lg:row-span-2" },
  { href: "/salon#uslugi-manicure", title: { ru: "Ногти", en: "Nails" }, note: { ru: "Маникюр и педикюр, которые держатся, а не отлетают через неделю.", en: "Manicure and pedicure that last — no chipping after a week." }, img: "/assets/alis/img_8578.jpg", alt: { ru: "Нюдовый маникюр на коротких ногтях — работа ÁLIS BEAUTY", en: "Nude manicure on short nails by ÁLIS BEAUTY" }, span: "lg:col-start-2 lg:row-start-1" },
  { href: "/salon#uslugi-brows", title: { ru: "Брови и ресницы", en: "Brows & lashes" }, note: { ru: "Форма под ваше лицо. Взгляд открытый уже на выходе.", en: "Shape made for your face. An open gaze the moment you leave." }, img: "/assets/alis/img_2672.jpg", alt: { ru: "Оформленные брови и ресницы, открытый взгляд — работа ÁLIS BEAUTY", en: "Shaped brows and lashes, an open gaze — by ÁLIS BEAUTY" }, span: "lg:col-start-3 lg:row-start-1" },
  { href: "/salon#uslugi-makeup", title: { ru: "Макияж", en: "Makeup" }, note: { ru: "Дневной, вечерний, свадебный. В тон всему образу.", en: "Day, evening, bridal. In tone with the whole look." }, img: "/assets/alis/img_2746.jpg", alt: { ru: "Визажист ÁLIS BEAUTY делает свадебный макияж невесте", en: "An ÁLIS BEAUTY make-up artist doing bridal make-up" }, span: "lg:col-start-2 lg:row-start-2" },
  { href: "/salon#uslugi", title: { ru: "Уход", en: "Care" }, note: { ru: "Уход, после которого кожа и волосы говорят сами за себя.", en: "Care after which your skin and hair speak for themselves." }, img: "/assets/alis/img_5910.webp", alt: { ru: "Гладкие блестящие волосы после ухода, гребень ÁLIS BEAUTY", en: "Smooth glossy hair after a care treatment, ÁLIS BEAUTY comb" }, span: "lg:col-start-3 lg:row-start-2" },
];

export default function ServiceBento() {
  const { lang } = useLang();

  return (
    <section id="services" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        {/* Заголовок слева над плитками — как «Выберите нужную категорию» в магазине (текст на согласование) */}
        <h2 className="mb-8 !text-[16px] uppercase tracking-[0.06em] text-[#17191a] lg:mb-10 lg:!text-[18px]">
          {lang === "en" ? "Let’s start with the first step" : "Давайте начнём с первого шага"}
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:h-[560px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          {CATS.map((c, i) => (
            <a
              key={c.title.ru}
              href={c.href}
              className={`r-reveal group relative overflow-hidden rounded-[12px] ${c.span} ${i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:aspect-auto lg:h-full" : "aspect-[4/5] lg:aspect-auto lg:h-full"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.alt[lang]}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-out group-hover:scale-105 group-hover:blur-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/20 transition-colors duration-500 group-hover:from-black/65 group-hover:via-black/35 group-hover:to-black/50" />

              {/* Название слева сверху + подпись, проявляется на наведении */}
              <div className="absolute inset-x-6 top-5">
                <h3 className="font-serif-display text-[22px] uppercase tracking-[0.03em] text-white lg:text-[24px]">
                  {c.title[lang]}
                </h3>
                <p className="mt-2 max-w-[280px] !text-[12.5px] leading-[1.5] text-white opacity-0 [text-shadow:0_1px_12px_rgba(0,0,0,.45)] lg:!text-[13px] transition-opacity duration-300 group-hover:opacity-100">
                  {c.note[lang]}
                </p>
              </div>

              {/* Стрелка — видно, что карточка кликабельна (в т.ч. на телефоне без hover) */}
              <span
                aria-hidden
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-[#17191a]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="transition-transform duration-300 group-hover:-rotate-45">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
