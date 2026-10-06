"use client";
// «КАК ПРИСОЕДИНИТЬСЯ?» (страница «Вакансии», #steps) — 4 шага широкими карточками, по мотивам
// блока «[ Услуги ]» uni-s.group в стиле нашего сайта. Компьютер: блок «прилипает» к экрану, и пока
// страница прокручивается вниз, карточки едут влево; активная — чёрная; под лентой — счётчик с
// полосой прогресса и кнопка «Подать заявку». Телефон/планшет: обычная лента, листается свайпом вбок.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const STEPS: { title: Loc; note: Loc }[] = [
  { title: { ru: "Заполните анкету", en: "Fill in the form" }, note: { ru: "и прикрепите 10 работ", en: "and attach 10 works" } },
  { title: { ru: "Пройдите собеседование", en: "Have an interview" }, note: { ru: "знакомимся и обсуждаем формат работы", en: "we meet and discuss the format of work" } },
  { title: { ru: "Сделайте пробную работу", en: "Do a trial work" }, note: { ru: "по стандартам ÁLIS BEAUTY", en: "to ÁLIS BEAUTY standards" } },
  { title: { ru: "Получите работу", en: "Get the job" }, note: { ru: "и становитесь частью команды", en: "and become part of the team" } },
];

export default function VacanciesScroll() {
  const { lang } = useLang();
  const en = lang === "en";
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);

  // Компьютер: вертикальная прокрутка → сдвиг ленты влево (rAF)
  useEffect(() => {
    const w = wrap.current, tr = track.current;
    if (!w || !tr) return;
    const mq = matchMedia("(min-width: 1024px)");
    let raf = 0;
    const upd = () => {
      raf = 0;
      if (!mq.matches) { tr.style.transform = ""; return; }
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const max = tr.scrollWidth - tr.parentElement!.clientWidth;
      tr.style.transform = `translate3d(${-p * max}px,0,0)`;
      setProg(p);
      setActive(Math.min(STEPS.length - 1, Math.round(p * (STEPS.length - 1))));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    mq.addEventListener("change", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); mq.removeEventListener("change", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="steps" className="scroll-mt-24 bg-white section-y">
      {/* Высота обёртки = длина «прокрутки вбок» (только компьютер) */}
      <div ref={wrap} className="lg:h-[280vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
          <div className="mx-auto w-[96%] max-w-[1760px]">
            <h2 className="sr-only">{en ? "How to join?" : "Как присоединиться?"}</h2>

            {/* Лента карточек во всю ширину */}
            <div className="-mx-[2%] overflow-x-auto px-[2%] [scrollbar-width:none] lg:mx-0 lg:overflow-hidden lg:px-0">
              <div ref={track} className="flex snap-x snap-mandatory gap-2 will-change-transform sm:gap-3 lg:gap-4">
                {STEPS.map((s, i) => (
                  <article
                    key={s.title.ru}
                    className={`flex min-h-[260px] w-[80%] shrink-0 snap-start flex-col justify-between rounded-[28px] p-6 transition-colors duration-500 sm:w-[48%] sm:p-8 lg:min-h-[min(520px,60vh)] lg:w-[min(620px,42%)] lg:p-12 ${
                      i === active ? "bg-[#17191a] text-white" : "bg-[#f6f4f1] text-[#17191a]"
                    }`}
                  >
                    <span className={`font-display text-[40px] font-extralight leading-none tabular-nums transition-colors duration-500 lg:text-[72px] ${i === active ? "text-white/35" : "text-[#17191a]/20"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[22px] leading-[1.15] tracking-[0.01em] sm:text-[28px] lg:text-[40px]">{s.title[lang]}</h3>
                      <p className={`mt-3 !text-[12.5px] leading-[1.6] transition-colors duration-500 sm:!text-[15px] lg:!text-[17px] ${i === active ? "text-white/65" : "text-[#17191a]/60"}`}>{s.note[lang]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Счётчик + кнопка */}
            <div className="mt-6 flex flex-col items-center gap-5 lg:flex-row lg:gap-8">
              <div className="hidden flex-1 items-center gap-4 lg:flex">
                <span className="font-display text-[13px] tabular-nums text-[#17191a]">{String(active + 1).padStart(2, "0")}</span>
                <span className="relative h-px flex-1 bg-[#17191a]/12">
                  <span className="absolute inset-y-0 left-0 bg-[#17191a]" style={{ width: `${Math.max(4, prog * 100)}%` }} />
                </span>
                <span className="font-display text-[13px] tabular-nums text-[#17191a]/40">{String(STEPS.length).padStart(2, "0")}</span>
              </div>
              <a href="#join" className="flex w-full max-w-[340px] items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]">
                {en ? "Apply" : "Подать заявку"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
