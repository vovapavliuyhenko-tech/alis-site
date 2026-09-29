import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import { ShopNew, ShopCategories, ShopAll, ShopCollection, ShopLook, ShopAbout, ShopFeed } from "@/components/shop/ShopHome";

// Страница «Магазин» — мерч ÁLIS BEAUTY. Структура и анимации — по главной
// aurorebrand.com, оформление — в стиле нашего сайта. Фото — временные.
export default function ShopPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      {/* 1 — Обложка с заголовком страницы, как на остальных страницах (фото временное) */}
      <TeamIntro title={{ ru: "Магазин", en: "Shop" }} photo="/assets/tild6530-383_-2___1_.jpg" />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <ShopNew />
        <ShopCategories />
        <ShopAll />
        <ShopCollection />
        <ShopLook />
        <ShopAbout />
        <ShopFeed />
      </div>
      <Footer />
    </main>
  );
}
