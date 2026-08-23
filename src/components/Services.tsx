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
  {
    name: { ru: "Чистка и уход за лицом", en: "Facial cleansing & care" },
    desc: { ru: "Комбинированная чистка, пилинги и уходовые протоколы под ваш тип кожи.", en: "Combined cleansing, peels and care protocols tailored to your skin type." },
    img: "/shop/care-c.jpg",
  },
  {
    name: { ru: "Массаж лица", en: "Facial massage" },
    desc: { ru: "Скульптурный и лимфодренажный массаж — тонус, овал и свежий цвет лица.", en: "Sculpting and lymphatic massage — tone, contour and a fresh complexion." },
    img: "/shop/care-d.jpg",
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
    <a href="/#online" style={reveal} className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-[#f1ede6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.img}
        alt={s.name[lang]}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
      />
      {/* Постоянное затемнение снизу для читаемости подписи */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#17191a]/70 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {/* Номер */}
      <span className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[12px] text-white backdrop-blur-sm">
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* Подпись капсом в скобках */}
      <span className="absolute bottom-5 left-5 right-5 z-10 text-[15px] font-medium uppercase leading-tight tracking-[0.02em] text-white transition-opacity duration-300 group-hover:opacity-0 lg:text-[17px]">
        ({s.name[lang]})
      </span>

      {/* Блюр всей карточки + «Записаться» по центру при наведении */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#3B0D1A]/25 opacity-0 backdrop-blur-[6px] transition-opacity duration-500 ease-out group-hover:opacity-100">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/70 px-7 py-3 text-[13px] uppercase tracking-[0.16em] text-white lg:text-[14px]">
          {lang === "en" ? "Book" : "Записаться"}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      <div className="mx-auto w-[96%] max-w-[1620px]">
        {/* Заголовок */}
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="font-display text-[34px] uppercase tracking-[0.06em] leading-[1.08] text-[#3B0D1A] lg:text-[52px]">
            {en ? "Our services" : "Наши услуги"}
          </h2>
        </div>

        {/* Сетка плиток + карточка-CTA */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3.5">
          {SERVICES.map((s, i) => (
            <Tile key={s.name.ru} s={s} i={i} started={started} />
          ))}

          {/* CTA-карточка */}
          <a
            href="/#online"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "none" : "translateY(26px)",
              transition: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)",
              transitionDelay: started ? `${SERVICES.length * 90}ms` : "0ms",
            }}
            className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[22px] border-2 border-[#3B0D1A] bg-[#3B0D1A] p-5 text-[#ffffff] lg:p-6"
          >
            {/* Кремовый круг, расходящийся из-под кнопки */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-5 left-5 z-0 h-[52px] w-[52px] origin-center rounded-full bg-[#ffffff] transition-transform duration-[650ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-[26] lg:bottom-6 lg:left-6"
            />

            <span className="relative z-10 font-serif text-[21px] leading-tight transition-colors duration-500 group-hover:text-[#3B0D1A] lg:text-[25px]">
              {en ? "Not sure what you need?" : "Не знаете, что выбрать?"}
            </span>
            <div className="relative z-10">
              <p className="mb-6 text-[13px] leading-relaxed text-[#ffffff]/75 transition-colors duration-500 group-hover:text-[#3B0D1A]/80 lg:text-[14px]">
                {en
                  ? "Tell us about your goal — we'll suggest the right procedure and a plan."
                  : "Расскажите о задаче — подберём подходящую процедуру и план."}
              </p>
              <span className="inline-flex items-center gap-3.5 text-[13px] uppercase tracking-[0.14em] transition-colors duration-500 group-hover:text-[#3B0D1A]">
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#ffffff] text-[#3B0D1A] transition-colors duration-300 group-hover:bg-transparent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-[650ms] ease-out group-hover:rotate-[360deg]"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {en ? "Get a consultation" : "Получить консультацию"}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
