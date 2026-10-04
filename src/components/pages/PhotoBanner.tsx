"use client";
// ФОТО-БАННЕР в ширину сайта со скруглением: фото с мягким параллаксом (движется
// медленнее страницы), затемнение снизу, по центру внизу — подпись, заголовок и
// «стеклянная» кнопка. Используется в магазине (сертификат) и на главной (консьерж-сервис).
// stacked — вариант для главной («Выездной сервис»): надзаголовок и заголовок НАД плашкой,
// текст и кнопка — внутри плашки внизу; в плашку можно поставить фото или видео (video — путь к .mp4,
// photo тогда служит обложкой видео).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function PhotoBanner({
  photo,
  label,
  title,
  button,
  text,
  video,
  stacked = false,
  titleLines,
}: {
  photo: string;
  text?: Loc;
  video?: string;
  stacked?: boolean;
  // Телефон: заголовок ровно по этим строкам (размер подстраивается под ширину экрана)
  titleLines?: { ru: string[]; en: string[] };
  label: Loc;
  title: Loc;
  button: { label: Loc; href: string };
}) {
  const { lang } = useLang();
  const img = useRef<HTMLImageElement>(null);
  const external = button.href.startsWith("http");

  // Параллакс: фото смещается на 20% от прокрутки — мягкий эффект «статичного фона»
  // На телефонах (сенсорный экран) параллакс выключен: прокрутка там идёт мимо JS и фото дёргалось.
  // На компьютере цикл крутится только пока баннер в кадре.
  useEffect(() => {
    const el = img.current;
    // Эффект «статичного фона» — и на компьютере, и на телефоне (на сенсорных чуть слабее)
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const k = matchMedia("(pointer: fine)").matches ? 0.2 : 0.16;
    let raf = 0;
    const tick = () => {
      const r = el.parentElement!.getBoundingClientRect();
      const p = r.top + r.height / 2 - innerHeight / 2;
      el.style.setProperty("transform", `translate3d(0, ${-p * k}px, 0)`);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el.parentElement!);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  if (stacked) {
    return (
      <section className="bg-white section-y">
        <div className="r-reveal mx-auto w-[92%] max-w-[720px] text-center">
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#17191a]/60">{label[lang]}</p>
          <h2 className="mt-3 text-[#17191a]">
            {titleLines ? (
              <>
                <span className="block text-[clamp(12.5px,4vw,16px)] leading-[1.35] sm:hidden">
                  {titleLines[lang].map((l, i) => (
                    <span key={i} className="block whitespace-nowrap">{l}</span>
                  ))}
                </span>
                <span className="hidden sm:inline">{title[lang]}</span>
              </>
            ) : (
              title[lang]
            )}
          </h2>
        </div>
        {/* Плашка во всю ширину экрана, скругление как у первого блока (28px): видео (если задано) или фото, с тем же параллаксом; текст и кнопка — внутри, внизу */}
        <div className="relative mt-10 flex h-[60svh] min-h-[420px] w-full items-end justify-center overflow-hidden rounded-[28px] text-center text-white lg:mt-14 lg:h-[70svh]">
          {video ? (
            <video src={video} poster={photo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img ref={img} src={photo} alt={title[lang]} loading="lazy" className="absolute left-0 top-[-25%] h-[150%] w-full object-cover will-change-transform" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div data-fab-avoid className="r-reveal relative z-10 max-w-[520px] px-6 pb-10 lg:pb-14">
            {text && <p className="!text-[11px] leading-[1.55] text-white/90 sm:!text-[13px] sm:leading-[1.6] [text-shadow:0_1px_12px_rgba(0,0,0,.35)] lg:!text-[14px]">{text[lang]}</p>}
            <a
              href={button.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-6 inline-flex items-center justify-center whitespace-nowrap rounded-[12px] border border-white bg-white px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.1em] sm:px-10 sm:text-[12px] sm:tracking-[0.16em] text-[#17191a] backdrop-blur-md transition-colors duration-300 hover:bg-white/15 hover:text-white"
            >
              {button.label[lang]}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white section-y">
      <div className="relative mx-auto flex h-[70svh] min-h-[480px] w-[96%] max-w-[1760px] items-end justify-center overflow-hidden rounded-[12px] text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} src={photo} alt={title[lang]} loading="lazy" className="absolute left-0 top-[-25%] -z-0 h-[150%] w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div data-fab-avoid className="r-reveal relative z-10 max-w-[560px] px-6 pb-12 lg:pb-16">
          <p className="text-[12px] text-white/75">{label[lang]}</p>
          <h2 className="mt-3 !text-[26px] !font-light text-white lg:!text-[34px]">{title[lang]}</h2>
          <a
            href={button.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="alis-pulse mt-7 inline-flex items-center justify-center rounded-[12px] border border-white/70 bg-white/15 px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#17191a]"
          >
            {button.label[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
