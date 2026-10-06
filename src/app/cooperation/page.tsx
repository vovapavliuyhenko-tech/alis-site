import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import CooperationFormats from "@/components/pages/CooperationFormats";
import ConciergeBenefits, { type BenefitPoint } from "@/components/pages/ConciergeBenefits";
import CoopGallery from "@/components/pages/CoopGallery";
import ConciergeChat from "@/components/ConciergeChat";

// «Кому полезно» — тексты заказчицы, в формате фото-панелей (как «Для кого» у консьержа)
const WHO: BenefitPoint[] = [
  {
    title: { ru: "Агентствам", en: "Agencies" },
    desc: {
      ru: "Свадебным, PR- и event-агентствам: одна команда на все мероприятия, один контакт, один счёт.",
      en: "Wedding, PR and event agencies: one team for every event, one contact, one invoice.",
    },
    img: "/assets/alis/img_2746.jpg",
  },
  {
    title: { ru: "Отелям", en: "Hotels" },
    desc: {
      ru: "Бьюти-сервис в номерах для гостей — без своего салона.",
      en: "In-room beauty service for guests — no salon of your own needed.",
    },
    img: "/assets/alis/img_1855.jpg",
  },
  {
    title: { ru: "Продакшенам", en: "Production" },
    desc: {
      ru: "Фото- и видеопродакшенам: специалист на площадке на весь съёмочный день.",
      en: "Photo and video production: an artist on set for the whole shooting day.",
    },
    img: "/assets/alis/img_2672.jpg",
  },
  {
    title: { ru: "Брендам", en: "Brands" },
    desc: {
      ru: "Образы для показов, презентаций и запусков.",
      en: "Looks for shows, presentations and launches.",
    },
    img: "/assets/alis/e12b89f7-f193-44ac-9015-777b094a0bcd.jpg",
  },
];

// Страница «Сотрудничество» (по брифу заказчицы): обложка с оффером и кнопками «Скачать КП» /
// «Обсудить проект» → «Кому полезно» → 5 рамок фото/видео → «Частным лицам» / «Агентствам
// и бизнесу» → после выбора: заявка под категорию → лента партнёров.
export const metadata: Metadata = {
  alternates: { canonical: "/cooperation" },
};

export default function CooperationPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: фото + кнопка к заявке (без логотипа и эффектов) */}
      <TeamIntro
        title={{ ru: "Beauty-партнёр для частных лиц и бизнеса", en: "A beauty partner for individuals and business" }}
        subtitle={{
          ru: "Возьмём на себя образы гостей, моделей, VIP-клиентов, а также создадим индивидуальные подарки — в вашем городе или там, где проходит мероприятие.",
          en: "We take care of the looks of guests, models and VIP clients, and create bespoke gifts — in your city or wherever the event takes place.",
        }}
        photo="/assets/alis/img_6011.jpg"
        // «Скачать КП» — сначала данные: открывает форму для бизнеса. TODO: PDF КП пришлёт заказчица
        button={{ label: { ru: "Скачать КП", en: "Download proposal" }, href: "#business" }}
        // «Обсудить проект» — связь с менеджером (чат консьержа)
        button2={{ label: { ru: "Обсудить проект", en: "Discuss a project" }, href: "#chat" }}
      />

      {/* space-y — дополнительный воздух между блоками поверх общего section-y */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — Кому полезно */}
        <ConciergeBenefits points={WHO} sectionId="who" />

        {/* 3 — 5 рамок: фото или видео (TODO: медиа пришлёт заказчица) */}
        <CoopGallery />

        {/* 4 — Выбор «Частным лицам» / «Агентствам и бизнесу» → форма под выбор → партнёры */}
        <CooperationFormats />
      </div>

      <Footer />
      <ConciergeChat />
    </main>
  );
}
