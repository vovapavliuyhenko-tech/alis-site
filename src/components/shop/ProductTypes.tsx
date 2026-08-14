"use client";
// ТИПЫ СРЕДСТВ — копия блока O'CARE: горизонтальный ряд круглых фото-плиток с
// подписями (Сыворотки, Кремы, Патчи, Тканевые маски, Альгинатные маски, Пилинги,
// Для умывания, SPF). Бежевый фон, шрифт Geologica. Двуязычно.
import { useLang } from "@/lib/i18n";

type Loc = { ru: string; en: string };
const TYPES: { label: Loc; img: string }[] = [
  { label: { ru: "Сыворотки", en: "Serums" }, img: "/shop/type-1.jpg" },
  { label: { ru: "Кремы", en: "Creams" }, img: "/shop/type-2.jpg" },
  { label: { ru: "Патчи", en: "Patches" }, img: "/shop/type-3.jpg" },
  { label: { ru: "Тканевые маски", en: "Sheet masks" }, img: "/shop/type-4.jpg" },
  { label: { ru: "Альгинатные маски", en: "Alginate masks" }, img: "/shop/type-5.jpg" },
  { label: { ru: "Пилинги", en: "Peels" }, img: "/shop/type-6.jpg" },
  { label: { ru: "Для умывания", en: "Cleansers" }, img: "/shop/type-7.jpg" },
  { label: { ru: "SPF", en: "SPF" }, img: "/shop/type-8.jpg" },
];

export default function ProductTypes() {
  const { lang } = useLang();
  return (
    <section id="types" className="scroll-mt-24 bg-[#F3F2EE] pt-16 pb-8 lg:pt-24 lg:pb-12">
      <div className="mx-auto w-[94%] max-w-[1280px]">
        <div className="hide-scrollbar flex justify-start gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-8 md:gap-3 md:overflow-visible lg:gap-5">
          {TYPES.map((t) => (
            <a key={t.label.ru} href="#bestsellers" className="group flex w-[38%] shrink-0 flex-col items-center text-center sm:w-[24%] md:w-auto">
              <div className="aspect-square w-full overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt={t.label[lang]}
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <span className="ff-geo mt-4 text-[14px] font-medium text-[#1c1c1c] transition-colors group-hover:text-[#2B6F2B] lg:text-[15px]">
                {t.label[lang]}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
