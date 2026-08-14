"use client";
// ГЕРОЙ витрины — точная копия первого экрана O'CARE: полноэкранное фото
// зелёной гель-текстуры, по центру белый serif-заголовок (Cormorant Garamond),
// подзаголовок (Geologica) и зелёная кнопка-пилюля «В каталог». Двуязычно.
import { useLang } from "@/lib/i18n";

export default function ShopHero() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <section id="shop-top" className="bg-[#F3F2EE] px-3 pt-3 lg:px-4 lg:pt-4">
      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[22px] lg:min-h-[620px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shop/hero-c.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center">
          <h1 className="ff-cormorant text-[34px] font-bold leading-[1.08] text-[#F9F7F2] lg:text-[58px]">
            {en
              ? "Care is a system, not a shelf of jars"
              : "Уход — это система, а не набор банок"}
          </h1>
          <p className="ff-geo mx-auto mt-6 max-w-[560px] text-[14px] leading-relaxed text-[#F3F2EE]/90 lg:text-[16px]">
            {en ? (
              <>We&apos;ve assembled a working <strong className="font-semibold">smart-system</strong> for a daily routine: clear steps, compatible formulas, a stable result</>
            ) : (
              <>Мы собрали работающую <strong className="font-semibold">Умную-систему</strong> для ежедневной рутины: понятные этапы, совместимые формулы, стабильный результат</>
            )}
          </p>
          <a
            href="#bestsellers"
            className="ff-geo mt-9 inline-flex items-center justify-center rounded-full bg-[#C9F0B1] px-9 py-3.5 text-[13px] font-medium text-[#2B6F2B] transition-colors duration-300 hover:bg-[#b6e79a]"
          >
            {en ? "To catalog" : "В каталог"}
          </a>
        </div>
      </div>
    </section>
  );
}
