"use client";
// ЧАСТЫЕ ВОПРОСЫ — широкий аккордеон в стиле сайта. Апгрейд дизайна/анимации:
// • подсветка активной строки + бордовая полоска-акцент слева
// • номер-кружок, заливающийся бордовым при открытии
// • ответ «всплывает» снизу с fade, «+» перетекает в «−»
// • бордовая линия «прочерчивается» под открытым вопросом
// • строки появляются по очереди при въезде в экран (scroll-reveal)
// Двуязычно (RU/EN).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Item = { q: Loc; a: Loc };

const ITEMS: Item[] = [
  {
    q: { ru: "Как записаться?", en: "How do I book?" },
    a: {
      ru: "Онлайн прямо на сайте в блоке «Запишитесь онлайн»: выберите услугу, мастера и удобное время. Либо оставьте телефон в форме ниже — перезвоним и подберём слот.",
      en: "Online right here in the “Book online” block: choose a service, an artist and a convenient time. Or leave your phone below — we'll call you back and find a slot.",
    },
  },
  {
    q: { ru: "Можно ли вызвать мастера на выезд?", en: "Can the artist come to me?" },
    a: {
      ru: "Да. Работаем на выезде по Новороссийску и региону, а по договорённости — по России и за рубежом. Команда приезжает к вам домой, в студию или на площадку.",
      en: "Yes. We work on location across Novorossiysk and the region, and by arrangement across Russia and abroad. The team comes to your home, a studio or the venue.",
    },
  },
  {
    q: { ru: "Сколько держится макияж и укладка?", en: "How long does the makeup and hair last?" },
    a: {
      ru: "Используем премиальную стойкую косметику. Образ держится весь день и вечер — от сборов до последнего кадра, даже в жару и на съёмке.",
      en: "We use premium long-wear products. The look holds all day and evening — from the morning prep to the last frame, even in the heat or on a shoot.",
    },
  },
  {
    q: { ru: "Делаете ли пробный образ перед свадьбой?", en: "Do you do a trial look before the wedding?" },
    a: {
      ru: "Да. Пробный образ мы согласовываем заранее — вы видите результат до торжества и в день свадьбы точно знаете, как будете выглядеть. Никаких сюрпризов.",
      en: "Yes. We agree the trial look in advance — you see the result before the celebration and know exactly how you'll look on the day. No surprises.",
    },
  },
  {
    q: { ru: "Нужна ли предоплата и как отменить запись?", en: "Is a deposit required and how do I cancel?" },
    a: {
      ru: "Небольшая предоплата бронирует за вами время мастера. Отменить или перенести запись можно заранее — просто свяжитесь с нами, поможем подобрать другое время.",
      en: "A small deposit reserves the artist's time for you. You can cancel or reschedule in advance — just contact us and we'll help find another time.",
    },
  },
  {
    q: { ru: "Как подготовиться к визиту?", en: "How should I prepare for the visit?" },
    a: {
      ru: "Приходите с чистыми волосами и без макияжа, возьмите референсы желаемого образа. Всё остальное — тон, стойкость, детали — мы берём на себя.",
      en: "Come with clean hair and no makeup, and bring references of the look you want. Everything else — tone, longevity, details — is on us.",
    },
  },
];

export default function Faq() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // scroll-reveal: как только список въезжает в экран — раскрываем строки по очереди
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
      <div className="mx-auto grid w-[94%] max-w-[1280px] gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        {/* Левая колонка — заголовок */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {lang === "en" ? "faq" : "вопросы"}
          </span>
          <h2 className="mt-4 font-serif text-[34px] leading-[1.05] text-[#17191a] lg:text-[54px]">
            {lang === "en" ? "Frequently asked questions" : "Частые вопросы"}
          </h2>
          <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-[#17191a]/55">
            {lang === "en"
              ? "Didn't find your answer? Leave your phone below — we'll call back and tell you everything."
              : "Не нашли ответ? Оставьте телефон ниже — перезвоним и всё расскажем."}
          </p>
        </div>

        {/* Правая колонка — аккордеон */}
        <div ref={listRef} className="border-t border-[#4E2126]/25">
          {ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="relative border-b border-[#4E2126]/25 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "none" : "translateY(22px)",
                  transitionDelay: started ? `${i * 90}ms` : "0ms",
                }}
              >
                {/* Бордовая полоска-акцент слева (появляется у открытого) */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-full w-[3px] origin-top bg-[#4E2126] transition-transform duration-500 ease-out ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                {/* Подсветка активной строки */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-[#4E2126] transition-opacity duration-500 ${
                    isOpen ? "opacity-[0.04]" : "opacity-0"
                  }`}
                />

                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group relative flex w-full items-center gap-5 py-6 pl-5 pr-2 text-left lg:py-7 lg:pl-7"
                >
                  {/* Номер-кружок */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-[13px] tabular-nums transition-all duration-500 ${
                      isOpen
                        ? "bg-[#4E2126] text-[#f4efe6]"
                        : "bg-[#4E2126]/8 text-[#4E2126]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {/* Вопрос (уезжает вправо при наведении) */}
                  <span
                    className={`flex-1 font-serif text-[20px] leading-snug transition-[color,transform] duration-300 group-hover:translate-x-1.5 lg:text-[26px] ${
                      isOpen ? "text-[#17191a]" : "text-[#17191a]/80"
                    }`}
                  >
                    {it.q[lang]}
                  </span>
                  {/* «+» ⇄ «−» */}
                  <span className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-[#4E2126]" />
                    <span
                      className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-[#4E2126] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Прочерчивающаяся бордовая линия под вопросом */}
                <span
                  aria-hidden
                  className={`absolute left-7 right-2 bottom-0 hidden h-[1.5px] origin-left bg-[#4E2126] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:block ${
                    isOpen ? "scale-x-100" : "scale-x-0"
                  }`}
                />

                {/* Ответ */}
                <div
                  className="grid overflow-hidden transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p
                      className="max-w-3xl pb-7 pl-[52px] pr-8 text-[15px] leading-relaxed text-[#17191a]/60 transition-[opacity,transform] duration-500 ease-out lg:text-[16px]"
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
    </section>
  );
}
