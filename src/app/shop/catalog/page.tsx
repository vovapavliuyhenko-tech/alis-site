import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
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
      <div className="relative z-10 bg-white">
        <ShopCatalog />
      </div>
      <Footer />
    </main>
  );
}
