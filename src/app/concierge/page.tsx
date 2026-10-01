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
    heading: { ru: "Оставляете заявку — отвечаем в тот же день", en: "You leave a request — we reply the same day" },
    desc: {
      ru: "Расскажите повод, дату и место. Подберём формат выезда и назовём стоимость — без долгих согласований и «перезвоним когда-нибудь».",
      en: "Tell us the occasion, date and place. We'll shape the format and confirm the price — no endless back-and-forth.",
    },
    quote: { ru: "«Ответим в тот же день»", en: "“We reply the same day”" },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Бриф", en: "Brief" },
    heading: { ru: "Согласуем образ, референсы и тайминг", en: "We agree the look, references and timing" },
    desc: {
      ru: "Фиксируем образ и план по минутам, чтобы в день события ничего не решалось на бегу. Вы точно знаете, что и когда происходит.",
      en: "We lock the look and a minute-by-minute plan, so nothing is decided on the fly on the day. You know exactly what happens and when.",
    },
    quote: { ru: "«Всё расписано заранее»", en: "“Everything planned in advance”" },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Выезд", en: "On location" },
    heading: { ru: "Приезжаем к вам со своим оборудованием", en: "We come to you with our own kit" },
    desc: {
      ru: "Команда мастеров работает на месте в 4–6 рук. Ничего везти и готовить не нужно — всё привезём и организуем сами.",
      en: "A team works on site in 4–6 hands. Nothing to bring or prepare — we bring and set up everything ourselves.",
    },
    quote: { ru: "«Приедем и всё соберём»", en: "“We arrive and handle it all”" },
    photo: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    name: { ru: "Событие", en: "The day" },
    heading: { ru: "Вы собраны точно к началу — и в кадре", en: "You're ready right on time — and in the frame" },
    desc: {
      ru: "Причёска, макияж и ногти готовы вовремя, без спешки. При необходимости мастер остаётся рядом до последнего кадра.",
      en: "Hair, makeup and nails are ready on time, unhurried. If needed, a master stays with you to the last frame.",
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
      <TeamIntro title={{ ru: "Консьерж-сервис", en: "Concierge service" }} kicker={{ ru: "Мастера приедут туда, где вам удобно", en: "Our artists come wherever suits you" }} button={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#booking" }} />

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