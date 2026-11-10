import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlockLabel from "@/components/ui/BlockLabel";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import SalonServices from "@/components/pages/SalonServices";
import LoyaltyCerts from "@/components/pages/LoyaltyCerts";
import PhotoMarquee from "@/components/pages/PhotoMarquee";
import ServiceBento from "@/components/pages/ServiceBento";
import { SALON_PRICES } from "@/lib/salonPrices";
import { SALON_ADMIN_WA } from "@/components/pages/SalonBlocks";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// Прайс салона — полный список категорий и услуг по актуальной онлайн-записи.
// Цена: цифры одинаковые, «от» и «по запросу» — переводим

// Прайс — из онлайн-записи YCLIENTS (src/lib/salonPrices.ts)

export const metadata: Metadata = {
  alternates: { canonical: "/salon" },
};

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: только фото, без логотипа, кнопки и эффектов (по фидбеку) */}
      {/* TODO: видео на фон обложки пришлёт заказчица */}
      <TeamIntro
        title={{ ru: "Салон красоты ÁLIS BEAUTY в Новороссийске", en: "ÁLIS BEAUTY beauty salon in Novorossiysk" }}
        subtitle={{
          ru: "Ногтевой сервис, парикмахерские услуги, коррекция бровей, макияж.\nПархоменко, 53, с 09:00 до 21:00.",
          en: "Nails, hair, brow shaping, makeup.\n53 Parkhomenko St., 9:00–21:00.",
        }}
        button={{ label: { ru: "Записаться онлайн", en: "Book online" }, href: YCLIENTS }}
        button2={{ label: { ru: "Написать администратору", en: "Message the administrator" }, href: SALON_ADMIN_WA }}
      />

      {/* Порядок для клиента: услуги с ценами → отзывы → бонусы и сертификаты.
          space-y — дополнительный воздух между блоками. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        {/* 2 — Плашка «500 бонусов + пригласить подругу» — скрыта по просьбе заказчицы (SalonBonusStrip в SalonBlocks) */}

        {/* 3 — Популярные процедуры — скрыты по просьбе заказчицы (компонент PopularServices в SalonBlocks) */}

        {/* 4 — Категории услуг (переход к прайсу по категориям) */}
        <BlockLabel ru="Услуги" en="Services" />
        <ServiceBento />

        {/* 5 — Услуги и прайс: поиск + «Выбрать своего мастера» */}
        <BlockLabel ru="Прайс" en="Prices" />
        <SalonServices
          categories={SALON_PRICES}
          search
          master={{ label: { ru: "Выбрать своего мастера", en: "Choose your specialist" }, href: YCLIENTS }}
          cta={{ label: { ru: "Оформить визит", en: "Book a visit" }, href: YCLIENTS }}
        />

        {/* 6 — Атмосфера (вместо «Галереи»). TODO: 6 фото салона, работ и подарков пришлёт заказчица */}
        <PhotoMarquee
          sectionId="gallery"
          items={[
            { src: "/assets/alis/salon_cup_flatlay.jpg", cap: { ru: "Атмосфера салона", en: "Salon atmosphere" } },
            { src: "/assets/alis/nails_french.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
            { src: "/assets/alis/look_red_1.jpg", cap: { ru: "Макияж + укладка", en: "Makeup + styling" } },
            { src: "/assets/alis/salon_cup.jpg", cap: { ru: "Атмосфера салона", en: "Salon atmosphere" } },
            { src: "/assets/alis/work_hair_waves.jpg", cap: { ru: "Укладка", en: "Styling" } },
            { src: "/assets/alis/nails_pink_ring.jpg", cap: { ru: "Маникюр", en: "Manicure" } },
            { src: "/assets/alis/img_6048.jpg", cap: { ru: "Магазин ÁLIS BEAUTY", en: "ÁLIS BEAUTY shop" } },
          ]}
          cta={{ label: { ru: "Посмотреть услуги", en: "View services" }, href: "#uslugi" }}
          title={{ ru: "Атмосфера, в которую хочется вернуться", en: "An atmosphere you want to come back to" }}
          text={{
            ru: "Гости говорят, что чувствуют себя окрылёнными после процедур, — а мы делаем всё, чтобы так было каждый раз.",
            en: "Guests say they feel uplifted after their treatments — and we do everything to make it so every time.",
          }}
        />



        {/* 8 — Лояльность и подарочные сертификаты */}
        <LoyaltyCerts />
      </div>
      <Footer />
    </main>
  );
}