"use client";
// АВТОРСКИЕ ДЕТАЛИ ALIS — bento-сетка (по мотивам блока «фишки» veterok.me): крупный
// serif-заголовок в две строки (курсив + прямой), подзаголовок, и сетка из 4 колонок
// со смещением: карточки-статы, тёмная бордовая карточка, фото и текст-ячейки.
// Появление каскадом при скролле. Светлая тема, бордовые акценты. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Cell =
  | { t: "stat"; num: string; cap: Loc }
  | { t: "text"; text: Loc }
  | { t: "dark"; text: Loc }
  | { t: "feat"; text: Loc }
  | { t: "photo"; img: string };

const COLS: Cell[][] = [
  [
    { t: "stat", num: "10 000+", cap: { ru: "созданных образов, которым доверились наши гости", en: "looks created — trusted to us by our guests" } },
    { t: "text", text: { ru: "Пробный образ до торжества — без сюрпризов", en: "A trial look before the event — no surprises" } },
  ],
  [
    { t: "stat", num: "9+", cap: { ru: "фирменных услуг и направлений", en: "signature services and directions" } },
    { t: "photo", img: "/assets/tild6536-613_-2___1__4.jpg" },
  ],
  [
    { t: "text", text: { ru: "Премиальная стойкая косметика", en: "Premium long-wear cosmetics" } },
    { t: "feat", text: { ru: "Команда визажистов и стилистов рядом", en: "A team of makeup artists and stylists by your side" } },
  ],
  [
    { t: "dark", text: { ru: "Работаем на выезде — по России и за рубежом", en: "We work on location — across Russia and abroad" } },
  ],
];

const OFFSET = ["lg:mt-0", "lg:mt-0", "lg:mt-16", "lg:mt-8"];

function Cell({ c, i, started }: { c: Cell; i: number; started: boolean }) {
  const { lang } = useLang();
  const reveal: React.CSSProperties = {
    opacity: started ? 1 : 0,
    transform: started ? "none" : "translateY(26px)",
    transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
    transitionDelay: started ? `${i * 90}ms` : "0ms",
  };

  if (c.t === "stat")
    return (
      <div style={reveal} className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] bg-[#f1ede6] p-8 text-center lg:min-h-[320px]">
        <div className="font-serif text-[42px] leading-none text-[#4E2126] lg:text-[52px]">{c.num}</div>
        <p className="mt-4 max-w-[220px] text-[13.5px] leading-relaxed text-[#17191a]/60 lg:text-[14px]">{c.cap[lang]}</p>
      </div>
    );
  if (c.t === "dark")
    return (
      <div style={reveal} className="flex min-h-[320px] flex-col items-center justify-center rounded-[28px] bg-[#4E2126] p-8 text-center lg:min-h-[360px]">
        <p className="font-serif text-[22px] leading-snug text-[#f4efe6] lg:text-[26px]">{c.text[lang]}</p>
      </div>
    );
  if (c.t === "feat")
    return (
      <div style={reveal} className="flex min-h-[220px] flex-col items-center justify-center rounded-[28px] bg-[#f1ede6] p-8 text-center">
        <p className="text-[17px] leading-snug text-[#17191a]/85 lg:text-[19px]">{c.text[lang]}</p>
      </div>
    );
  if (c.t === "text")
    return (
      <div style={reveal} className="flex min-h-[120px] items-center justify-center px-6 py-8 text-center">
        <p className="text-[17px] leading-snug text-[#17191a]/75 lg:text-[19px]">{c.text[lang]}</p>
      </div>
    );
  // photo
  return (
    <div style={reveal} className="overflow-hidden rounded-[28px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.img} alt="" className="aspect-[3/4] w-full object-cover" />
    </div>
  );
}

export default function Features() {
  const { lang } = useLang();
  const en = lang === "en";
  const [started, setStarted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let idx = 0;
  return (
    <section id="features" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        {/* Заголовок */}
        <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-20">
          <h2 className="font-serif text-[32px] leading-[1.1] text-[#4E2126] lg:text-[52px]">
            <span className="italic">{en ? "ALIS signature details," : "Авторские детали ALIS,"}</span>
            <br />
            <span className="font-semibold">{en ? "our clients fall for" : "в которые влюбляются клиенты"}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[14px] leading-relaxed text-[#17191a]/55 lg:text-[15px]">
            {en
              ? "The ALIS team has created a formula for the perfect look: highlight your beauty, hold it all day and give you confidence."
              : "Команда ALIS создала формулу идеального образа: подчеркнуть вашу красоту, сохранить стойкость на весь день и подарить уверенность."}
          </p>
        </div>

        {/* Bento-сетка */}
        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLS.map((col, ci) => (
            <div key={ci} className={`flex flex-col gap-6 ${OFFSET[ci]}`}>
              {col.map((c, ri) => (
                <Cell key={ri} c={c} i={idx++} started={started} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
