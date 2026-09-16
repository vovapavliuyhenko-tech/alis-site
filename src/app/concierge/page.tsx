import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import ConciergeBenefits from "@/components/pages/ConciergeBenefits";
import SalonServices from "@/components/pages/SalonServices";
import { type Stage } from "@/components/HorizontalStory";
import ConciergeStages from "@/components/pages/ConciergeStages";
import ConciergeOffer from "@/components/pages/ConciergeOffer";
import Faq from "@/components/Faq";
import ConciergeChat from "@/components/ConciergeChat";

type LocT = { ru: string; en: string };
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
          { name: { ru: "Сопровождение мастера весь день", en: "A master with you all day" }, price: req },
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
          { name: { ru: "Команда мастеров на выезд", en: "A team of masters on location" }, price: req },
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

// FAQ по бьюти-консьержу.
const CONCIERGE_FAQ: { q: LocT; a: LocT }[] = [
  {
    q: { ru: "«Вы правда приезжаете со всем своим?»", en: "“Do you really come with everything?”" },
    a: {
      ru: "Да. Привозим оборудование, косметику и расходники. От вас — только место и розетка. Всё остальное организуем сами.",
      en: "Yes. We bring equipment, cosmetics and supplies. All we need from you is a spot and a socket. We handle the rest.",
    },
  },
  {
    q: { ru: "«За сколько нужно бронировать выезд?»", en: "“How far ahead should I book?”" },
    a: {
      ru: "Чем раньше — тем лучше, особенно на свадебный сезон. Но и срочные запросы берём: напишите дату, подскажем по свободным окнам.",
      en: "The earlier the better, especially in wedding season. We also take urgent requests: send the date and we'll check availability.",
    },
  },
  {
    q: { ru: "«Сколько человек успеваете собрать?»", en: "“How many people can you get ready?”" },
    a: {
      ru: "Работаем командой в 4–6 рук и рассчитываем состав под число гостей и тайминг — все будут готовы к началу.",
      en: "We work as a team in 4–6 hands and size the crew to the number of guests and the timing — everyone is ready on time.",
    },
  },
  {
    q: { ru: "«Можно репетицию образа заранее?»", en: "“Can we do a trial look in advance?”" },
    a: {
      ru: "Да, для свадеб и съёмок это лучший вариант: подбираем и фиксируем образ на фото до события, чтобы в день всё прошло идеально.",
      en: "Yes — for weddings and shoots it's the best option: we choose and capture the look before the day so it goes perfectly.",
    },
  },
  {
    q: { ru: "«Куда вы выезжаете?»", en: "“Where do you travel?”" },
    a: {
      ru: "База — Новороссийск и окрестности. Выезд в другие города обсуждаем отдельно под конкретное событие.",
      en: "We're based in and around Novorossiysk. Trips to other cities are arranged per event.",
    },
  },
];

export default function ConciergePage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Единый герой-обложка (как на «Команде»), подпись «бьюти-консьерж» */}
      <TeamIntro
        caption={{ ru: "бьюти-консьерж", en: "beauty concierge" }}
        cta={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#booking" }}
      />

      <div className="relative z-10 bg-white">
        {/* Маркер конца героя — после него у шапки появляется подложка */}
        <div id="hero-end" aria-hidden className="h-0" />

        {/* 2 — Преимущества бьюти-консьержа (фото + сетка карточек) */}
        <ConciergeBenefits />

        {/* 3 — Услуги и прайс (плашки как на «Салоне») */}
        <SalonServices
          eyebrow={{ ru: "услуги и прайс", en: "services & prices" }}
          title={{ ru: "Форматы выезда", en: "On-location formats" }}
          categories={CONCIERGE_CATEGORIES}
          cta={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#booking" }}
        />

        {/* 4 — Этапы работы (шторка: текст/фото, накладываются при скролле) */}
        <ConciergeStages stages={CONCIERGE_STAGES} sectionId="process" />

        {/* 5 — Коммерческое предложение + заявка */}
        <ConciergeOffer />

        {/* 6 — Частые вопросы */}
        <Faq
          items={CONCIERGE_FAQ}
          sectionId="concierge-faq"
          photo="/assets/tild3236-393__.jpg"
          eyebrow={{ ru: "вопросы", en: "FAQ" }}
          titleTop={{ ru: "Бьюти-консьерж —", en: "Beauty concierge —" }}
          titleBottom={{ ru: "что спрашивают", en: "what people ask" }}
        />
      </div>
      <Footer />
      <ConciergeChat />
    </main>
  );
}
