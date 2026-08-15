"use client";
// НАШИ УСЛУГИ — журнальная сетка фото-плиток (по мотивам референса fatoshka).
// Подпись услуги капсом в скобках, номер в углу. При наведении: фото
// приближается, снизу выезжает бордовая «шторка» с кратким описанием.
// Последняя ячейка — бордовая карточка-CTA «Получить консультацию».
// Светлая тема, бордовые акценты, Playfair. Двуязычно (RU/EN).
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Service = { name: Loc; desc: Loc; img: string };

const SERVICES: Service[] = [
  {
    name: { ru: "Аппаратная косметология", en: "Hardware cosmetology" },
    desc: { ru: "RF-лифтинг, ультразвук и микротоки — упругость и сияние без операций.", en: "RF-lifting, ultrasound and microcurrents — firmness and glow without surgery." },
    img: "/shop/care-e.jpg",
  },
  {
    name: { ru: "Инъекционная косметология", en: "Injection cosmetology" },
    desc: { ru: "Биоревитализация, мезотерапия и контурная пластика у сертифицированных врачей.", en: "Biorevitalization, mesotherapy and fillers by certified doctors." },
    img: "/shop/care-b.jpg",
  },
  {
    name: { ru: "Лазерная эпиляция", en: "Laser hair removal" },
    desc: { ru: "Гладкая кожа надолго. Современный лазер — бережно для любого фототипа.", en: "Smooth skin for the long run. Modern laser — gentle for any skin type." },
    img: "/assets/tild3638-373_-2___1__3.jpg",
  },
  {
    name: { ru: "Перманентный макияж", en: "Permanent makeup" },
    desc: { ru: "Брови, губы и стрелки в естественной технике — идеально каждый день.", en: "Brows, lips and liner in a natural technique — flawless every day." },
    img: "/shop/care-a.jpg",
  },
  {
    name: { ru: "Брови и ресницы", en: "Brows & lashes" },
    desc: { ru: "Оформление, ламинирование и наращивание — выразительный взгляд.", en: "Shaping, lamination and extensions — an expressive look." },
    img: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

function Tile({ s, i, started }: { s: Service; i: number; started: boolean }) {
  const { lang } = useLang();
  const reveal: React.CSSProperties = {
    opacity: started ? 1 : 0,
    transform: started ? "none" : "translateY(26px)",
    transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
    transitionDelay: started ? `${i * 90}ms` : "0ms",
  };
  return (
    <a href="/request" style={reveal} className="group relative block aspect-[5/6] overflow-hidden rounded-[22px] bg-[#f1ede6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.img}
        alt={s.name[lang]}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
      />
      {/* Постоянное затемнение снизу для читаемости подписи */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#17191a]/70 to-transparent" />

      {/* Номер */}
      <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[12px] text-white backdrop-blur-sm">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* Подпись капсом в скобках */}
      <span className="absolute bottom-5 left-5 right-5 z-10 text-[15px] font-medium uppercase leading-tight tracking-[0.02em] text-white transition-transform duration-500 group-hover:-translate-y-1 lg:text-[17px]">
        ({s.name[lang]})
      </span>

      {/* Бордовая шторка с описанием — выезжает снизу при наведении */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#4E2126] px-5 pb-14 pt-6 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
        <p className="text-[13px] leading-relaxed text-[#f4efe6]/85 lg:text-[14px]">{s.desc[lang]}</p>
        <span className="mt-3 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#f4efe6]">
          {lang === "en" ? "Book" : "Записаться"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </a>
  );
}

export default function Services() {
  const { lang } = useLang();
  const en = lang === "en";
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
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-24 lg:py-32">
      <div className="mx-auto w-[96%] max-w-[1720px]">
        {/* Заголовок */}
        <div className="mb-12 max-w-2xl lg:mb-16">
          <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
            {en ? "services" : "услуги"}
          </span>
          <h2 className="mt-5 font-serif text-[34px] leading-[1.08] text-[#4E2126] lg:text-[56px]">
            {en ? "Our services" : "Наши услуги"}
          </h2>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#17191a]/55 lg:text-[15px]">
            {en
              ? "Aesthetics and care in one place. Choose a direction — and book a consultation with our specialists."
              : "Эстетика и уход в одном месте. Выберите направление — и запишитесь на консультацию к нашим специалистам."}
          </p>
        </div>

        {/* Сетка плиток + карточка-CTA */}
        <div ref={gridRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
          {SERVICES.map((s, i) => (
            <Tile key={s.name.ru} s={s} i={i} started={started} />
          ))}

          {/* CTA-карточка */}
          <a
            href="/request"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "none" : "translateY(26px)",
              transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
              transitionDelay: started ? `${SERVICES.length * 90}ms` : "0ms",
            }}
            className="group flex aspect-[5/6] flex-col justify-between rounded-[22px] bg-[#4E2126] p-7 text-[#f4efe6] lg:p-8"
          >
            <span className="font-serif text-[24px] leading-tight lg:text-[30px]">
              {en ? "Not sure what you need?" : "Не знаете, что выбрать?"}
            </span>
            <div>
              <p className="mb-6 text-[13px] leading-relaxed text-[#f4efe6]/70 lg:text-[14px]">
                {en
                  ? "Tell us about your goal — we'll suggest the right procedure and a plan."
                  : "Расскажите о задаче — подберём подходящую процедуру и план."}
              </p>
              <span className="inline-flex items-center gap-3 border-b border-[#f4efe6]/50 pb-1.5 text-[13px] uppercase tracking-[0.14em] transition-colors group-hover:border-[#f4efe6]">
                {en ? "Get a consultation" : "Получить консультацию"}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
