"use client";
// МАГАЗИН — первый блок (вариант E «товар выпрыгивает из фото»): скруглённый фото-баннер, из-за его
// верхнего края «выходит» крупный товар-хит с мягкой тенью (эффект объёма). Товары сменяют друг друга
// каждые 3 с (плавно: уходит вниз и растворяется → новый поднимается). По нижнему краю баннера —
// белая «таблетка» с категориями (как шапка сайта). Фото баннера временное — пришлёт Зера.
// HairCta — плашка «Подобрать уход за 30 секунд» (сейчас скрыта на странице).
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { HairQuiz } from "@/components/shop/ShopBlocks";

const BANNER_PHOTO = "/assets/alis/salon_cup_flatlay.jpg";
const HEROES = [
  { src: "/assets/cutouts/rg-argan-shampoo.png", name: "Real Argan Repairing Shampoo" },
  { src: "/assets/cutouts/dv-oi-oil.png", name: "Davines OI Oil" },
  { src: "/assets/cutouts/luvu-lip-gloss-berry-kiss.png", name: "LUVU Lip Gloss Berry Kiss" },
  { src: "/assets/cutouts/rg-shea-shampoo.png", name: "Real Shea Nourishing Shampoo" },
  { src: "/assets/cutouts/rg-rosemary-shampoo.png", name: "Cold Brew Rosemary Scalp Shampoo" },
];
const PILLS: { ru: string; en: string; href: string }[] = [
  { ru: "Все", en: "All", href: "/shop/catalog" },
  { ru: "Уход", en: "Care", href: "/shop/catalog?cat=%D1%83%D1%85%D0%BE%D0%B4" },
  { ru: "Мерч", en: "Merch", href: "/shop/catalog?cat=%D0%BE%D0%B4%D0%B5%D0%B6%D0%B4%D0%B0" },
  { ru: "Подарочный бокс", en: "Gift box", href: "#box" },
  { ru: "Сертификаты", en: "Certificates", href: "https://o8981.yclients.ru/certificates" },
];

export function ShopBanner() {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % HEROES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-white pb-[clamp(56px,7vw,104px)] pt-[84px] min-[1280px]:pt-[96px]">
      <div className="relative mx-auto w-[96%] max-w-[1760px]">
        {/* Товар-герой: выходит над верхним краем баннера */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 z-20 h-[230px] w-[200px] -translate-x-1/2 sm:h-[300px] sm:w-[260px] lg:h-[400px] lg:w-[340px]">
          {HEROES.map((h, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={h.src}
              src={h.src}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-bottom transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] [filter:drop-shadow(0_28px_30px_rgba(0,0,0,.35))]"
              style={{ opacity: k === i ? 1 : 0, transform: k === i ? "translateY(0) scale(1)" : "translateY(24px) scale(.94)" }}
            />
          ))}
        </div>

        {/* Фото-баннер */}
        <div className="relative mt-[120px] overflow-hidden rounded-[22px] sm:mt-[150px] sm:rounded-[28px] lg:mt-[190px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BANNER_PHOTO} alt="" className="h-[300px] w-full object-cover sm:h-[360px] lg:h-[420px]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-12 text-center sm:pb-14 lg:pb-16">
            <h1 className="mx-auto max-w-[900px] font-serif-display text-[clamp(15px,4.2vw,19px)] font-normal uppercase leading-[1.25] tracking-[0.04em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,.3)] sm:text-[22px] lg:text-[28px]">
              {lang === "en"
                ? "The products ÁLIS BEAUTY specialists work with, plus merch and accessories"
                : "Средства, которыми работают специалисты ÁLIS BEAUTY, а также мерч и аксессуары"}
            </h1>
            <p key={i} className="mt-3 animate-[shop-hero-in_.8s_ease_both] text-[11px] uppercase tracking-[0.16em] text-white/70">{HEROES[i].name}</p>
          </div>
        </div>

        {/* Таблетка категорий — «наезжает» на нижний край баннера */}
        <nav aria-label={lang === "en" ? "Shop sections" : "Разделы магазина"} className="relative z-10 mx-auto -mt-7 flex w-fit max-w-[calc(100%-24px)] gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-[0_14px_40px_-18px_rgba(23,25,26,0.35)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PILLS.map((p, k) => (
            <a
              key={p.ru}
              href={p.href}
              {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:px-6 sm:text-[12px] ${k === 0 ? "bg-[#17191a] text-white" : "text-[#17191a]/70 hover:bg-[#f6f4f1] hover:text-[#17191a]"}`}
            >
              {p[lang]}
            </a>
          ))}
        </nav>
      </div>
      <style>{`@keyframes shop-hero-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}

export function HairCta() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-4 rounded-[14px] border border-[#17191a]/12 px-5 py-4 text-left text-[11px] uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-500 hover:border-[#17191a] hover:bg-[#17191a] hover:text-white sm:px-7 sm:py-5 sm:text-[12px]"
        >
          <span>{lang === "en" ? "Find your hair care in 30 seconds with a consultant" : "Подобрать уход для волос за 30 секунд с консультантом"}</span>
          <span aria-hidden className={`text-[16px] transition-transform duration-500 ${open ? "rotate-45" : "group-hover:translate-x-1.5"}`}>{open ? "+" : "→"}</span>
        </button>
      </div>
      <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">{open && <HairQuiz />}</div>
      </div>
    </div>
  );
}
