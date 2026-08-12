"use client";
// ОТЗЫВЫ — вращающееся 3D-кольцо: карточки стоят на изгибе (грани цилиндра).
// Крутится само; можно ЗАХВАТИТЬ указателем и тянуть в любую сторону, а
// удержанием — останавливать. Двуязычно (RU/EN).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Review = { name: Loc; role: Loc; text: Loc; photo: string };

const REVIEWS: Review[] = [
  {
    name: { ru: "Анна", en: "Anna" },
    role: { ru: "невеста", en: "bride" },
    text: {
      ru: "Свадебный образ превзошёл все ожидания — держался весь день, а на фото я не могла себя узнать, настолько красиво.",
      en: "The bridal look exceeded all expectations — it held all day, and in the photos I could barely recognise myself, it was so beautiful.",
    },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Мария", en: "Maria" },
    role: { ru: "фотосессия", en: "photoshoot" },
    text: {
      ru: "Делали образ для съёмки. Макияж идеально лёг в кадр, а команда прочувствовала мой стиль с первого слова.",
      en: "They created a look for a shoot. The makeup sat perfectly on camera, and the team understood my style from the first word.",
    },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Екатерина", en: "Ekaterina" },
    role: { ru: "выпускной", en: "prom" },
    text: {
      ru: "Готовили дочку на выпускной. Нежно, стойко и точно по референсу — она была самой красивой на вечере.",
      en: "They prepped my daughter for prom. Gentle, long-lasting and exactly to reference — she was the most beautiful girl of the evening.",
    },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Ольга", en: "Olga" },
    role: { ru: "мероприятие", en: "event" },
    text: {
      ru: "Выезд мастеров на площадку прошёл как часы. Всё вовремя, деликатно и с заботой о каждой детали образа.",
      en: "The on-location visit ran like clockwork. Everything on time, tactful and caring about every detail of the look.",
    },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    name: { ru: "Дарья", en: "Daria" },
    role: { ru: "постоянная гостья", en: "regular guest" },
    text: {
      ru: "Хожу в ALIS больше года. Каждый раз выхожу с ощущением, что стала собой — только лучше. Это дорогого стоит.",
      en: "I've been coming to ALIS for over a year. Every time I leave feeling like myself — only better. That's worth a lot.",
    },
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: { ru: "Вероника", en: "Veronika" },
    role: { ru: "вечерний образ", en: "evening look" },
    text: {
      ru: "Пришла уставшей после работы — ушла королевой. Лёгкая рука мастера и атмосфера, в которой отдыхаешь душой.",
      en: "I arrived tired after work and left a queen. A light touch from the artist and an atmosphere where your soul rests.",
    },
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: { ru: "Светлана", en: "Svetlana" },
    role: { ru: "свадьба", en: "wedding" },
    text: {
      ru: "Готовили меня и подружек невесты — все в восторге. Единый стиль, идеальный тайминг и ноль суеты в важный день.",
      en: "They prepped me and the bridesmaids — everyone was delighted. A unified style, perfect timing and zero fuss on the big day.",
    },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Ирина", en: "Irina" },
    role: { ru: "макияж", en: "makeup" },
    text: {
      ru: "Обожаю их макияж: лёгкий, стойкий, «мой, но лучше». Ни разу не подвели, даже в жару на выезде.",
      en: "I adore their makeup: light, long-lasting, 'me but better'. Never let me down, even in the heat on location.",
    },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Наталья", en: "Natalia" },
    role: { ru: "юбилей", en: "anniversary" },
    text: {
      ru: "Собирали образ на юбилей. Чувствовала себя звездой вечера — комплименты весь праздник не заканчивались.",
      en: "They created a look for my milestone celebration. I felt like the star of the night — the compliments never stopped.",
    },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Полина", en: "Polina" },
    role: { ru: "фотопроект", en: "photo project" },
    text: {
      ru: "Снимали большой проект, образов было много. Каждый продуман до мелочей и точно попал в концепцию съёмки.",
      en: "We shot a big project with many looks. Each was thought through to the smallest detail and fit the concept exactly.",
    },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    name: { ru: "Алина", en: "Alina" },
    role: { ru: "свадьба за городом", en: "countryside wedding" },
    text: {
      ru: "Свадьба была за городом, переживала за логистику. Команда приехала заранее, всё прошло спокойно и красиво.",
      en: "The wedding was out of town and I worried about logistics. The team arrived early and everything went calmly and beautifully.",
    },
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: { ru: "Юлия", en: "Yulia" },
    role: { ru: "деловой образ", en: "business look" },
    text: {
      ru: "Собирали образ на конференцию. Строго, стильно и уверенно — ровно то, что нужно для сцены и камер.",
      en: "They created a look for a conference. Sharp, stylish and confident — exactly what's needed for the stage and cameras.",
    },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Кристина", en: "Kristina" },
    role: { ru: "девичник", en: "hen party" },
    text: {
      ru: "Собрали всю компанию перед девичником. Быстро, весело и красиво — на фото каждая получилась идеально.",
      en: "They prepped our whole group before the hen party. Fast, fun and beautiful — everyone looked perfect in the photos.",
    },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Евгения", en: "Evgenia" },
    role: { ru: "годовщина", en: "anniversary" },
    text: {
      ru: "Хотела нежный образ на годовщину. Услышали с полуслова и сделали именно то, о чём я мечтала.",
      en: "I wanted a delicate look for our anniversary. They understood at a glance and made exactly what I dreamed of.",
    },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

export default function Reviews() {
  const { lang } = useLang();
  const n = REVIEWS.length;
  const step = 360 / n; // угол между гранями
  const radius = 580; // радиус кольца (карточки разъезжаются к краям экрана)

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Авто-вращение + перетаскивание указателем (мышь / палец / стилус).
  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const AUTO = 360 / 34 / 1000; // град/мс — как прежние 34с на оборот
    const SENS = 0.28; // чувствительность: градусов на пиксель

    let angle = 0;
    let dragging = false;
    let startX = 0;
    let startAngle = 0;
    let last = 0;
    let raf = 0;

    const tick = (ts: number) => {
      const dt = last ? ts - last : 0;
      last = ts;
      if (!dragging && !reduce) angle -= AUTO * dt; // само крутится в ту же сторону
      ring.style.transform = `rotateY(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      e.preventDefault();
      dragging = true;
      startX = e.clientX;
      startAngle = angle;
      stage.style.cursor = "grabbing";
    };
    // Движение и отпускание слушаем на ОКНЕ — перетаскивание продолжается,
    // даже если указатель ушёл за пределы блока (карточки выступают за рамку).
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      angle = startAngle + (e.clientX - startX) * SENS;
      // Применяем сразу — перетаскивание не зависит от rAF (напр. если он придушен)
      ring.style.transform = `rotateY(${angle}deg)`;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      startAngle = angle;
      stage.style.cursor = "grab";
    };

    stage.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section id="reviews" className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto w-[94%] max-w-[1180px]">
        {/* Заголовок */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {lang === "en" ? "reviews" : "отзывы"}
          </span>
          <h2 className="mt-4 font-serif text-[32px] leading-[1.1] text-[#17191a] lg:text-[48px]">
            {lang === "en" ? "What our guests say" : "Что говорят наши гостьи"}
          </h2>
        </div>

        {/* Вращающееся 3D-кольцо */}
        <div
          ref={stageRef}
          className="relative mx-auto h-[360px] cursor-grab touch-pan-y select-none [perspective:4000px] lg:h-[340px]"
        >
          <div ref={ringRef} className="absolute inset-0 [transform-style:preserve-3d]">
            {REVIEWS.map((r, i) => (
              <article
                key={r.name.ru}
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
                className="absolute left-1/2 top-1/2 -ml-[130px] -mt-[128px] flex h-[256px] w-[260px] flex-col justify-between rounded-[18px] border border-[#17191a]/10 bg-white p-6 text-[#17191a] shadow-[0_10px_30px_rgba(23,25,26,0.08)] [backface-visibility:hidden]"
              >
                <span className="font-serif text-[38px] leading-[0.5] text-[#4E2126]">
                  &ldquo;
                </span>

                <p className="font-serif text-[13px] leading-[1.55] text-[#17191a]">
                  {r.text[lang]}
                </p>

                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.photo}
                    alt={r.name[lang]}
                    draggable={false}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-[#4E2126]/35"
                  />
                  <div>
                    <p className="text-[12.5px] font-medium text-[#17191a]">{r.name[lang]}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#4E2126]">
                      {r.role[lang]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-[12px] lowercase tracking-wide text-[#17191a]/40">
          {lang === "en"
            ? "drag to rotate · hold to pause"
            : "потяните, чтобы листать · зажмите, чтобы остановить"}
        </p>
      </div>
    </section>
  );
}
