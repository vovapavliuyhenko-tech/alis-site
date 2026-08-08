"use client";
// УСЛУГИ — аккордеон с фото. Строка: [номер] · название · цена. По клику плавно
// раскрывается панель: описание, детальные цены, фото образа и кнопка «Записаться».
// Открыт всегда один пункт. Стиль тёмный, serif-заголовки, реальные цены салона.
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Detail = { label: Loc; price: Loc };
type Item = {
  n: string;
  title: Loc;
  price: Loc;
  desc: Loc;
  details: Detail[];
  note?: Loc;
  photo: string;
};

const ITEMS: Item[] = [
  {
    n: "01",
    title: { ru: "Полный образ", en: "Full look" },
    price: { ru: "от 8 000 ₽", en: "from 8,000 ₽" },
    desc: {
      ru: "Макияж и укладка под ваш повод — от дневного выхода до вечернего события. Собираем цельный, ухоженный образ.",
      en: "Makeup and hair for your occasion — from a daytime outing to an evening event. A polished, cohesive look.",
    },
    details: [
      { label: { ru: "Полный образ", en: "Full look" }, price: { ru: "8 000 ₽", en: "8,000 ₽" } },
      { label: { ru: "С топ-стилистами", en: "With top stylists" }, price: { ru: "от 10 000 ₽", en: "from 10,000 ₽" } },
    ],
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    n: "02",
    title: { ru: "Свадебный образ", en: "Bridal look" },
    price: { ru: "от 10 000 ₽", en: "from 10,000 ₽" },
    desc: {
      ru: "Ваш день под ключ: пробный образ заранее, репетиция деталей и финальный свадебный look в день торжества.",
      en: "Your day, turnkey: a trial look in advance, a rehearsal of details and the final bridal look on the day.",
    },
    details: [
      { label: { ru: "Свадебный образ", en: "Bridal look" }, price: { ru: "10 000 ₽", en: "10,000 ₽" } },
      { label: { ru: "Пробный образ", en: "Trial look" }, price: { ru: "8 500 ₽", en: "8,500 ₽" } },
      { label: { ru: "С топ-стилистами", en: "With top stylists" }, price: { ru: "15 000 ₽", en: "15,000 ₽" } },
      { label: { ru: "Свадебный + подбор look", en: "Bridal + styling" }, price: { ru: "от 17 000 ₽", en: "from 17,000 ₽" } },
    ],
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    n: "03",
    title: { ru: "Макияж и укладка", en: "Makeup & hair" },
    price: { ru: "от 2 500 ₽", en: "from 2,500 ₽" },
    desc: {
      ru: "Отдельные услуги, когда нужно быстро и точно — только макияж или только укладка под настроение.",
      en: "Standalone services when you need it fast and precise — makeup only or hair only, to suit your mood.",
    },
    details: [
      { label: { ru: "Макияж", en: "Makeup" }, price: { ru: "5 000 ₽", en: "5,000 ₽" } },
      { label: { ru: "Укладка", en: "Hair styling" }, price: { ru: "2 500 – 3 500 ₽", en: "2,500 – 3,500 ₽" } },
    ],
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    n: "04",
    title: { ru: "Образ с подбором look", en: "Look with styling" },
    price: { ru: "от 15 000 ₽", en: "from 15,000 ₽" },
    desc: {
      ru: "Полный образ плюс подбор одного лука от стилиста под конкретное мероприятие — от макияжа до одежды.",
      en: "A full look plus a stylist-curated outfit for a specific event — from makeup to clothing.",
    },
    details: [
      { label: { ru: "Образ + подбор look", en: "Look + styling" }, price: { ru: "от 15 000 ₽", en: "from 15,000 ₽" } },
      { label: { ru: "Свадебный с подбором", en: "Bridal with styling" }, price: { ru: "от 17 000 ₽", en: "from 17,000 ₽" } },
    ],
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    n: "05",
    title: { ru: "Выезд мастеров", en: "On-location team" },
    price: { ru: "от 8 000 ₽", en: "from 8,000 ₽" },
    desc: {
      ru: "Команда от двух мастеров приезжает к вам — домой, в студию или на площадку.",
      en: "A team of two or more artists comes to you — at home, in a studio or on location.",
    },
    details: [
      { label: { ru: "Новороссийск", en: "Novorossiysk" }, price: { ru: "8 000 ₽", en: "8,000 ₽" } },
      { label: { ru: "Геленджик / Анапа / Абрау-Дюрсо", en: "Gelendzhik / Anapa / Abrau-Dyurso" }, price: { ru: "от 10 000 ₽", en: "from 10,000 ₽" } },
      { label: { ru: "Сочи / Адлер", en: "Sochi / Adler" }, price: { ru: "от 25 000 ₽", en: "from 25,000 ₽" } },
      { label: { ru: "Краснодар / Ростов", en: "Krasnodar / Rostov" }, price: { ru: "от 25 000 ₽", en: "from 25,000 ₽" } },
      { label: { ru: "Москва / Санкт-Петербург", en: "Moscow / St. Petersburg" }, price: { ru: "по запросу", en: "on request" } },
    ],
    note: {
      ru: "Другое число мастеров — по договорённости с менеджером.",
      en: "A different number of artists — by arrangement with the manager.",
    },
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    n: "06",
    title: { ru: "Сопровождение на мероприятии", en: "On-event support" },
    price: { ru: "от 2 000 ₽/час", en: "from 2,000 ₽/hr" },
    desc: {
      ru: "Стилист и визажист рядом весь день или вечер: правки образа, помощь с деталями, быстрые перемены между выходами.",
      en: "A stylist and makeup artist by your side all day or evening: touch-ups, help with details, quick changes between appearances.",
    },
    details: [
      { label: { ru: "Стилист или визажист", en: "Stylist or makeup artist" }, price: { ru: "2 000 ₽/час", en: "2,000 ₽/hr" } },
      { label: { ru: "Стилист + визажист", en: "Stylist + makeup artist" }, price: { ru: "4 000 ₽/час", en: "4,000 ₽/hr" } },
    ],
    photo: "/assets/tild3561-646_-2___1__5.jpg",
  },
];

export default function Services() {
  const { lang } = useLang();
  const [open, setOpen] = useState(0);

  // Открываем нужную услугу по якорю (#service-0N из меню)
  useEffect(() => {
    const applyHash = () => {
      const m = window.location.hash.match(/^#service-(\d+)/);
      if (!m) return;
      const idx = ITEMS.findIndex((it) => it.n === m[1]);
      if (idx >= 0) setOpen(idx);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section id="services" className="scroll-mt-24 bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1180px]">
        <div className="border-t border-[#4E2126]/50">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.n} id={`service-${it.n}`} className="scroll-mt-28 border-b border-[#4E2126]/50">
                {/* Строка-заголовок */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[44px_1fr_auto] items-center gap-4 py-7 text-left lg:grid-cols-[64px_1fr_auto_auto] lg:gap-8 lg:py-8"
                >
                  <span className="justify-self-start rounded-md bg-[#4E2126] px-2 py-1 text-[11px] font-medium tabular-nums text-[#f4efe6] lg:text-[12px]">
                    {it.n}
                  </span>
                  <h3
                    className={`font-serif text-[22px] leading-tight transition-colors lg:text-[30px] ${
                      isOpen ? "text-[#f4efe6]" : "text-[#f4efe6]/85"
                    }`}
                  >
                    {it.title[lang]}
                  </h3>
                  <span className="hidden font-serif text-[20px] text-[#f4efe6]/80 lg:block lg:text-[24px]">
                    {it.price[lang]}
                  </span>
                  {/* Иконка «+» */}
                  <span className="relative ml-auto h-4 w-4 shrink-0 lg:ml-4">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-[#f4efe6]/70" />
                    <span
                      className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-[#f4efe6]/70 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Раскрывающаяся панель */}
                <div
                  className="grid overflow-hidden transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <div className="grid gap-8 pb-10 lg:grid-cols-[1fr_320px] lg:gap-12 lg:pl-[72px]">
                      {/* Левая часть — описание + цены + CTA */}
                      <div className="order-2 lg:order-1">
                        <p className="max-w-lg text-[14px] leading-relaxed text-[#f4efe6]/60">
                          {it.desc[lang]}
                        </p>
                        <dl className="mt-6 max-w-lg">
                          {it.details.map((d) => (
                            <div
                              key={d.label.ru}
                              className="flex items-baseline justify-between gap-6 border-b border-[#4E2126]/35 py-3 last:border-0"
                            >
                              <dt className="text-[14px] text-[#f4efe6]/85">{d.label[lang]}</dt>
                              <dd className="shrink-0 text-[14px] tabular-nums text-[#f4efe6]/55">
                                {d.price[lang]}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        {it.note && (
                          <p className="mt-4 text-[12px] italic text-[#f4efe6]/40">
                            {it.note[lang]}
                          </p>
                        )}
                        <a
                          href="/#booking"
                          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#4E2126] px-6 py-3 text-[13px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
                        >
                          {lang === "en" ? "Book" : "Записаться"} <span aria-hidden>→</span>
                        </a>
                      </div>

                      {/* Правая часть — фото образа */}
                      <div className="order-1 lg:order-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={it.photo}
                          alt={it.title[lang]}
                          className="aspect-[4/5] w-full rounded-[16px] object-cover lg:aspect-[4/5]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
