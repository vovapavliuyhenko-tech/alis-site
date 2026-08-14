"use client";
// БЛОГ — копия блока O'CARE «Делимся секретами красоты…»: заголовок Cormorant,
// 4 карточки статей (фото сверху, дата, заголовок, короткий текст) и ссылка
// «Читать все статьи». Бежевый фон, зелёные акценты, шрифт Geologica. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Post = { title: Loc; excerpt: Loc; date: string; img: string };

const POSTS: Post[] = [
  {
    title: { ru: "Что такое обезвоженная кожа и как её отличить от сухой?", en: "What is dehydrated skin and how to tell it from dry?" },
    excerpt: { ru: "Сухая и обезвоженная кожа — эти термины, несмотря на сходство, имеют разные значения. Сухость — это…", en: "Dry and dehydrated skin — despite the similarity, these terms mean different things. Dryness is…" },
    date: "28.09.2025",
    img: "/shop/blog-1.jpg",
  },
  {
    title: { ru: "Жирный блеск и расширенные поры: как привести кожу в норму", en: "Oily shine and enlarged pores: how to balance your skin" },
    excerpt: { ru: "Жирный блеск на лице — знакомая проблема для многих, особенно в Т-зоне (лоб, нос, подбородок)…", en: "Oily shine is a familiar problem for many, especially in the T-zone (forehead, nose, chin)…" },
    date: "28.09.2025",
    img: "/shop/blog-2.jpg",
  },
  {
    title: { ru: "Сухая кожа лица: причины и правильный уход", en: "Dry facial skin: causes and the right care" },
    excerpt: { ru: "Сухая кожа — это не просто ощущение стянутости после умывания. Этот тип кожи характеризуется…", en: "Dry skin is not just a feeling of tightness after cleansing. This skin type is characterised by…" },
    date: "28.09.2025",
    img: "/shop/blog-3.jpg",
  },
  {
    title: { ru: "Как правильно подобрать уходовую косметику для разных типов кожи", en: "How to choose skincare for different skin types" },
    excerpt: { ru: "Выбор ухода за кожей начинается с понимания, какой тип кожи у вас. Как и в случае с одеждой…", en: "Choosing skincare starts with understanding your skin type. As with clothing…" },
    date: "28.09.2025",
    img: "/shop/blog-4.jpg",
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
    <section id="blog" className="scroll-mt-24 bg-[#F3F2EE] py-20 lg:py-28">
      <div className="mx-auto w-[92%] max-w-[1200px]">
        <h2 className="ff-cormorant mb-3 max-w-3xl text-[30px] font-bold leading-[1.1] text-[#1c1c1c] lg:text-[46px]">
          {en
            ? "We share beauty secrets and tell you about the brand’s news"
            : "Делимся секретами красоты и рассказываем о новинках бренда"}
        </h2>

        <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POSTS.map((p, i) => (
            <a
              key={p.title.ru}
              href="#blog"
              className="ff-geo group block transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "none" : "translateY(24px)",
                transitionDelay: started ? `${i * 80}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-[16px] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.title[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 text-[16px] font-medium leading-snug text-[#1c1c1c] transition-colors group-hover:text-[#2B6F2B]">
                {p.title[lang]}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#1c1c1c]/55">{p.excerpt[lang]}</p>
              <p className="mt-3 text-[12px] text-[#1c1c1c]/40">{p.date}</p>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#blog"
            className="ff-geo inline-flex items-center justify-center rounded-full bg-[#C9F0B1] px-9 py-3.5 text-[13px] font-medium text-[#2B6F2B] transition-colors duration-300 hover:bg-[#b6e79a]"
          >
            {en ? "Read all articles" : "Читать все статьи"}
          </a>
        </div>
      </div>
    </section>
  );
}
