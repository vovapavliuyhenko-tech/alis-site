"use client";
// ЛИНЕЙКИ УХОДОВ — копия блока O'CARE: заголовок Cormorant + 3-колоночная masonry
// из 9 фото-карточек со смещением колонок, зелёное свечение позади, у части карточек
// цветные «капли»-бейджи (тип действия). Бежевый фон, Geologica. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Card = { label: Loc; img: string; drop?: string };

// Капля-бейдж выбранного цвета
function Drop({ color }: { color: string }) {
  return (
    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
      <svg width="15" height="15" viewBox="0 0 24 24" fill={color} aria-hidden>
        <path d="M12 2C12 2 4 11 4 16a8 8 0 0 0 16 0c0-5-8-14-8-14z" />
      </svg>
    </span>
  );
}

// Колонки (column-major) — masonry-коллаж как на референсе O'CARE.
// Фото в натуральных пропорциях (высота разная), колонки со смещением.
const COLS: Card[][] = [
  [
    { label: { ru: "Увлажняющая", en: "Hydrating" }, img: "/shop/care-a.jpg" },
    { label: { ru: "Анти-акне", en: "Anti-acne" }, img: "/shop/care-f.jpg", drop: "#E48FB6" },
    { label: { ru: "Очищающая", en: "Cleansing" }, img: "/shop/care-c.jpg", drop: "#7FB4E0" },
  ],
  [
    { label: { ru: "Антивозрастная", en: "Anti-age" }, img: "/shop/care-b.jpg" },
    { label: { ru: "Противоотёчная", en: "Anti-puffiness" }, img: "/shop/care-g.jpg", drop: "#6E86D8" },
    { label: { ru: "Матирующая", en: "Mattifying" }, img: "/shop/care-d.jpg", drop: "#B79AE0" },
  ],
  [
    { label: { ru: "Восстанавливающая", en: "Repairing" }, img: "/shop/care-i.png" },
    { label: { ru: "SPF", en: "SPF" }, img: "/shop/care-h.jpg", drop: "#F0B366" },
    { label: { ru: "Ботокс-эффект", en: "Botox-effect" }, img: "/shop/care-e.jpg", drop: "#6FCFC0" },
  ],
];

function Tile({ c }: { c: Card }) {
  const { lang } = useLang();
  return (
    <a href="#bestsellers" className="group block">
      <div className="relative overflow-hidden rounded-[20px] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.img}
          alt={c.label[lang]}
          className="block h-auto w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]"
        />
        {c.drop && <Drop color={c.drop} />}
      </div>
      <p className="ff-geo mt-3 text-[15px] font-medium text-[#1c1c1c] transition-colors group-hover:text-[#2B6F2B] lg:text-[16px]">
        {c.label[lang]}
      </p>
    </a>
  );
}

export default function CareLines() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="care-lines" className="relative scroll-mt-24 overflow-hidden bg-[#F3F2EE] py-16 lg:py-24">
      {/* Зелёное свечение позади сетки */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9ede6a]/35 blur-[120px]"
      />
      <div className="relative mx-auto w-[92%] max-w-[1160px]">
        <h2 className="ff-cormorant mb-12 text-[34px] font-bold leading-[1.05] text-[#1c1c1c] lg:text-[52px]">
          {en ? "Care lines" : "Линейки уходов"}
        </h2>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
          {CARDS.map((c) => (
            <Tile key={c.label.ru} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
