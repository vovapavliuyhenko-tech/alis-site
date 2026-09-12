"use client";
// БЛОК 2 (страница «Сотрудничество») — «Форматы»: сетка карточек направлений
// партнёрства. Пронумерованные карточки на светлом фоне, при наведении —
// подъём, оливковая обводка и тень, кружок с индексом заливается оливой,
// стрелка поворачивается, раскрывается пояснение (как в блоках услуг/контактов).
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Format = { title: Loc; note: Loc; img: string };

const FORMATS: Format[] = [
  {
    title: { ru: "Бьюти-сопровождение мероприятий и съёмок", en: "Beauty support for events & shoots" },
    note: {
      ru: "Команда мастеров на площадке: причёски, макияж, ногти и уход в день события. Гости и модели — всегда собраны и в кадре.",
      en: "A team of masters on site: hair, makeup, nails and care on the day. Guests and models — always camera-ready.",
    },
    img: "/assets/tild6230-643__.jpg",
  },
  {
    title: { ru: "Коллаборации с брендами косметики", en: "Collaborations with cosmetic brands" },
    note: {
      ru: "Работаем на профессиональной косметике и открыты к совместным проектам: тесты, контент, спецпредложения для гостей салона.",
      en: "We work on professional cosmetics and welcome joint projects: tests, content, special offers for our guests.",
    },
    img: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    title: { ru: "Партнёрство с площадками и агентствами", en: "Partnerships with venues & agencies" },
    note: {
      ru: "Отели, рестораны, event-агентства и организаторы — берём на себя бьюти-часть под ключ, под формат и тайминг вашего мероприятия.",
      en: "Hotels, restaurants, event agencies and organisers — we take on the beauty part turnkey, matched to your format and timing.",
    },
    img: "/assets/tild3236-393__.jpg",
  },
  {
    title: { ru: "Блогеры и амбассадоры", en: "Bloggers & ambassadors" },
    note: {
      ru: "Долгосрочные коллаборации с теми, кто разделяет наши ценности. Честный обмен, реальный сервис, а не разовая бартерная история.",
      en: "Long-term collaborations with people who share our values. A fair exchange and real service — not a one-off barter.",
    },
    img: "/assets/tild3561-646_-2___1__5.jpg",
  },
];

export default function CooperationFormats() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto w-[94%] max-w-[1200px]">
        <div className="r-reveal mb-12 text-center lg:mb-16">
          <p className="text-[10px] lowercase tracking-[0.05em] text-[#6E7248]">
            {en ? "formats" : "форматы"}
          </p>
          <h2 className="mt-3 font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.02em] text-[#6E7248] lg:text-[28px]">
            {en ? "How we can be useful" : "Чем можем быть полезны"}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {FORMATS.map((f, i) => (
            <div
              key={f.title.ru}
              className="r-reveal group flex flex-col overflow-hidden rounded-[24px] border border-[#C2C0B6]/45 bg-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-[#6E7248] hover:shadow-[0_18px_50px_rgba(110,114,72,0.20)]"
            >
              {/* Фото направления */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.img}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                {/* Индекс формата */}
                <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-black/10 font-serif-display text-[15px] text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-transparent group-hover:bg-[#6E7248] group-hover:text-[#F4F1EA]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Текст */}
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif-display text-[18px] uppercase leading-[1.25] tracking-[0.02em] text-[#6E7248] lg:text-[20px]">
                    {f.title[lang]}
                  </h3>
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#6E7248]/40 text-[15px] text-[#6E7248] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#6E7248] group-hover:text-[#F4F1EA]">
                    <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[#2a2320]/70">
                  {f.note[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
