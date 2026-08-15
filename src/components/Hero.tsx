"use client";
// HERO resayme: одно фото зеркалом слева/справа, по центру белая карточка.
// При скролле карточка плавно ОПУСКАЕТСЯ вниз и тонет в темноте (parallax).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { lang } = useLang();
  const photo = "/assets/tild6230-643__.jpg";
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const section = sectionRef.current;
    if (!card || !section) return;

    const update = () => {
      const h = section.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / h, 0), 1);
      // карточка опускается вниз и растворяется по мере скролла
      card.style.transform = `translateY(${progress * 300}px)`;
      card.style.opacity = String(1 - progress * 0.95);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-white"
    >
      {/* Фон: фото зеркалом */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full object-cover object-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full -scale-x-100 object-cover object-top" />
      </div>

      {/* Затемнение низа — на всю ширину экрана, плавно в чёрный */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,1) 100%)",
        }}
      />

      {/* Центральная белая карточка (опускается при скролле) */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pb-24">
        <div
          ref={cardRef}
          className="flex max-h-[76svh] w-[88%] max-w-[360px] flex-col items-center justify-between rounded-[26px] bg-white px-7 py-8 text-center text-[#17191a] shadow-[0_20px_60px_rgba(0,0,0,0.15)] will-change-transform"
        >
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#17191a]/45">
            {lang === "en" ? "Beauty studio · Novorossiysk" : "Салон эстетики и красоты · Новороссийск"}
          </span>

          <div className="flex flex-col items-center py-4">
            <span className="font-serif text-[46px] leading-none tracking-[0.08em] text-[#17191a]">
              ÁLIS
            </span>
            <span className="mt-2 text-[12px] uppercase tracking-[0.35em] text-[#4E2126]">
              beauty
            </span>
          </div>

          {/* Продающий оффер */}
          <div className="w-full">
            <p className="font-serif text-[19px] leading-snug text-[#4E2126]">
              {lang === "en"
                ? "A flawless look that lasts to the last frame"
                : "Безупречный образ, стойкий до последнего кадра"}
            </p>
            <ul className="mx-auto mt-4 flex max-w-[16rem] flex-col gap-2 text-left">
              {(lang === "en"
                ? ["Makeup, hair & cosmetology — top masters", "Holds all day and evening", "First consultation — free"]
                : ["Макияж, волосы, косметология — топ-мастера", "Держится весь день и вечер", "Первая консультация — бесплатно"]
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 text-[12.5px] leading-snug text-[#17191a]/70">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4E2126" strokeWidth="2.4" className="mt-[2px] shrink-0"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Растянутая кнопка записи внизу первого экрана */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-6">
        <a
          href="/#online"
          className="group flex w-full max-w-[1180px] items-center justify-center gap-3 rounded-full bg-[#4E2126] py-4 text-[13px] font-medium uppercase tracking-[0.14em] text-[#f4efe6] shadow-[0_14px_40px_rgba(78,33,38,0.35)] transition-transform duration-300 hover:scale-[1.01] lg:py-5"
        >
          {lang === "en" ? "Book now" : "Записаться на приём"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </section>
  );
}
