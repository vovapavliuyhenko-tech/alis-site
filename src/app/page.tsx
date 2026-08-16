import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HorizontalStory from "@/components/HorizontalStory";
import FlipGallery from "@/components/FlipGallery";
import Brands from "@/components/Brands";
import TeamCarousel from "@/components/TeamCarousel";
import Certificates from "@/components/Certificates";
import LookShowcaseSection from "@/components/LookShowcaseSection";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import BookingWidget from "@/components/BookingWidget";
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
      {/* 1 — Херо */}
      <Hero />
      {/* Обо мне */}
      <About />
      {/* 2 — Наши услуги */}
      <Services />
      {/* 3 — Как это работает / этапы */}
      <HorizontalStory />
      {/* 4 — Наши работы (портфолио) */}
      <FlipGallery />
      {/* Онлайн-заявка (под портфолио) */}
      <BookingWidget />
      {/* Бренды */}
      <Brands />
      {/* 5 — Мастера */}
      <TeamCarousel />
      {/* 6 — Сертификаты */}
      <Certificates />
      {/* Витрина «Образы / Уход» */}
      <LookShowcaseSection />
      {/* 7 — Отзывы */}
      <Reviews />
      {/* 8 — FAQ */}
      <Faq />
      <Footer />
    </main>
  );
}
