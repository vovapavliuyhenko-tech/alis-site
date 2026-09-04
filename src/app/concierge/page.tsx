import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/pages/PageHero";
import InfoBlock from "@/components/pages/InfoBlock";
import QuizConsult from "@/components/QuizConsult";
import ConciergeChat from "@/components/ConciergeChat";

const PHONE_SERVICE = "+7 988 888 77 28";

export default function ConciergePage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white">
        <PageHero
          eyebrow={{ ru: "Бьюти-консьерж", en: "Concierge" }}
          title={{ ru: "Выездной бьюти-консьерж", en: "On-location concierge" }}
          subtitle={{
            ru: "Премиум-сопровождение мероприятий: команда мастеров, тайминг и образ под ключ — по России и за границей.",
            en: "Premium event service: a team of masters, timing and a turnkey look — across Russia and abroad.",
          }}
        />

        <div id="uslugi" className="scroll-mt-24">
          <InfoBlock
            eyebrow={{ ru: "Услуги", en: "Services" }}
            title={{ ru: "Что входит в сервис", en: "What the service includes" }}
            text={{
              ru: "Собираем формат под ваше событие и берём организацию образа на себя — от первой заявки до последнего кадра.",
              en: "We shape the format for your event and take on the whole look — from the first request to the last frame.",
            }}
            bullets={[
              { ru: "Макияж и причёски для вас и вашей команды", en: "Makeup and hair for you and your team" },
              { ru: "Работа в 4–6 рук — быстро и без спешки", en: "Service in 4–6 hands — fast and unhurried" },
              { ru: "Выезд по России и за границу", en: "Travel across Russia and abroad" },
              { ru: "Личный консьерж на связи от заявки до события", en: "A personal concierge in touch from request to event" },
            ]}
          />
        </div>

        <div id="price" className="scroll-mt-24">
          <InfoBlock
            eyebrow={{ ru: "Прайс", en: "Prices" }}
            title={{ ru: "Стоимость — по запросу", en: "Price on request" }}
            text={{
              ru: "Стоимость выезда зависит от формата, числа персон, города и даты. Оставьте заявку — рассчитаем индивидуально и пришлём предложение.",
              en: "The price depends on the format, number of people, city and date. Leave a request — we'll calculate it individually and send an offer.",
            }}
            ctaLabel={{ ru: "Позвонить в сервис", en: "Call the service" }}
            ctaHref={`tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}`}
            external={false}
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
