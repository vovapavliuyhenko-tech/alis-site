"use client";
// МАСТЕРА И КОМАНДА ALIS. Дизайн под сайт: белый фон, бордовые акценты,
// serif-заголовки, карточки с фото. Анимация:
// • ч/б фото → цвет при наведении, лёгкий зум и подъём карточки
// • имя/роль всегда видны, теги специализаций выезжают снизу при наведении
// • номера-бейджи; появление карточек каскадом при въезде в экран (scroll-reveal)
// Двуязычно (RU/EN). Данные, кроме основателя, — плейсхолдеры (заменить на реальную команду).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Member = {
  name: Loc;
  role: Loc;
  exp: Loc;
  tags: Loc[];
  photo: string;
};

const TEAM: Member[] = [
  {
    name: { ru: "Дайана Тарзян", en: "Daiana Tarzyan" },
    role: { ru: "основатель · визажист-стилист", en: "founder · makeup & style artist" },
    exp: { ru: "10+ лет опыта", en: "10+ years" },
    tags: [
      { ru: "свадебные образы", en: "bridal looks" },
      { ru: "съёмки", en: "shoots" },
      { ru: "выезд", en: "on-location" },
    ],
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Анна", en: "Anna" },
    role: { ru: "ведущий визажист", en: "lead makeup artist" },
    exp: { ru: "8 лет опыта", en: "8 years" },
    tags: [
      { ru: "вечерний макияж", en: "evening makeup" },
      { ru: "стойкость", en: "long-wear" },
      { ru: "дневной образ", en: "daytime" },
    ],
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Мария", en: "Maria" },
    role: { ru: "стилист по волосам", en: "hair stylist" },
    exp: { ru: "7 лет опыта", en: "7 years" },
    tags: [
      { ru: "причёски", en: "hairstyles" },
      { ru: "свадебные укладки", en: "bridal hair" },
      { ru: "локоны", en: "curls" },
    ],
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Екатерина", en: "Ekaterina" },
    role: { ru: "стилист-имиджмейкер", en: "image stylist" },
    exp: { ru: "6 лет опыта", en: "6 years" },
    tags: [
      { ru: "подбор look", en: "styling" },
      { ru: "имидж", en: "image" },
      { ru: "образ под событие", en: "event look" },
    ],
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

export default function Team() {
  const { lang } = useLang();
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="team" className="scroll-mt-24 bg-cream py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        {/* Заголовок */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-wine px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-cream">
            {lang === "en" ? "team" : "команда"}
          </span>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.05] text-ink lg:text-[54px]">
            {lang === "en" ? "Masters you can trust" : "Мастера, за которых спокойно"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-ink/55">
            {lang === "en"
              ? "The team that will create your look — proven at weddings, shoots and big events."
              : "Команда, которая создаст ваш образ — с опытом на свадьбах, съёмках и больших событиях."}
          </p>
        </div>

        {/* Сетка мастеров */}
        <div ref={gridRef} className="grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <article
              key={i}
              className="group transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "none" : "translateY(28px)",
                transitionDelay: started ? `${i * 110}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] shadow-[0_10px_30px_rgba(60,40,24,0.08)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                {/* Фото: ч/б → цвет, лёгкий зум */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name[lang]}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                {/* Затемнение снизу для читаемости текста */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Номер */}
                <span className="absolute left-4 top-4 rounded-md bg-wine px-2 py-1 text-[11px] font-medium tabular-nums text-cream">
                  0{i + 1}
                </span>
                {/* Опыт */}
                <span className="absolute right-4 top-4 rounded-full bg-cream/15 px-3 py-1 text-[11px] lowercase tracking-wide text-cream backdrop-blur-sm">
                  {m.exp[lang]}
                </span>

                {/* Инфо снизу */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-[20px] leading-tight text-cream lg:text-[22px]">
                    {m.name[lang]}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-cream/75">
                    {m.role[lang]}
                  </p>

                  {/* Теги специализаций — выезжают снизу при наведении */}
                  <div className="mt-0 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100">
                    {m.tags.map((t) => (
                      <span
                        key={t.ru}
                        className="rounded-full border border-cream/35 px-2.5 py-1 text-[10.5px] lowercase tracking-wide text-cream/90"
                      >
                        {t[lang]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
