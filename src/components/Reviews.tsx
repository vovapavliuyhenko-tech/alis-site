"use client";
// ОТЗЫВЫ — 3D-карусель (coverflow): центральная карточка крупная, боковые
// повёрнуты в перспективе и притенены. Авто-прокрутка (пауза при наведении),
// стрелки, точки, клик по боковой карточке. Палитра ink/cream/бордо.
import { useEffect, useState } from "react";

type Review = { name: string; role: string; text: string; photo: string };

const REVIEWS: Review[] = [
  {
    name: "Анна",
    role: "невеста",
    text: "Свадебный образ превзошёл все ожидания — держался весь день, а на фото я не могла себя узнать, настолько красиво.",
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: "Мария",
    role: "фотосессия",
    text: "Делали образ для съёмки. Макияж идеально лёг в кадр, а команда прочувствовала мой стиль с первого слова.",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: "Екатерина",
    role: "выпускной",
    text: "Готовили дочку на выпускной. Нежно, стойко и точно по референсу — она была самой красивой на вечере.",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: "Ольга",
    role: "мероприятие",
    text: "Выезд мастеров на площадку прошёл как часы. Всё вовремя, деликатно и с заботой о каждой детали образа.",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    name: "Дарья",
    role: "постоянная гостья",
    text: "Хожу в ALIS больше года. Каждый раз выхожу с ощущением, что стала собой — только лучше. Это дорогого стоит.",
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
];

export default function Reviews() {
  const n = REVIEWS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), 4500);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <section
      id="reviews"
      className="overflow-hidden bg-[#17191a] py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto w-[94%] max-w-[1180px]">
        {/* Заголовок */}
        <div className="mb-14 text-center">
          <span className="text-[13px] lowercase tracking-wide text-[#f4efe6]/45">
            (отзывы)
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#f4efe6] lg:text-[48px]">
            Что говорят наши гостьи
          </h2>
        </div>

        {/* Сцена coverflow */}
        <div
          className="relative mx-auto h-[440px] [perspective:1600px] lg:h-[420px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {REVIEWS.map((r, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const translateX = offset * 300;
            const rotateY = Math.max(Math.min(-offset * 32, 48), -48);
            const scale = isActive ? 1 : 0.82;
            const opacity = abs > 2 ? 0 : isActive ? 1 : 0.4;
            const z = 20 - abs;

            return (
              <article
                key={r.name}
                onClick={() => !isActive && setActive(i)}
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: z,
                  pointerEvents: abs > 2 ? "none" : "auto",
                  cursor: isActive ? "default" : "pointer",
                }}
                className="absolute left-1/2 top-1/2 flex h-[380px] w-[86%] max-w-[420px] flex-col justify-between rounded-[22px] bg-[#f4efe6] p-8 text-[#17191a] shadow-2xl transition-all duration-500 ease-out lg:p-10"
              >
                {/* Кавычка */}
                <span className="font-serif text-[64px] leading-[0.5] text-[#4E2126]">
                  &ldquo;
                </span>

                <p className="font-serif text-[19px] leading-relaxed text-[#17191a] lg:text-[21px]">
                  {r.text}
                </p>

                <div className="flex items-center gap-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[15px] font-medium text-[#17191a]">{r.name}</p>
                    <p className="text-[12px] uppercase tracking-[0.12em] text-[#4E2126]">
                      {r.role}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Управление */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
            aria-label="Предыдущий отзыв"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f4efe6]/25 text-[#f4efe6] transition-colors hover:border-[#4E2126] hover:bg-[#4E2126]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Отзыв ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-[#4E2126]" : "w-2 bg-[#f4efe6]/25 hover:bg-[#f4efe6]/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Следующий отзыв"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f4efe6]/25 text-[#f4efe6] transition-colors hover:border-[#4E2126] hover:bg-[#4E2126]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
