import Header from "@/components/Header";
import Certificates from "@/components/Certificates";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Loyalty from "@/components/pages/Loyalty";
import SalonHero from "@/components/pages/SalonHero";
import ServiceStack from "@/components/pages/ServiceStack";
import { type ServiceCategory } from "@/components/pages/ServiceTabs";

// TODO: заменить на реальный прайс салона.
const SALON_CATEGORIES: ServiceCategory[] = [
  {
    label: { ru: "Волосы", en: "Hair" },
    rows: [
      { name: { ru: "Женская стрижка", en: "Women's haircut" }, price: { ru: "от 1500 ₽", en: "from 1500 ₽" }, note: { ru: "Мытьё, стрижка и укладка в комплексе.", en: "Wash, cut and styling together." } },
      { name: { ru: "Окрашивание", en: "Colouring" }, price: { ru: "от 3500 ₽", en: "from 3500 ₽" }, note: { ru: "Подбор тона и уход после — в одном визите.", en: "Shade selection and after-care in one visit." } },
      { name: { ru: "Укладка", en: "Styling" }, price: { ru: "от 1200 ₽", en: "from 1200 ₽" }, note: { ru: "Локоны, гладкая или объёмная — на выбор.", en: "Curls, sleek or voluminous — your choice." } },
      { name: { ru: "Уход / реконструкция", en: "Care / reconstruction" }, price: { ru: "от 2500 ₽", en: "from 2500 ₽" }, note: { ru: "Восстановление после осветления и укладок.", en: "Repair after bleaching and heat styling." } },
    ],
  },
  {
    label: { ru: "Ногти", en: "Nails" },
    rows: [
      { name: { ru: "Маникюр с покрытием", en: "Manicure with coating" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" }, note: { ru: "Гель-лак, снятие входит в стоимость.", en: "Gel polish, removal included." } },
      { name: { ru: "Педикюр с покрытием", en: "Pedicure with coating" }, price: { ru: "от 2200 ₽", en: "from 2200 ₽" }, note: { ru: "Аппаратный, с уходом за стопами.", en: "Hardware pedicure with foot care." } },
      { name: { ru: "Снятие + уход", en: "Removal + care" }, price: { ru: "от 500 ₽", en: "from 500 ₽" }, note: { ru: "Если приходите с работой другого мастера.", en: "If you come with another master's work." } },
    ],
  },
  {
    label: { ru: "Брови и ресницы", en: "Brows & lashes" },
    rows: [
      { name: { ru: "Оформление бровей", en: "Brow shaping" }, price: { ru: "от 800 ₽", en: "from 800 ₽" }, note: { ru: "Коррекция формы и окрашивание.", en: "Shape correction and tinting." } },
      { name: { ru: "Ламинирование бровей", en: "Brow lamination" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" }, note: { ru: "Укладка формы на 4–6 недель.", en: "Fixes the shape for 4–6 weeks." } },
      { name: { ru: "Ламинирование ресниц", en: "Lash lamination" }, price: { ru: "от 1800 ₽", en: "from 1800 ₽" }, note: { ru: "Изгиб и объём без наращивания.", en: "Lift and volume without extensions." } },
    ],
  },
  {
    label: { ru: "Макияж", en: "Makeup" },
    rows: [
      { name: { ru: "Дневной макияж", en: "Day makeup" }, price: { ru: "от 2500 ₽", en: "from 2500 ₽" }, note: { ru: "Естественный, на каждый день.", en: "Natural, for every day." } },
      { name: { ru: "Вечерний макияж", en: "Evening makeup" }, price: { ru: "от 3500 ₽", en: "from 3500 ₽" }, note: { ru: "Стойкий образ для выхода.", en: "A long-lasting look for going out." } },
      { name: { ru: "Свадебный образ", en: "Bridal look" }, price: { ru: "от 5000 ₽", en: "from 5000 ₽" }, note: { ru: "С репетицией и стойкостью до утра.", en: "With a trial and hold until morning." } },
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
          <ServiceStack
            eyebrow={{ ru: "Услуги и цены", en: "Services & prices" }}
            title={{ ru: "Услуги салона", en: "Salon services" }}
            categories={SALON_CATEGORIES}
            cta={{
              label: { ru: "Записаться", en: "Book now" },
              href: "https://n1054895.yclients.com/company/976464/personal/menu",
              external: true,
            }}
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
