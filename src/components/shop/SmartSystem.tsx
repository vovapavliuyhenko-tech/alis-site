"use client";
// УМНАЯ-СИСТЕМА — копия сплит-блока O'CARE: слева зелёная гель-текстура, справа
// размытый портрет, по центру фото-карточка (девушка с набором), сверху белый
// заголовок Cormorant («Умную-систему» — зелёным). Вокруг — 4 подписи-принципа
// со светящимися точками. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const FEATURES: { t: Loc; side: "left" | "right"; pos: string }[] = [
  { t: { ru: "Минимум шагов — максимум смысла", en: "Fewer steps — more sense" }, side: "left", pos: "top-[30%] left-[6%] lg:left-[8%]" },
  { t: { ru: "Совместимость формул", en: "Compatible formulas" }, side: "left", pos: "top-[62%] left-[10%] lg:left-[12%]" },
  { t: { ru: "Прозрачные инструкции", en: "Clear instructions" }, side: "right", pos: "top-[38%] right-[6%] lg:right-[8%]" },
  { t: { ru: "Стабильный результат", en: "A stable result" }, side: "right", pos: "top-[66%] right-[8%] lg:right-[10%]" },
];

function Glow() {
  return (
    <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
      <span className="absolute h-8 w-8 rounded-full bg-[#9ede6a]/50 blur-md" />
      <span className="relative h-2.5 w-2.5 rounded-full bg-[#C9F0B1] shadow-[0_0_8px_2px_rgba(158,222,106,0.8)]" />
    </span>
  );
}

export default function SmartSystem() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="smart" className="bg-[#F3F2EE] px-3 py-8 lg:px-4 lg:py-12">
      <div className="relative mx-auto min-h-[600px] max-w-[1360px] overflow-hidden rounded-[22px] lg:min-h-[760px]">
        {/* Фон: слева гель, справа размытый портрет */}
        <div className="absolute inset-0 grid grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/shop/hero-c.jpg" alt="" className="h-full w-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/shop/ss-portrait.jpg" alt="" className="h-full w-full scale-110 object-cover blur-md" />
        </div>
        <div className="absolute inset-0 bg-black/20" />

        {/* Заголовок */}
        <h2 className="ff-cormorant absolute inset-x-0 top-8 z-20 mx-auto max-w-[760px] px-6 text-center text-[26px] font-bold leading-[1.12] text-[#F9F7F2] lg:top-14 lg:text-[42px]">
          {en ? (
            <>We&apos;ve assembled a working <span className="text-[#C9F0B1]">smart-system</span> for a daily routine</>
          ) : (
            <>Мы собрали работающую <span className="text-[#C9F0B1]">Умную-систему</span> для ежедневной рутины</>
          )}
        </h2>

        {/* Центральная карточка-портрет */}
        <div className="absolute left-1/2 top-1/2 z-10 w-[46%] max-w-[300px] -translate-x-1/2 -translate-y-[42%] lg:-translate-y-[40%]">
          <div className="aspect-[3/4] overflow-hidden rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shop/ss-portrait.jpg" alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Подписи-принципы (десктоп — абсолютно вокруг) */}
        {FEATURES.map((f) => (
          <div
            key={f.t.ru}
            className={`absolute z-20 hidden max-w-[210px] items-center gap-3 lg:flex ${f.pos} ${
              f.side === "right" ? "flex-row-reverse text-right" : "text-left"
            }`}
          >
            <Glow />
            <span className="ff-geo text-[15px] font-medium leading-snug text-[#F9F7F2] drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              {f.t[lang]}
            </span>
          </div>
        ))}

        {/* Подписи — мобильная раскладка (список внизу) */}
        <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-x-4 gap-y-3 bg-gradient-to-t from-black/45 to-transparent px-5 pb-6 pt-16 lg:hidden">
          {FEATURES.map((f) => (
            <div key={f.t.ru} className="flex items-center gap-2">
              <Glow />
              <span className="ff-geo text-[12.5px] font-medium leading-tight text-[#F9F7F2]">{f.t[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
