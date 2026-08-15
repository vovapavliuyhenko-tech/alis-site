"use client";
// ДВА БЛОКА-ВИТРИНЫ с эффектом «шторки»: первый блок залипает (sticky), второй
// наезжает поверх него при скролле — и он ЗЕРКАЛЬНЫЙ (фото с другой стороны).
// Данные — образы ALIS и домашний уход. Двуязычно.
import LookShowcase, { type Look } from "@/components/LookShowcase";

const LOOKS: Look[] = [
  { name: { ru: "Свадебный образ", en: "Bridal look" }, price: { ru: "от 10 000 ₽", en: "from 10,000 ₽" }, big: "/assets/tild6530-383_-2___1_.jpg", card: "/assets/tild6230-643__.jpg" },
  { name: { ru: "Вечерний макияж", en: "Evening makeup" }, price: { ru: "от 5 000 ₽", en: "from 5,000 ₽" }, big: "/assets/tild3638-373_-2___1__3.jpg", card: "/assets/tild3236-393__.jpg" },
  { name: { ru: "Дневной образ", en: "Daytime look" }, price: { ru: "от 2 500 ₽", en: "from 2,500 ₽" }, big: "/assets/tild6536-613_-2___1__4.jpg", card: "/assets/tild3535-313_bergamo.png" },
  { name: { ru: "Съёмочный образ", en: "Editorial look" }, price: { ru: "от 8 000 ₽", en: "from 8,000 ₽" }, big: "/assets/tild3561-646_-2___1__5.jpg", card: "/assets/tild6436-383_fermata__1.jpg" },
];

const CARE: Look[] = [
  { name: { ru: "Противоотёчные патчи", en: "Anti-puffiness patches" }, price: { ru: "1 290 ₽", en: "1,290 ₽" }, big: "/assets/tild6230-643__.jpg", card: "/shop/prod-patches.jpg" },
  { name: { ru: "Крем SPF 50", en: "Cream SPF 50" }, price: { ru: "1 850 ₽", en: "1,850 ₽" }, big: "/assets/tild3638-373_-2___1__3.jpg", card: "/shop/prod-spf.png" },
  { name: { ru: "Альгинатная маска", en: "Alginate mask" }, price: { ru: "990 ₽", en: "990 ₽" }, big: "/assets/tild6530-383_-2___1_.jpg", card: "/shop/prod-alginate.jpg" },
  { name: { ru: "Лифтинг-маска", en: "Lifting mask" }, price: { ru: "1 450 ₽", en: "1,450 ₽" }, big: "/assets/tild6536-613_-2___1__4.jpg", card: "/shop/prod-lifting.jpg" },
];

export default function LookShowcaseSection() {
  return (
    <section id="looks" className="relative">
      {/* Блок 1 — залипает */}
      <div className="sticky top-0 z-0">
        <LookShowcase
          title={{ ru: "Образы сезона", en: "Looks of the season" }}
          subtitle={{
            ru: "Меняйтесь вместе с сезоном. Откройте для себя новые образы и премиальный уход.",
            en: "Change with the season. Discover new looks and premium care.",
          }}
          looks={LOOKS}
          href="/#online"
          cta={{ ru: "Записаться", en: "Book now" }}
        />
      </div>

      {/* Блок 2 — наезжает шторкой, зеркальный */}
      <div className="relative z-10">
        <LookShowcase
          title={{ ru: "Уход ALIS дома", en: "ALIS care at home" }}
          subtitle={{
            ru: "Та же косметика, которой мы работаем в студии — заберите домой.",
            en: "The same cosmetics we use in the studio — take them home.",
          }}
          looks={CARE}
          mirror
          href="/shop"
          cta={{ ru: "В магазин", en: "To shop" }}
        />
      </div>
    </section>
  );
}
