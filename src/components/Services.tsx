"use client";
// УСЛУГИ — аккордеон с фото. Строка: [номер] · название · цена. По клику плавно
// раскрывается панель: описание, детальные цены, фото образа и кнопка «Записаться».
// Открыт всегда один пункт. Стиль тёмный, serif-заголовки, реальные цены салона.
import { useState } from "react";

type Item = {
  n: string;
  title: string;
  price: string;
  desc: string;
  details: [string, string][];
  note?: string;
  photo: string;
};

const ITEMS: Item[] = [
  {
    n: "01",
    title: "Полный образ",
    price: "от 8 000 ₽",
    desc: "Макияж и укладка под ваш повод — от дневного выхода до вечернего события. Собираем цельный, ухоженный образ.",
    details: [
      ["Полный образ", "8 000 ₽"],
      ["С топ-стилистами", "от 10 000 ₽"],
    ],
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    n: "02",
    title: "Свадебный образ",
    price: "от 10 000 ₽",
    desc: "Ваш день под ключ: пробный образ заранее, репетиция деталей и финальный свадебный look в день торжества.",
    details: [
      ["Свадебный образ", "10 000 ₽"],
      ["Пробный образ", "8 500 ₽"],
      ["С топ-стилистами", "15 000 ₽"],
      ["Свадебный + подбор look", "от 17 000 ₽"],
    ],
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    n: "03",
    title: "Макияж и укладка",
    price: "от 2 500 ₽",
    desc: "Отдельные услуги, когда нужно быстро и точно — только макияж или только укладка под настроение.",
    details: [
      ["Макияж", "5 000 ₽"],
      ["Укладка", "2 500 – 3 500 ₽"],
    ],
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    n: "04",
    title: "Образ с подбором look",
    price: "от 15 000 ₽",
    desc: "Полный образ плюс подбор одного лука от стилиста под конкретное мероприятие — от макияжа до одежды.",
    details: [
      ["Образ + подбор look", "от 15 000 ₽"],
      ["Свадебный с подбором", "от 17 000 ₽"],
    ],
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    n: "05",
    title: "Выезд мастеров",
    price: "от 8 000 ₽",
    desc: "Команда от двух мастеров приезжает к вам — домой, в студию или на площадку.",
    details: [
      ["Новороссийск", "8 000 ₽"],
      ["Геленджик / Анапа / Абрау-Дюрсо", "от 10 000 ₽"],
      ["Сочи / Адлер", "от 25 000 ₽"],
      ["Краснодар / Ростов", "от 25 000 ₽"],
      ["Москва / Санкт-Петербург", "по запросу"],
    ],
    note: "Другое число мастеров — по договорённости с менеджером.",
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    n: "06",
    title: "Сопровождение на мероприятии",
    price: "от 2 000 ₽/час",
    desc: "Стилист и визажист рядом весь день или вечер: правки образа, помощь с деталями, быстрые перемены между выходами.",
    details: [
      ["Стилист или визажист", "2 000 ₽/час"],
      ["Стилист + визажист", "4 000 ₽/час"],
    ],
    photo: "/assets/tild3561-646_-2___1__5.jpg",
  },
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="scroll-mt-24 bg-[#f4efe6] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1180px]">
        {/* Шапка */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
          <span className="r-reveal self-start text-[13px] lowercase tracking-wide text-[#17191a]/45">
            [ услуги + цены ]
          </span>
          <h2 className="r-reveal font-serif text-[34px] leading-[1.05] text-[#17191a] lg:text-right lg:text-[54px]">
            Собираем образ под повод,
            <br />
            формат и настроение
          </h2>
        </div>

        <div className="border-t border-[#17191a]/12">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.n} className="border-b border-[#17191a]/12">
                {/* Строка-заголовок */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[44px_1fr_auto] items-center gap-4 py-7 text-left lg:grid-cols-[64px_1fr_auto_auto] lg:gap-8 lg:py-8"
                >
                  <span className="text-[12px] tracking-wide text-[#17191a]/40 lg:text-[13px]">
                    [ {it.n} ]
                  </span>
                  <h3
                    className={`font-serif text-[22px] leading-tight transition-colors lg:text-[30px] ${
                      isOpen ? "text-[#17191a]" : "text-[#17191a]/85"
                    }`}
                  >
                    {it.title}
                  </h3>
                  <span className="hidden font-serif text-[20px] text-[#17191a]/80 lg:block lg:text-[24px]">
                    {it.price}
                  </span>
                  {/* Иконка «+» */}
                  <span className="relative ml-auto h-4 w-4 shrink-0 lg:ml-4">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-[#17191a]/70" />
                    <span
                      className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-[#17191a]/70 transition-transform duration-300 ${
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
                        <p className="max-w-lg text-[14px] leading-relaxed text-[#17191a]/60">
                          {it.desc}
                        </p>
                        <dl className="mt-6 max-w-lg">
                          {it.details.map(([label, price]) => (
                            <div
                              key={label}
                              className="flex items-baseline justify-between gap-6 border-b border-[#17191a]/10 py-3 last:border-0"
                            >
                              <dt className="text-[14px] text-[#17191a]/85">{label}</dt>
                              <dd className="shrink-0 text-[14px] tabular-nums text-[#17191a]/55">
                                {price}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        {it.note && (
                          <p className="mt-4 text-[12px] italic text-[#17191a]/40">
                            {it.note}
                          </p>
                        )}
                        <a
                          href="#booking"
                          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#4E2126] px-6 py-3 text-[13px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.03]"
                        >
                          Записаться <span aria-hidden>→</span>
                        </a>
                      </div>

                      {/* Правая часть — фото образа */}
                      <div className="order-1 lg:order-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={it.photo}
                          alt={it.title}
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
