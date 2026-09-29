"use client";
// ФОТО-БАННЕР в ширину сайта со скруглением: фото с мягким параллаксом (движется
// медленнее страницы), затемнение снизу, по центру внизу — подпись, заголовок и
// «стеклянная» кнопка. Используется в магазине (сертификат) и на главной (консьерж-сервис).
import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

export default function PhotoBanner({
  photo,
  label,
  title,
  button,
}: {
  photo: string;
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

  return (
    <section className="bg-white section-y">
      <div className="relative mx-auto flex h-[70svh] min-h-[480px] w-[96%] max-w-[1760px] items-end justify-center overflow-hidden rounded-[12px] text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} src={photo} alt={title[lang]} loading="lazy" className="absolute left-0 top-[-25%] -z-0 h-[150%] w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="r-reveal relative z-10 max-w-[560px] px-6 pb-12 lg:pb-16">
          <p className="text-[12px] text-white/75">{label[lang]}</p>
          <h2 className="mt-3 !text-[26px] !font-light text-white lg:!text-[34px]">{title[lang]}</h2>
          <a
            href={button.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-7 inline-flex items-center justify-center rounded-[12px] border border-white/70 bg-white/15 px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#17191a]"
          >
            {button.label[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
