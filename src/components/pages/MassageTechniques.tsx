"use client";
// БЛОК 3 «Мои техники…» — крупный серифный заголовок, большое фото и сетка 2×2
// из четырёх польз. По эталону massage-romanova.ru.
import { useLang } from "@/lib/i18n";
import { SectionHead } from "./massage/shared";

const PHOTO = "/assets/tild6536-613_-2___1__4.jpg"; // плейсхолдер

type Loc = { ru: string; en: string };
const ITEMS: { title: Loc; desc: Loc }[] = [
  {
    title: { ru: "Глубокий массаж снимет мышечные зажимы", en: "Deep massage releases muscle knots" },
    desc: {
      ru: "Бережная проработка каждой напряжённой мышцы расслабит тело, улучшит приток крови и поможет восстановиться после насыщенного дня.",
      en: "Careful work on every tense muscle relaxes the body, improves blood flow and helps you recover after a busy day.",
    },
  },
  {
    title: { ru: "Стимуляция лимфотока уменьшит отёчность", en: "Lymph stimulation reduces swelling" },
    desc: {
      ru: "Деликатная работа с лимфой поможет вывести лишнюю жидкость — и вы почувствуете, как джинсы стали свободнее, а в ногах появилась приятная невесомость.",
      en: "Gentle work with the lymph helps remove excess fluid — jeans feel looser and the legs pleasantly weightless.",
    },
  },
  {
    title: { ru: "Проработка тканей вернёт подвижность мышцам", en: "Tissue work restores muscle mobility" },
    desc: {
      ru: "Сочетание разогрева и глубоких проминаний расслабят «забитые» мышцы и помогут быстрее восстановиться после физических нагрузок.",
      en: "A blend of warm-up and deep kneading relaxes tight muscles and speeds recovery after physical load.",
    },
  },
  {
    title: { ru: "Акцент на дыхании успокоит нервную систему", en: "A focus on breathing calms the nervous system" },
    desc: {
      ru: "Плавные движения рук, дыхание в такт помогут отпустить внутреннее беспокойство. Вместо тревоги вы ощутите тишину и безмятежность.",
      en: "Smooth hand movements and breathing in rhythm let inner unease go. Instead of anxiety you feel quiet and calm.",
    },
  },
];

export default function MassageTechniques() {
  const { lang } = useLang();
  return (
    <section className="bg-[#F9F8F6] py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <SectionHead
          title={{
            ru: "Мои техники позволят вам ощутить лёгкость уже после первого сеанса",
            en: "My techniques let you feel lightness after the very first session",
          }}
          className="mx-auto max-w-[860px]"
        />

        <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Фото */}
          <div className="overflow-hidden rounded-[24px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO} alt="" aria-hidden className="aspect-square w-full object-cover" />
          </div>

          {/* 2×2 пользы */}
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {ITEMS.map((it) => (
              <div key={it.title.ru}>
                <h3 className="text-[14px] font-semibold leading-[1.25] text-[#444]">{it.title[lang]}</h3>
                <p className="mt-2.5 text-[12.5px] leading-[1.55] text-[#444]/80">{it.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
