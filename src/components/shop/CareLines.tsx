"use client";
// ЛИНЕЙКИ УХОДОВ. По мотивам O'CARE (Очищающая, Увлажняющая, Антивозрастная …).
// Стиль ALIS: слева крупный список-«меню», справа липкое фото с кроссфейдом под
// активную линейку; наведение/клик переключают. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Line = { name: Loc; note: Loc; photo: string };

const LINES: Line[] = [
  { name: { ru: "Очищающая", en: "Cleansing" }, note: { ru: "Мягкое умывание без стянутости — база любой рутины.", en: "Gentle cleansing with no tightness — the base of any routine." }, photo: "/assets/tild6561-356_fermata__2.jpg" },
  { name: { ru: "Увлажняющая", en: "Hydrating" }, note: { ru: "Возвращает воду и комфорт обезвоженной коже.", en: "Restores water and comfort to dehydrated skin." }, photo: "/assets/tild6230-643__.jpg" },
  { name: { ru: "Антивозрастная", en: "Anti-age" }, note: { ru: "Плотность, тонус и работа с первыми признаками возраста.", en: "Density, tone and work on the first signs of ageing." }, photo: "/assets/tild3236-393__.jpg" },
  { name: { ru: "Восстанавливающая", en: "Repairing" }, note: { ru: "Поддержка барьера после процедур и стресса.", en: "Barrier support after treatments and stress." }, photo: "/assets/tild6536-613_-2___1__4.jpg" },
  { name: { ru: "Анти-акне", en: "Anti-acne" }, note: { ru: "Контроль высыпаний и выравнивание рельефа.", en: "Breakout control and a smoother texture." }, photo: "/assets/tild3561-646_-2___1__5.jpg" },
  { name: { ru: "Противоотёчная", en: "Anti-puffiness" }, note: { ru: "Свежий взгляд и снятие отёчности с утра.", en: "A fresh look and less puffiness in the morning." }, photo: "/assets/tild3535-313_bergamo.png" },
  { name: { ru: "SPF", en: "SPF" }, note: { ru: "Защита от солнца — главный анти-эйдж каждый день.", en: "Sun protection — the main anti-age, every day." }, photo: "/assets/tild3638-373_-2___1__3.jpg" },
  { name: { ru: "Матирующая", en: "Mattifying" }, note: { ru: "Меньше блеска в Т-зоне, ровный тон надолго.", en: "Less shine in the T-zone, an even tone for longer." }, photo: "/assets/tild6436-383_fermata__1.jpg" },
  { name: { ru: "Ботокс-эффект", en: "Botox-effect" }, note: { ru: "Мгновенная гладкость и лифтинг перед выходом.", en: "Instant smoothness and lift before an event." }, photo: "/assets/tild6530-383_-2___1_.jpg" },
];

export default function CareLines() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState(0);

  return (
    <section id="care-lines" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <div className="mb-10">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {en ? "lines" : "линейки"}
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.05] text-[#17191a] lg:text-[46px]">
            {en ? "Care lines for every task" : "Линейки уходов под задачу"}
          </h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
          {/* Список */}
          <div className="border-t border-[#17191a]/10">
            {LINES.map((l, i) => {
              const on = active === i;
              return (
                <button
                  key={l.name.ru}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-5 border-b border-[#17191a]/10 py-5 text-left lg:py-6"
                >
                  <span className="font-serif text-[13px] tabular-nums text-[#4E2126]/70">0{i + 1}</span>
                  <span
                    className={`flex-1 font-serif leading-tight transition-colors duration-300 text-[22px] lg:text-[30px] ${
                      on ? "text-[#4E2126]" : "text-[#17191a] group-hover:text-[#4E2126]"
                    }`}
                  >
                    {l.name[lang]}
                  </span>
                  <span
                    className={`hidden max-w-[240px] text-right text-[12.5px] leading-snug text-[#17191a]/50 transition-opacity duration-300 lg:block ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {l.note[lang]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Липкое фото */}
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[0_16px_50px_rgba(23,25,26,0.12)]">
              {LINES.map((l, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={l.name.ru}
                  src={l.photo}
                  alt={l.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[800ms] ease-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-serif text-[24px] leading-tight text-[#f4efe6]">{LINES[active].name[lang]}</p>
                <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-[#f4efe6]/80 lg:hidden">
                  {LINES[active].note[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
