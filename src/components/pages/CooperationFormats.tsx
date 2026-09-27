"use client";
// БЛОК «ДЛЯ КОГО» (страница «Сотрудничество»): два раздела — «Частным лицам» (#private)
// и «Агентствам и бизнесу» (#business), на них ведут пункты меню. Две фото-панели
// одинаковой ширины (без раздвижения). Эффекты:
//  • появление — фото открывается «шторкой» снизу и плавно отдаляется, заголовок
//    выезжает по буквам;
//  • наведение — фото мягко следует за курсором (параллакс), за курсором идёт мягкий
//    свет, снизу проявляется кнопка заявки со «стеклом».
// TODO: тексты — из коммерческого предложения; фото — пришлёт заказчица. Ч/б. Двуязычно.
import { Fragment, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };

const AUDIENCES: { id: string; title: Loc; img: string }[] = [
  { id: "private", title: { ru: "Частным лицам", en: "For individuals" }, img: "/assets/alis/img_2746.jpg" },
  { id: "business", title: { ru: "Агентствам и бизнесу", en: "For agencies & business" }, img: "/assets/alis/e12b89f7-f193-44ac-9015-777b094a0bcd.jpg" },
];

function Panel({ a, i }: { a: (typeof AUDIENCES)[number]; i: number }) {
  const { lang } = useLang();
  const ref = useRef<HTMLAnchorElement>(null);
  const [shown, setShown] = useState(false);

  // Появление при прокрутке
  useEffect(() => {
    // Наблюдаем за родителем: сама панель скрыта clip-path, и браузер считает её невидимой
    const el = ref.current?.parentElement;
    if (!el) return;
    // Уже на экране при загрузке (например, переход по якорю) — показываем сразу
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Параллакс и свет за курсором — через CSS-переменные, без перерисовки React
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--px", `${(0.5 - x) * 18}px`);
    el.style.setProperty("--py", `${(0.5 - y) * 18}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  };

  const words = a.title[lang].split(" ");
  const starts = words.map((_, wi) => words.slice(0, wi).join("").length + wi);
  const delay = i * 180;

  return (
    <a
      ref={ref}
      id={a.id}
      href="#request"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative isolate flex h-[320px] scroll-mt-28 flex-col justify-end overflow-hidden rounded-[12px] bg-[#17191a] text-white lg:h-[min(400px,48vh)]"
      style={{
        clipPath: shown ? "inset(0 0 0 0 round 12px)" : "inset(100% 0 0 0 round 12px)",
        transition: `clip-path 1.2s cubic-bezier(.7,0,.2,1) ${delay}ms`,
      }}
    >
      {/* Фото: отдаляется при появлении, следует за курсором */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={a.img}
        alt=""
        loading="lazy"
        className="absolute inset-[-24px] -z-20 h-[calc(100%+48px)] w-[calc(100%+48px)] max-w-none object-cover [filter:blur(0px)] group-hover:[filter:blur(10px)]"
        style={{
          transform: `translate3d(var(--px,0px), var(--py,0px), 0) scale(${shown ? 1 : 1.25})`,
          transition: `transform 1.6s cubic-bezier(.2,.7,.2,1) ${shown ? delay : 0}ms, filter .8s ease`,
        }}
      />
      {/* Затемнение + свет за курсором */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      <div
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.16), transparent 60%)" }}
      />

      {/* Номер и стрелка */}
      <div className="absolute inset-x-7 top-7 flex items-start justify-between lg:inset-x-10 lg:top-10">
        <span className="font-serif-display text-[12px] tracking-[0.14em] text-white/70">{String(i + 1).padStart(2, "0")}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-md transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-[#17191a]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <div className="p-7 lg:p-10">
        {/* Заголовок выезжает по буквам */}
        <h2
          aria-label={a.title[lang]}
          className="font-serif-display text-[20px] font-normal uppercase leading-[1.15] tracking-[0.03em] lg:text-[clamp(20px,1.6vw,26px)]"
        >
          {/* Слова не переносятся посередине: буквы сгруппированы по словам */}
          {words.map((w, wi) => (
            <Fragment key={wi}>{wi > 0 ? " " : ""}<span aria-hidden className="inline-block whitespace-nowrap">
              {[...w].map((ch, k) => {
                const n = starts[wi] + k;
                return (
                  <span key={k} className="inline-block overflow-hidden align-bottom">
                    <span
                      className="inline-block"
                      style={{
                        transform: shown ? "translateY(0)" : "translateY(110%)",
                        transition: `transform .9s cubic-bezier(.2,.7,.2,1) ${delay + 500 + n * 28}ms`,
                      }}
                    >
                      {ch}
                    </span>
                  </span>
                );
              })}
            </span></Fragment>
          ))}
        </h2>

        {/* Минималистичная ссылка вместо кнопки: тонкая линия, которая вытягивается на наведении */}
        <span className="mt-3 inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.2em] text-white/75 transition-colors duration-500 group-hover:text-white lg:mt-4 lg:text-[11px]">
          <span className="h-px w-6 bg-current transition-all duration-700 ease-out group-hover:w-12" />
          {lang === "en" ? "Leave a request" : "Оставить заявку"}
        </span>
      </div>
    </a>
  );
}

export default function CooperationFormats() {
  return (
    <section className="bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {AUDIENCES.map((a, i) => (
          <Panel key={a.id} a={a} i={i} />
        ))}
      </div>
    </section>
  );
}
