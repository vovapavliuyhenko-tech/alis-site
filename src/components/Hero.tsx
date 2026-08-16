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
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          ref={cardRef}
          className="flex aspect-[337/443] max-h-[74svh] w-[86%] max-w-[338px] flex-col items-center justify-between rounded-[26px] bg-white px-7 py-9 text-center text-[#17191a] shadow-[0_20px_60px_rgba(0,0,0,0.15)] will-change-transform"
        >
          <p className="mx-auto max-w-[17rem] text-[13px] leading-snug">
            {lang === "en"
              ? "Network of aesthetics studios & beauty concierge"
              : "Сеть студий эстетики и beauty-concierge"}
            <br />
            {lang === "en" ? "— Daiana Tarzyan" : "— Дайана Тарзян"}
          </p>

          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="font-serif text-[46px] leading-none tracking-[0.08em] text-[#17191a]">
              ÁLIS
            </span>
            <span className="mt-2 text-[12px] uppercase tracking-[0.35em] text-[#4A4B33]">
              beauty
            </span>
          </div>

          <p className="mx-auto max-w-[18rem] text-[13px] leading-snug text-[#17191a]/60">
            {lang === "en"
              ? "Your look for the day you can't reshoot — flawless, all-day, and truly yours."
              : "Ваш образ в день, который не переснять — безупречный, стойкий и по-настоящему ваш."}
          </p>
        </div>
      </div>

    </section>
  );
}
