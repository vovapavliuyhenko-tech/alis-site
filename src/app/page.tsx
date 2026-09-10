import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceBento from "@/components/pages/ServiceBento";
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
      <Hero />
      <div className="relative z-10 bg-white">
        {/* Метка конца первого блока — после неё у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />
        {/* Услуги — bento-галерея категорий */}
        <ServiceBento />
        {/* Наши работы (портфолио) — прогрев результатом */}
        <FlipGallery />
        {/* Нам доверяют (бренды) */}
        <Brands />
        {/* FAQ */}
        <Faq />
      </div>
      <Footer />
    </main>
  );
}
