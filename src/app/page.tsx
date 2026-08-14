import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HorizontalStory from "@/components/HorizontalStory";
import FlipGallery from "@/components/FlipGallery";
import Features from "@/components/Features";
import LookShowcaseSection from "@/components/LookShowcaseSection";
import TeamCarousel from "@/components/TeamCarousel";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import BookingWidget from "@/components/BookingWidget";
import Brands from "@/components/Brands";
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
      <About />
      <Features />
      <Brands />
      <FlipGallery />
      <LookShowcaseSection />
      <BookingWidget />
      <HorizontalStory />
      <TeamCarousel />
      <Reviews />
      <Faq />
      <Footer />
    </main>
  );
}
