import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HorizontalStory from "@/components/HorizontalStory";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
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
      <Projects />
      <Services />
      {/* Плавный мостик: тёмное → кремовое */}
      <div aria-hidden className="h-40 bg-gradient-to-b from-[#17191a] to-[#f4efe6]" />
      <Booking />
      <HorizontalStory />
      {/* Плавный мостик: кремовое → тёмное */}
      <div aria-hidden className="h-40 bg-gradient-to-b from-[#f4efe6] to-[#17191a]" />
      <Brands />
      <Footer />
    </main>
  );
}
