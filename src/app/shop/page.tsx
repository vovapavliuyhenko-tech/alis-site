import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import { ShopStory, ShopPick, ShopTrend } from "@/components/shop/ShopShowcase";

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
      {/* 1 — Обложка с заголовком страницы, как на остальных страницах (фото временное) */}
      <TeamIntro title={{ ru: "Магазин", en: "Shop" }} kicker={{ ru: "Немного ÁLIS BEAUTY — с собой", en: "A little ÁLIS BEAUTY to take away" }} photo="/assets/tild6530-383_-2___1_.jpg" button={{ label: { ru: "Смотреть каталог", en: "View the catalogue" }, href: "/shop/catalog" }} />

      {/* Маркер конца обложки — после него у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        {/* Блоки по образцу dogguo-shop.tilda.ws: фото-история, категории, новинки */}
        <ShopStory />
        <ShopPick />
        <ShopTrend />
      </div>
      <Footer />
    </main>
  );
}
