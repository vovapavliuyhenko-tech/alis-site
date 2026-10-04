"use client";
// БЛОК «ЛОЯЛЬНОСТЬ + СЕРТИФИКАТЫ» (страница «Салон») — bento-сетка в стиле блока
// услуг: слева высокая оливковая карточка лояльности (500 бонусных рублей и привилегии), справа
// сверху широкая карточка подарочного сертификата с фото (зум + раскрытие на
// наведении), снизу два бежевых тайла бонусов. Тексты по AIDA. Двуязычно.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import CountUp from "@/components/ui/CountUp";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const CERT_PHOTO = "/assets/alis/img_1855.jpg";

type Loc = { ru: string; en: string };

export default function LoyaltyCerts() {
  const { lang } = useLang();
  // Телефон/планшет (нет наведения): карточка сертификата в центре экрана включает эффект hover
  const cert = useRef<HTMLAnchorElement>(null);
  const [certOn, setCertOn] = useState(false);
  useEffect(() => {
    const el = cert.current;
    if (!el || matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(([e]) => setCertOn(e.isIntersecting), { rootMargin: "-35% 0px -35% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const PERKS: Loc[] = [
    { ru: "бонусы постоянным гостям", en: "perks for regular guests" },
    { ru: "особые условия для своих", en: "special terms for regulars" },
    { ru: "приятные сюрпризы к визитам", en: "little surprises with each visit" },
  ];

  const TILES: { title: Loc; note: Loc }[] = [
    { title: { ru: "Бонусы постоянным", en: "Regulars' bonuses" }, note: { ru: "Копятся с каждым визитом.", en: "They add up with every visit." } },
    { title: { ru: "Особые условия", en: "Special terms" }, note: { ru: "Для своих — раньше всех и на лучших условиях.", en: "For our regulars — first in line, on the best terms." } },
  ];

  return (
    <section id="loyalty" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:h-[560px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          {/* Лояльность — высокая оливковая карточка слева */}
          <div className="r-reveal flex min-h-[320px] flex-col justify-between rounded-[12px] bg-[#17191a] p-8 text-[#f4efe6] sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:p-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f4efe6]/60">
                {t("программа лояльности", "loyalty programme")}
              </p>
              <p className="mt-6 font-display text-[64px] leading-none tracking-[0.01em] lg:text-[72px]"><CountUp to={500} /> ₽</p>
              <p className="mt-2 text-[15px] text-[#f4efe6]/80">{t("бонусных рублей на первый визит", "bonus roubles on your first visit")}</p>
              <ul className="mt-8 flex flex-col gap-3 text-[14px] text-[#f4efe6]/85">
                {PERKS.map((p) => (
                  <li key={p.ru} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4efe6]/70" />
                    {p[lang]}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="alis-pulse mt-8 flex w-full items-center justify-center rounded-[12px] py-4 font-display text-[13px] uppercase tracking-[0.16em] border border-white/70 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a]"
            >
              {t("Оформить визит", "Book a visit")}
            </a>
          </div>

          {/* Сертификат — широкая карточка с фото сверху справа */}
          <a
            href="https://o8981.yclients.ru/certificates"
            target="_blank"
            rel="noopener noreferrer"
            id="certificates"
            ref={cert}
            data-on={certOn ? "" : undefined}
            className="group relative min-h-[240px] scroll-mt-28 overflow-hidden rounded-[12px] sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:min-h-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={CERT_PHOTO}
              alt={lang === "en" ? "ÁLIS BEAUTY gift certificate" : "Подарочный сертификат ÁLIS BEAUTY"}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-out group-hover:scale-105 group-data-[on]:scale-105 group-hover:blur-md group-data-[on]:blur-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 transition-colors duration-500 group-hover:from-black/80 group-data-[on]:from-black/80" />
            <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-[16px] text-white transition-all duration-300 group-hover:border-transparent group-data-[on]:border-transparent group-hover:bg-[#f4efe6] group-data-[on]:bg-[#f4efe6] group-hover:text-[#17191a] group-data-[on]:text-[#17191a]">
              <span className="transition-transform duration-300 group-hover:-rotate-45 group-data-[on]:-rotate-45">→</span>
            </span>
            <div className="absolute inset-x-6 bottom-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[on]:opacity-100">{t("подарок", "a gift")}</p>
              <h3 className="mt-2 font-display text-[22px] uppercase leading-[1.15] tracking-[0.02em] text-white lg:text-[26px]">
                {t("Подарочный сертификат ÁLIS BEAUTY", "ÁLIS BEAUTY gift certificate")}
              </h3>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[on]:opacity-100">
                {t(
                  "Любая услуга или сумма. Лучший способ подарить заботу — и точно не промахнуться.",
                  "Any service or amount. The best way to gift care — and never miss.",
                )}
              </p>
            </div>
          </a>

          {/* Два бежевых тайла бонусов */}
          {TILES.map((tile, i) => (
            <div
              key={tile.title.ru}
              className={`group flex min-h-[160px] flex-col justify-between rounded-[12px] border border-[#17191a]/15 bg-white p-7 shadow-[inset_3px_0_0_#46131E,0_24px_60px_-28px_rgba(23,25,26,0.22)] lg:min-h-0 ${
                i === 0 ? "lg:col-start-2 lg:row-start-2" : "lg:col-start-3 lg:row-start-2"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17191a] font-display text-[14px] text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[17px] uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[19px]">
                  {tile.title[lang]}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#17191a]/70">
                  {tile.note[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
