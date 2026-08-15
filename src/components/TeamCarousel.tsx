"use client";
// КОМАНДА ALIS (по мотивам блока команды veterok.me): serif-заголовок в две строки,
// подзаголовок и горизонтальная лента карточек-портретов со стрелками по бокам.
// У каждой карточки — имя и роль в матовой плашке снизу. Внизу подпись и бордовая
// кнопка. Листается свайпом и стрелками. Светлая тема. Двуязычно.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Member = { name: Loc; role: Loc; photo: string };

const TEAM: Member[] = [
  { name: { ru: "Дайана Тарзян", en: "Daiana Tarzyan" }, role: { ru: "Основатель", en: "Founder" }, photo: "/assets/tild6230-643__.jpg" },
  { name: { ru: "Анна", en: "Anna" }, role: { ru: "Визажист", en: "Makeup artist" }, photo: "/assets/tild3236-393__.jpg" },
  { name: { ru: "Мария", en: "Maria" }, role: { ru: "Стилист по волосам", en: "Hair stylist" }, photo: "/assets/tild3535-313_bergamo.png" },
  { name: { ru: "Екатерина", en: "Ekaterina" }, role: { ru: "Стилист-имиджмейкер", en: "Image stylist" }, photo: "/assets/tild6536-613_-2___1__4.jpg" },
  { name: { ru: "София", en: "Sofia" }, role: { ru: "Бровист", en: "Brow artist" }, photo: "/assets/tild6530-383_-2___1_.jpg" },
  { name: { ru: "Виктория", en: "Viktoria" }, role: { ru: "Косметолог", en: "Cosmetologist" }, photo: "/assets/tild3638-373_-2___1__3.jpg" },
  { name: { ru: "Ольга", en: "Olga" }, role: { ru: "Мастер по маникюру", en: "Nail artist" }, photo: "/assets/tild3561-646_-2___1__5.jpg" },
];

export default function TeamCarousel() {
  const { lang } = useLang();
  const en = lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.5;
    // Если дошли до конца — вернуться в начало (закольцовка)
    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  // Автопрокрутка: сама листается, пауза при наведении/касании
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("pointerdown", pause);
    const id = setInterval(() => {
      if (!paused) scrollBy(1);
    }, 3500);
    return () => {
      clearInterval(id);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="team" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto mb-12 w-[92%] max-w-[1000px] text-center lg:mb-16">
        <h2 className="font-serif text-[30px] leading-[1.12] text-[#4E2126] lg:text-[46px]">
          <span className="italic">{en ? "The masters of ALIS —" : "Мастера ALIS —"}</span>
          <br />
          <span className="font-semibold">{en ? "the ones you trust your look to" : "те, кому доверяют образ"}</span>
        </h2>
      </div>

      <div className="relative mx-auto w-[94%] max-w-[1360px]">
        {/* Стрелки */}
        <button
          aria-label={en ? "Previous" : "Назад"}
          onClick={() => scrollBy(-1)}
          className="absolute left-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#17191a]/10 bg-white/90 text-[#4E2126] shadow-[0_6px_20px_rgba(0,0,0,0.1)] backdrop-blur transition-colors hover:bg-[#4E2126] hover:text-[#f4efe6] lg:-left-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          aria-label={en ? "Next" : "Вперёд"}
          onClick={() => scrollBy(1)}
          className="absolute right-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#17191a]/10 bg-white/90 text-[#4E2126] shadow-[0_6px_20px_rgba(0,0,0,0.1)] backdrop-blur transition-colors hover:bg-[#4E2126] hover:text-[#f4efe6] lg:-right-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div ref={trackRef} className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2">
          {TEAM.map((m) => (
            <article key={m.name.ru} data-card className="w-[72%] shrink-0 snap-center sm:w-[40%] lg:w-[calc(28%-16px)]">
              <a href="/#online" className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-[#f1ede6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
                />
                {/* Плашка имени — исчезает при наведении */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-[#17191a]/35 px-5 py-3.5 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-0">
                  <span className="font-serif text-[17px] text-[#f4efe6] lg:text-[19px]">{m.name[lang]}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#f4efe6]/80">{m.role[lang]}</span>
                </div>
                {/* Блюр всей карточки + «Записаться» по центру при наведении */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#4E2126]/25 opacity-0 backdrop-blur-[6px] transition-opacity duration-500 ease-out group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 px-6 py-2.5 text-[13px] uppercase tracking-[0.16em] text-white">
                    {en ? "Book" : "Записаться"}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
