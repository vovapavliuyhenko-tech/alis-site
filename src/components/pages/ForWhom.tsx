"use client";
// «Для кого ÁLIS» — копия блока «для кого CryoMe» (Tilda Zero Block rec1898623061).
// Слева нумерованный список 01–04 с тонкими линиями-разделителями и короткими
// фразами; справа коллаж фото-карточек с фирменными «срезанными» углами
// (один угол прямой: 20px 20px 20px 0). Адаптировано под палитру и тексты ÁLIS.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

// углы карточек как на cryome: каждый следующий кадр «срезан» с другой стороны
const ITEMS: { n: string; line: Loc; img: string; radius: string }[] = [
  { n: "01", line: { ru: "много работает и живёт в плотном графике", en: "works a lot and lives on a tight schedule" }, img: "/assets/tild6230-643__.jpg", radius: "24px 24px 24px 0" },
  { n: "02", line: { ru: "ценит ухоженный вид без лишних действий", en: "values a groomed look without extra fuss" }, img: "/assets/tild6530-383_-2___1_.jpg", radius: "24px 24px 0 24px" },
  { n: "03", line: { ru: "любит эстетичный уход и красивые ритуалы", en: "loves aesthetic care and beautiful rituals" }, img: "/assets/tild3236-393__.jpg", radius: "24px 0 24px 24px" },
  { n: "04", line: { ru: "хочет регулярный результат без спешки", en: "wants a regular result without the rush" }, img: "/assets/tild3638-373_-2___1__3.jpg", radius: "0 24px 24px 24px" },
];

export default function ForWhom() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="for-whom" className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid w-[92%] max-w-[1200px] gap-y-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-x-24">
        {/* ЛЕВО — заголовок + нумерованный список с линиями (как на cryome) */}
        <div className="lg:self-start">
          <span className="text-[12px] font-bold uppercase tracking-[0.02em] text-[#3B0D1A]">
            {en ? "for whom ÁLIS" : "для кого ÁLIS"}
          </span>
          <h2 className="mt-3 max-w-[16rem] font-display text-[20px] font-bold leading-[1.15] text-[#3B0D1A] lg:text-[26px]">
            {en ? "For women with different rhythms of life" : "Для женщин с разным ритмом жизни"}
          </h2>

          {/* нумерованный список: тонкая линия сверху каждой строки */}
          <ul className="mt-9">
            {ITEMS.map((it) => (
              <li
                key={it.n}
                className="grid grid-cols-[32px_1fr] items-start gap-3 border-t border-[#3B0D1A]/25 py-4"
              >
                <span className="font-display text-[11px] font-bold leading-[1.2] text-[#4A4B33] tabular-nums">
                  {it.n}
                </span>
                <span className="text-[13px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#2a2320] lg:text-[14px]">
                  {it.line[lang]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ПРАВО — коллаж фото-карточек со «срезанными» углами */}
        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {ITEMS.map((it, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={it.img}
              src={it.img}
              alt=""
              draggable={false}
              className={`aspect-[3/4] w-full object-cover ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}
              style={{ borderRadius: it.radius }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
