import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
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
      <div className="relative z-10 bg-white">
      {/* 1 — Херо */}
      <Hero />
      {/* Метка конца первого блока — после неё у шапки появляется подложка */}
      <div id="hero-end" aria-hidden className="h-0" />
      {/* Обо мне */}
      <About />
      {/* Нам доверяют (бренды) */}
      <Brands />
      {/* FAQ */}
      <Faq />
      </div>
      <Footer />
    </main>
  );
}
