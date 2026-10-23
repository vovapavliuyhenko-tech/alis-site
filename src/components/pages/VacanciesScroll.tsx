"use client";
// «КАК ПРИСОЕДИНИТЬСЯ?» (страница «Вакансии», #steps) — 4 шага широкими карточками, по мотивам
// блока «[ Услуги ]» uni-s.group в стиле нашего сайта. Компьютер: блок «прилипает» к экрану, и пока
// страница прокручивается вниз, карточки едут влево; активная — чёрная; под лентой — счётчик с
// полосой прогресса и кнопка «Подать заявку». Телефон — так же (лента едет вбок при прокрутке страницы).
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
  const bar = useRef<HTMLSpanElement>(null);

  // Везде (и на телефоне): блок «прилипает», вертикальная прокрутка плавно сдвигает ленту вбок.
  // Лента догоняет нужное положение с мягким замедлением (не дёргается за каждым движением пальца).
  useEffect(() => {
    const w = wrap.current, tr = track.current;
    if (!w || !tr) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, cur = -1, target = 0;
    const measure = () => {
      const r = w.getBoundingClientRect();
      const total = w.offsetHeight - innerHeight;
      target = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    };
    const frame = () => {
      raf = 0;
      measure();
      cur = cur < 0 || still ? target : cur + (target - cur) * 0.14;
      if (Math.abs(target - cur) < 0.0005) cur = target;
      const max = tr.scrollWidth - tr.parentElement!.clientWidth;
      tr.style.transform = `translate3d(${(-cur * max).toFixed(1)}px,0,0)`;
      if (bar.current) bar.current.style.width = `${Math.max(4, cur * 100)}%`;
      const act = Math.min(STEPS.length - 1, Math.round(cur * (STEPS.length - 1)));
      setActive((x) => (x === act ? x : act));
      if (cur !== target) raf = requestAnimationFrame(frame);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="steps" className="scroll-mt-24 bg-white section-y">
      {/* Высота обёртки = длина «прокрутки вбок» (только компьютер) */}
      <div ref={wrap} className="h-[260vh] lg:h-[280vh]">
        <div className="sticky top-0 flex h-svh items-center">
          <div className="mx-auto w-[96%] max-w-[1760px]">
            <h2 className="sr-only">{en ? "How to join?" : "Как присоединиться?"}</h2>

            {/* Лента карточек во всю ширину */}
            <div className="overflow-hidden">
              <div ref={track} className="flex gap-2 will-change-transform sm:gap-3 lg:gap-4">
                {STEPS.map((s, i) => (
                  <article
                    key={s.title.ru}
                    className={`flex min-h-[260px] w-[80%] shrink-0 flex-col justify-between rounded-[28px] p-6 transition-colors duration-500 sm:w-[48%] sm:p-8 lg:min-h-[min(520px,60vh)] lg:w-[min(620px,42%)] lg:p-12 ${
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
              <div className="flex w-full flex-1 items-center gap-4">
                <span className="font-display text-[13px] tabular-nums text-[#17191a]">{String(active + 1).padStart(2, "0")}</span>
                <span className="relative h-px flex-1 bg-[#17191a]/12">
                  <span ref={bar} className="absolute inset-y-0 left-0 bg-[#17191a]" style={{ width: "4%" }} />
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
