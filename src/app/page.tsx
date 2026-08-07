import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HorizontalStory from "@/components/HorizontalStory";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <ScrollReveal />
      <Header />
      <Hero />
      <About />
      <HorizontalStory />
      <Projects />
      <Services />
      <Booking />
      <Footer />
    </main>
  );
}
