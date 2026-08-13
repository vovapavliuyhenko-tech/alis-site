import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HorizontalStory from "@/components/HorizontalStory";
import Projects from "@/components/Projects";
import Faq from "@/components/Faq";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
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
      <Brands />
      <BookingWidget />
      <HorizontalStory />
      <Reviews />
      <Projects />
      <Booking />
      <Faq />
      <Footer />
    </main>
  );
}
