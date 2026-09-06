"use client";
// «Для кого ÁLIS» — по мотивам блока «для кого CryoMe» (Tilda rec1898623061).
// Фото не отдельной сеткой, а вперемешку со строками нумерованного списка:
// каждая строка = номер + короткая фраза + фото-карточка с фирменным
// «срезанным» углом; кадры чередуются лево/право со сдвигом. Палитра ÁLIS.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const ITEMS: { n: string; line: Loc; img: string; radius: string }[] = [
  { n: "01", line: { ru: "много работает и живёт в плотном графике", en: "works a lot and lives on a tight schedule" }, img: "/assets/tild6230-643__.jpg", radius: "28px 28px 28px 0" },
  { n: "02", line: { ru: "ценит ухоженный вид без лишних действий", en: "values a groomed look without extra fuss" }, img: "/assets/tild6530-383_-2___1_.jpg", radius: "28px 28px 0 28px" },
  { n: "03", line: { ru: "любит эстетичный уход и красивые ритуалы", en: "loves aesthetic care and beautiful rituals" }, img: "/assets/tild3236-393__.jpg", radius: "28px 0 28px 28px" },
  { n: "04", line: { ru: "хочет регулярный результат без спешки", en: "wants a regular result without the rush" }, img: "/assets/tild3638-373_-2___1__3.jpg", radius: "0 28px 28px 28px" },
];

export default function ForWhom() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="for-whom" className="bg-white py-24 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1120px]">
        {/* Заголовок сверху слева, как на cryome */}
        <div className="mb-14 lg:mb-20">
          <span className="text-[12px] font-bold uppercase tracking-[0.02em] text-[#3B0D1A]">
            {en ? "for whom ÁLIS" : "для кого ÁLIS"}
          </span>
          <h2 className="mt-3 max-w-[22rem] font-display text-[22px] font-bold leading-[1.15] text-[#3B0D1A] lg:text-[30px]">
            {en ? "For women with different rhythms of life" : "Для женщин с разным ритмом жизни"}
          </h2>
        </div>

        {/* Строки вперемешку: текст и фото чередуются сторонами */}
        <div className="flex flex-col gap-14 lg:gap-20">
          {ITEMS.map((it, i) => {
            const photoRight = i % 2 === 0; // 01 и 03 — фото справа, 02 и 04 — слева
            return (
              <div
                key={it.n}
                className="grid items-center gap-8 border-t border-[#3B0D1A]/20 pt-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Текстовая часть */}
                <div className={photoRight ? "lg:order-1" : "lg:order-2"}>
                  <span className="font-display text-[13px] font-bold leading-none text-[#4A4B33] tabular-nums">
                    {it.n}
                  </span>
                  <p className="mt-4 max-w-[26rem] text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#2a2320] lg:text-[26px]">
                    {it.line[lang]}
                  </p>
                </div>

                {/* Фото со «срезанным» углом */}
                <div className={photoRight ? "lg:order-2" : "lg:order-1"}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.img}
                    alt=""
                    draggable={false}
                    className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
                    style={{ borderRadius: it.radius }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
