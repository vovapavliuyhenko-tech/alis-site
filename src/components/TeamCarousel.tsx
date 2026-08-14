"use client";
// КОМАНДА ALIS (по мотивам блока команды veterok.me): serif-заголовок в две строки,
// подзаголовок и горизонтальная лента карточек-портретов со стрелками по бокам.
// У каждой карточки — имя и роль в матовой плашке снизу. Внизу подпись и бордовая
// кнопка. Листается свайпом и стрелками. Светлая тема. Двуязычно.
import { useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Member = { name: Loc; role: Loc; photo: string };

const TEAM: Member[] = [
  { name: { ru: "Дайана Тарзян", en: "Daiana Tarzyan" }, role: { ru: "Основатель", en: "Founder" }, photo: "/assets/tild6230-643__.jpg" },
  { name: { ru: "Анна", en: "Anna" }, role: { ru: "Визажист", en: "Makeup artist" }, photo: "/assets/tild3236-393__.jpg" },
  { name: { ru: "Мария", en: "Maria" }, role: { ru: "Стилист по волосам", en: "Hair stylist" }, photo: "/assets/tild3535-313_bergamo.png" },
  { name: { ru: "Екатерина", en: "Ekaterina" }, role: { ru: "Стилист-имиджмейкер", en: "Image stylist" }, photo: "/assets/tild6536-613_-2___1__4.jpg" },
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
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="team" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto mb-12 w-[92%] max-w-[1000px] text-center lg:mb-16">
        <h2 className="font-serif text-[30px] leading-[1.12] text-[#4E2126] lg:text-[46px]">
          <span className="italic">{en ? "The masters of ALIS —" : "Мастера ALIS —"}</span>
          <br />
          <span className="font-semibold">{en ? "the ones you trust your look to" : "те, кому доверяют образ"}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-[#17191a]/55 lg:text-[15px]">
          {en
            ? "Our team becomes close to the client — easy to talk to, sharing the excitement of the day. Even in stressful moments the masters stay by your side."
            : "Наша команда становится для клиентов близкими людьми, с которыми легко общаться и делиться эмоциями дня. Даже в волнительные моменты мастера остаются рядом."}
        </p>
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
            <article key={m.name.ru} data-card className="w-[80%] shrink-0 snap-center sm:w-[46%] lg:w-[calc(33.333%-16px)]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-[#f1ede6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.photo} alt={m.name[lang]} className="absolute inset-0 h-full w-full object-cover" />
                {/* Плашка имени */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-[#17191a]/35 px-5 py-3.5 backdrop-blur-md">
                  <span className="font-serif text-[17px] text-[#f4efe6] lg:text-[19px]">{m.name[lang]}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#f4efe6]/80">{m.role[lang]}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 w-[92%] max-w-[720px] text-center">
        <p className="text-[14px] leading-relaxed text-[#17191a]/55">
          {en
            ? "Weddings, shoots, big events — the team helps you prepare and stay calm on the day."
            : "Свадьбы, съёмки, большие события — команда поможет подготовиться и быть спокойной в свой день."}
        </p>
        <a
          href="/request"
          className="mt-7 inline-flex items-center justify-center rounded-full border border-[#4E2126] bg-[#4E2126] px-8 py-3.5 text-[13px] font-medium text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#4E2126]"
        >
          {en ? "Meet the team" : "Познакомиться с командой"}
        </a>
      </div>
    </section>
  );
}
