import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import ShopCatalog from "@/components/shop/ShopCatalog";

// Каталог магазина — открывается только со страницы «Магазин» (в меню и подвале ссылки нет)
export const metadata: Metadata = {
  title: "Каталог магазина — ÁLIS BEAUTY",
  description: "Мерч и уход ÁLIS BEAUTY: одежда, аксессуары, товары для дома и уход.",
  alternates: { canonical: "/shop/catalog" },
};

export default function CatalogPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* Обложка, как на остальных страницах (фото временное) */}
      <TeamIntro title={{ ru: "Каталог", en: "Catalogue" }} kicker={{ ru: "Магазин ÁLIS BEAUTY", en: "ÁLIS BEAUTY shop" }} photo="/assets/alis/img_1834.jpg" />
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <ShopCatalog />
      </div>
      <Footer />
    </main>
  );
}
