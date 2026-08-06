"use client";
// HERO resayme: одно фото зеркалом слева/справа, по центру белая карточка.
// При скролле карточка плавно ОПУСКАЕТСЯ вниз и тонет в темноте (parallax).
import { useEffect, useRef } from "react";

export default function Hero() {
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
      className="relative h-svh min-h-[640px] w-full overflow-hidden bg-[#cfcbc6]"
    >
      {/* Фон: фото зеркалом */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full object-cover object-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full -scale-x-100 object-cover object-top" />
      </div>

      {/* Затемнение низа (реальный градиент resayme) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/tild6433-623_Gradient.svg)",
          backgroundSize: "100% 100%",
        }}
      />

      {/* Центральная белая карточка (опускается при скролле) */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          ref={cardRef}
          className="flex aspect-[337/443] max-h-[74svh] w-[86%] max-w-[338px] flex-col items-center justify-between bg-white px-7 py-9 text-center text-[#17191a] will-change-transform"
        >
          <p className="mx-auto max-w-[16rem] text-[13px] leading-snug">
            Бренд-дизайнер и автор курса
            <br />
            It&apos;s base — Диана Семенова
          </p>

          <div className="flex flex-1 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/tild6230-623_Resayme_logo.svg"
              alt="resayme"
              className="w-[62%] max-w-[220px]"
            />
          </div>

          <p className="mx-auto max-w-[18rem] text-[13px] leading-snug text-[#4a4a4a]">
            для тех, кто хочет рассказать свою историю и историю бренда людям,
            чтобы навсегда остаться в их сердце
          </p>
        </div>
      </div>
    </section>
  );
}
