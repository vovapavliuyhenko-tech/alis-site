"use client";
// УСЛУГИ/ПРАЙС resayme: аккордеон. Заголовок «(services/prices)» — реальный SVG.
// Номера строк — реальные SVG (1.svg..6.svg), иконка «+» — plus.svg.
import { useState } from "react";

const STEPS = [
  "01. Заполнение брифа",
  "02. Обсуждение деталей",
  "03. Внесение предоплаты 50%",
  "04. Разработка дизайна",
  "05. Презентация вариантов с визуализацией",
  "06. Внесение правок (при необходимости)",
  "07. Согласование дизайна",
  "08. Разработка полиграфии (если предусмотрена)",
  "09. Согласование полиграфии",
  "10. Внесение второй части оплаты",
  "11. Разработка логобука/гайдлайна, подготовка макетов к печати (если предусмотрено)",
  "12. Отправка файлов клиенту",
];

const NUM = [
  "/assets/tild3930-303_1.svg",
  "/assets/tild3639-373_2.svg",
  "/assets/tild6538-633_3.svg",
  "/assets/tild6538-653_4.svg",
  "/assets/tild3632-303_5.svg",
  "/assets/tild6637-663_6.svg",
];

const ITEMS = [
  { title: "Этапы работы", steps: true },
  { title: "Разработка логотипа (пакет 1)" },
  { title: "Разработка логотипа (пакет 2)" },
  { title: "Фирменный стиль (пакет 3)" },
  { title: "Фирменный стиль (пакет 4)" },
  { title: "Другие услуги" },
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#17191a] py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/tild3063-643_services.svg"
          alt="(services/prices)"
          className="r-reveal mb-14 h-9 w-auto"
        />

        <div className="border-t border-[#2e3133]">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.title} className="r-reveal border-b border-[#2e3133]">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-6 py-6 text-left lg:gap-10 lg:py-7"
                  aria-expanded={isOpen}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={NUM[i]} alt="" className="h-4 w-auto opacity-90" />
                  <span className="flex-1 text-[17px] text-white lg:text-[19px]">
                    {item.title}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/tild3037-333_plus.svg"
                    alt=""
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid overflow-hidden transition-all duration-400"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    {item.steps ? (
                      <div className="flex flex-col justify-between gap-8 pb-8 pl-[calc(1rem+2.5rem)] text-white/80 lg:flex-row">
                        <ul className="space-y-1 text-[14px] leading-relaxed">
                          {STEPS.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                        <div className="shrink-0 text-[14px] text-white/60 lg:text-right">
                          <p>Срочные заказы +50% к прайсу</p>
                          <p>Режим работы: Пн-Пт 10:00 - 19:00</p>
                        </div>
                      </div>
                    ) : (
                      <p className="pb-8 pl-[calc(1rem+2.5rem)] text-[14px] text-white/60">
                        Стоимость и состав пакета — по запросу.
                      </p>
                    )}
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
