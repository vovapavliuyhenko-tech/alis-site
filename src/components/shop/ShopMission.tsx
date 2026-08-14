"use client";
// МИССИЯ + УМНАЯ-СИСТЕМА. По мотивам O'CARE: крупное заявление о подходе и 4
// принципа системы ухода. Стиль ALIS: бордовая подложка-«постер» слева,
// принципы списком справа. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const FEATURES: { t: Loc; d: Loc }[] = [
  {
    t: { ru: "Стабильный результат", en: "A stable result" },
    d: {
      ru: "Формулы, которые работают предсказуемо — от первого применения до курса.",
      en: "Formulas that work predictably — from the first use to a full course.",
    },
  },
  {
    t: { ru: "Прозрачные инструкции", en: "Clear instructions" },
    d: {
      ru: "Каждое средство — с понятным этапом и порядком нанесения. Без догадок.",
      en: "Every product comes with a clear step and order of use. No guessing.",
    },
  },
  {
    t: { ru: "Минимум шагов — максимум смысла", en: "Fewer steps — more sense" },
    d: {
      ru: "Не десять банок «на всякий случай», а рутина, которую реально соблюдать.",
      en: "Not ten jars 'just in case' — a routine you'll actually keep.",
    },
  },
  {
    t: { ru: "Совместимость формул", en: "Compatible formulas" },
    d: {
      ru: "Средства собраны в систему и не конфликтуют друг с другом.",
      en: "Products are built into a system and don't clash with each other.",
    },
  },
];

export default function ShopMission() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="mission" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto grid w-[94%] max-w-[1280px] items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Постер-заявление */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#4E2126] p-9 text-[#f4efe6] lg:p-12">
          <span className="inline-block rounded-full bg-[#f4efe6]/15 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6] backdrop-blur-sm">
            {en ? "mission" : "миссия"}
          </span>
          <p className="mt-6 font-serif text-[28px] leading-[1.12] lg:text-[38px]">
            {en
              ? "We assembled a working smart-system for a daily routine — not another shelf of jars."
              : "Мы собрали работающую Умную-систему для ежедневной рутины — а не ещё один набор банок."}
          </p>
          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[#f4efe6]/70">
            {en
              ? "The same cosmetics we trust in the studio — so care at home continues what we start in the chair."
              : "Та же косметика, которой мы доверяем в студии — чтобы домашний уход продолжал то, что мы начали в кресле."}
          </p>
        </div>

        {/* Принципы */}
        <div className="flex flex-col justify-center">
          <h2 className="font-serif text-[30px] leading-[1.05] text-[#17191a] lg:text-[42px]">
            {en ? "The smart-system" : "Умная-система"}
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <div key={f.t.ru}>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[15px] tabular-nums text-[#4E2126]">0{i + 1}</span>
                  <h3 className="font-serif text-[19px] leading-snug text-[#17191a]">{f.t[lang]}</h3>
                </div>
                <p className="mt-2 pl-8 text-[13.5px] leading-relaxed text-[#17191a]/55">{f.d[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
