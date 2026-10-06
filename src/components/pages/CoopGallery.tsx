"use client";
// ГАЛЕРЕЯ «5 РАМОК» (страница «Сотрудничество») — фото или видео работ для бизнеса.
// Компьютер: одна большая рамка слева и четыре справа (2×2). Телефон: первая во всю
// ширину, остальные — по две в ряд. Если src заканчивается на .mp4/.webm — это видео
// (без звука, по кругу). Рамки слегка приближаются при наведении.
// TODO: фото/видео пришлёт заказчица — пока стоят снимки, которые уже есть на сайте.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
const FRAMES: { src: string; alt: Loc }[] = [
  { src: "/assets/alis/img_6048.jpg", alt: { ru: "Работа команды ÁLIS BEAUTY на мероприятии", en: "ÁLIS BEAUTY team at an event" } },
  { src: "/assets/alis/img_2745.jpg", alt: { ru: "Образ для съёмки — ÁLIS BEAUTY", en: "A look for a shoot — ÁLIS BEAUTY" } },
  { src: "/assets/alis/img_1834.jpg", alt: { ru: "Образ гостьи — ÁLIS BEAUTY", en: "A guest's look — ÁLIS BEAUTY" } },
  { src: "/assets/alis/img_2455.jpg", alt: { ru: "Макияж для показа — ÁLIS BEAUTY", en: "Show makeup — ÁLIS BEAUTY" } },
  { src: "/assets/alis/img_0569.jpg", alt: { ru: "Подготовка гостей — ÁLIS BEAUTY", en: "Getting guests ready — ÁLIS BEAUTY" } },
];

const isVideo = (s: string) => /\.(mp4|webm)$/i.test(s);

export default function CoopGallery() {
  const { lang } = useLang();
  return (
    <section id="gallery" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-2 gap-2 sm:gap-3 lg:h-[620px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
        {FRAMES.map((f, i) => (
          <div
            key={f.src}
            className={`r-reveal group relative overflow-hidden rounded-[20px] ${
              i === 0 ? "col-span-2 aspect-[4/3] lg:col-span-2 lg:row-span-2 lg:aspect-auto" : "aspect-[4/5] lg:aspect-auto"
            }`}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {isVideo(f.src) ? (
              <video src={f.src} autoPlay muted loop playsInline aria-label={f.alt[lang]} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.src} alt={f.alt[lang]} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
