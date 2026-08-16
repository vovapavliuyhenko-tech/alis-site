"use client";
// ЧАСТЫЕ ВОПРОСЫ — по мотивам traffic-masters: две колонки карточек. Заголовок
// слева в две строки (вторая — бордовым акцентом) + подзаголовок. Каждый вопрос —
// карточка с обводкой и круглым шевроном; активная заливается бордовым, текст
// становится кремовым. Несколько карточек могут быть открыты одновременно.
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

function Card({
  it,
  index,
  started,
  open,
  onToggle,
}: {
  it: Item;
  index: number;
  started: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const { lang } = useLang();
  return (
    <button
      onClick={onToggle}
      aria-expanded={open}
      className={`block w-full rounded-[20px] border p-6 text-left transition-[opacity,transform,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:p-7 ${
        open
          ? "border-[#3B0D1A] bg-[#3B0D1A] shadow-[0_18px_50px_rgba(59,13,26,0.35)]"
          : "border-[#17191a]/12 bg-white hover:border-[#3B0D1A]/40"
      }`}
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "none" : "translateY(20px)",
        transitionDelay: started ? `${index * 70}ms` : "0ms",
      }}
    >
      <div className="flex items-start justify-between gap-5">
        <span
          className={`font-serif text-[18px] leading-snug transition-colors duration-300 lg:text-[21px] ${
            open ? "text-[#f4efe6]" : "text-[#2a2320]"
          }`}
        >
          {it.q[lang]}
        </span>
        {/* Круглый шеврон */}
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            open ? "border-transparent bg-[#f4efe6] text-[#3B0D1A]" : "border-[#17191a]/20 bg-white text-[#3B0D1A]"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Ответ */}
      <div className="grid overflow-hidden transition-all duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="min-h-0">
          <p
            className="pt-4 text-[14px] leading-relaxed text-[#f4efe6]/85 transition-[opacity] duration-500 lg:text-[15px]"
            style={{ opacity: open ? 1 : 0 }}
          >
            {it.a[lang]}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function Faq() {
  const { lang } = useLang();
  const en = lang === "en";
  const [started, setStarted] = useState(false);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());
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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (idx: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });

  const mid = Math.ceil(ITEMS.length / 2);
  const cols = [ITEMS.slice(0, mid), ITEMS.slice(mid)];

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[90%] max-w-[1180px]">
        {/* Заголовок слева + подзаголовок */}
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="font-serif text-[34px] leading-[1.08] text-[#2a2320] lg:text-[52px]">
            {en ? "Answers to your" : "Ответы на вопросы"}
            <br />
            <span className="text-[#3B0D1A]">{en ? "questions about us" : "о работе с ALIS"}</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#17191a]/55 lg:text-[16px]">
            {en
              ? "Didn't find your answer? Leave a request — we'll sort out your case."
              : "Если не нашли ответ — оставьте заявку, мы разберём ваш случай."}
          </p>
        </div>

        {/* Две колонки карточек */}
        <div ref={gridRef} className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {cols.map((col, c) => (
            <div key={c} className="flex flex-col gap-4 lg:gap-5">
              {col.map((it, i) => {
                const idx = c * mid + i;
                return (
                  <Card key={it.q.ru} it={it} index={idx} started={started} open={openSet.has(idx)} onToggle={() => toggle(idx)} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
