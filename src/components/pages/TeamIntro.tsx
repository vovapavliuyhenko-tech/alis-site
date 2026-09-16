"use client";
// ГЕРОЙ страницы «Команда» — как главный экран PALOMA (Tilda «Zoom cover»):
// секция высокая, внутри — ЗАЛИПАЮЩИЙ (sticky) экран с фоном, логотипом и кнопкой.
// Пока прокручиваешь высоту секции, фон стоит, а логотип опускается вниз,
// увеличивается «во всю» и растворяется. Снизу — бордовая кнопка (hover-стекло).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { LogoLockup } from "@/components/Logo";

// Фото — заменить на съёмку/видео команды. object-cover, тянется на весь экран.
const BG_PHOTO = "/assets/alis/img_6009.jpg";

export default function TeamIntro() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const secRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Прогресс прокрутки внутри высокой секции (пока экран залипает).
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = secRef.current;
        if (!sec) return;
        const total = sec.offsetHeight - window.innerHeight || 1;
        const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / total));
        if (logoRef.current) {
          const scale = (1 + p * 1.6).toFixed(4); // увеличение «во всю»
          const shift = (p * 26).toFixed(2); // опускается вниз (в % высоты)
          logoRef.current.style.transform = `translateY(${shift}%) scale(${scale})`;
          logoRef.current.style.opacity = `${Math.max(0, 1 - p * 1.05).toFixed(4)}`;
        }
        if (bgRef.current) bgRef.current.style.transform = `scale(${(1 + p * 0.22).toFixed(4)})`;
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
    <section ref={secRef} className="relative bg-[#3a3631] text-white" style={{ height: "200svh" }}>
      {/* Залипающий экран: фон + логотип + кнопка */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Фоновое фото + лёгкий зум при скролле */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={bgRef}
          src={BG_PHOTO}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 h-full w-full origin-center object-cover object-center will-change-transform"
        />
        {/* Лёгкое затемнение для читаемости светлого логотипа */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,18,16,.38) 0%, rgba(20,18,16,.12) 30%, rgba(20,18,16,.12) 62%, rgba(20,18,16,.34) 100%)",
          }}
        />

        {/* Центр — логотип ÁLIS BEAUTY с надписью «команда» сверху */}
        <div className="flex flex-1 items-center justify-center px-4 text-center">
          <div ref={logoRef} className="origin-center flex flex-col items-center will-change-transform">
            <span className="mb-6 text-[11px] font-light uppercase tracking-[0.4em] text-white/90 lg:mb-8">
              {t("команда", "team")}
            </span>
            <LogoLockup variant="cream" className="brightness-0 invert drop-shadow-[0_2px_40px_rgba(0,0,0,.25)]" />
          </div>
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
      </div>
    </section>
  );
}
