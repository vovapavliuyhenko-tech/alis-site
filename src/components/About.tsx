"use client";
// ОБО МНЕ — оформление как на fruktovaphoto.ru: сетка УТП, у каждого иконка-
// видоискатель, и «прицел», который САМ наводится на каждое УТП по очереди
// (эффект автофокуса камеры). Стиль наш: тёмный фон, портрет основателя.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Utp = { title: Loc; desc: Loc };

const UTP: Utp[] = [
  {
    title: { ru: "образ ваш, а не «по-своему»", en: "your look, not our own" },
    desc: {
      ru: "Разбираем повод, референсы и пожелания до мелочей. Вы получаете образ из своей головы — а не эксперимент на себе в важный день.",
      en: "We go through the occasion, references and wishes in detail. You get the look from your own head — not an experiment on you on the day that matters.",
    },
  },
  {
    title: { ru: "мастера, за которых спокойно", en: "artists you can trust" },
    desc: {
      ru: "Визажисты и стилисты с опытом на свадьбах, съёмках и больших событиях — там, где права на ошибку нет.",
      en: "Makeup artists and stylists proven at weddings, shoots and big events — where there's no room for error.",
    },
  },
  {
    title: { ru: "стойко до последнего кадра", en: "flawless to the last frame" },
    desc: {
      ru: "Премиальная косметика, которая не плывёт и не тускнеет. Вы свежи и в объятиях, и в танце, и на фото под утро.",
      en: "Premium products that don't slide or fade. You stay fresh through the hugs, the dancing and the photos till dawn.",
    },
  },
  {
    title: { ru: "вам — спокойно", en: "calm is on us" },
    desc: {
      ru: "Берём на себя суету и детали. Вы не следите за временем и не нервничаете — просто проживаете свой день.",
      en: "We take on the fuss and the details. You don't watch the clock or worry — you just live your day.",
    },
  },
  {
    title: { ru: "минута в минуту", en: "on time, to the minute" },
    desc: {
      ru: "Приезжаем заранее и держим график события по договору. Без спешки, опозданий и «мы почти успеваем».",
      en: "We arrive early and keep to the event schedule under contract. No rushing, no lateness, no “we're almost there.”",
    },
  },
];

// Иконка-видоискатель (уголки + точка по центру)
function Viewfinder({ i, active }: { i: number; active: boolean }) {
  return (
    <span
      data-utp-icon={i}
      data-active={active ? "1" : "0"}
      className="relative flex h-11 w-11 shrink-0 items-center justify-center"
    >
      <svg viewBox="0 0 44 44" className="h-11 w-11" fill="none">
        <path d="M3 14V3h11" stroke="currentColor" strokeWidth="1.6" className="text-[#17191a]/45" />
        <path d="M30 3h11v11" stroke="currentColor" strokeWidth="1.6" className="text-[#17191a]/45" />
        <path d="M41 30v11H30" stroke="currentColor" strokeWidth="1.6" className="text-[#17191a]/45" />
        <path d="M14 41H3V30" stroke="currentColor" strokeWidth="1.6" className="text-[#17191a]/45" />
      </svg>
      <span className="utp-dot absolute h-3 w-3 rounded-full bg-[#17191a] transition-all duration-300" />
    </span>
  );
}

export default function About() {
  const { lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);

  // Таймер: прицел по кругу переходит с одного УТП на другое
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % UTP.length),
      1900
    );
    return () => window.clearInterval(id);
  }, []);

  // Позиция прицела ВСЕГДА считается от текущего активного УТП (без рассинхрона)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const icon = wrap.querySelector<HTMLElement>(
        `[data-utp-icon="${active}"]`
      );
      if (!icon) return;
      const wr = wrap.getBoundingClientRect();
      const r = icon.getBoundingClientRect();
      setPos({
        x: r.left - wr.left + r.width / 2,
        y: r.top - wr.top + r.height / 2,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const Item = ({ i, className = "" }: { i: number; className?: string }) => (
    <div className={`flex items-start gap-5 ${className}`}>
      <Viewfinder i={i} active={active === i} />
      <div className="max-w-[300px]">
        <h3 className="text-[22px] font-semibold leading-tight text-[#4E2126] lg:text-[26px]">
          {UTP[i].title[lang]}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-[#17191a]/55 lg:text-[14px]">
          {UTP[i].desc[lang]}
        </p>
      </div>
    </div>
  );

  return (
    <section id="about" className="relative scroll-mt-24 bg-white pt-24 pb-14 lg:pt-32 lg:pb-16">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Сетка УТП с движущимся прицелом */}
        <div ref={wrapRef} className="relative">
          {/* Прицел, который сам наводится */}
          {pos && (
            <div
              className="pointer-events-none absolute left-0 top-0 z-20 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
            >
              <svg viewBox="0 0 120 120" className="h-[120px] w-[120px]" fill="none">
                {/* фокус-рамка (уголки) */}
                <path d="M38 50V38h12" stroke="#17191a" strokeWidth="2" />
                <path d="M70 38h12v12" stroke="#17191a" strokeWidth="2" />
                <path d="M82 70v12H70" stroke="#17191a" strokeWidth="2" />
                <path d="M50 82H38V70" stroke="#17191a" strokeWidth="2" />
                {/* длинные крестовые линии с разрывом по центру */}
                <path d="M60 6V34M60 86v28M6 60h28M86 60h28" stroke="#17191a" strokeWidth="1.5" opacity="0.8" />
              </svg>
            </div>
          )}

          <div className="grid gap-x-10 gap-y-14 lg:grid-cols-3 lg:gap-y-24">
            {/* ряд 1 */}
            <Item i={0} className="lg:col-start-1 lg:row-start-1" />
            <div className="hidden lg:col-start-2 lg:row-start-1 lg:block" />
            <Item i={1} className="lg:col-start-3 lg:row-start-1" />

            {/* портрет — слева, во всю высоту рядов 2-3 */}
            <div className="lg:col-start-1 lg:row-start-2 lg:row-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/tild3236-393__.jpg"
                alt="Дайана Тарзян"
                className="aspect-[3/4] w-full max-w-[360px] rounded-[22px] object-cover"
              />
              <p className="mt-5 text-[15px] text-[#17191a]">
                {lang === "en" ? "Daiana Tarzyan" : "Дайана Тарзян"}
              </p>
              <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-[#17191a]/50">
                {lang === "en" ? (
                  <>
                    founder of ALIS aesthetics studios
                    <br />
                    and ALIS BEAUTY CONCIERGE
                  </>
                ) : (
                  <>
                    основатель сети студий эстетики
                    <br />
                    ALIS и ALIS BEAUTY CONCIERGE
                  </>
                )}
              </p>
            </div>

            {/* ряд 2 центр */}
            <Item i={2} className="lg:col-start-2 lg:row-start-2" />

            {/* ряд 3 */}
            <Item i={3} className="lg:col-start-2 lg:row-start-3" />
            <Item i={4} className="lg:col-start-3 lg:row-start-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
