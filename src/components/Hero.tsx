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
const BG_PHOTO = "/assets/alis/img_5910.webp"; // волосы с гребнем ÁLIS BEAUTY (пробовали: img_2751, img_6011, img_2749, img_6048)

export default function Hero() {
  const { lang } = useLang();
  // Эффект «статичного фона»: фото уезжает медленнее страницы
  const bg = useRef<HTMLImageElement>(null);
  useHeroParallax(bg);
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  const BUTTONS = [
    { label: t("Оформить визит", "Book a visit"), note: t("Салон красоты", "Beauty salon"), href: YCLIENTS, light: true },
    { label: t("Рассчитать выезд", "Get a travel quote"), note: t("Международная beauty-команда", "International beauty team"), href: OUTCALL, light: false },
  ];

  return (
    // Белая подложка — чтобы под скруглёнными нижними углами был белый фон, как у страницы
    <div className="bg-white">
    <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-end overflow-hidden rounded-b-[28px] bg-[#d9d7d3] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={bg} src={BG_PHOTO} alt={t("Салон красоты ÁLIS BEAUTY в Новороссийске", "ÁLIS BEAUTY beauty salon, Novorossiysk")} className="absolute inset-x-0 top-0 -z-20 h-full w-full object-cover object-[50%_55%] will-change-transform" />
      {/* Затемнение: сверху — под шапку, снизу — под текст (фото светлое, текст белый) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,18,16,.32) 0%, rgba(20,18,16,0) 22%), linear-gradient(to top, rgba(20,18,16,.62) 0%, rgba(20,18,16,.22) 42%, rgba(20,18,16,0) 68%)",
        }}
      />

      <div className="flex w-full max-w-[1320px] flex-col items-center px-6 pb-[clamp(24px,4vh,48px)] text-center">
        {/* Заголовок — как на всех обложках сайта */}
        <h1 className="font-serif-display text-[22px] font-normal uppercase leading-[1.2] tracking-[0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,.25)] sm:text-[26px] lg:text-[clamp(26px,2.1vw,38px)]">
          {t("Красота там, где вы", "Beauty wherever you are")}
        </h1>
        <p className="mt-4 max-w-[620px] !text-[12.5px] leading-[1.6] text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,.35)] lg:!text-[13px]">
          {t(
            "Салон красоты ALIS BEAUTY в Новороссийске и международная команда мастеров для свадеб, съёмок и событий. ALIS BEAUTY Concierge — по России, странам СНГ и Европе.",
            "ALIS BEAUTY beauty salon in Novorossiysk and an international team of artists for weddings, shoots and events. ALIS BEAUTY Concierge — across Russia, the CIS and Europe.",
          )}
        </p>
      </div>

      {/* Две стеклянные плашки во всю ширину внизу блока (как прежняя «Оформить визит»), под каждой — подпись.
          Без мигания и свечения. */}
      <div className="grid w-full grid-cols-2 gap-2 px-3 pb-4 sm:gap-3 sm:px-4 lg:gap-4 lg:px-6 lg:pb-6">
        {BUTTONS.map((b) => (
          <div key={b.href} className="flex flex-col items-center">
            <a
              href={b.href}
              {...(b.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex w-full items-center justify-center rounded-xl border px-2 py-3 text-[10.5px] font-medium uppercase tracking-[0.08em] backdrop-blur-md transition-colors duration-300 sm:py-3.5 sm:text-[13px] sm:tracking-[0.18em] lg:py-4 lg:text-[14px] ${b.light ? "border-white bg-white text-[#17191a] hover:bg-white/[0.18] hover:text-white" : "border-white/70 bg-white/[0.18] text-white hover:border-white hover:bg-white hover:text-[#17191a]"}`}
            >
              {b.label}
            </a>
            {/* Подпись под кнопкой — тихо, без капса и контраста */}
            <span className="mt-1.5 text-[10px] tracking-[0.02em] text-white/60 sm:text-[11px]">{b.note}</span>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
