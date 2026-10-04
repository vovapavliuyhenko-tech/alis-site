import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import ConciergeBenefits from "@/components/pages/ConciergeBenefits";
import SalonServices from "@/components/pages/SalonServices";
import { type Stage } from "@/components/HorizontalStory";
import ConciergeStages from "@/components/pages/ConciergeStages";
import ConciergeOffer from "@/components/pages/ConciergeOffer";
import ConciergeChat from "@/components/ConciergeChat";

const req = { ru: "по запросу", en: "on request" };

// Услуги и прайс выездного сервиса — в формате «Салона» (раскрывающиеся плашки).
const CONCIERGE_CATEGORIES = [
  {
    label: { ru: "Свадьба", en: "Wedding" },
    sub: { ru: "Образ невесты, репетиция, подружки", en: "Bridal look, trial, bridesmaids" },
    from: req,
    groups: [
      {
        rows: [
          { name: { ru: "Образ невесты (макияж + причёска)", en: "Bridal look (makeup + hair)" }, price: req },
          { name: { ru: "Репетиция образа заранее", en: "Trial look in advance" }, price: req },
          { name: { ru: "Подружки невесты и мама", en: "Bridesmaids & mother" }, price: req },
          { name: { ru: "Сопровождение мастера весь день", en: "An artist with you all day" }, price: req },
        ],
      },
    ],
  },
  {
    label: { ru: "Съёмка", en: "Shoot" },
    sub: { ru: "Макияж и причёска под кадр, смена образов", en: "Camera-ready makeup & hair, look changes" },
    from: req,
    groups: [
      {
        rows: [
          { name: { ru: "Макияж и причёска под кадр", en: "Camera-ready makeup & hair" }, price: req },
          { name: { ru: "Смена образов на площадке", en: "Look changes on set" }, price: req },
          { name: { ru: "Работа с командой моделей", en: "Work with a model team" }, price: req },
        ],
      },
    ],
  },
  {
    label: { ru: "Мероприятие", en: "Event" },
    sub: { ru: "Команда на выезд, экспресс-образы, бьюти-зона", en: "Team on location, express looks, beauty corner" },
    from: req,
    groups: [
      {
        rows: [
          { name: { ru: "Команда мастеров на выезд", en: "A team of specialists on location" }, price: req },
          { name: { ru: "Экспресс-образ для гостей", en: "Express looks for guests" }, price: req },
          { name: { ru: "Бьюти-зона на площадке", en: "A beauty corner at the venue" }, price: req },
        ],
      },
    ],
  },
];

// Этапы работы — горизонтальный блок, тексты по AIDA.
const CONCIERGE_STAGES: Stage[] = [
  {
    name: { ru: "Заявка", en: "Request" },
    heading: { ru: "Заявка — ответ в тот же день", en: "Request — reply the same day" },
    desc: {
      ru: "Повод, дата и место — и мы сразу назовём формат и стоимость.",
      en: "Occasion, date and place — and we name the format and price right away.",
    },
    quote: { ru: "«Ответим в тот же день»", en: "“We reply the same day”" },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Бриф", en: "Brief" },
    heading: { ru: "Образ и тайминг заранее", en: "Look and timing in advance" },
    desc: {
      ru: "Согласуем образ и план по минутам — в день события ничего не решается на бегу.",
      en: "We agree the look and a minute-by-minute plan — nothing is decided on the fly.",
    },
    quote: { ru: "«Всё расписано заранее»", en: "“Everything planned in advance”" },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Выезд", en: "On location" },
    heading: { ru: "Приезжаем со всем необходимым", en: "We arrive fully equipped" },
    desc: {
      ru: "Команда работает в 4–6 рук. Вам ничего не нужно готовить — всё привезём сами.",
      en: "The team works with 4–6 hands. Nothing to prepare — we bring everything.",
    },
    quote: { ru: "«Приедем и всё соберём»", en: "“We arrive and handle it all”" },
    photo: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    name: { ru: "Событие", en: "The day" },
    heading: { ru: "Вы готовы точно к началу", en: "You're ready right on time" },
    desc: {
      ru: "Причёска, макияж и ногти — вовремя и без спешки. Если нужно, мастер останется до последнего кадра.",
      en: "Hair, makeup and nails — on time, unhurried. If needed, an artist stays to the last frame.",
    },
    quote: { ru: "«Готовы вовремя, без спешки»", en: "“Ready on time, no rush”" },
    photo: "/assets/tild6536-613_-2___1__4.jpg",
  },
];

// Фотогалерея выездов — TODO: заменить на фото, которые пришлёт заказчица.
export const metadata: Metadata = {
  alternates: { canonical: "/concierge" },
};

export default function ConciergePage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к заявке (без логотипа и эффектов) */}
      <TeamIntro title={{ ru: "Консьерж-сервис", en: "Concierge service" }} button={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#booking" }} />

      {/* Порядок = пункты меню: о сервисе → услуги и прайс → фотогалерея → этапы →
          как забронировать. space-y — дополнительный воздух между блоками. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — О сервисе (#about) */}
        <ConciergeBenefits />

        {/* 3 — Услуги и прайс (#uslugi). TODO: новый прайс пришлёт заказчица */}
        <SalonServices
          categories={CONCIERGE_CATEGORIES}
          cta={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#booking" }}
        />


        {/* 5 — Этапы работы (тексты будут уточнены заказчицей) */}
        <ConciergeStages stages={CONCIERGE_STAGES} sectionId="process" title={null} />

        {/* 6 — Как забронировать: заявка (#offer, #booking) */}
        <ConciergeOffer />
      </div>
      <Footer />
      <ConciergeChat />
    </main>
  );
}