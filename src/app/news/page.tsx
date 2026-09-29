import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import { NewsGrid } from "@/components/news/NewsView";

export const metadata: Metadata = {
  title: "Новости — ÁLIS BEAUTY",
  description: "Новости салона красоты и консьерж-сервиса ÁLIS BEAUTY в Новороссийске.",
};

// Страница «Новости» — по образцу блога paloma.website: обложка, рубрики, сетка карточек
export default function NewsPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <TeamIntro title={{ ru: "Новости", en: "News" }} photo="/assets/alis/img_6011.jpg" />
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        <NewsGrid />
      </div>
      <Footer />
    </main>
  );
}
