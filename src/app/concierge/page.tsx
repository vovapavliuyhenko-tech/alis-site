import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamHero from "@/components/pages/TeamHero";
import ServiceStack from "@/components/pages/ServiceStack";
import { type ServiceCategory } from "@/components/pages/ServiceTabs";
import QuizConsult from "@/components/QuizConsult";
import ConciergeChat from "@/components/ConciergeChat";

const onRequest = { ru: "по запросу", en: "on request" };
const CONCIERGE_CATEGORIES: ServiceCategory[] = [
  {
    label: { ru: "Свадьба", en: "Wedding" },
    rows: [
      { name: { ru: "Образ невесты", en: "Bridal look" }, price: onRequest, note: { ru: "Макияж и причёска со стойкостью на весь день.", en: "Makeup and hair that last the whole day." } },
      { name: { ru: "Репетиция образа заранее", en: "Trial look in advance" }, price: onRequest, note: { ru: "Подбираем и фиксируем образ на фото до события.", en: "We choose and capture the look before the day." } },
      { name: { ru: "Подружки невесты и мама", en: "Bridesmaids & mother" }, price: onRequest, note: { ru: "Единый стиль для всех участниц.", en: "One consistent style for everyone." } },
      { name: { ru: "Сопровождение весь день", en: "A master with you all day" }, price: onRequest, note: { ru: "Мастер рядом до последнего кадра.", en: "A master beside you to the last frame." } },
    ],
  },
  {
    label: { ru: "Съёмка", en: "Shoot" },
    rows: [
      { name: { ru: "Макияж и причёска под кадр", en: "Camera-ready makeup & hair" }, price: onRequest, note: { ru: "Работаем под свет и объектив.", en: "Styled for the light and the lens." } },
      { name: { ru: "Смена образов на площадке", en: "Look changes on set" }, price: onRequest, note: { ru: "Перестроим образ прямо во время съёмки.", en: "We restyle right during the shoot." } },
      { name: { ru: "Работа с командой моделей", en: "Work with a model team" }, price: onRequest, note: { ru: "Успеваем всех в 4–6 рук.", en: "We handle everyone in 4–6 hands." } },
    ],
  },
  {
    label: { ru: "Мероприятие", en: "Event" },
    rows: [
      { name: { ru: "Команда мастеров на выезд", en: "A team of masters on location" }, price: onRequest, note: { ru: "Приезжаем к вам со своим оборудованием.", en: "We come to you with our own kit." } },
      { name: { ru: "Экспресс-образ для гостей", en: "Express looks for guests" }, price: onRequest, note: { ru: "Быстро и аккуратно для каждого гостя.", en: "Fast and neat for every guest." } },
      { name: { ru: "Бьюти-зона на площадке", en: "A beauty corner at the venue" }, price: onRequest, note: { ru: "Организуем уголок красоты прямо на месте.", en: "We set up a beauty corner on site." } },
    ],
  },
];

export default function ConciergePage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Герой-сплит (закреплён): боль — в день события некогда ехать в салон */}
      <TeamHero
        pinned
        logo
        photo="/assets/tild6536-613_-2___1__4.jpg"
        eyebrow={{ ru: "бьюти-консьерж", en: "beauty concierge" }}
        title={{ ru: "В день события некогда ехать в салон?", en: "No time for the salon on the big day?" }}
        sub={{
          ru: "Свадьба, съёмка, выход в свет — счёт на минуты. А вам нужно быть собранной и в кадре, а не в дороге и в очереди.",
          en: "A wedding, a shoot, a special night — every minute counts. You need to be ready and in the frame, not stuck in traffic or a queue.",
        }}
        cta={{ label: { ru: "форматы выезда", en: "on-location formats" }, href: "#uslugi" }}
      />

      {/* 2 — Зеркальный герой (наезжает поверх): решение + оффер */}
      <TeamHero
        reverse
        logoTop
        photo="/assets/tild6230-643__.jpg"
        eyebrow={{ ru: "почему мы", en: "why us" }}
        title={{ ru: "Мы приедем и соберём образ на месте", en: "We come to you and create the look on site" }}
        sub={{
          ru: "Команда мастеров приезжает со своим оборудованием и работает в 4–6 рук. Причёска, макияж, ногти — точно к таймингу. Первый выезд — со скидкой 10%.",
          en: "A team arrives with its own kit and works in 4–6 hands. Hair, makeup, nails — right on schedule. First booking — 10% off.",
        }}
        cta={{ label: { ru: "оставить заявку", en: "leave a request" }, href: "#booking" }}
      />

      <div className="relative z-10 bg-white">
        <div id="uslugi" className="scroll-mt-24">
          <span id="price" />
          <ServiceStack
            eyebrow={{ ru: "Услуги и прайс", en: "Services & prices" }}
            title={{ ru: "Форматы выезда", en: "On-location formats" }}
            categories={CONCIERGE_CATEGORIES}
            cta={{ label: { ru: "Оставить заявку", en: "Leave a request" }, href: "#booking" }}
          />
        </div>

        <div id="booking" className="scroll-mt-24"><QuizConsult /></div>
      </div>
      <Footer />
      <ConciergeChat />
    </main>
  );
}
