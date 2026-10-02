import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import PhotoMarquee from "@/components/pages/PhotoMarquee";
import ScrollReveal from "@/components/ScrollReveal";
import Reviews from "@/components/Reviews";
import PhotoBanner from "@/components/pages/PhotoBanner";
import BonusOffer from "@/components/pages/BonusOffer";
import FinalChoice from "@/components/pages/FinalChoice";
import ConciergeBenefits, { type BenefitPoint } from "@/components/pages/ConciergeBenefits";

// Клон massage-romanova.ru — стиль эталона + прежние блоки ÁLIS.


// «Почему выбирают ALIS BEAUTY» — пункты заказчицы, в формате фото-панелей как на странице
// консьерж-сервиса. Описаний нет (только заголовки). Фото — временные.
const WHY: BenefitPoint[] = [
  { title: { ru: "Предсказуемый качественный результат", en: "Predictable, high-quality results" }, desc: { ru: "", en: "" }, img: "/assets/alis/img_2672.jpg" },
  { title: { ru: "Опытная команда специалистов", en: "An experienced team of specialists" }, desc: { ru: "", en: "" }, img: "/assets/alis/img_3283.jpg" },
  { title: { ru: "Профессиональный сервис по высоким стандартам бренда", en: "Professional service to the brand’s high standards" }, desc: { ru: "", en: "" }, img: "/assets/alis/img_8578.jpg" },
  { title: { ru: "Работа в 4–6 рук", en: "Working with 4–6 hands at once" }, desc: { ru: "", en: "" }, img: "/assets/alis/img_2746.jpg" },
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
        {/* Почему выбирают ALIS BEAUTY */}
        <ConciergeBenefits points={WHY} sectionId="why" title={{ ru: "Почему выбирают ALIS BEAUTY", en: "Why choose ALIS BEAUTY" }} />
        {/* Порядок: работы мастеров → выезд (консьерж) → как записаться в салон → услуги → контакты (подвал) */}
        <PhotoMarquee />
        {/* Отзывы гостей — перед баннером консьерж-сервиса */}
        <Reviews title={{ ru: "Так говорят гости", en: "What our guests say" }} />
        {/* «Выездной сервис» — баннер консьерж-сервиса (тексты заказчицы). Чтобы поставить видео:
            video="/assets/....mp4" (photo станет обложкой видео) */}
        <PhotoBanner
          stacked
          photo="/assets/alis/img_6009.jpg"
          label={{ ru: "Выездной сервис", en: "Outcall service" }}
          title={{
            ru: "Свадьба в Ереване, съёмка в Москве, ужин в Каннах — международная команда ALIS BEAUTY уже в пути.",
            en: "A wedding in Yerevan, a shoot in Moscow, a dinner in Cannes — the international ALIS BEAUTY team is already on its way.",
          }}
          text={{
            ru: "Вы выбираете место, мы приводим специалистов, тайминг и спокойствие — вам остаётся только наслаждаться днём.",
            en: "You choose the place; we bring the specialists, the timing and the peace of mind — all that’s left is to enjoy your day.",
          }}
          button={{ label: { ru: "Рассчитать выезд за 1 минуту", en: "Get a travel quote in 1 minute" }, href: "/concierge#booking" }}
        />
        {/* Комплимент от ALIS BEAUTY — 500 бонусов, номер уходит в CRM */}
        <BonusOffer />
        {/* Услуги салона — карточки с фото. Скрыто по просьбе (вернуть — раскомментировать):
        <ServiceBento /> */}
        {/* Финальный экран — выбор: салон / выезд / связаться */}
        <FinalChoice />
      </div>
      <Footer />
    </main>
  );
}
