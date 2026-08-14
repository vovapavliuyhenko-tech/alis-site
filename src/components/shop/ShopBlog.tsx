"use client";
// БЛОГ. По мотивам O'CARE: «Делимся секретами красоты …» + карточки статей с
// датой и «Читать все статьи». Стиль ALIS: белые карточки-статьи, фото сверху,
// serif-заголовки, подъём при наведении, scroll-reveal. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Post = { title: Loc; excerpt: Loc; date: string; photo: string };

const POSTS: Post[] = [
  {
    title: { ru: "Обезвоженная кожа: как отличить от сухой", en: "Dehydrated skin: how to tell it from dry" },
    excerpt: { ru: "Сухость и обезвоженность звучат похоже, но требуют разного ухода. Разбираем признаки.", en: "Dryness and dehydration sound alike but need different care. We break down the signs." },
    date: "28.09.2025",
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    title: { ru: "Жирный блеск и расширенные поры", en: "Oily shine and enlarged pores" },
    excerpt: { ru: "Как привести Т-зону в норму и надолго убрать блеск без пересушивания.", en: "How to balance the T-zone and remove shine for longer without over-drying." },
    date: "28.09.2025",
    photo: "/assets/tild3561-646_-2___1__5.jpg",
  },
  {
    title: { ru: "Сухая кожа лица: причины и уход", en: "Dry facial skin: causes and care" },
    excerpt: { ru: "Стянутость — не норма. Что вызывает сухость и как выстроить рутину.", en: "Tightness isn't normal. What causes dryness and how to build a routine." },
    date: "28.09.2025",
    photo: "/assets/tild3535-313_bergamo.png",
  },
  {
    title: { ru: "Как подобрать уход под тип кожи", en: "How to match care to your skin type" },
    excerpt: { ru: "Выбор ухода начинается с понимания типа кожи. Простой ориентир для старта.", en: "Care starts with knowing your skin type. A simple guide to begin." },
    date: "28.09.2025",
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

export default function ShopBlog() {
  const { lang } = useLang();
  const en = lang === "en";
  const [started, setStarted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="blog" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
              {en ? "blog" : "блог"}
            </span>
            <h2 className="mt-4 max-w-xl font-serif text-[32px] leading-[1.05] text-[#17191a] lg:text-[46px]">
              {en ? "Beauty secrets and brand news" : "Делимся секретами красоты и новинками"}
            </h2>
          </div>
          <a
            href="#blog"
            className="text-[12px] uppercase tracking-[0.16em] text-[#17191a]/55 underline underline-offset-8 transition-colors hover:text-[#4E2126]"
          >
            {en ? "All articles" : "Читать все статьи"}
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POSTS.map((p, i) => (
            <a
              key={p.title.ru}
              href="#blog"
              className="group block transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "none" : "translateY(26px)",
                transitionDelay: started ? `${i * 80}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] shadow-[0_10px_30px_rgba(23,25,26,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photo}
                  alt={p.title[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-[#17191a]/40">{p.date}</p>
              <h3 className="mt-2 font-serif text-[19px] leading-snug text-[#17191a] transition-colors group-hover:text-[#4E2126]">
                {p.title[lang]}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#17191a]/55">{p.excerpt[lang]}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
