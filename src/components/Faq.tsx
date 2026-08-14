"use client";
// ЧАСТЫЕ ВОПРОСЫ — во всю ширину, две колонки. По центру: serif-надстрочник и
// крупный заголовок капсом (бордовый). Каждый вопрос — строка с бордовым круглым
// «+», раскрывается ответ. Тонкие разделители, кремовый фон. Каждый пункт
// открывается независимо. scroll-reveal каскадом. Двуязычно (RU/EN).
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

function Row({
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
    <div
      className="border-t border-[#2a2320]/12 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "none" : "translateY(20px)",
        transitionDelay: started ? `${index * 70}ms` : "0ms",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
      >
        <span
          className={`font-serif text-[17px] italic leading-snug transition-colors duration-300 lg:text-[21px] ${
            open ? "text-[#4E2126]" : "text-[#2a2320]/85 group-hover:text-[#4E2126]"
          }`}
        >
          {it.q[lang]}
        </span>
        {/* Бордовый круглый «+» → «−» */}
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4E2126] transition-transform duration-300 group-hover:scale-105 lg:h-9 lg:w-9">
          <span className="absolute h-[1.5px] w-[11px] rounded-full bg-[#f4efe6]" />
          <span
            className={`absolute h-[11px] w-[1.5px] rounded-full bg-[#f4efe6] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
              open ? "rotate-90 scale-0" : ""
            }`}
          />
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-all duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <p
            className="max-w-2xl pb-6 pr-14 text-[14px] leading-relaxed text-[#2a2320]/60 transition-[opacity,transform] duration-500 ease-out lg:text-[15px]"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(8px)",
              transitionDelay: open ? "120ms" : "0ms",
            }}
          >
            {it.a[lang]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const { lang } = useLang();
  const [started, setStarted] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
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

  const mid = Math.ceil(ITEMS.length / 2);
  const cols = [ITEMS.slice(0, mid), ITEMS.slice(mid)];

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[90%] max-w-[1120px]">
        {/* Заголовок по центру */}
        <div className="mb-16 text-center lg:mb-20">
          <span className="font-serif text-[15px] italic tracking-[0.05em] text-[#4E2126]/60 lg:text-[17px]">
            {lang === "en" ? "frequently asked questions" : "часто задаваемые вопросы"}
          </span>
          <h2 className="mt-3 font-serif text-[38px] leading-[1.05] tracking-[0.01em] text-[#4E2126] lg:text-[64px]">
            {lang === "en" ? "FAQ" : "Частые вопросы"}
          </h2>
        </div>

        {/* Две колонки во всю ширину */}
        <div ref={gridRef} className="grid gap-x-12 lg:grid-cols-2 lg:gap-x-16">
          {cols.map((col, c) => (
            <div key={c} className="border-b border-[#2a2320]/12">
              {col.map((it, i) => {
                const idx = c * mid + i;
                return (
                  <Row
                    key={it.q.ru}
                    it={it}
                    index={idx}
                    started={started}
                    open={openIdx === idx}
                    onToggle={() => setOpenIdx((v) => (v === idx ? null : idx))}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
