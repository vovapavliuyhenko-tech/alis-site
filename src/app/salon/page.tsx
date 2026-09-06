import Header from "@/components/Header";
import Certificates from "@/components/Certificates";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Loyalty from "@/components/pages/Loyalty";
import SalonHero from "@/components/pages/SalonHero";
import ServiceScroll from "@/components/pages/ServiceScroll";
import { type ServiceCategory } from "@/components/pages/ServiceTabs";

// TODO: заменить на реальный прайс салона.
const SALON_CATEGORIES: ServiceCategory[] = [
  {
    label: { ru: "Волосы", en: "Hair" },
    rows: [
      { name: { ru: "Женская стрижка", en: "Women's haircut" }, price: { ru: "от 1500 ₽", en: "from 1500 ₽" } },
      { name: { ru: "Окрашивание", en: "Colouring" }, price: { ru: "от 3500 ₽", en: "from 3500 ₽" } },
      { name: { ru: "Укладка", en: "Styling" }, price: { ru: "от 1200 ₽", en: "from 1200 ₽" } },
      { name: { ru: "Уход / реконструкция", en: "Care / reconstruction" }, price: { ru: "от 2500 ₽", en: "from 2500 ₽" } },
    ],
  },
  {
    label: { ru: "Ногти", en: "Nails" },
    rows: [
      { name: { ru: "Маникюр с покрытием", en: "Manicure with coating" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" } },
      { name: { ru: "Педикюр с покрытием", en: "Pedicure with coating" }, price: { ru: "от 2200 ₽", en: "from 2200 ₽" } },
      { name: { ru: "Снятие + уход", en: "Removal + care" }, price: { ru: "от 500 ₽", en: "from 500 ₽" } },
    ],
  },
  {
    label: { ru: "Брови и ресницы", en: "Brows & lashes" },
    rows: [
      { name: { ru: "Оформление бровей", en: "Brow shaping" }, price: { ru: "от 800 ₽", en: "from 800 ₽" } },
      { name: { ru: "Ламинирование бровей", en: "Brow lamination" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" } },
      { name: { ru: "Ламинирование ресниц", en: "Lash lamination" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" } },
    ],
  },
  {
    label: { ru: "Макияж", en: "Makeup" },
    rows: [
      { name: { ru: "Дневной макияж", en: "Day makeup" }, price: { ru: "от 2500 ₽", en: "from 2500 ₽" } },
      { name: { ru: "Вечерний макияж", en: "Evening makeup" }, price: { ru: "от 3500 ₽", en: "from 3500 ₽" } },
      { name: { ru: "Свадебный образ", en: "Bridal look" }, price: { ru: "от 5000 ₽", en: "from 5000 ₽" } },
    ],
  },
];

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <SalonHero />
        <div id="uslugi" className="scroll-mt-24">
          <span id="price" />
          <ServiceScroll
            eyebrow={{ ru: "Услуги и цены", en: "Services & prices" }}
            title={{ ru: "Услуги салона", en: "Salon services" }}
            categories={SALON_CATEGORIES}
          />
        </div>
        <div id="loyalty" className="scroll-mt-24"><Loyalty /></div>
        <Certificates />
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
