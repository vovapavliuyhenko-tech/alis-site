"use client";
// ФОТО-БАННЕР в ширину сайта со скруглением: фото с мягким параллаксом (движется
// медленнее страницы), затемнение снизу, по центру внизу — подпись, заголовок и
// «стеклянная» кнопка. Используется в магазине (сертификат) и на главной (консьерж-сервис).
// stacked — вариант для главной («Выездной сервис»): надзаголовок и заголовок НАД плашкой,
// текст и кнопка ПОД ней; в плашку можно поставить фото или видео (video — путь к .mp4,
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
}: {
  photo: string;
  text?: Loc;
  video?: string;
  stacked?: boolean;
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
    if (!el || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const r = el.parentElement!.getBoundingClientRect();
      const p = r.top + r.height / 2 - innerHeight / 2;
      el.style.transform = `translate3d(0, ${-p * 0.2}px, 0)`;
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
        <div className="r-reveal mx-auto w-[92%] max-w-[980px] text-center">
          <p className="!text-[30px] font-light uppercase leading-[1.1] tracking-[0.04em] text-[#17191a] sm:!text-[40px] lg:!text-[56px]">{label[lang]}</p>
          <h2 className="mt-5 !text-[18px] !font-light !leading-[1.45] text-[#17191a] lg:mt-6 lg:!text-[24px]">{title[lang]}</h2>
        </div>
        {/* Широкая плашка: видео (если задано) или фото, с тем же параллаксом */}
        <div className="relative mx-auto mt-10 h-[56svh] min-h-[360px] w-[96%] max-w-[1760px] overflow-hidden rounded-[12px] lg:mt-14 lg:h-[70svh]">
          {video ? (
            <video src={video} poster={photo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img ref={img} src={photo} alt={title[lang]} loading="lazy" className="absolute left-0 top-[-25%] h-[150%] w-full object-cover will-change-transform" />
          )}
        </div>
        <div className="r-reveal mx-auto mt-8 flex w-[92%] max-w-[680px] flex-col items-center text-center lg:mt-10">
          {text && <p className="!text-[15px] leading-[1.6] text-[#17191a]/80 lg:!text-[16px]">{text[lang]}</p>}
          <a
            href={button.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-7 inline-flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] px-10 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:w-auto"
          >
            {button.label[lang]}
          </a>
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
