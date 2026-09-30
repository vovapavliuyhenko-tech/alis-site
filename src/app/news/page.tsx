import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { NewsGrid } from "@/components/news/NewsView";

export const metadata: Metadata = {
  alternates: { canonical: "/news" },
  title: "Новости — ÁLIS BEAUTY",
  description: "Новости салона красоты и консьерж-сервиса ÁLIS BEAUTY в Новороссийске.",
};

// Страница «Новости» — по образцу блога paloma.website: без обложки и рубрик — сразу сетка карточек
export default function NewsPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white page-end">
        <NewsGrid />
      </div>
      <Footer />
    </main>
  );
}
