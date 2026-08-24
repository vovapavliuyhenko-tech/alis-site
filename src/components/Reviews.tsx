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
    name: { ru: "Екатерина К.", en: "Ekaterina K." },
    role: { ru: "маникюр", en: "manicure" },
    text: {
      ru: "Прекрасное место, квалифицированные мастера, приятная атмосфера. Была на маникюре у Ксении — всё понравилось, спасибо за красивые ноготочки.",
      en: "A wonderful place, skilled masters and a lovely atmosphere. I had a manicure with Ksenia — loved everything, thank you for the beautiful nails.",
    },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Виктория С.", en: "Viktoria S." },
    role: { ru: "маникюр и укладки", en: "nails & styling" },
    text: {
      ru: "Обожаю этот салон! Приветливые девушки на ресепшен, забота о клиенте, чисто и очень красиво — чувствуешь себя королевой. Предлагают вкусный чай и кофе.",
      en: "I adore this salon! Friendly reception, real care for the client, spotless and beautiful — you feel like a queen. They even offer delicious tea and coffee.",
    },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Анастасия В.", en: "Anastasia V." },
    role: { ru: "укладка", en: "styling" },
    text: {
      ru: "Лучшее начало дня. Благодарю Екатерину за идеальную укладку и администратора за тёплый приём.",
      en: "The best start to the day. Thank you Ekaterina for the perfect styling and the receptionist for the warm welcome.",
    },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Анна Ч.", en: "Anna Ch." },
    role: { ru: "педикюр", en: "pedicure" },
    text: {
      ru: "Очень комфортное, красивое пространство, сотрудники внимательные. Услугу сделали отлично, как я хотела, уточнили все нюансы.",
      en: "A very comfortable, beautiful space and attentive staff. The service was done perfectly, just as I wanted, and they checked every detail.",
    },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    name: { ru: "Анастасия Е.", en: "Anastasia E." },
    role: { ru: "маникюр", en: "manicure" },
    text: {
      ru: "Прекрасный салон, качество маникюра и сервис 10 из 10. Очень уютно, комфортно и продумано до мелочей.",
      en: "A wonderful salon, the manicure quality and service are 10 out of 10. So cosy, comfortable and thought through to the smallest detail.",
    },
    photo: "/assets/tild6561-356_fermata__2.jpg",
  },
  {
    name: { ru: "Анастасия К.", en: "Anastasia K." },
    role: { ru: "маникюр", en: "manicure" },
    text: {
      ru: "Уютный и светлый салон. Делала маникюр у Арины — всё понравилось.",
      en: "A cosy and bright salon. I had a manicure with Arina — loved it all.",
    },
    photo: "/assets/tild3638-373_-2___1__3.jpg",
  },
  {
    name: { ru: "Виктория", en: "Viktoria" },
    role: { ru: "стрижка", en: "haircut" },
    text: {
      ru: "Прекрасный сервис, приветливый и внимательный персонал. Уютно, чисто, красиво. Мастер Екатерина сделала прекраснейшую стрижку. Рекомендую!",
      en: "Wonderful service, friendly and attentive staff. Cosy, clean and beautiful. Ekaterina gave me a gorgeous haircut. Highly recommend!",
    },
    photo: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    name: { ru: "Светлана П.", en: "Svetlana P." },
    role: { ru: "окрашивание", en: "hair colouring" },
    text: {
      ru: "Была на окрашивании у мастера Ольги. Довольна результатом — цвет полностью соответствует ожиданиям, ещё и рекомендации по уходу дали.",
      en: "I had my hair coloured by Olga. Delighted with the result — the colour is exactly what I expected, and they gave me care tips too.",
    },
    photo: "/assets/tild3561-646_-2___1__5.jpg",
  },
  {
    name: { ru: "Вера В.", en: "Vera V." },
    role: { ru: "маникюр и брови", en: "nails & brows" },
    text: {
      ru: "Обожаю атмосферу заботы и красоты — каждый раз не хочется уходить. Советую маникюр и оформление бровей. Мастера Милана и Алина в сердце!",
      en: "I adore the atmosphere of care and beauty — I never want to leave. I recommend the manicure and brow shaping. Milana and Alina, you're the best!",
    },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Татьяна В.", en: "Tatiana V." },
    role: { ru: "стрижка и маникюр", en: "haircut & nails" },
    text: {
      ru: "Выбрала салон по отзывам. Юлия подравняла кончики, Ксения сделала маникюр — быстро, качественно и с учётом пожеланий. Ушла с отличным настроением.",
      en: "I chose the salon by its reviews. Yulia trimmed my ends and Ksenia did my nails — fast, high quality and to my wishes. I left in a great mood.",
    },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Ангелина К.", en: "Angelina K." },
    role: { ru: "уход за волосами", en: "hair care" },
    text: {
      ru: "От всей души советую! Персонал грамотно подберёт услугу для ваших волос, уход можно купить домой прямо на месте, а вкусный кофе возвращает снова и снова.",
      en: "I wholeheartedly recommend it! The staff picks the right service for your hair, you can buy home care on the spot, and the coffee brings you back again and again.",
    },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    name: { ru: "Евгения Е.", en: "Evgenia E." },
    role: { ru: "барбер", en: "barber" },
    text: {
      ru: "Отличное место, приятная обстановка, всё очень аккуратно. Барбер Эдуард знает своё дело — сын в восторге! Ходим только к нему.",
      en: "A great place, pleasant setting, everything is neat. Barber Eduard knows his craft — my son is thrilled! We only go to him.",
    },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

export default function Reviews() {
  const { lang } = useLang();
  const n = REVIEWS.length;
  const step = 360 / n; // угол между гранями
  const radius = 580; // радиус кольца как изначально (заполняется 12 отзывами)

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
          <span className="inline-block rounded-full bg-[#4A4B33] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {lang === "en" ? "reviews" : "отзывы"}
          </span>
          <h2 className="mt-4 font-display text-[30px] uppercase tracking-[0.06em] leading-[1.12] text-[#17191a] lg:text-[44px]">
            {lang === "en" ? "What our " : "Что говорят "}
            <span className="text-[#4A4B33]">{lang === "en" ? "guests say" : "наши гостьи"}</span>
          </h2>
          <p className="mt-4 inline-flex items-center gap-2 text-[14px] text-[#17191a]/60">
            <span className="text-[#3B0D1A]">★★★★★</span>
            <span className="font-medium text-[#17191a]">4.9</span>
            {lang === "en" ? "· 75+ reviews on Yandex and 2GIS" : "· 75+ отзывов на Яндекс и 2ГИС"}
          </p>
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
                className="absolute left-1/2 top-1/2 -ml-[138px] -mt-[128px] flex h-[256px] w-[276px] flex-col justify-between rounded-[18px] border border-[#17191a]/10 bg-white p-5 text-[#17191a] shadow-[0_10px_30px_rgba(23,25,26,0.08)] [backface-visibility:hidden]"
              >
                <span className="font-serif text-[38px] leading-[0.5] text-[#3B0D1A]">
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
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-[#3B0D1A]/35"
                  />
                  <div>
                    <p className="text-[12.5px] font-medium text-[#17191a]">{r.name[lang]}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#4A4B33]">
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

        {/* Ссылки на реальные площадки с отзывами */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-[13px] text-[#17191a]/55">{lang === "en" ? "Read real reviews:" : "Читать реальные отзывы:"}</span>
          {[
            { label: "Яндекс", href: "https://yandex.ru/maps/org/lis_byuti/63024642190/reviews/" },
            { label: "2ГИС", href: "https://2gis.ru/novorossiysk/firm/70000001086737494/tab/reviews" },
          ].map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#3B0D1A]/25 px-4 py-2 text-[13px] text-[#3B0D1A] transition-colors hover:bg-[#3B0D1A] hover:text-[#f4efe6]"
            >
              {p.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
