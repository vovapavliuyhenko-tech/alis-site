"use client";
// ГЕРОЙ страницы «Команда» — по образцу главного экрана PALOMA: полноэкранное
// фоновое фото, по центру гигантское слово «КОМАНДА», под ним строка-тег из трёх
// слов, снизу широкая кнопка-пилюля. Фон плавно увеличивается (зум) при скролле.
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

// Фото — заменить на съёмку/видео команды. object-cover, тянется на весь экран.
const BG_PHOTO = "/assets/alis/img_6009.jpg";

export default function TeamIntro() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const secRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  // Зум фона при скролле: масштаб растёт от 1 до ~1.35 по мере ухода героя вверх.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = secRef.current;
        const bg = bgRef.current;
        if (!sec || !bg) return;
        const h = sec.offsetHeight || window.innerHeight;
        const progress = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / h));
        bg.style.transform = `scale(${(1 + progress * 0.35).toFixed(4)})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={secRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#3a3631] text-white"
    >
      {/* Фоновое фото + зум при скролле */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bgRef}
        src={BG_PHOTO}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full origin-center object-cover object-center will-change-transform"
      />
      {/* Лёгкое затемнение для читаемости белого текста */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,.12) 30%, rgba(20,18,16,.12) 62%, rgba(20,18,16,.34) 100%)",
        }}
      />

      {/* Центр — гигантское слово + строка-тег */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif-display font-normal uppercase leading-[0.92] tracking-[0.01em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,.25)]" style={{ fontSize: "clamp(52px,13.5vw,210px)" }}>
          {t("Команда", "Team")}
        </h1>
        <div className="mt-4 flex w-full max-w-[min(760px,82vw)] items-center justify-between text-[clamp(13px,2.2vw,30px)] font-light lowercase tracking-[0.02em] text-white/95 lg:mt-6">
          <span>{t("мастерство", "craft")}</span>
          <span>{t("сервис", "service")}</span>
          <span>{t("забота", "care")}</span>
        </div>
      </div>

      {/* Низ — широкая кнопка-пилюля во всю ширину */}
      <div className="px-4 pb-4 lg:px-5 lg:pb-5">
        <a
          href="#vacancies"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/95 px-8 py-5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#1c1a18] backdrop-blur-sm transition-colors duration-300 hover:bg-white lg:text-[14px]"
        >
          {t("Смотреть вакансии", "See vacancies")}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
