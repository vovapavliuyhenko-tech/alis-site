"use client";
// ГЕРОЙ страницы «Команда» — по образцу главного экрана PALOMA: полноэкранное
// фоновое фото, по центру крупное слово «КОМАНДА». При скролле слово плавно
// увеличивается и растворяется (как на paloma.website), фон чуть наезжает.
// Снизу — широкая бордовая кнопка-пилюля с hover-эффектом «матовое стекло».
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
  const wordRef = useRef<HTMLHeadingElement>(null);

  // Скролл-эффект PALOMA: слово масштабируется вверх и растворяется; фон чуть зумит.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = secRef.current;
        if (!sec) return;
        const h = sec.offsetHeight || window.innerHeight;
        const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / h));
        if (wordRef.current) {
          wordRef.current.style.transform = `scale(${(1 + p * 0.7).toFixed(4)})`;
          wordRef.current.style.opacity = `${Math.max(0, 1 - p * 1.15).toFixed(4)}`;
        }
        if (bgRef.current) bgRef.current.style.transform = `scale(${(1 + p * 0.18).toFixed(4)})`;
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
      {/* Фоновое фото + лёгкий зум при скролле */}
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

      {/* Центр — крупное слово (масштаб/растворение на скролле) */}
      <div className="flex flex-1 items-center justify-center px-4 text-center">
        <h1
          ref={wordRef}
          className="origin-center font-serif-display font-light uppercase leading-[0.95] tracking-[0.02em] text-white will-change-transform [text-shadow:0_2px_40px_rgba(0,0,0,.25)]"
          style={{ fontSize: "clamp(22px,4.6vw,72px)", fontWeight: 300 }}
        >
          {t("Команда", "Team")}
        </h1>
      </div>

      {/* Низ — широкая бордовая кнопка-пилюля; hover — матовое стекло, как на главной */}
      <div className="px-4 pb-4 lg:px-5 lg:pb-5">
        <a
          href="#vacancies"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-transparent bg-[#46131E] px-8 py-5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#F4F1EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:text-white hover:backdrop-blur-md lg:text-[14px]"
        >
          {t("Смотреть вакансии", "See vacancies")}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
