"use client";
// ЧАСТЫЕ ВОПРОСЫ — split-раскладка: слева аккордеон, справа липкое фото, которое
// меняется под активный вопрос (плавный кроссфейд). Стиль «минимал, крупная
// типографика»: без кружков и жирных линий — только крупные serif-вопросы с
// воздухом. Активный вопрос становится бордовым, справа тонкая стрелка ↓.
// Анимации: цвет активного, всплывающий ответ, scroll-reveal каскадом.
// Двуязычно (RU/EN).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc; photo: string };

const ITEMS: Item[] = [
  {
    q: { ru: "Как записаться?", en: "How do I book?" },
    a: {
      ru: "Онлайн прямо на сайте в блоке «Запишитесь онлайн»: выберите услугу, мастера и удобное время. Либо оставьте телефон в форме ниже — перезвоним и подберём слот.",
      en: "Online right here in the “Book online” block: choose a service, an artist and a convenient time. Or leave your phone below — we'll call you back and find a slot.",
    },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    q: { ru: "Можно ли вызвать мастера на выезд?", en: "Can the artist come to me?" },
    a: {
      ru: "Да. Работаем на выезде по Новороссийску и региону, а по договорённости — по России и за рубежом. Команда приезжает к вам домой, в студию или на площадку.",
      en: "Yes. We work on location across Novorossiysk and the region, and by arrangement across Russia and abroad. The team comes to your home, a studio or the venue.",
    },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    q: { ru: "Сколько держится макияж и укладка?", en: "How long does the makeup and hair last?" },
    a: {
      ru: "Используем премиальную стойкую косметику. Образ держится весь день и вечер — от сборов до последнего кадра, даже в жару и на съёмке.",
      en: "We use premium long-wear products. The look holds all day and evening — from the morning prep to the last frame, even in the heat or on a shoot.",
    },
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    q: { ru: "Делаете ли пробный образ перед свадьбой?", en: "Do you do a trial look before the wedding?" },
    a: {
      ru: "Да. Пробный образ мы согласовываем заранее — вы видите результат до торжества и в день свадьбы точно знаете, как будете выглядеть. Никаких сюрпризов.",
      en: "Yes. We agree the trial look in advance — you see the result before the celebration and know exactly how you'll look on the day. No surprises.",
    },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
  {
    q: { ru: "Нужна ли предоплата и как отменить запись?", en: "Is a deposit required and how do I cancel?" },
    a: {
      ru: "Небольшая предоплата бронирует за вами время мастера. Отменить или перенести запись можно заранее — просто свяжитесь с нами, поможем подобрать другое время.",
      en: "A small deposit reserves the artist's time for you. You can cancel or reschedule in advance — just contact us and we'll help find another time.",
    },
    photo: "/assets/tild6436-383_fermata__1.jpg",
  },
  {
    q: { ru: "Как подготовиться к визиту?", en: "How should I prepare for the visit?" },
    a: {
      ru: "Приходите с чистыми волосами и без макияжа, возьмите референсы желаемого образа. Всё остальное — тон, стойкость, детали — мы берём на себя.",
      en: "Come with clean hair and no makeup, and bring references of the look you want. Everything else — tone, longevity, details — is on us.",
    },
    photo: "/assets/tild6530-383_-2___1_.jpg",
  },
];

export default function Faq() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const active = open < 0 ? 0 : open; // для фото: всегда что-то показываем

  useEffect(() => {
    const el = listRef.current;
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
    <section id="faq" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto grid w-[94%] max-w-[1280px] items-start gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
        {/* Левая колонка — заголовок + аккордеон */}
        <div className="lg:order-1">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {lang === "en" ? "faq" : "вопросы"}
          </span>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.05] text-[#17191a] lg:text-[48px]">
            {lang === "en" ? "Frequently asked questions" : "Частые вопросы"}
          </h2>
          <p className="mb-10 mt-4 max-w-md text-[14px] leading-relaxed text-[#17191a]/55">
            {lang === "en"
              ? "Didn't find your answer? Leave your phone below — we'll call back and tell you everything."
              : "Не нашли ответ? Оставьте телефон ниже — перезвоним и всё расскажем."}
          </p>

          <div ref={listRef} className="border-t border-[#17191a]/10">
            {ITEMS.map((it, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className="border-b border-[#17191a]/10 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? "none" : "translateY(22px)",
                    transitionDelay: started ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    onMouseEnter={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-5 py-6 text-left lg:py-8"
                  >
                    <span
                      className={`flex-1 font-serif leading-[1.15] tracking-[-0.01em] transition-colors duration-300 text-[24px] lg:text-[32px] ${
                        isOpen ? "text-[#4E2126]" : "text-[#17191a] group-hover:text-[#4E2126]"
                      }`}
                    >
                      {it.q[lang]}
                    </span>
                    {/* Тонкая стрелка ↓ — поворачивается при открытии */}
                    <svg
                      viewBox="0 0 24 24"
                      className={`mt-1 h-6 w-6 shrink-0 transition-[rotate,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:mt-1.5 ${
                        isOpen ? "rotate-180 text-[#4E2126]" : "text-[#17191a]/40 group-hover:text-[#4E2126]"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className="grid overflow-hidden transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0">
                      <p
                        className="max-w-xl pb-7 pr-10 text-[14px] leading-relaxed text-[#17191a]/55 transition-[opacity,transform] duration-500 ease-out lg:text-[15px]"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "none" : "translateY(10px)",
                          transitionDelay: isOpen ? "120ms" : "0ms",
                        }}
                      >
                        {it.a[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Правая колонка — липкое фото под активный вопрос (кроссфейд) */}
        <div className="lg:order-2 lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[0_16px_50px_rgba(23,25,26,0.12)]">
            {ITEMS.map((it, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                src={it.photo}
                alt={it.q[lang]}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
                style={{ opacity: active === i ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            {/* Активный вопрос поверх фото */}
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="mb-3 inline-block rounded-full bg-[#f4efe6]/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#f4efe6] backdrop-blur-sm">
                0{active + 1}
              </span>
              <p className="font-serif text-[22px] leading-tight text-[#f4efe6] lg:text-[26px]">
                {ITEMS[active].q[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
