import type { Metadata } from "next";
import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntro from "@/components/pages/TeamIntro";
import SalonServices from "@/components/pages/SalonServices";
import LoyaltyCerts from "@/components/pages/LoyaltyCerts";
import PhotoMarquee from "@/components/pages/PhotoMarquee";
import { ShopStory } from "@/components/shop/ShopShowcase";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// Прайс салона — полный список категорий и услуг по актуальной онлайн-записи.
const H1 = { ru: "1 ч", en: "1 h" };
const H130 = { ru: "1 ч 30 мин", en: "1 h 30 min" };
const H140 = { ru: "1 ч 40 мин", en: "1 h 40 min" };
const H135 = { ru: "1 ч 35 мин", en: "1 h 35 min" };
const H2 = { ru: "2 ч", en: "2 h" };
const H3 = { ru: "3 ч", en: "3 h" };
const M15 = { ru: "15 мин", en: "15 min" };
const M20 = { ru: "20 мин", en: "20 min" };
const M30 = { ru: "30 мин", en: "30 min" };
const M40 = { ru: "40 мин", en: "40 min" };
const M50 = { ru: "50 мин", en: "50 min" };
// Цена: цифры одинаковые, «от» и «по запросу» — переводим
const p = (v: string) => ({ ru: v, en: v.replace(/^от /, "from ").replace(/^по запросу$/, "on request") });

const SALON_CATEGORIES = [
  {
    slug: "manicure",
    label: { ru: "Маникюр", en: "Manicure" },
    sub: { ru: "Классический, гель-лак, японский, пилочный, наращивание и дизайн", en: "Classic, gel polish, Japanese, file, extensions & design" },
    from: { ru: "от 1 000 ₽", en: "from 1 000 ₽" },
    groups: [
      {
        rows: [
          { name: { ru: "Маникюр без покрытия", en: "Manicure, no polish" }, price: p("1 450 ₽"), time: H1 },
          { name: { ru: "Маникюр без покрытия (топ-мастер)", en: "Manicure, no polish (top specialist)" }, price: p("1 650 ₽"), time: H1 },
          { name: { ru: "Маникюр + покрытие лаком", en: "Manicure + polish" }, price: p("1 900 ₽"), time: H130 },
          { name: { ru: "Маникюр + покрытие лаком (топ-мастер)", en: "Manicure + polish (top specialist)" }, price: p("2 200 ₽"), time: H130 },
          { name: { ru: "Маникюр + гель-лак", en: "Manicure + gel polish" }, price: p("2 400 ₽"), time: H2 },
          { name: { ru: "Маникюр + гель-лак (топ-мастер)", en: "Manicure + gel polish (top specialist)" }, price: p("2 700 ₽"), time: H140 },
          { name: { ru: "Маникюр + гель-лак + укрепление гелем", en: "Manicure + gel polish + strengthening" }, price: p("2 750 ₽"), time: H2 },
          { name: { ru: "Маникюр + гель-лак + укрепление (топ-мастер)", en: "Manicure + gel polish + strengthening (top specialist)" }, price: p("3 050 ₽"), time: H140 },
          { name: { ru: "Покрытие гель-лаком", en: "Gel polish application" }, price: p("1 400 ₽"), time: M30 },
          { name: { ru: "Японский маникюр", en: "Japanese manicure" }, price: p("2 500 – 3 000 ₽"), time: H130 },
          { name: { ru: "Детский маникюр", en: "Kids' manicure" }, price: p("1 000 ₽"), time: M30 },
        ],
      },
      {
        title: { ru: "Пилочный маникюр", en: "File manicure" },
        rows: [
          { name: { ru: "Без покрытия", en: "No polish" }, price: p("2 000 – 2 400 ₽"), time: H1 },
          { name: { ru: "С покрытием лак", en: "With polish" }, price: p("2 300 – 2 800 ₽"), time: H130 },
          { name: { ru: "С покрытием гель-лак", en: "With gel polish" }, price: p("2 600 – 3 000 ₽"), time: H130 },
        ],
      },
      {
        title: { ru: "Наращивание, дизайн и уход", en: "Extensions, design & care" },
        rows: [
          { name: { ru: "Наращивание ногтей", en: "Nail extensions" }, price: p("2 700 – 4 500 ₽"), time: H3 },
          { name: { ru: "Коррекция наращенных ногтей", en: "Extension refill" }, price: p("2 800 – 4 500 ₽"), time: H2 },
          { name: { ru: "Ремонт ногтя", en: "Nail repair" }, price: p("300 ₽"), time: M15 },
          { name: { ru: "Дизайн ногтя", en: "Nail design" }, price: p("100 – 500 ₽") },
          { name: { ru: "SPA-уход для рук Zielinski&Rozen", en: "Zielinski&Rozen hand SPA care" }, price: p("500 ₽"), time: M20 },
          { name: { ru: "BANDI SPA (доп. к маникюру/педикюру)", en: "BANDI SPA (mani/pedi add-on)" }, price: p("600 ₽"), time: M20 },
        ],
      },
      {
        title: { ru: "Для мужчин", en: "For men" },
        rows: [
          { name: { ru: "Мужской сервис (маникюр + педикюр)", en: "Men's service (mani + pedi)" }, price: p("4 400 ₽"), time: H130 },
          { name: { ru: "Мужской маникюр", en: "Men's manicure" }, price: p("1 400 ₽"), time: H1 },
          { name: { ru: "Мужской маникюр (топ-мастер)", en: "Men's manicure (top specialist)" }, price: p("1 600 ₽"), time: H1 },
        ],
      },
    ],
  },
  {
    slug: "pedicure",
    label: { ru: "Педикюр", en: "Pedicure" },
    sub: { ru: "Классический, smart-диски, препаратный", en: "Classic, smart discs, acid" },
    from: { ru: "от 1 000 ₽", en: "from 1 000 ₽" },
    groups: [
      {
        title: { ru: "Классический", en: "Classic" },
        rows: [
          { name: { ru: "Без покрытия", en: "No polish" }, price: p("2 500 ₽"), time: H1 },
          { name: { ru: "Без покрытия (топ-мастер)", en: "No polish (top specialist)" }, price: p("2 900 ₽"), time: H130 },
          { name: { ru: "+ покрытие лаком", en: "+ polish" }, price: p("2 600 ₽"), time: H1 },
          { name: { ru: "+ покрытие лаком (топ-мастер)", en: "+ polish (top specialist)" }, price: p("3 000 ₽"), time: H130 },
          { name: { ru: "+ гель-лак", en: "+ gel polish" }, price: p("3 000 ₽"), time: H130 },
          { name: { ru: "+ гель-лак (топ-мастер)", en: "+ gel polish (top specialist)" }, price: p("3 300 ₽"), time: H2 },
        ],
      },
      {
        title: { ru: "Smart-диски", en: "Smart discs" },
        rows: [
          { name: { ru: "Без покрытия", en: "No polish" }, price: p("2 500 ₽"), time: M50 },
          { name: { ru: "Без покрытия (топ-мастер)", en: "No polish (top specialist)" }, price: p("2 900 ₽"), time: H130 },
          { name: { ru: "С покрытием лак", en: "With polish" }, price: p("2 600 ₽"), time: H1 },
          { name: { ru: "С покрытием лак (топ-мастер)", en: "With polish (top specialist)" }, price: p("3 000 ₽"), time: H130 },
          { name: { ru: "С покрытием гель-лак", en: "With gel polish" }, price: p("3 000 ₽"), time: H1 },
          { name: { ru: "С покрытием гель-лак (топ-мастер)", en: "With gel polish (top specialist)" }, price: p("3 300 ₽"), time: H130 },
        ],
      },
      {
        title: { ru: "Препаратный (фруктовый)", en: "Acid peel (fruit acids)" },
        rows: [
          { name: { ru: "Без покрытия", en: "No polish" }, price: p("2 800 ₽"), time: H130 },
          { name: { ru: "С покрытием на выбор (топ-мастер)", en: "With a coating of your choice (top specialist)" }, price: p("3 200 – 3 700 ₽"), time: H2 },
          { name: { ru: "С покрытием лак", en: "With polish" }, price: p("3 300 ₽"), time: H140 },
          { name: { ru: "С покрытием гель-лак", en: "With gel polish" }, price: p("3 500 ₽"), time: H140 },
        ],
      },
      {
        title: { ru: "Экспресс и детский", en: "Express & kids" },
        rows: [
          { name: { ru: "Только пальчики", en: "Toes only" }, price: p("1 300 ₽"), time: M40 },
          { name: { ru: "Только обработка стоп", en: "Soles only" }, price: p("1 200 ₽"), time: M30 },
          { name: { ru: "Детский педикюр", en: "Kids' pedicure" }, price: p("1 000 ₽"), time: M40 },
          { name: { ru: "Японский педикюр", en: "Japanese pedicure" }, price: p("2 850 – 3 100 ₽"), time: H130 },
        ],
      },
      {
        title: { ru: "Для мужчин", en: "For men" },
        rows: [
          { name: { ru: "Мужской классический педикюр", en: "Men's classic pedicure" }, price: p("2 700 ₽"), time: H135 },
          { name: { ru: "Мужской педикюр smart-дисками", en: "Men's smart-disc pedicure" }, price: p("2 700 ₽"), time: H130 },
          { name: { ru: "Мужской педикюр smart-дисками (топ-мастер)", en: "Men's smart-disc pedicure (top specialist)" }, price: p("3 000 ₽"), time: H130 },
        ],
      },
    ],
  },
  {
    slug: "hair",
    label: { ru: "Парикмахерские услуги", en: "Hair services" },
    sub: { ru: "Стрижки, укладки, окрашивание, уход, причёски и свадебные образы", en: "Cuts, styling, colouring, care, hairstyles & bridal looks" },
    from: { ru: "от 400 ₽", en: "from 400 ₽" },
    groups: [
      {
        title: { ru: "Стрижки", en: "Cuts" },
        rows: [
          { name: { ru: "Детская стрижка (девочки до 14 лет)", en: "Kids' haircut (girls under 14)" }, price: p("1 800 ₽"), time: H1 },
          { name: { ru: "Стрижка кончиков на сухую", en: "Dry ends trim" }, price: p("1 800 ₽"), time: M30 },
          { name: { ru: "Чёлка", en: "Fringe" }, price: p("1 000 ₽"), time: M20 },
          { name: { ru: "Мытьё волос (доп. услуга)", en: "Hair wash (add-on)" }, price: p("700 ₽"), time: M30 },
        ],
      },
      {
        title: { ru: "Укладки", en: "Styling" },
        rows: [
          { name: { ru: "Экспресс-укладка", en: "Express styling" }, price: p("2 000 ₽"), time: H1 },
          { name: { ru: "Укладка (короткие волосы)", en: "Styling (short hair)" }, price: p("3 000 ₽"), time: H1 },
          { name: { ru: "Укладка (средняя длина)", en: "Styling (medium hair)" }, price: p("3 500 ₽"), time: H1 },
          { name: { ru: "Укладка (длинные волосы)", en: "Styling (long hair)" }, price: p("4 000 ₽"), time: H130 },
          { name: { ru: "Express-укладка x Dyson airwrap", en: "Express styling with Dyson Airwrap" }, price: p("2 500 ₽"), time: H1 },
          { name: { ru: "Афро-кудри", en: "Afro curls" }, price: p("2 500 – 4 000 ₽"), time: H1 },
        ],
      },
      {
        title: { ru: "Брашинг", en: "Blow-dry" },
        rows: [
          { name: { ru: "Короткие волосы", en: "Short hair" }, price: p("2 500 ₽"), time: H1 },
          { name: { ru: "Средние волосы", en: "Medium hair" }, price: p("3 000 ₽"), time: H1 },
          { name: { ru: "Длинные волосы", en: "Long hair" }, price: p("3 500 ₽"), time: H1 },
        ],
      },
      {
        title: { ru: "Окрашивание", en: "Colouring" },
        rows: [
          { name: { ru: "Консультация колориста", en: "Colourist consultation" }, price: p("1 000 ₽"), time: H1 },
          { name: { ru: "Окрашивание в один тон", en: "Single-tone colouring" }, price: p("от 6 000 ₽"), time: H2 },
          { name: { ru: "Окрашивание GLOW UP + уход", en: "GLOW UP colouring + care" }, price: p("5 000 – 12 000 ₽"), time: H2 },
          { name: { ru: "ARGAN & KERATIN от pH (корни)", en: "ARGAN & KERATIN by pH (roots)" }, price: p("5 000 – 6 500 ₽"), time: H2 },
          { name: { ru: "ARGAN & KERATIN от pH (длина)", en: "ARGAN & KERATIN by pH (length)" }, price: p("6 500 – 16 500 ₽"), time: H130 },
          { name: { ru: "Davines (Mask)", en: "Davines (Mask)" }, price: p("6 000 – 17 000 ₽"), time: H2 },
          { name: { ru: "Davines (View)", en: "Davines (View)" }, price: p("5 000 – 13 000 ₽"), time: H2 },
          { name: { ru: "Davines (Mask) — корни", en: "Davines (Mask) — roots" }, price: p("5 500 – 7 500 ₽"), time: H130 },
        ],
      },
      {
        title: { ru: "Уход", en: "Care" },
        rows: [
          { name: { ru: "GLOSS от pH (глоссирование волос)", en: "pH GLOSS (hair glossing)" }, price: p("2 500 – 6 500 ₽"), time: H130 },
          { name: { ru: "SPA-уход для волос NASHI Argan", en: "NASHI Argan hair SPA care" }, price: p("5 500 – 9 500 ₽"), time: H2 },
          { name: { ru: "Уход OI DAVINES", en: "OI DAVINES care" }, price: p("4 500 – 6 000 ₽"), time: H130 },
          { name: { ru: "Пилинг кожи головы", en: "Scalp peeling" }, price: p("2 000 ₽") },
          { name: { ru: "Маска во время мытья головы", en: "Mask during hair wash" }, price: p("400 ₽") },
        ],
      },
      {
        title: { ru: "Причёски и свадебные образы", en: "Hairstyles & bridal looks" },
        rows: [
          { name: { ru: "Вечерняя причёска", en: "Evening hairstyle" }, price: p("3 500 – 4 500 ₽"), time: H130 },
          { name: { ru: "Пробный свадебный образ", en: "Bridal trial look" }, price: p("8 500 ₽"), time: H1 },
          { name: { ru: "Свадебный образ", en: "Bridal look" }, price: p("10 000 ₽"), time: H1 },
        ],
      },
    ],
  },
  {
    // TODO: прайс на брови — пришлёт заказчица
    slug: "brows",
    label: { ru: "Оформление бровей", en: "Brows" },
    sub: { ru: "Коррекция, окрашивание, укладка", en: "Shaping, tinting, styling" },
    from: { ru: "по запросу", en: "on request" },
    groups: [{ rows: [
          { name: { ru: "Прайс скоро появится — уточняйте при записи", en: "Price list coming soon — ask when booking" }, price: p("по запросу") },
    ] }],
  },
  {
    // TODO: прайс на макияж — пришлёт заказчица
    slug: "makeup",
    label: { ru: "Макияж", en: "Makeup" },
    sub: { ru: "Дневной, вечерний, свадебный", en: "Day, evening, bridal" },
    from: { ru: "по запросу", en: "on request" },
    groups: [{ rows: [
          { name: { ru: "Прайс скоро появится — уточняйте при записи", en: "Price list coming soon — ask when booking" }, price: p("по запросу") },
    ] }],
  },
  {
    slug: "four-hands",
    label: { ru: "Особенный сервис (услуги в 4 руки)", en: "Signature service (4 hands)" },
    sub: { ru: "Два мастера одновременно — быстрее и комфортнее", en: "Two specialists at once — faster and more comfortable" },
    from: { ru: "от 5 700 ₽", en: "from 5 700 ₽" },
    groups: [
      {
        rows: [
          { name: { ru: "Особенный сервис (маникюр + педикюр)", en: "Signature service (mani + pedi)" }, price: p("5 700 ₽"), time: H2 },
        ],
      },
    ],
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/salon" },
};

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />

      {/* 1 — Обложка: только фото, без логотипа, кнопки и эффектов (по фидбеку) */}
      <TeamIntro title={{ ru: "Салон красоты", en: "Beauty salon" }} button={{ label: { ru: "Записаться онлайн", en: "Book online" }, href: YCLIENTS }} />

      {/* Порядок для клиента: услуги с ценами → отзывы → бонусы и сертификаты.
          space-y — дополнительный воздух между блоками. */}
      {/* Маркер конца героя — после него у шапки появляется подложка. Стоит СНАРУЖИ белой
          обёртки: иначе отступ первого блока «проваливается» и видна полоса фона. */}
      <div id="hero-end" aria-hidden className="h-0" />
      <div className="relative z-10 bg-white page-end">
        {/* 2 — О салоне: слайд-шоу фото + текст, как второй блок главной.
            Текст — черновик на согласование с заказчицей (по словам основательницы и фактам). Фото — временные. */}
        <ShopStory
          photos={["/assets/alis/img_2745.jpg", "/assets/alis/img_0569.jpg", "/assets/tild3638-373_-2___1__3.jpg", "/assets/alis/img_0521.jpg", "/assets/alis/img_2672.jpg", "/assets/alis/img_1834.jpg"]}
          title={{ ru: "Красота, которая начинается с вас", en: "Beauty that begins with you" }}
          text={{
            ru: "Мастера, влюблённые в своё дело, внимание к каждой детали и атмосфера, в которой хочется задержаться. Ждём вас каждый день с 9:00 до 21:00, а на первый визит дарим 500 бонусных рублей.",
            en: "Artists in love with their craft, attention to every detail and an atmosphere you won’t want to leave. We welcome you every day from 9:00 to 21:00 — with 500 bonus roubles on your first visit.",
          }}
          alt={{ ru: "Салон красоты ÁLIS BEAUTY", en: "ÁLIS BEAUTY beauty salon" }}
        />


        {/* Галерея работ — сразу под блоком «О салоне» (фото временные) */}
        <PhotoMarquee sectionId="gallery" />

        {/* 3 — Услуги и прайс */}
        <SalonServices
          categories={SALON_CATEGORIES}
          cta={{ label: { ru: "Оформить визит · 500 бонусных рублей на первый визит", en: "Book a visit · 500 bonus roubles on your first visit" }, href: YCLIENTS }}
        />

        {/* 3 — Отзывы гостей */}
        <Reviews />

        {/* 4 — Бонусы и подарочные сертификаты */}
        <LoyaltyCerts />
      </div>
      <Footer />
    </main>
  );
}