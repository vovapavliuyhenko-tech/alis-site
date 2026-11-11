import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockLabel from "@/components/ui/BlockLabel";
import ScrollReveal from "@/components/ScrollReveal";
import { ShopCategories } from "@/components/shop/ShopBlocks";
import { ShopBanner, HairCta } from "@/components/shop/ShopIntro";
import { ShopTrend } from "@/components/shop/ShopShowcase";
import BoxBuilder from "@/components/shop/BoxBuilder";

// Страница «Магазин» — мерч ÁLIS BEAUTY. Структура и анимации — по главной
// aurorebrand.com, оформление — в стиле нашего сайта. Фото — временные.
export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* По видео заказчицы: узкая плашка-баннер вместо обложки → категории → «Подобрать уход за 30 секунд» → бокс */}
      <ShopBanner />
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <BlockLabel ru="Категории" en="Categories" />
        <ShopCategories />
        {/* Коллекция — карточки товаров, как было */}
        <ShopTrend />
        <HairCta />
        <BoxBuilder />
      </div>
      <Footer />
    </main>
  );
}
