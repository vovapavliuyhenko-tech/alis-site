import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FlipGallery from "@/components/FlipGallery";
import Brands from "@/components/Brands";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <Preloader />
      <SmoothScroll />
      <ScrollReveal />
      <Header />
      {/* Контент едет поверх футера — эффект «шторки» при скролле */}
      <div className="relative z-10">
      {/* 1 — Херо закреплён сверху; контент наезжает на него шторкой */}
      <div className="sticky top-0 z-0">
        <Hero />
      </div>
      {/* Контентный лист со скруглённым верхом наезжает шторкой на герой */}
      <div className="relative z-10 -mt-9 overflow-hidden rounded-t-[40px] bg-white shadow-[0_-18px_44px_rgba(0,0,0,0.14)]">
        {/* Метка конца первого блока — после неё у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />
        {/* Обо мне */}
        <About />
        {/* Наши работы (портфолио) — прогрев результатом */}
        <FlipGallery />
        {/* Нам доверяют (бренды) */}
        <Brands />
        {/* FAQ */}
        <Faq />
      </div>
      </div>
      <Footer />
    </main>
  );
}
