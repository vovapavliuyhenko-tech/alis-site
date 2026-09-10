"use client";
// БЛОК-ЛЕНТА на главной — фотографии разных размеров бегут сами (авто-скролл),
// минимальный зазор между кадрами, пауза при наведении. Бесшовный цикл через две
// одинаковые дорожки (как «Нам доверяют»). Двуязычно.
import { useLang } from "@/lib/i18n";

// Кадры одного формата — единый портретный размер, минимальный зазор.
const ITEMS: string[] = [
  "/assets/tild6230-643__.jpg",
  "/assets/tild3236-393__.jpg",
  "/assets/tild6530-383_-2___1_.jpg",
  "/assets/tild3638-373_-2___1__3.jpg",
  "/assets/tild3561-646_-2___1__5.jpg",
  "/assets/tild6536-613_-2___1__4.jpg",
  "/shop/ss-portrait.jpg",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="marquee flex shrink-0 group-hover:[animation-play-state:paused]">
      {ITEMS.map((src, i) => (
        <li key={i} className="mr-2 aspect-[3/4] h-[320px] shrink-0 lg:mr-3 lg:h-[440px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" draggable={false} className="h-full w-full rounded-[14px] object-cover" />
        </li>
      ))}
    </ul>
  );
}

export default function PhotoMarquee() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section className="overflow-hidden rounded-t-[40px] bg-white py-24 lg:py-32">
      <div className="r-reveal mx-auto mb-12 w-[94%] max-w-[1440px] lg:mb-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {en ? "gallery" : "галерея"}
        </span>
        <h2 className="mt-5 font-display text-[28px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-[#3B0D1A] lg:text-[42px]">
          {en ? "The ÁLIS atmosphere" : "Атмосфера ÁLIS"}
        </h2>
      </div>

      <div className="group flex overflow-hidden">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
