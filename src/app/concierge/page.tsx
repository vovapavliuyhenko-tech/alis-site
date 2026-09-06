import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ConciergeHero from "@/components/pages/ConciergeHero";
import InfoBlock from "@/components/pages/InfoBlock";
import ServiceTabs, { type ServiceCategory } from "@/components/pages/ServiceTabs";
import QuizConsult from "@/components/QuizConsult";
import ConciergeChat from "@/components/ConciergeChat";

const PHONE_SERVICE = "+7 988 888 77 28";

const onRequest = { ru: "по запросу", en: "on request" };
const CONCIERGE_CATEGORIES: ServiceCategory[] = [
  {
    label: { ru: "Свадьба", en: "Wedding" },
    rows: [
      { name: { ru: "Образ невесты — макияж и причёска", en: "Bridal look — makeup & hair" }, price: onRequest },
      { name: { ru: "Репетиция образа заранее", en: "Trial look in advance" }, price: onRequest },
      { name: { ru: "Подружки невесты и мама", en: "Bridesmaids & mother" }, price: onRequest },
      { name: { ru: "Сопровождение мастером весь день", en: "A master with you all day" }, price: onRequest },
    ],
  },
  {
    label: { ru: "Съёмка", en: "Shoot" },
    rows: [
      { name: { ru: "Макияж и причёска под кадр", en: "Camera-ready makeup & hair" }, price: onRequest },
      { name: { ru: "Смена образов на площадке", en: "Look changes on set" }, price: onRequest },
      { name: { ru: "Работа с командой моделей", en: "Work with a model team" }, price: onRequest },
    ],
  },
  {
    label: { ru: "Мероприятие", en: "Event" },
    rows: [
      { name: { ru: "Команда мастеров на выезд", en: "A team of masters on location" }, price: onRequest },
      { name: { ru: "Экспресс-образ для гостей", en: "Express looks for guests" }, price: onRequest },
      { name: { ru: "Бьюти-зона на площадке", en: "A beauty corner at the venue" }, price: onRequest },
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
          <ServiceTabs
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
