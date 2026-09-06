"use client";
// «Для кого ÁLIS» — по мотивам cryome: заголовок сверху, слева колонка фото,
// справа нумерованный список аудиторий, распределённый по высоте. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { line: Loc; img: string };

const ITEMS: Item[] = [
  { line: { ru: "много работает и живёт в плотном графике", en: "works a lot and lives on a tight schedule" }, img: "/assets/tild6230-643__.jpg" },
  { line: { ru: "ценит ухоженный вид без лишних действий", en: "values a groomed look without extra fuss" }, img: "/assets/tild6530-383_-2___1_.jpg" },
  { line: { ru: "любит эстетичный уход и красивые ритуалы", en: "loves aesthetic care and beautiful rituals" }, img: "/assets/tild3236-393__.jpg" },
  { line: { ru: "хочет регулярный результат без спешки", en: "wants a regular result without the rush" }, img: "/assets/tild3638-373_-2___1__3.jpg" },
];

export default function ForWhom() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="for-whom" className="bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        {/* Заголовок сверху по центру */}
        <div className="mb-14 text-center lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {en ? "for whom ÁLIS" : "для кого ÁLIS"}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-[28px] font-normal uppercase leading-[1.1] tracking-[0.03em] text-[#3B0D1A] lg:text-[42px]">
            {en ? "For women with different rhythms of life" : "Для женщин с разным ритмом жизни"}
          </h2>
        </div>

        {/* Слева фото-колонка, справа нумерованный список */}
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Фото — вертикальная колонка */}
          <div className="flex flex-col gap-6">
            {ITEMS.map((it) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={it.img}
                src={it.img}
                alt=""
                className="aspect-[5/4] w-full rounded-[24px] object-cover"
                draggable={false}
              />
            ))}
          </div>

          {/* Список — распределён по высоте напротив фото */}
          <ul className="flex flex-col justify-between gap-8 py-2">
            {ITEMS.map((it, i) => (
              <li key={it.line.ru} className="grid grid-cols-[auto_1fr] items-start gap-6 lg:gap-8">
                <span className="font-display text-[20px] tabular-nums leading-none text-[#4A4B33] lg:text-[26px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[18px] leading-snug text-[#2a2320] lg:text-[24px]">{it.line[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
