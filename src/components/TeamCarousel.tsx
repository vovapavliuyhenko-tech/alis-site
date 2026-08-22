"use client";
// КОМАНДА ALIS — по мотивам блока команды traffic-masters: карточка = фото сверху
// (с ховер-блюром и кнопкой «Записаться»), ниже — имя, роль, разделитель и список
// характеристик с бордовым «+» и приглушённым «−». Горизонтальная лента со
// стрелками сверху справа, автопрокрутка с паузой при наведении. Двуязычно.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Trait = { good: boolean; text: Loc };
type Member = { name: Loc; role: Loc; photo: string; traits: Trait[] };

const TEAM: Member[] = [
  {
    name: { ru: "Дайана Тарзян", en: "Daiana Tarzyan" },
    role: { ru: "Основатель", en: "Founder" },
    photo: "/assets/tild6230-643__.jpg",
    traits: [
      { good: true, text: { ru: "Видит идеальный образ ещё до первого штриха", en: "Sees the perfect look before the first stroke" } },
      { good: false, text: { ru: "Не отпустит, пока не станет безупречно", en: "Won't stop until it's flawless" } },
    ],
  },
  {
    name: { ru: "Анна", en: "Anna" },
    role: { ru: "Визажист", en: "Makeup artist" },
    photo: "/assets/tild3236-393__.jpg",
    traits: [
      { good: true, text: { ru: "Макияж держится до последнего кадра", en: "Makeup holds to the very last frame" } },
      { good: false, text: { ru: "Может обсуждать оттенки помады часами", en: "Can discuss lipstick shades for hours" } },
    ],
  },
  {
    name: { ru: "Мария", en: "Maria" },
    role: { ru: "Стилист по волосам", en: "Hair stylist" },
    photo: "/assets/tild3535-313_bergamo.png",
    traits: [
      { good: true, text: { ru: "Соберёт причёску, что переживёт любой танец", en: "Builds hair that survives any dance floor" } },
      { good: false, text: { ru: "Тайно считает лак для волос парфюмом", en: "Secretly treats hairspray as perfume" } },
    ],
  },
  {
    name: { ru: "Екатерина", en: "Ekaterina" },
    role: { ru: "Стилист-имиджмейкер", en: "Image stylist" },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
    traits: [
      { good: true, text: { ru: "Подберёт образ под повод с первого взгляда", en: "Nails the look for the occasion at a glance" } },
      { good: false, text: { ru: "Грустит, когда просят «что попроще»", en: "Gets sad when asked for “something plain”" } },
    ],
  },
  {
    name: { ru: "София", en: "Sofia" },
    role: { ru: "Бровист", en: "Brow artist" },
    photo: "/assets/tild6530-383_-2___1_.jpg",
    traits: [
      { good: true, text: { ru: "Брови ровно по вашим чертам, до миллиметра", en: "Brows to match your features, to the millimetre" } },
      { good: false, text: { ru: "Замечает асимметрию бровей у прохожих", en: "Spots uneven brows on passers-by" } },
    ],
  },
  {
    name: { ru: "Виктория", en: "Viktoria" },
    role: { ru: "Косметолог", en: "Cosmetologist" },
    photo: "/assets/tild3638-373_-2___1__3.jpg",
    traits: [
      { good: true, text: { ru: "Кожа сияет уже после первой процедуры", en: "Skin glows after the very first session" } },
      { good: false, text: { ru: "Прочитает лекцию про SPF без остановки", en: "Will lecture you about SPF non-stop" } },
    ],
  },
  {
    name: { ru: "Ольга", en: "Olga" },
    role: { ru: "Мастер по маникюру", en: "Nail artist" },
    photo: "/assets/tild3561-646_-2___1__5.jpg",
    traits: [
      { good: true, text: { ru: "Маникюр держится дольше, чем вы ждёте", en: "Manicure lasts longer than you expect" } },
      { good: false, text: { ru: "Оценивает чужой маникюр в транспорте", en: "Rates strangers' nails on the bus" } },
    ],
  },
];

function Marker({ good }: { good: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        good ? "bg-olive text-cream" : "bg-ink/8 text-ink/50"
      }`}
    >
      {good ? (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14" strokeLinecap="round" /></svg>
      )}
    </span>
  );
}

export default function TeamCarousel() {
  const { lang } = useLang();
  const en = lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.5;
    if (dir === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  // Автопрокрутка: пауза при наведении/касании
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
    }, 2600);
    return () => {
      clearInterval(id);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("pointerdown", pause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="team" className="scroll-mt-24 bg-cream py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1360px]">
        {/* Заголовок + стрелки сверху справа */}
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-olive/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-olive">
              <span className="h-1.5 w-1.5 rounded-full bg-olive" />
              {en ? "Team" : "Команда"}
            </span>
            <h2 className="mt-5 font-display text-[28px] uppercase tracking-[0.06em] leading-[1.12] text-ink lg:text-[44px]">
              {en ? "The masters who" : "Мастера, которым"}
              <br />
              <span className="font-script text-[40px] normal-case tracking-normal text-wine lg:text-[58px]">{en ? "craft your look" : "доверяют образ"}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60 lg:text-[16px]">
              {en
                ? "Over your look works a full team — with character and an eye for detail."
                : "Над вашим образом работает целая команда — с характером и вниманием к деталям."}
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 sm:flex">
            <button
              aria-label={en ? "Previous" : "Назад"}
              onClick={() => scrollBy(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-wine text-cream shadow-[0_8px_24px_rgba(117,39,52,0.3)] transition-all hover:scale-105 hover:bg-[#5c1e28]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              aria-label={en ? "Next" : "Вперёд"}
              onClick={() => scrollBy(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-wine text-cream shadow-[0_8px_24px_rgba(117,39,52,0.3)] transition-all hover:scale-105 hover:bg-[#5c1e28]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Лента карточек */}
        <div ref={trackRef} className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2">
          {TEAM.map((m) => (
            <article
              key={m.name.ru}
              data-card
              className="flex w-[74%] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-ink/8 bg-white sm:w-[44%] lg:w-[calc(23%-12px)]"
            >
              {/* Фото + ховер-блюр с «Записаться» */}
              <a href="/#online" className="group relative block aspect-[4/5] overflow-hidden bg-[#f1ede6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-wine/25 opacity-0 backdrop-blur-[6px] transition-opacity duration-500 ease-out group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 px-6 py-2.5 text-[13px] uppercase tracking-[0.16em] text-white">
                    {en ? "Book" : "Записаться"}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </a>

              {/* Инфо-панель */}
              <div className="flex flex-1 flex-col p-5 lg:p-6">
                <h3 className="font-serif text-[22px] text-ink lg:text-[24px]">{m.name[lang]}</h3>
                <p className="mt-1 text-[13px] text-ink/55">{m.role[lang]}</p>
                <div className="my-4 h-px w-full bg-ink/10" />
                <ul className="space-y-3">
                  {m.traits.map((tr, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink/80 lg:text-[13.5px]">
                      <Marker good={tr.good} />
                      {tr.text[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
