"use client";
// ТИПЫ СРЕДСТВ. По мотивам витрины O'CARE: сетка фото-плиток с подписями и ссылкой
// «Все товары». Стиль ALIS: скруглённые карточки, ч/б→цвет и подъём при наведении,
// serif-подписи, scroll-reveal каскадом. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
type Tile = { label: Loc; photo: string };

const TILES: Tile[] = [
  { label: { ru: "Сыворотки", en: "Serums" }, photo: "/assets/tild6230-643__.jpg" },
  { label: { ru: "Кремы", en: "Creams" }, photo: "/assets/tild3236-393__.jpg" },
  { label: { ru: "Патчи", en: "Patches" }, photo: "/assets/tild3535-313_bergamo.png" },
  { label: { ru: "Тканевые маски", en: "Sheet masks" }, photo: "/assets/tild6436-383_fermata__1.jpg" },
  { label: { ru: "Альгинатные маски", en: "Alginate masks" }, photo: "/assets/tild6530-383_-2___1_.jpg" },
  { label: { ru: "Пилинги", en: "Peels" }, photo: "/assets/tild3561-646_-2___1__5.jpg" },
  { label: { ru: "Для умывания", en: "Cleansers" }, photo: "/assets/tild6561-356_fermata__2.jpg" },
  { label: { ru: "SPF", en: "SPF" }, photo: "/assets/tild3638-373_-2___1__3.jpg" },
];

export default function ProductTypes() {
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
    <section id="types" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-block rounded-full bg-[#4E2126] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]">
              {en ? "types" : "витрина"}
            </span>
            <h2 className="mt-4 font-serif text-[32px] leading-[1.05] text-[#17191a] lg:text-[46px]">
              {en ? "Choose by what your skin needs" : "Выберите по типу средства"}
            </h2>
          </div>
          <a
            href="#bestsellers"
            className="text-[12px] uppercase tracking-[0.16em] text-[#17191a]/55 underline underline-offset-8 transition-colors hover:text-[#4E2126]"
          >
            {en ? "All products" : "Все товары"}
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {TILES.map((t, i) => (
            <a
              key={t.label.ru}
              href="#bestsellers"
              className="group block transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "none" : "translateY(26px)",
                transitionDelay: started ? `${i * 70}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] shadow-[0_10px_30px_rgba(23,25,26,0.08)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt={t.label[lang]}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[800ms] ease-out group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-serif text-[18px] leading-tight text-[#f4efe6] lg:text-[21px]">
                  {t.label[lang]}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
