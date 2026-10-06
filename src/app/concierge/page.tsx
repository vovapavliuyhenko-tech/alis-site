import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import ConciergeBenefits from "@/components/pages/ConciergeBenefits";
import ConciergePackages from "@/components/pages/ConciergePackages";
import ConciergeFounder, { ConciergeDateCheck } from "@/components/pages/ConciergeFounder";
import BudgetCalc from "@/components/pages/BudgetCalc";
import { type Stage } from "@/components/HorizontalStory";
import ConciergeStages from "@/components/pages/ConciergeStages";
import ConciergeOffer from "@/components/pages/ConciergeOffer";
import ConciergeChat from "@/components/ConciergeChat";

// Этапы работы — тексты заказчицы (сокращены под мобильную версию).
const CONCIERGE_STAGES: Stage[] = [
  {
    name: { ru: "Заявка", en: "Request" },
    heading: { ru: "Заявка — ответ за 15 минут", en: "Request — a reply in 15 minutes" },
    desc: {
      ru: "Заполните анкету или напишите личному консьержу — ответим за 15 минут.",
      en: "Fill in the form or message your personal concierge — we reply within 15 minutes.",
    },
    quote: { ru: "«Ответим за 15 минут»", en: "“We reply in 15 minutes”" },
    photo: "/assets/tild6230-643__.jpg",
  },
  {
    name: { ru: "Смета", en: "Estimate" },
    heading: { ru: "Смета и бронь даты", en: "Estimate and date booking" },
    desc: {
      ru: "Присылаем смету, подбираем команду и тайминг. Дату закрепляют предоплата и договор.",
      en: "We send the estimate, pick the team and set the timing. A deposit and a contract secure the date.",
    },
    quote: { ru: "«Дата закреплена»", en: "“Your date is secured”" },
    photo: "/assets/tild3236-393__.jpg",
  },
  {
    name: { ru: "Пробный образ", en: "Trial" },
    heading: { ru: "Пробные образы", en: "Trial looks" },
    desc: {
      ru: "В салоне, с выездом или онлайн-концепт со стилистами — по вашему запросу.",
      en: "At the salon, on location, or an online concept with our stylists — as you prefer.",
    },
    quote: { ru: "«Образ готов заранее»", en: "“The look is ready in advance”" },
    photo: "/assets/alis/img_2749.jpg",
  },
  {
    name: { ru: "Событие", en: "The day" },
    heading: { ru: "День события", en: "The day of the event" },
    desc: {
      ru: "Команда приезжает заранее со всеми материалами и оборудованием и работает по таймингу.",
      en: "The team arrives early with all materials and equipment and works to the timing.",
    },
    quote: { ru: "«Всё по таймингу»", en: "“Everything on schedule”" },
    photo: "/assets/tild6530-383_-2___1_.jpg",
  },
  {
    name: { ru: "Финал", en: "Finishing touches" },
    heading: { ru: "Финальные штрихи", en: "Finishing touches" },
    desc: {
      ru: "Если выбрана опция сопровождения, специалист остаётся с вами до конца события.",
      en: "If you choose stay-on support, an artist stays with you until the end of the event.",
    },
    quote: { ru: "«С вами до конца»", en: "“With you to the end”" },
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
      <TeamIntro
        title={{ ru: "Международная beauty-команда для вашего события по России, Европе и странам СНГ", en: "An international beauty team for your event across Russia, Europe and the CIS" }}
        subtitle={{ ru: "Макияж, укладки и услуги парикмахера под ключ для свадеб, съёмок и модных мероприятий.", en: "Turnkey makeup, styling and hairdressing for weddings, shoots and fashion events." }}
        button={{ label: { ru: "Рассчитать бюджет", en: "Calculate the budget" }, href: "#calc" }}
        button2={{ label: { ru: "Написать личному beauty-консьержу", en: "Message your personal beauty concierge" }, href: "#chat" }}
      />

      {/* Порядок = пункты меню: о сервисе → услуги и прайс → фотогалерея → этапы →
          как забронировать. space-y — дополнительный воздух между блоками. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">

        {/* 2 — Для кого (#about) */}
        <ConciergeBenefits title={{ ru: "Для кого", en: "Who it's for" }} />

        {/* 3 — Пакеты услуг (#uslugi). TODO: цены «от …» и PDF КП пришлёт заказчица */}
        <ConciergePackages />

        {/* 4 — Как проходит работа (#process) */}
        <ConciergeStages stages={CONCIERGE_STAGES} sectionId="process" title={{ ru: "Как проходит работа с командой ÁLIS BEAUTY", en: "How we work with the ÁLIS BEAUTY team" }} />

        {/* 5 — Проверка даты → анкета */}
        <ConciergeDateCheck />

        {/* 6 — Основатель и форматы сотрудничества (#partners) */}
        <ConciergeFounder />

        {/* 7 — Заявка (#offer, #booking) */}
        <ConciergeOffer />
      </div>
      <Footer />
      <ConciergeChat />
      <BudgetCalc />
    </main>
  );
}