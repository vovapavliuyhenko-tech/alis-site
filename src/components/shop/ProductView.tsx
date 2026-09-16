"use client";
// Страница товара (как на PALOMA): слева большое фото, справа — категория, название,
// цена, описание, счётчик количества, кнопки «В корзину»/«В избранное» и аккордеоны.
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { fmtPrice, type Product } from "@/lib/products";
import MerchMarquee from "@/components/shop/MerchMarquee";

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z" strokeLinejoin="round" />
    </svg>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#591C28]/15">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between py-4 text-left">
        <span className="text-[13px] uppercase tracking-[0.14em] text-[#2a2320]">{title}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-4 w-4 text-[#591C28] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="pb-5 text-[14px] leading-relaxed text-[#2a2320]/65">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductView({ product }: { product: Product }) {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const s = useShop();
  const [qty, setQty] = useState(1);

  return (
    <div className="relative z-10 bg-white pt-[84px] lg:pt-[100px]">
      <div className="mx-auto w-[92%] max-w-[1200px] pb-20 lg:pb-28">
        {/* Хлебные крошки */}
        <nav className="mb-6 flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-[#2a2320]/45">
          <Link href="/salon" className="transition-colors hover:text-[#591C28]">{t("Салон", "Salon")}</Link>
          <span>/</span>
          <Link href="/salon#uslugi" className="transition-colors hover:text-[#591C28]">{t("Мерч", "Merch")}</Link>
          <span>/</span>
          <span className="text-[#591C28]">{product.name[lang]}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Фото */}
          <div className="overflow-hidden rounded-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.img} alt={product.name[lang]} className="aspect-[4/5] w-full object-cover" />
          </div>

          {/* Инфо */}
          <div className="lg:py-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#591C28]">{product.tag[lang]}</p>
            <h1 className="mt-3 font-display text-[30px] uppercase leading-[1.08] tracking-[0.02em] text-[#591C28] lg:text-[42px]">
              {product.name[lang]}
            </h1>
            <p className="mt-4 font-display text-[26px] text-[#2a2320] lg:text-[30px]">{fmtPrice(product.price, en)}</p>

            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[#2a2320]/70">{product.desc[lang]}</p>

            {/* Количество + в корзину */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center justify-between rounded-2xl border border-[#591C28]/25 px-2 sm:w-[130px]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-10 items-center justify-center text-[18px] text-[#591C28]">−</button>
                <span className="w-8 text-center text-[15px] tabular-nums text-[#2a2320]">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="flex h-12 w-10 items-center justify-center text-[18px] text-[#591C28]">+</button>
              </div>
              <button
                onClick={() => { s.add(product.id, qty); s.openCart(); }}
                className="flex flex-1 items-center justify-center rounded-2xl border border-[#591C28] bg-[#591C28] px-8 py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#591C28]"
              >
                {t("В корзину", "Add to cart")}
              </button>
            </div>

            <button
              onClick={() => s.toggleFav(product.id)}
              className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border py-3.5 font-display text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                s.isFav(product.id) ? "border-[#591C28] bg-[#591C28]/10 text-[#591C28]" : "border-[#591C28]/40 text-[#591C28] hover:border-[#591C28]"
              }`}
            >
              <Heart filled={s.isFav(product.id)} />
              {s.isFav(product.id) ? t("В избранном", "In favourites") : t("В избранное", "Add to favourites")}
            </button>

            {/* Аккордеоны */}
            <div className="mt-10">
              <Accordion title={t("Что важно знать", "Good to know")}>
                {t(
                  "Фирменный мерч ÁLIS ограниченным тиражом. Уход и состав указаны на бирке. Обмен и возврат — в течение 14 дней при сохранении вида.",
                  "Limited-run ÁLIS merch. Care and materials are on the tag. Exchange and return within 14 days if the item is unused.",
                )}
              </Accordion>
              <Accordion title={t("Доставка и оплата", "Delivery & payment")}>
                {t(
                  "Забрать можно в салоне на Пархоменко, 53 или оформить доставку. Заказ подтверждаем в WhatsApp — там же согласуем оплату и способ получения.",
                  "Pick up at the salon on Parkhomenko 53 or arrange delivery. We confirm the order on WhatsApp — payment and pickup are agreed there.",
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* С этим часто покупают */}
      <MerchMarquee
        sectionId="related"
        eyebrow={{ ru: "смотреть ещё", en: "see more" }}
        title={{ ru: "С этим часто покупают", en: "Often bought together" }}
        exclude={product.id}
        catalogHref="/salon#merch"
      />
    </div>
  );
}
