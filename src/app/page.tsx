import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PhotoMarquee from "@/components/pages/PhotoMarquee";
import ConciergeStages from "@/components/pages/ConciergeStages";
import { type Stage } from "@/components/HorizontalStory";
import ServiceBento from "@/components/pages/ServiceBento";
import ScrollReveal from "@/components/ScrollReveal";
import Reviews from "@/components/Reviews";
import PhotoBanner from "@/components/pages/PhotoBanner";

// Клон massage-romanova.ru — стиль эталона + прежние блоки ÁLIS.

// «Как записаться» — 3 шага в формате этапов консьерж-сервиса. Тексты — только факты
// (онлайн-запись, часы работы, адрес, бонус). Фото — временные.
const VISIT_STEPS: Stage[] = [
  {
    name: { ru: "Услуга", en: "Service" },
    heading: { ru: "Выберите услугу", en: "Choose a service" },
    desc: { ru: "Маникюр, педикюр, парикмахерские услуги, брови и макияж — все услуги и цены в онлайн-записи.", en: "Manicure, pedicure, hair, brows and makeup — every service and price in online booking." },
    quote: { ru: "", en: "" },
    photo: "/assets/tild3638-373_-2___1__3.jpg",
  },
  {
    name: { ru: "Время", en: "Time" },
    heading: { ru: "Выберите удобное время", en: "Pick a convenient time" },
    desc: { ru: "Салон работает без перерывов и выходных, 9:00–21:00.", en: "The salon is open daily with no breaks, 9:00–21:00." },
    quote: { ru: "", en: "" },
    photo: "/assets/alis/img_2745.jpg",
  },
  {
    name: { ru: "Визит", en: "Visit" },
    heading: { ru: "Приходите в салон", en: "Come to the salon" },
    desc: { ru: "Новороссийск, ул. Пархоменко, 53. На первый визит — 500 бонусных рублей.", en: "Novorossiysk, Parkhomenko St., 53. 500 bonus roubles on your first visit." },
    quote: { ru: "", en: "" },
    photo: "/assets/alis/img_0569.jpg",
  },
];
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <Hero />
      <div className="relative z-10 bg-white page-end">
        {/* Метка конца первого блока — после неё у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />
        {/* Порядок: работы мастеров → выезд (консьерж) → как записаться в салон → услуги → контакты (подвал) */}
        <PhotoMarquee />
        {/* Отзывы гостей — перед баннером консьерж-сервиса */}
        <Reviews />
        {/* Баннер консьерж-сервиса (возвращён) */}
        <PhotoBanner
          photo="/assets/alis/img_6009.jpg"
          label={{ ru: "ÁLIS BEAUTY CONCIERGE", en: "ÁLIS BEAUTY CONCIERGE" }}
          title={{ ru: "Салон красоты там, где вам удобно", en: "A beauty salon wherever suits you" }}
          button={{ label: { ru: "Всё о консьерж-сервисе", en: "About the concierge service" }, href: "/concierge" }}
        />
        {/* Как записаться в салон — 3 шага (как этапы на странице консьерж-сервиса) */}
        <ConciergeStages stages={VISIT_STEPS} sectionId="how" title={null} stepLabel={{ ru: "Шаг", en: "Step" }} />
        {/* Услуги салона — карточки с фото */}
        <ServiceBento />
      </div>
      <Footer />
    </main>
  );
}
