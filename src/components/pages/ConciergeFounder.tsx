"use client";
// ОСНОВАТЕЛЬ И ФОРМАТЫ (страница «Консьерж-сервис», #partners): слева фото основателя, справа
// на белом фоне текст и три формата сотрудничества строками (без плашек и кнопок). Тексты — заказчицы.
// Движение в стиле сайта:
//  — фото при прокрутке плавно отъезжает от крупного плана (масштаб 1.15 → 1);
//  — при появлении блока линии форматов прорисовываются слева направо по очереди, строки выезжают;
//  — наведение на формат: строку снизу заливает чёрным, текст белеет и сдвигается, номер → стрелка;
//    на телефоне так подсвечивается строка, которая сейчас в центре экрана.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

// TODO: портрет основателя пришлёт заказчица — пока фото работы команды
const FOUNDER_PHOTO = "/assets/alis/img_2751.jpg";

export default function ConciergeFounder() {
  const { lang } = useLang();
  const en = lang === "en";
  const FORMATS = en
    ? ["One-off event", "Ongoing partnership", "Series contract"]
    : ["Разовое событие", "Постоянное партнёрство", "Серийный контракт"];

  // Фото: масштаб от прокрутки (rAF)
  const photoBox = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const box = photoBox.current, img = photo.current;
    if (!box || !img || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const upd = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      img.style.transform = `scale(${1.15 - 0.15 * Math.min(1, p * 1.6)})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); img.style.transform = ""; };
  }, []);

  // Появление списка форматов
  const list = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Телефон/планшет (нет наведения): подсвечиваем строку в центре экрана
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    if (matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        const i = rows.current.indexOf(e.target as HTMLLIElement);
        if (e.isIntersecting) setActive(i);
        else setActive((a) => (a === i ? -1 : a));
      }
    }, { rootMargin: "-45% 0px -45% 0px" });
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="partners" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] items-stretch gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        {/* Фото основателя */}
        <div ref={photoBox} className="r-reveal relative min-h-[360px] overflow-hidden rounded-[28px] sm:min-h-[460px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={photo} src={FOUNDER_PHOTO} alt={en ? "Daiana Tarzyan, founder of ÁLIS BEAUTY" : "Дайана Тарзян, основатель ÁLIS BEAUTY"} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover will-change-transform" style={{ transform: "scale(1.15)" }} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
            <p className="font-display text-[18px] uppercase tracking-[0.04em] sm:text-[22px]">{en ? "Daiana Tarzyan" : "Дайана Тарзян"}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-[11px]">{en ? "founder of ÁLIS BEAUTY" : "основатель бренда ÁLIS BEAUTY"}</p>
          </div>
        </div>

        {/* Текст и форматы — на белом фоне, без плашек и кнопок */}
        <div className="r-reveal flex flex-col justify-between gap-8 py-2 text-center md:py-6 md:pl-6 md:text-left lg:pl-14">
          <div>
            <h2 className="text-[#17191a]">{en ? "A team chosen for your event" : "Команда под ваше событие"}</h2>
            <p className="mx-auto mt-3 max-w-[60ch] !text-[12.5px] leading-[1.6] text-[#17191a]/70 sm:!text-[15px] md:mx-0">
              {en
                ? "Daiana Tarzyan, founder of ÁLIS BEAUTY, personally and meticulously selects the team for every event. All artists are trained to the brand's service standards and work with professional equipment and materials."
                : "Дайана Тарзян, основатель бренда ÁLIS BEAUTY, лично и скрупулёзно подбирает команду под каждое событие. Все специалисты проходят обучение по стандартам сервиса бренда и работают на профессиональном оборудовании и материалах."}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">{en ? "Formats" : "Формат"}</p>
            <ul ref={list} className="relative mt-3">
              {/* Верхняя линия */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-[#17191a]/12 transition-transform duration-[900ms] ease-out" style={{ transform: shown ? "scaleX(1)" : "scaleX(0)" }} />
              {FORMATS.map((f, i) => (
                <li
                  key={f}
                  ref={(el) => { rows.current[i] = el; }}
                  data-on={active === i ? "" : undefined}
                  className="group relative cursor-default overflow-hidden"
                  style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(14px)", transition: `opacity .6s ease ${0.25 + i * 0.15}s, transform .7s cubic-bezier(.2,.7,.2,1) ${0.25 + i * 0.15}s` }}
                >
                  {/* Заливка снизу вверх */}
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 rounded-[14px] bg-[#17191a] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100 group-data-[on]:scale-y-100" />
                  <div className="relative flex items-center justify-between gap-4 px-0 py-4 text-left transition-all duration-500 group-hover:px-5 group-data-[on]:px-5 sm:py-5">
                    <span className="font-display text-[14px] tracking-[0.02em] text-[#17191a] transition-colors duration-500 group-hover:text-white group-data-[on]:text-white sm:text-[18px]">{f}</span>
                    {/* Номер → стрелка */}
                    <span className="relative h-5 w-8 overflow-hidden text-right text-[11px] sm:text-[12px]">
                      <span className="absolute inset-0 flex items-center justify-end text-[#17191a]/35 transition-transform duration-500 group-hover:-translate-y-full group-data-[on]:-translate-y-full">{String(i + 1).padStart(2, "0")}</span>
                      <span className="absolute inset-0 flex translate-y-full items-center justify-end text-white transition-transform duration-500 group-hover:translate-y-0 group-data-[on]:translate-y-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </span>
                  </div>
                  {/* Нижняя линия — прорисовывается по очереди */}
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#17191a]/12 transition-transform duration-[900ms] ease-out group-hover:opacity-0 group-data-[on]:opacity-0" style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${0.3 + i * 0.15}s` }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
