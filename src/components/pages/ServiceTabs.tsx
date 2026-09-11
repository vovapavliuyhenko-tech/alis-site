"use client";
// БЛОК «УСЛУГИ И ПРАЙС» — вкладки-категории сверху, ниже прайс-лист выбранной
// категории с плавной сменой (кросс-фейд). Переиспользуется на /salon и
// /concierge с разными данными. Двуязычно.
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
export type ServiceRow = { name: Loc; price: Loc; note?: Loc };
export type ServiceCategory = { label: Loc; rows: ServiceRow[] };

export default function ServiceTabs({
  eyebrow,
  title,
  categories,
  ground = "white",
}: {
  eyebrow: Loc;
  title: Loc;
  categories: ServiceCategory[];
  ground?: "white" | "cream";
}) {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(true);

  const select = (i: number) => {
    if (i === active) return;
    setShow(false);
    // короткая пауза для кросс-фейда перед сменой списка
    window.setTimeout(() => {
      setActive(i);
      setShow(true);
    }, 160);
  };

  const rows = categories[active]?.rows ?? [];

  return (
    <section className={ground === "cream" ? "bg-[#f7f3ed] py-24 lg:py-28" : "bg-white py-24 lg:py-28"}>
      <div className="mx-auto w-[92%] max-w-[1100px]">
        <div className="mb-10 text-center lg:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#6E7248]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#6E7248]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6E7248]" />
            {eyebrow[lang]}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[26px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#6E7248] lg:text-[40px]">
            {title[lang]}
          </h2>
        </div>

        {/* Вкладки-категории */}
        <div className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-3 lg:mb-12">
          {categories.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.label.ru}
                onClick={() => select(i)}
                className={`relative pb-2 font-display text-[15px] uppercase tracking-[0.08em] transition-colors duration-200 lg:text-[17px] ${
                  on ? "text-[#6E7248]" : "text-[#2a2320]/45 hover:text-[#2a2320]/80"
                }`}
              >
                {c.label[lang]}
                <span
                  className={`absolute inset-x-0 bottom-0 h-px origin-center bg-[#6E7248] transition-transform duration-300 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Прайс-лист выбранной категории */}
        <div
          className={`mx-auto max-w-[760px] transition-opacity duration-200 ${show ? "opacity-100" : "opacity-0"}`}
        >
          {rows.map((r) => (
            <div key={r.name.ru} className="flex items-baseline gap-4 border-t border-[#6E7248]/12 py-4 last:border-b">
              <div className="min-w-0">
                <p className="text-[15px] text-[#2a2320] lg:text-[16px]">{r.name[lang]}</p>
                {r.note && <p className="mt-1 text-[12.5px] text-[#2a2320]/50">{r.note[lang]}</p>}
              </div>
              {/* пунктирный лидер */}
              <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-[#6E7248]/25" />
              <span className="whitespace-nowrap font-display text-[15px] text-[#6E7248] lg:text-[17px]">
                {r.price[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
