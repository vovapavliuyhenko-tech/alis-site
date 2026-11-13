import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockLabel from "@/components/ui/BlockLabel";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import ConciergeBenefits from "@/components/pages/ConciergeBenefits";
import ConciergePackages from "@/components/pages/ConciergePackages";
import SalonServices from "@/components/pages/SalonServices";
import { CONCIERGE_PRICES } from "@/lib/conciergePrices";
import Brands from "@/components/Brands";
// import ConciergeFounder from "@/components/pages/ConciergeFounder"; // блок основателя скрыт по просьбе заказчицы
import BudgetCalc from "@/components/pages/BudgetCalc";
import { type Stage } from "@/components/HorizontalStory";
import ConciergeStages from "@/components/pages/ConciergeStages";
// import ConciergeOffer from "@/components/pages/ConciergeOffer"; // форма заявки скрыта — заявки идут через анкету #calc
import ConciergeChat from "@/components/ConciergeChat";
import ConciergeEvents from "@/components/pages/ConciergeEvents";
import ReviewsWall from "@/components/ReviewsWall";

// Этапы работы — тексты заказчицы (сокращены под мобильную версию).
const CONCIERGE_STAGES: Stage[] = [
  {
    name: { ru: "Заявка", en: "Request" },
    heading: { ru: "Заявка", en: "Request" },
    desc: {
      ru: "Заполните [анкету](#calc) или отправьте запрос [личному консьержу](#chat). Ответим за 15 минут.",
      en: "Fill in the [form](#calc) or message your [personal concierge](#chat) — we reply within 15 minutes.",
    },
    quote: { ru: "«Ответим за 15 минут»", en: "“We reply in 15 minutes”" },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Смета", en: "Estimate" },
    heading: { ru: "Расчёт сметы и бронь", en: "Estimate and booking" },
    desc: {
      ru: "Присылаем смету, подбираем команду и составляем тайминг. Дату закрепляют предоплата и подписание договора. Заранее можно изучить наше [коммерческое предложение](/docs/alis-beauty-kp.pdf).",
      en: "We send the estimate, pick the team and set the timing. A deposit and a contract secure the date. You can study our [commercial proposal](/docs/alis-beauty-proposal-en.pdf) in advance.",
    },
    quote: { ru: "«Дата закреплена»", en: "“Your date is secured”" },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Пробный образ", en: "Trial" },
    heading: { ru: "Пробные образы", en: "Trial looks" },
    desc: {
      ru: "В салоне, с выездом или составление концепта со стилистами онлайн по вашему запросу.",
      en: "At the salon, on location, or an online concept with our stylists — as you prefer.",
    },
    quote: { ru: "«Образ готов заранее»", en: "“The look is ready in advance”" },
    photo: "/assets/alis/look_leopard.jpg",
  },
  {
    name: { ru: "Событие", en: "The day" },
    heading: { ru: "День события", en: "The day of the event" },
    desc: {
      ru: "Команда приезжает заранее со всеми материалами и оборудованием, работаем по таймингу.",
      en: "The team arrives early with all materials and equipment and works to the timing.",
    },
    quote: { ru: "«Всё по таймингу»", en: "“Everything on schedule”" },
    photo: "/assets/alis/concierge_case.jpg",
  },
  {
    name: { ru: "Финал", en: "Finishing touches" },
    heading: { ru: "Финальные штрихи", en: "Finishing touches" },
    desc: {
      ru: "Специалист остаётся на сопровождении, если выбрана данная опция.",
      en: "If you choose stay-on support, an artist stays with you until the end of the event.",
    },
    quote: { ru: "«С вами до конца»", en: "“With you to the end”" },
    photo: "/assets/alis/work_nails_bag.jpg",
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
      <TeamIntro
        title={{ ru: "Международная beauty-команда для вашего события по России, Европе и странам СНГ", en: "An international beauty team for your event in Russia, Europe and the CIS" }}
        photo="/assets/alis/look_red_1.jpg"
        subtitle={{ ru: "Макияж и укладки под ключ для свадеб, съёмок и модных мероприятий.", en: "Turnkey makeup and styling for weddings, shoots and fashion events." }}
        button={{ label: { ru: "Рассчитать стоимость выезда", en: "Calculate the travel cost" }, href: "#calc" }}
        button2={{ label: { ru: "Написать личному beauty-консьержу", en: "Message your personal beauty concierge" }, href: "#chat" }}
      />

      {/* Порядок = пункты меню: о сервисе → услуги и прайс → фотогалерея → этапы →
          как забронировать. space-y — дополнительный воздух между блоками. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* Порядок — по лестнице Ханта: что это → это про меня → доказательства (кейсы, бренды) →
            какой формат и сколько стоит → как всё пройдёт → отзывы → целевое действие (анкета). */}

        {/* 2 — Для кого (#about): «это про меня?» */}
        <BlockLabel ru="Для кого" en="Who it's for" />
        <ConciergeBenefits title={{ ru: "Для кого", en: "Who it's for" }} />

        {/* 4 — Нас выбирают: «кто ещё вам доверяет?» */}
        <Brands title={{ ru: "Нас выбирают", en: "They choose us" }} />

        {/* 4.5 — Галерея выездных событий: «вы правда это делаете?» (данные — src/lib/conciergeEvents.ts) */}
        <BlockLabel ru="Галерея выездных событий" en="Event gallery" />
        <ConciergeEvents />

        {/* 5 — Пакеты услуг (#uslugi): «какой формат мой?» */}
        <BlockLabel ru="Пакеты услуг" en="Packages" />
        <ConciergePackages />
        {/* 6 — Прайс: «сколько стоит?» */}
        <SalonServices
          categories={CONCIERGE_PRICES}
          cta={{ label: { ru: "Рассчитать бюджет", en: "Calculate the budget" }, href: "#calc" }}
        />

        {/* 7 — Этапы работы (#process): «как всё пройдёт?» */}
        <BlockLabel ru="Как проходит работа с командой ÁLIS BEAUTY" en="How working with the ÁLIS BEAUTY team goes" />
        <ConciergeStages stages={CONCIERGE_STAGES} sectionId="process" title={{ ru: "Как проходит работа с командой ÁLIS BEAUTY", en: "How working with the ÁLIS BEAUTY team goes" }} />

        {/* 8 — Отзывы: «люди довольны?». TODO: заменить на отзывы о консьерж-сервисе, когда Зера пришлёт */}
        <ReviewsWall title={{ ru: "Гости о нас", en: "Guests about us" }} />

        {/* 9 — Целевое действие: анкета «Рассчитать бюджет» (#calc). Вкладка «Хочу в команду» —
            анкета кандидата (карьера в ÁLIS BEAUTY Concierge), ссылка /concierge#team открывает её сразу */}
        <BudgetCalc />


        {/* 6 — Основатель и форматы сотрудничества (#partners) */}
        {/* <ConciergeFounder /> — скрыт */}

        {/* 7 — Заявка (#offer, #booking) — скрыта по просьбе заказчицы */}
        {/* <ConciergeOffer /> */}
      </div>
      <Footer />
      <ConciergeChat />
    </main>
  );
}