"use client";
// HERO главной (правки заказчицы): светлое нейтральное фото на весь экран, крупный заголовок
// «Красота там, где вы», подпись мелко и две стеклянные плашки-кнопки с подписями под ними.
// Без мигания и свечения. Верхнюю навигацию несёт глобальная шапка (светлая над этим блоком).
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { useHeroParallax } from "@/lib/useHeroParallax";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const OUTCALL = "/concierge#booking"; // «Рассчитать выезд» — форма заявки консьерж-сервиса

// Проба светлого кадра (заказчица хочет посмотреть, как будет на светлом). Прежнее фото:
// "/assets/alis/img_2745.jpg"
const BG_PHOTO = "/assets/alis/img_2751.jpg";

export default function Hero() {
  const { lang } = useLang();
  // Эффект «статичного фона»: фото уезжает медленнее страницы
  const bg = useRef<HTMLImageElement>(null);
  useHeroParallax(bg);
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const BUTTONS = [
    { label: t("Оформить визит", "Book a visit"), note: t("Салон красоты", "Beauty salon"), href: YCLIENTS },
    { label: t("Рассчитать выезд", "Get a travel quote"), note: t("Международная beauty-команда", "International beauty team"), href: OUTCALL },
  ];

  return (
    // Белая подложка — чтобы под скруглёнными нижними углами был белый фон, как у страницы
    <div className="bg-white">
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-end overflow-hidden rounded-b-[28px] bg-[#d9d7d3] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={bg} src={BG_PHOTO} alt={t("Салон красоты ÁLIS BEAUTY в Новороссийске", "ÁLIS BEAUTY beauty salon, Novorossiysk")} className="absolute inset-x-0 top-0 -z-20 h-full w-full object-cover object-[50%_30%] will-change-transform" />
      {/* Затемнение: сверху — под шапку, снизу — под текст (фото светлое, текст белый) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.32) 0%, rgba(20,18,16,0) 22%), linear-gradient(to top, rgba(20,18,16,.62) 0%, rgba(20,18,16,.22) 42%, rgba(20,18,16,0) 68%)",
        }}
      />

      <div className="flex w-full max-w-[1100px] flex-col items-center px-5 pb-[clamp(32px,7vh,80px)] text-center">
        <h1 className="font-serif-display text-[30px] font-normal uppercase leading-[1.1] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.3)] sm:text-[40px] lg:text-[clamp(44px,4vw,68px)]">
          {t("Красота там, где вы", "Beauty wherever you are")}
        </h1>
        <p className="mt-4 max-w-[640px] !text-[13px] leading-[1.6] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,.35)] lg:mt-5 lg:!text-[14px]">
          {t(
            "Салон красоты ALIS BEAUTY в Новороссийске и международная команда мастеров для свадеб, съёмок и событий. ALIS BEAUTY Concierge — по России, странам СНГ и Европе.",
            "ALIS BEAUTY beauty salon in Novorossiysk and an international team of artists for weddings, shoots and events. ALIS BEAUTY Concierge — across Russia, the CIS and Europe.",
          )}
        </p>

        {/* Две плашки-кнопки, под каждой — подпись. Без анимации свечения. */}
        <div className="mt-8 grid w-full max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10">
          {BUTTONS.map((b) => (
            <div key={b.href} className="flex flex-col items-center">
              <a
                href={b.href}
                {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex w-full items-center justify-center rounded-xl border border-white/70 bg-white/[0.16] py-3.5 text-[12.5px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#17191a] lg:py-4 lg:text-[13px]"
              >
                {b.label}
              </a>
              <span className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/80">{b.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
