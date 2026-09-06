import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ConciergeHero from "@/components/pages/ConciergeHero";
import InfoBlock from "@/components/pages/InfoBlock";
import ServiceStack from "@/components/pages/ServiceStack";
import { type ServiceCategory } from "@/components/pages/ServiceTabs";
import QuizConsult from "@/components/QuizConsult";
import ConciergeChat from "@/components/ConciergeChat";

const PHONE_SERVICE = "+7 988 888 77 28";

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
      <ConciergeHero />

      <div className="relative z-10 bg-white">
        <div id="uslugi" className="scroll-mt-24">
          <span id="price" />
          <ServiceStack
            eyebrow={{ ru: "Услуги и прайс", en: "Services & prices" }}
            title={{ ru: "Форматы выезда", en: "On-location formats" }}
            categories={CONCIERGE_CATEGORIES}
          />
        </div>

        <div id="offer" className="scroll-mt-24">
          <InfoBlock
            dark
            eyebrow={{ ru: "Коммерческое предложение", en: "Proposal" }}
            title={{ ru: "Готовое КП для организаторов", en: "A ready proposal for organisers" }}
            text={{
              ru: "Для агентств, площадок и организаторов мероприятий готовим коммерческое предложение с форматами и условиями сотрудничества. Запросите — вышлем.",
              en: "For agencies, venues and event organisers we prepare a commercial proposal with formats and terms. Request it — we'll send it over.",
            }}
            ctaLabel={{ ru: "Запросить КП", en: "Request the proposal" }}
            ctaHref={`tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}`}
            external={false}
          />
        </div>

        <div id="booking" className="scroll-mt-24"><QuizConsult /></div>
      </div>
      <Footer />
      <ConciergeChat />
    </main>
  );
}
