"use client";
// БЛОК УСЛУГ на главной — bento-галерея категорий: одна крупная карточка слева
// и сетка меньших справа. У каждой — фон-фото, надстрочник «категория», название
// и стрелка; зум при наведении. Ведут в услуги салона. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
// href — куда ведёт карточка: категория в услугах салона (раскрывается по якорю) или весь прайс
type Cat = { title: Loc; note: Loc; img: string; alt: Loc; span: string; href: string; pos?: string }; // pos — какая часть фото видна

// Фото — работы по услуге (волны, маникюр, взгляд, макияж невесты, уход за волосами)
const CATS: Cat[] = [
  { href: "/salon#uslugi-hair", title: { ru: "Парикмахерские услуги", en: "Hairdressing" }, note: { ru: "Стрижка, цвет, укладка. Выходите с причёской, а не с обещанием.", en: "Cut, colour, styling. You leave with the hairstyle, not a promise." }, img: "/assets/alis/work_hair_waves.jpg", alt: { ru: "Укладка локонами на длинных тёмных волосах — работа ÁLIS BEAUTY", en: "Long dark hair styled in soft waves by ÁLIS BEAUTY" }, span: "lg:col-start-1 lg:row-start-1 lg:row-span-2" },
  { href: "/salon#uslugi-makeup", title: { ru: "Макияж", en: "Makeup" }, note: { ru: "Дневной, вечерний, свадебный. В тон всему образу.", en: "Day, evening, bridal. In tone with the whole look." }, img: "/assets/works/makeup_shoot.jpg", pos: "object-[50%_60%]", alt: { ru: "Визажист ÁLIS BEAUTY делает свадебный макияж невесте", en: "An ÁLIS BEAUTY make-up artist doing bridal make-up" }, span: "lg:col-start-2 lg:row-start-1" },
  { href: "/salon#uslugi-brows", title: { ru: "Коррекция бровей", en: "Brow shaping" }, note: { ru: "Форма под ваше лицо. Взгляд открытый уже на выходе.", en: "Shape made for your face. An open gaze the moment you leave." }, img: "/assets/works/brows_bw.jpg", pos: "object-[50%_22%]", alt: { ru: "Оформленные брови и ресницы, открытый взгляд — работа ÁLIS BEAUTY", en: "Shaped brows and lashes, an open gaze — by ÁLIS BEAUTY" }, span: "lg:col-start-3 lg:row-start-1" },
  { href: "/salon#uslugi-manicure", title: { ru: "Ногтевой сервис", en: "Nail services" }, note: { ru: "Маникюр и педикюр, которые держатся, а не отлетают через неделю.", en: "Manicure and pedicure that last — no chipping after a week." }, img: "/assets/works/nails_ysl.jpg", pos: "object-[50%_40%]", alt: { ru: "Нюдовый маникюр на коротких ногтях — работа ÁLIS BEAUTY", en: "Nude manicure on short nails by ÁLIS BEAUTY" }, span: "lg:col-start-2 lg:col-span-2 lg:row-start-2" },
];

export default function ServiceBento() {
  const { lang } = useLang();

  return (
    <section id="services" className="scroll-mt-24 bg-white section-y !pt-[clamp(48px,8vw,116px)]">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] sm:mb-12 lg:mb-16 lg:text-[28px]">
          {lang === "en" ? "Popular services" : "Популярные услуги"}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:h-[560px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          {CATS.map((c, i) => (
            <a
              key={c.title.ru}
              href={c.href}
              className={`r-reveal group relative overflow-hidden rounded-[20px] ${c.span} ${i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:aspect-auto lg:h-full" : i === CATS.length - 1 ? "col-span-2 aspect-[16/10] lg:aspect-auto lg:h-full" : "aspect-[4/5] lg:aspect-auto lg:h-full"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={c.alt[lang]}
                draggable={false}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${c.pos ?? ""} transition-[scale,filter] duration-[900ms] ease-out group-hover:scale-105 group-hover:blur-md`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-colors duration-500 group-hover:from-black/55" />

              {/* Название внизу слева; подпись на компьютере выезжает при наведении, на телефоне видна сразу */}
              <div className="absolute bottom-5 left-6 right-16 lg:bottom-6">
                <h3 className="font-serif-display text-[22px] uppercase tracking-[0.03em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,.45)] lg:text-[24px]">
                  {c.title[lang]}
                </h3>
                {/* Подписи под названием убраны по просьбе заказчицы — только название категории */}
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
