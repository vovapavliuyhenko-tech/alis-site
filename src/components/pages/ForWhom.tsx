"use client";
// «Для кого ÁLIS» — обычная секция: слева фото, справа нумерованный список
// аудиторий. Без пиннинга и скролл-эффектов. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const IMG = "/assets/tild6230-643__.jpg";

const ITEMS: Loc[] = [
  { ru: "много работает и живёт в плотном графике", en: "works a lot and lives on a tight schedule" },
  { ru: "ценит ухоженный вид без лишних действий", en: "values a groomed look without extra fuss" },
  { ru: "любит эстетичный уход и красивые ритуалы", en: "loves aesthetic care and beautiful rituals" },
  { ru: "хочет регулярный результат без спешки", en: "wants a regular result without the rush" },
];

export default function ForWhom() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="for-whom" className="bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        {/* Заголовок */}
        <div className="mb-12 text-center lg:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "for whom ÁLIS" : "для кого ÁLIS"}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[28px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[42px]">
            {en ? "For women with different rhythms of life" : "Для женщин с разным ритмом жизни"}
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Фото */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG}
            alt=""
            className="aspect-[4/5] w-full max-w-[420px] rounded-[26px] object-cover"
            draggable={false}
          />

          {/* Нумерованный список */}
          <ul className="flex flex-col">
            {ITEMS.map((it, i) => (
              <li
                key={it.ru}
                className="grid grid-cols-[auto_1fr] items-start gap-6 border-t border-[#17191a]/12 py-6 last:border-b lg:gap-8 lg:py-7"
              >
                <span className="font-display text-[15px] tabular-nums text-[#4A4B33]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[16px] leading-snug text-[#2a2320] lg:text-[19px]">{it[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
