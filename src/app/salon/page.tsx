import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SalonServices from "@/components/pages/SalonServices";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// Прайс салона — категории раскрываются в плашку (услуга · время · цена).
// TODO: заменить на реальный прайс салона.
const SALON_CATEGORIES = [
  {
    label: { ru: "Волосы", en: "Hair" },
    sub: { ru: "Стрижка, окрашивание, укладка, уход", en: "Cut, colour, styling, care" },
    from: { ru: "от 1200 ₽", en: "from 1200 ₽" },
    rows: [
      { name: { ru: "Женская стрижка", en: "Women's haircut" }, price: { ru: "от 1500 ₽", en: "from 1500 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Окрашивание", en: "Colouring" }, price: { ru: "от 3500 ₽", en: "from 3500 ₽" }, time: { ru: "от 2 ч", en: "from 2 h" } },
      { name: { ru: "Укладка", en: "Styling" }, price: { ru: "от 1200 ₽", en: "from 1200 ₽" }, time: { ru: "40 мин", en: "40 min" } },
      { name: { ru: "Уход / реконструкция", en: "Care / reconstruction" }, price: { ru: "от 2500 ₽", en: "from 2500 ₽" }, time: { ru: "1 ч", en: "1 h" } },
    ],
  },
  {
    label: { ru: "Ногти", en: "Nails" },
    sub: { ru: "Маникюр, педикюр, покрытие, дизайн", en: "Manicure, pedicure, coating, design" },
    from: { ru: "от 500 ₽", en: "from 500 ₽" },
    rows: [
      { name: { ru: "Маникюр с покрытием", en: "Manicure with coating" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" }, time: { ru: "1,5 ч", en: "1.5 h" } },
      { name: { ru: "Педикюр с покрытием", en: "Pedicure with coating" }, price: { ru: "от 2200 ₽", en: "from 2200 ₽" }, time: { ru: "1,5 ч", en: "1.5 h" } },
      { name: { ru: "Снятие + уход", en: "Removal + care" }, price: { ru: "от 500 ₽", en: "from 500 ₽" }, time: { ru: "30 мин", en: "30 min" } },
    ],
  },
  {
    label: { ru: "Брови и ресницы", en: "Brows & lashes" },
    sub: { ru: "Оформление, окрашивание, ламинирование", en: "Shaping, tinting, lamination" },
    from: { ru: "от 800 ₽", en: "from 800 ₽" },
    rows: [
      { name: { ru: "Оформление бровей", en: "Brow shaping" }, price: { ru: "от 800 ₽", en: "from 800 ₽" }, time: { ru: "40 мин", en: "40 min" } },
      { name: { ru: "Ламинирование бровей", en: "Brow lamination" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Ламинирование ресниц", en: "Lash lamination" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" }, time: { ru: "1 ч", en: "1 h" } },
    ],
  },
  {
    label: { ru: "Макияж", en: "Makeup" },
    sub: { ru: "Дневной, вечерний, свадебный образ", en: "Day, evening, bridal look" },
    from: { ru: "от 2500 ₽", en: "from 2500 ₽" },
    rows: [
      { name: { ru: "Дневной макияж", en: "Day makeup" }, price: { ru: "от 2500 ₽", en: "from 2500 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Вечерний макияж", en: "Evening makeup" }, price: { ru: "от 3500 ₽", en: "from 3500 ₽" }, time: { ru: "1,5 ч", en: "1.5 h" } },
      { name: { ru: "Свадебный образ", en: "Bridal look" }, price: { ru: "от 5000 ₽", en: "from 5000 ₽" }, time: { ru: "от 2 ч", en: "from 2 h" } },
    ],
  },
];

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pt-[68px]">
        <SalonServices
          eyebrow={{ ru: "услуги и цены", en: "services & prices" }}
          title={{ ru: "Услуги салона", en: "Salon services" }}
          categories={SALON_CATEGORIES}
          cta={{ label: { ru: "Записаться", en: "Book now" }, href: YCLIENTS }}
        />
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
