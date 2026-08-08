import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ConciergeTeaser from "@/components/ConciergeTeaser";
import About from "@/components/About";
import HorizontalStory from "@/components/HorizontalStory";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
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
      <ConciergeTeaser />
      <About />
      <Brands />
      <Projects />
      <Services />
      <Reviews />
      <Booking />
      <HorizontalStory />
      <Footer />
    </main>
  );
}
