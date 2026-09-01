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
      {/* 1 — Херо */}
      <Hero />
      {/* Контентный лист со скруглённым верхом наезжает на герой */}
      <div className="relative -mt-9 overflow-hidden rounded-t-[40px] rounded-b-[40px] bg-white shadow-[0_-18px_44px_rgba(0,0,0,0.14),0_18px_44px_rgba(0,0,0,0.14)]">
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
