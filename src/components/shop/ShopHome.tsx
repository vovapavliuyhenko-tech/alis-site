"use client";
// СТРАНИЦА «МАГАЗИН» — структура и анимации по референсу aurorebrand.com (Made on Tilda),
// оформление — в стиле ÁLIS BEAUTY: наши ширины (96% / 1760px), ритм .section-y,
// скругления 12px, заголовки обычным регистром, бордовые кнопки, ч/б.
// Блоки: «Новинки» (слайдер с точками) → категории (мозаика) → все товары (сетка) →
// баннер коллекции → «образ» (фото + слайдер товаров со стрелками) → о бренде
// (фото с крупным логотипом, выезжающим при прокрутке) → лента фото соцсети.
// Тексты — только уже согласованные. Фото — временные.
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoWord } from "@/components/Logo";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { PRODUCTS, fmtPrice, type Product } from "@/lib/products";

type Loc = { ru: string; en: string };

/* ---------- Шапка блока: заголовок слева, ссылка справа ---------- */
function Head({ title, link }: { title: Loc; link?: { label: Loc; href: string } }) {
  const { lang } = useLang();
  return (
    <div className="r-reveal mb-8 flex items-baseline justify-between gap-6 lg:mb-10">
      <h2 className="text-[#17191a]">{title[lang]}</h2>
      {link && (
        <a href={link.href} className="group shrink-0 text-[13px] text-[#17191a]/60 transition-colors hover:text-[#17191a]">
          {link.label[lang]} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
}

/* ---------- Карточка товара: фото, избранное, название и цена ---------- */
function Card({ p, ratio = "aspect-[3/4]" }: { p: Product; ratio?: string }) {
  const { lang } = useLang();
  const s = useShop();
  const fav = s.isFav(p.id);
  return (
    <div className="group relative">
      <Link href={`/product/${p.id}`} draggable={false} className="block overflow-hidden rounded-[12px] bg-[#f2f1ee]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          alt={p.name[lang]}
          draggable={false}
          loading="lazy"
          className={`${ratio} w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]`}
        />
      </Link>
      <button
        type="button"
        onClick={() => s.toggleFav(p.id)}
        aria-label={lang === "en" ? "Favourite" : "В избранное"}
        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-colors ${fav ? "text-[#46131E]" : "text-[#17191a]"}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="flex items-baseline justify-between gap-3 px-1 pt-3 text-[#242424]">
        <Link href={`/product/${p.id}`} className="truncate text-[14px] lg:text-[15px]">{p.name[lang]}</Link>
        <span className="shrink-0 whitespace-nowrap text-[13px] text-[#17191a]/60 lg:text-[14px]">{fmtPrice(p.price, lang === "en")}</span>
      </div>
    </div>
  );
}

/* ---------- 1. «Новинки»: слайдер по 4 карточки, точки-пагинация ---------- */
export function ShopNew() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const upd = () => {
      setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05)));
      setPage(Math.round(el.scrollLeft / el.clientWidth));
    };
    upd();
    el.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    return () => { el.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); };
  }, []);

  const go = (i: number) => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" });

  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <Head title={{ ru: "Новинки", en: "New in" }} link={{ label: { ru: "Все товары", en: "All products" }, href: "#all" }} />
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((p) => (
            <div key={p.id} className="r-reveal w-[70%] shrink-0 snap-start sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-48px)/4)]">
              <Card p={p} />
            </div>
          ))}
        </div>
        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}`}
                onClick={() => go(i)}
                className={`h-[6px] rounded-full transition-all duration-500 ${i === page ? "w-8 bg-[#17191a]" : "w-[6px] bg-[#17191a]/20 hover:bg-[#17191a]/40"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- 2. Категории: мозаика — большая слева, 2×2 справа ---------- */
const CATS: { tag: string; label: Loc; img: string }[] = [
  { tag: "одежда", label: { ru: "Одежда", en: "Apparel" }, img: "/assets/tild6530-383_-2___1_.jpg" },
  { tag: "аксессуары", label: { ru: "Аксессуары", en: "Accessories" }, img: "/assets/tild6230-643__.jpg" },
  { tag: "дом", label: { ru: "Для дома", en: "Home" }, img: "/assets/tild3561-646_-2___1__5.jpg" },
  { tag: "уход", label: { ru: "Уход", en: "Care" }, img: "/assets/tild6536-613_-2___1__4.jpg" },
  { tag: "подарок", label: { ru: "Подарочный сертификат", en: "Gift certificate" }, img: "/assets/alis/img_1855.jpg" },
];

export function ShopCategories() {
  const { lang } = useLang();
  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-2 gap-3 lg:h-[680px] lg:grid-cols-[1.35fr_1fr_1fr] lg:grid-rows-2 lg:gap-4">
        {CATS.map((c, i) => {
          const gift = c.tag === "подарок";
          return (
            <a
              key={c.tag}
              href={gift ? "https://o8981.yclients.ru/certificates" : "#all"}
              {...(gift ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`r-reveal group relative overflow-hidden rounded-[12px] bg-[#f2f1ee] ${i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-1 lg:row-span-2 lg:aspect-auto" : "aspect-[3/4] lg:aspect-auto"} ${i === 4 ? "col-span-2 aspect-[16/9] lg:col-span-1 lg:aspect-auto" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-x-5 top-5 flex items-start justify-between text-white lg:inset-x-6 lg:top-6">
                <span className="text-[16px] lg:text-[18px]">{c.label[lang]}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-[#17191a]">↗</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- 3. Все товары: сетка 4 колонки ---------- */
export function ShopAll() {
  return (
    <section id="all" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <Head title={{ ru: "Все товары", en: "All products" }} />
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="r-reveal">
              <Card p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Баннер коллекции: фото во всю ширину, текст и кнопка по центру ---------- */
export function ShopCollection() {
  const { lang } = useLang();
  const img = useRef<HTMLImageElement>(null);
  // Лёгкий параллакс фото при прокрутке
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = img.current;
      if (el) {
        const r = el.parentElement!.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.transform = `translate3d(0, ${p * -60}px, 0) scale(1.12)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section className="bg-white section-y">
      <div className="relative mx-auto flex h-[70svh] min-h-[480px] w-[96%] max-w-[1760px] items-end justify-center overflow-hidden rounded-[12px] text-center text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} src="/assets/alis/img_2746.jpg" alt="" loading="lazy" className="absolute inset-0 -z-0 h-full w-full object-cover will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="r-reveal relative z-10 max-w-[560px] px-6 pb-12 lg:pb-16">
          <p className="text-[12px] text-white/75">{lang === "en" ? "ÁLIS BEAUTY merch" : "Мерч ÁLIS BEAUTY"}</p>
          <h2 className="mt-3 !text-[26px] !font-light text-white lg:!text-[34px]">
            {lang === "en" ? "A little ÁLIS BEAUTY to take home" : "Немного ÁLIS BEAUTY — с собой"}
          </h2>
          <a
            href="#all"
            className="mt-7 inline-flex items-center justify-center rounded-[12px] border border-white/70 bg-white/15 px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[#17191a]"
          >
            {lang === "en" ? "To the catalogue" : "В каталог"}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Образ: большое фото слева, справа слайдер товаров со стрелками ---------- */
export function ShopLook() {
  const { lang } = useLang();
  const s = useShop();
  const items = PRODUCTS.slice(0, 3);
  const [i, setI] = useState(0);
  const p = items[i];
  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-3 lg:h-[640px] lg:grid-cols-[1.5fr_1fr] lg:gap-4">
        <div className="r-reveal relative min-h-[360px] overflow-hidden rounded-[12px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/alis/img_2745.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="r-reveal flex flex-col items-center justify-center rounded-[12px] bg-[#f4f3f1] px-8 py-12">
          <div className="relative aspect-[3/4] w-[62%] max-w-[300px] overflow-hidden rounded-[12px] bg-white">
            {items.map((it, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={it.id}
                src={it.img}
                alt={it.name[lang]}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${k === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href={`/product/${p.id}`} className="text-[15px] text-[#17191a] hover:text-[#46131E]">{p.name[lang]}</Link>
            <p className="mt-1 text-[14px] text-[#17191a]/60">{fmtPrice(p.price, lang === "en")}</p>
            <button
              type="button"
              onClick={() => { s.add(p.id, 1); s.openCart(); }}
              className="mt-3 border-b border-[#17191a]/30 pb-0.5 text-[13px] text-[#17191a] transition-colors hover:border-[#46131E] hover:text-[#46131E]"
            >
              {lang === "en" ? "Add to cart (+)" : "В корзину (+)"}
            </button>
          </div>
          <div className="mt-8 flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                aria-label={d < 0 ? "←" : "→"}
                onClick={() => setI((x) => (x + d + items.length) % items.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17191a]/25 text-[#17191a] transition-colors hover:border-[#46131E] hover:bg-[#46131E] hover:text-white"
              >
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. О бренде: текст + фото с крупным логотипом, выезжающим при прокрутке ---------- */
export function ShopAbout() {
  const { lang } = useLang();
  const box = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const b = box.current;
      if (b && word.current) {
        const r = b.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
        word.current.style.transform = `translate3d(${(0.5 - p) * 30}%, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <Head title={{ ru: "О бренде", en: "About the brand" }} link={{ label: { ru: "Подробнее о нас", en: "More about us" }, href: "/salon" }} />
        <p className="r-reveal max-w-[760px] text-[15px] leading-[1.6] text-[#17191a]/65 lg:text-[16px]">
          {lang === "en"
            ? "I wanted to bring together people who burn with their craft and creativity, with pure souls and open hearts, who can see your inner beauty and connect it with the outer. — Dayana Tarzyan, founder"
            : "«Мне хотелось объединить людей, горящих своим делом и творчеством, с чистой душой и открытым сердцем, которые смогут увидеть и соединить вашу внутреннюю красоту с внешней». — Дайана Тарзян, основательница"}
        </p>
        <div ref={box} className="relative mt-8 h-[60svh] min-h-[420px] overflow-hidden rounded-[12px] lg:mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/alis/img_6009.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <div ref={word} className="absolute inset-x-0 bottom-[6%] flex justify-center will-change-transform">
            <LogoWord variant="cream" className="h-auto w-[86%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Лента фото соцсети ---------- */
const FEED = ["/assets/alis/img_2751.jpg", "/assets/alis/img_2749.jpg", "/assets/alis/img_6011.jpg", "/assets/alis/img_3283.jpg", "/assets/alis/img_8578.jpg"];

export function ShopFeed() {
  const { lang } = useLang();
  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <Head
          title={{ ru: "Салон красоты: @alisbeauty.ru", en: "Beauty salon: @alisbeauty.ru" }}
          link={{ label: { ru: "Смотреть", en: "View" }, href: "https://www.instagram.com/alisbeauty.ru" }}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {FEED.map((src, i) => (
            <a
              key={src}
              href="https://www.instagram.com/alisbeauty.ru"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === "en" ? "Open profile" : "Открыть профиль"}
              className={`r-reveal group relative block overflow-hidden rounded-[12px] ${i === 4 ? "hidden lg:block" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover transition-[transform,filter] duration-700 group-hover:scale-[1.05] group-hover:blur-[3px]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
