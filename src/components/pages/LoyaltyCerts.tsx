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

  // Пункты лояльности по брифу — кликабельные, с пояснением (тексты пояснений — на согласование)
  const PERKS: { t: Loc; d: Loc }[] = [
    { t: { ru: "500 ₽ на первый визит", en: "500 ₽ on your first visit" }, d: { ru: "Оставьте номер — бонусы уже будут на счёте, когда вы придёте.", en: "Leave your number — the bonuses will be in your account when you come." } },
    { t: { ru: "Подарок в день рождения", en: "A birthday gift" }, d: { ru: "Поздравим вас с днём рождения подарком от салона — подробности расскажет администратор.", en: "We'll celebrate your birthday with a gift from the salon — the administrator will tell you more." } },
    { t: { ru: "Бонус за подругу", en: "A bonus for a friend" }, d: { ru: "Посоветуйте ÁLIS BEAUTY подруге — бонусы получите вы обе.", en: "Recommend ÁLIS BEAUTY to a friend — you both get bonuses." } },
  ];
  const [perk, setPerk] = useState<number | null>(null);

  const TILES: { title: Loc; note: Loc }[] = [
    { title: { ru: "Бонусы постоянным", en: "Regulars' bonuses" }, note: { ru: "Копятся с каждым визитом.", en: "They add up with every visit." } },
    { title: { ru: "Особые условия", en: "Special terms" }, note: { ru: "Для своих — раньше всех и на лучших условиях.", en: "For our regulars — first in line, on the best terms." } },
  ];

  return (
    <section id="loyalty" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{t("Красота, которая возвращается бонусами", "Beauty that comes back as bonuses")}</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:min-h-[560px] lg:grid-cols-3 lg:grid-rows-2 lg:gap-4">
          {/* Лояльность — высокая оливковая карточка слева */}
          <div className="r-reveal col-span-2 flex flex-col justify-between rounded-[12px] bg-[#17191a] p-6 text-[#f4efe6] sm:min-h-[320px] sm:p-8 lg:col-span-1 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:p-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f4efe6]/60">
                {t("программа лояльности", "loyalty programme")}
              </p>
              {/* div, а не p — чтобы общее «мобильное» уменьшение текста не трогало крупную цифру */}
              <div className="mt-4 font-display text-[64px] leading-none tracking-[0.01em] sm:mt-6 lg:text-[72px]"><CountUp to={500} /> ₽</div>
              <p className="mt-2 text-[12px] text-[#f4efe6]/80 sm:text-[15px]">{t("бонусных рублей на первый визит", "bonus roubles on your first visit")}</p>
              <ul className="mt-5 border-t border-white/12 sm:mt-8">
                {PERKS.map((p, k) => {
                  const on = perk === k;
                  return (
                    <li key={p.t.ru} className="border-b border-white/12">
                      <button type="button" onClick={() => setPerk(on ? null : k)} aria-expanded={on} className="flex w-full items-center justify-between gap-3 py-3 text-left text-[12.5px] text-[#f4efe6] sm:py-3.5 sm:text-[14.5px]">
                        {p.t[lang]}
                        <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/30 text-[14px] leading-none transition-transform duration-300 ${on ? "rotate-45 bg-white text-[#17191a]" : ""}`}>+</span>
                      </button>
                      <div className={`grid transition-all duration-400 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <p className="overflow-hidden pb-0 !text-[11.5px] leading-[1.55] text-[#f4efe6]/65 sm:!text-[13px]">
                          <span className="block pb-3.5">{p.d[lang]}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-[12px] py-3.5 font-display text-[11px] uppercase tracking-[0.14em] sm:mt-8 sm:py-4 sm:text-[13px] sm:tracking-[0.16em] border border-white/70 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a]"
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
            className="group relative col-span-2 min-h-[200px] scroll-mt-28 overflow-hidden rounded-[12px] sm:min-h-[240px] lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:min-h-0"
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
            <span className="absolute right-4 top-4 flex h-9 w-9 sm:right-6 sm:top-6 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/50 text-[16px] text-white transition-all duration-300 group-hover:border-transparent group-data-[on]:border-transparent group-hover:bg-[#f4efe6] group-data-[on]:bg-[#f4efe6] group-hover:text-[#17191a] group-data-[on]:text-[#17191a]">
              <span className="transition-transform duration-300 group-hover:-rotate-45 group-data-[on]:-rotate-45">→</span>
            </span>
            <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 opacity-0 sm:text-[11px] transition-opacity duration-300 group-hover:opacity-100 group-data-[on]:opacity-100">{t("подарок", "a gift")}</p>
              <h3 className="mt-2 font-display text-[22px] uppercase leading-[1.15] tracking-[0.02em] text-white lg:text-[26px]">
                {t("Подарочный сертификат ÁLIS BEAUTY", "ÁLIS BEAUTY gift certificate")}
              </h3>
              <p className="mt-1.5 max-w-md !text-[10.5px] leading-relaxed text-white/80 opacity-0 sm:mt-2 lg:!text-[13px] transition-opacity duration-300 group-hover:opacity-100 group-data-[on]:opacity-100">
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
              className={`group flex min-h-[130px] flex-col justify-between gap-4 rounded-[12px] border border-[#17191a]/15 bg-white p-4 sm:min-h-[160px] sm:p-7 shadow-[0_24px_60px_-28px_rgba(23,25,26,0.22)] lg:min-h-0 ${
                i === 0 ? "lg:col-start-2 lg:row-start-2" : "lg:col-start-3 lg:row-start-2"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17191a] font-display text-[12px] text-white sm:h-10 sm:w-10 sm:text-[14px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[17px] uppercase leading-[1.2] tracking-[0.02em] text-[#17191a] lg:text-[19px]">
                  {/* в одну строку и чуть мельче на телефоне/планшете */}
                  <span className="whitespace-nowrap text-[clamp(11px,3.2vw,13px)] lg:text-[length:inherit]">{tile.title[lang]}</span>
                </h3>
                <p className="mt-1.5 !text-[10.5px] leading-relaxed text-[#17191a]/70 sm:mt-2 lg:!text-[13px]">
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
