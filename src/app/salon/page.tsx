import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SalonServices from "@/components/pages/SalonServices";

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
const p = (v: string) => ({ ru: v, en: v }); // цена одинакова для RU/EN

const SALON_CATEGORIES = [
  {
    label: { ru: "Маникюр и педикюр", en: "Manicure & pedicure" },
    sub: { ru: "Маникюр, педикюр, наращивание, уход", en: "Manicure, pedicure, extensions, care" },
    from: { ru: "от 100 ₽", en: "from 100 ₽" },
    rows: [
      { name: { ru: "Особенный сервис (маникюр + педикюр)", en: "Signature service (mani + pedi)" }, price: p("5 700 ₽"), time: H2 },
      { name: { ru: "Маникюр без покрытия", en: "Manicure, no coating" }, price: p("1 450 ₽"), time: H1 },
      { name: { ru: "Маникюр без покрытия (топ-мастер)", en: "Manicure, no coating (top master)" }, price: p("1 650 ₽"), time: H1 },
      { name: { ru: "Маникюр + покрытие лаком", en: "Manicure + polish" }, price: p("1 900 ₽"), time: H130 },
      { name: { ru: "Маникюр + покрытие лаком (топ-мастер)", en: "Manicure + polish (top master)" }, price: p("2 200 ₽"), time: H130 },
      { name: { ru: "Маникюр + гель-лак", en: "Manicure + gel polish" }, price: p("2 400 ₽"), time: H2 },
      { name: { ru: "Маникюр + гель-лак (топ-мастер)", en: "Manicure + gel polish (top master)" }, price: p("2 700 ₽"), time: H140 },
      { name: { ru: "Маникюр + гель-лак + укрепление гелем", en: "Manicure + gel polish + gel strengthening" }, price: p("2 750 ₽"), time: H2 },
      { name: { ru: "Маникюр + гель-лак + укрепление гелем (топ-мастер)", en: "Manicure + gel polish + strengthening (top master)" }, price: p("3 050 ₽"), time: H140 },
      { name: { ru: "Японский маникюр", en: "Japanese manicure" }, price: p("2 500 – 3 000 ₽"), time: H130 },
      { name: { ru: "Детский маникюр", en: "Kids' manicure" }, price: p("1 000 ₽"), time: M30 },
      { name: { ru: "Наращивание ногтей", en: "Nail extensions" }, price: p("2 700 – 4 500 ₽"), time: H3 },
      { name: { ru: "Коррекция наращенных ногтей", en: "Extension refill" }, price: p("2 800 – 4 500 ₽"), time: H2 },
      { name: { ru: "Ремонт ногтя", en: "Nail repair" }, price: p("300 ₽"), time: M15 },
      { name: { ru: "Дизайн ногтя", en: "Nail design" }, price: p("100 – 500 ₽") },
      { name: { ru: "Классический педикюр без покрытия", en: "Classic pedicure, no coating" }, price: p("2 500 ₽"), time: H1 },
      { name: { ru: "Классический педикюр без покрытия (топ-мастер)", en: "Classic pedicure, no coating (top master)" }, price: p("2 900 ₽"), time: H130 },
      { name: { ru: "Педикюр smart-дисками без покрытия", en: "Smart-disc pedicure, no coating" }, price: p("2 500 ₽"), time: M50 },
      { name: { ru: "Педикюр smart-дисками без покрытия (топ-мастер)", en: "Smart-disc pedicure, no coating (top master)" }, price: p("2 900 ₽"), time: H130 },
      { name: { ru: "Классический педикюр + покрытие лаком", en: "Classic pedicure + polish" }, price: p("2 600 ₽"), time: H1 },
      { name: { ru: "Классический педикюр + покрытие лаком (топ-мастер)", en: "Classic pedicure + polish (top master)" }, price: p("3 000 ₽"), time: H130 },
      { name: { ru: "Педикюр smart-дисками с покрытием лак", en: "Smart-disc pedicure + polish" }, price: p("2 600 ₽"), time: H1 },
      { name: { ru: "Педикюр smart-дисками с покрытием лак (топ-мастер)", en: "Smart-disc pedicure + polish (top master)" }, price: p("3 000 ₽"), time: H130 },
      { name: { ru: "Классический педикюр + гель-лак", en: "Classic pedicure + gel polish" }, price: p("3 000 ₽"), time: H130 },
      { name: { ru: "Классический педикюр + гель-лак (топ-мастер)", en: "Classic pedicure + gel polish (top master)" }, price: p("3 300 ₽"), time: H2 },
      { name: { ru: "Педикюр smart-дисками с покрытием гель-лак", en: "Smart-disc pedicure + gel polish" }, price: p("3 000 ₽"), time: H1 },
      { name: { ru: "Педикюр smart-дисками с покрытием гель-лак (топ-мастер)", en: "Smart-disc pedicure + gel polish (top master)" }, price: p("3 300 ₽"), time: H130 },
      { name: { ru: "Педикюр (только пальчики)", en: "Pedicure (toes only)" }, price: p("1 300 ₽"), time: M40 },
      { name: { ru: "Педикюр (только обработка стоп)", en: "Pedicure (soles only)" }, price: p("1 200 ₽"), time: M30 },
      { name: { ru: "Детский педикюр", en: "Kids' pedicure" }, price: p("1 000 ₽"), time: M40 },
      { name: { ru: "Японский педикюр", en: "Japanese pedicure" }, price: p("2 850 – 3 100 ₽"), time: H130 },
      { name: { ru: "SPA-уход для рук Zielinski&Rozen", en: "Zielinski&Rozen hand SPA care" }, price: p("500 ₽"), time: M20 },
      { name: { ru: "BANDI SPA (доп. услуга к маникюру/педикюру)", en: "BANDI SPA (mani/pedi add-on)" }, price: p("600 ₽"), time: M20 },
      { name: { ru: "Покрытие гель-лаком", en: "Gel polish application" }, price: p("1 400 ₽"), time: M30 },
      { name: { ru: "Пилочный маникюр без покрытия", en: "File manicure, no coating" }, price: p("2 000 – 2 400 ₽"), time: H1 },
      { name: { ru: "Пилочный маникюр с покрытием лак", en: "File manicure + polish" }, price: p("2 300 – 2 800 ₽"), time: H130 },
      { name: { ru: "Пилочный маникюр с покрытием гель-лак", en: "File manicure + gel polish" }, price: p("2 600 – 3 000 ₽"), time: H130 },
      { name: { ru: "Препаратный (фруктовый) педикюр без покрытия", en: "Acid (fruit) pedicure, no coating" }, price: p("2 800 ₽"), time: H130 },
      { name: { ru: "Препаратный (фруктовый) педикюр с покрытием на выбор (топ-мастер)", en: "Acid (fruit) pedicure + coating of choice (top master)" }, price: p("3 200 – 3 700 ₽"), time: H2 },
      { name: { ru: "Препаратный (фруктовый) педикюр с покрытием лак", en: "Acid (fruit) pedicure + polish" }, price: p("3 300 ₽"), time: H140 },
      { name: { ru: "Препаратный (фруктовый) педикюр с покрытием гель-лак", en: "Acid (fruit) pedicure + gel polish" }, price: p("3 500 ₽"), time: H140 },
    ],
  },
  {
    label: { ru: "Парикмахерские услуги", en: "Hairdressing" },
    sub: { ru: "Стрижки, укладки, уход, свадебные образы", en: "Cuts, styling, care, bridal looks" },
    from: { ru: "от 400 ₽", en: "from 400 ₽" },
    rows: [
      { name: { ru: "Детская стрижка (девочки до 14 лет)", en: "Kids' haircut (girls under 14)" }, price: p("1 800 ₽"), time: H1 },
      { name: { ru: "Экспресс-укладка", en: "Express styling" }, price: p("2 000 ₽"), time: H1 },
      { name: { ru: "Укладка (короткие волосы)", en: "Styling (short hair)" }, price: p("3 000 ₽"), time: H1 },
      { name: { ru: "Укладка (средняя длина волос)", en: "Styling (medium hair)" }, price: p("3 500 ₽"), time: H1 },
      { name: { ru: "Укладка (длинные волосы)", en: "Styling (long hair)" }, price: p("4 000 ₽"), time: H130 },
      { name: { ru: "Вечерняя причёска", en: "Evening hairstyle" }, price: p("3 500 – 4 500 ₽"), time: H130 },
      { name: { ru: "Пробный свадебный образ", en: "Bridal trial look" }, price: p("8 500 ₽"), time: H1 },
      { name: { ru: "Свадебный образ", en: "Bridal look" }, price: p("10 000 ₽"), time: H1 },
      { name: { ru: "GLOSS от pH (глоссирование волос)", en: "pH GLOSS (hair glossing)" }, price: p("2 500 – 6 500 ₽"), time: H130 },
      { name: { ru: "Пилинг кожи головы", en: "Scalp peeling" }, price: p("2 000 ₽") },
      { name: { ru: "Маска во время мытья головы", en: "Mask during hair wash" }, price: p("400 ₽") },
      { name: { ru: "Стрижка кончиков на сухую", en: "Dry ends trim" }, price: p("1 800 ₽"), time: M30 },
      { name: { ru: "Чёлка", en: "Fringe" }, price: p("1 000 ₽"), time: M20 },
      { name: { ru: "Брашинг (короткие волосы)", en: "Brushing (short hair)" }, price: p("2 500 ₽"), time: H1 },
      { name: { ru: "Брашинг (средние волосы)", en: "Brushing (medium hair)" }, price: p("3 000 ₽"), time: H1 },
      { name: { ru: "Брашинг (длинные волосы)", en: "Brushing (long hair)" }, price: p("3 500 ₽"), time: H1 },
      { name: { ru: "SPA-уход для волос от NASHI Argan", en: "NASHI Argan hair SPA care" }, price: p("5 500 – 9 500 ₽"), time: H2 },
      { name: { ru: "Уход для абсолютной красоты волос OI DAVINES", en: "OI DAVINES absolute beauty hair care" }, price: p("4 500 – 6 000 ₽"), time: H130 },
      { name: { ru: "Express-укладка x Dyson airwrap", en: "Express styling x Dyson airwrap" }, price: p("2 500 ₽"), time: H1 },
      { name: { ru: "Афро-кудри", en: "Afro curls" }, price: p("2 500 – 4 000 ₽"), time: H1 },
      { name: { ru: "Мытьё волос (доп. услуга)", en: "Hair wash (add-on)" }, price: p("700 ₽"), time: M30 },
    ],
  },
  {
    label: { ru: "Окрашивание волос", en: "Hair colouring" },
    sub: { ru: "Тонирование, сложное окрашивание, уход", en: "Toning, complex colouring, care" },
    from: { ru: "от 1 000 ₽", en: "from 1 000 ₽" },
    rows: [
      { name: { ru: "Консультация колориста", en: "Colourist consultation" }, price: p("1 000 ₽"), time: H1 },
      { name: { ru: "Окрашивание GLOW UP + уход", en: "GLOW UP colouring + care" }, price: p("5 000 – 12 000 ₽"), time: H2 },
      { name: { ru: "Окрашивание корней ARGAN & KERATIN от pH", en: "Root colouring ARGAN & KERATIN by pH" }, price: p("5 000 – 6 500 ₽"), time: H2 },
      { name: { ru: "Окрашивание волос ARGAN & KERATIN от pH", en: "Hair colouring ARGAN & KERATIN by pH" }, price: p("6 500 – 16 500 ₽"), time: H130 },
      { name: { ru: "Окрашивание волос от Davines (Mask)", en: "Davines colouring (Mask)" }, price: p("6 000 – 17 000 ₽"), time: H2 },
      { name: { ru: "Окрашивание волос от Davines (View)", en: "Davines colouring (View)" }, price: p("5 000 – 13 000 ₽"), time: H2 },
      { name: { ru: "Окрашивание корней от Davines (Mask)", en: "Root colouring by Davines (Mask)" }, price: p("5 500 – 7 500 ₽"), time: H130 },
      { name: { ru: "Окрашивание волос в один тон", en: "Single-tone colouring" }, price: p("от 6 000 ₽"), time: H2 },
    ],
  },
  {
    label: { ru: "Для мужчин", en: "For men" },
    sub: { ru: "Мужской маникюр, педикюр, комплекс", en: "Men's manicure, pedicure, combo" },
    from: { ru: "от 1 400 ₽", en: "from 1 400 ₽" },
    rows: [
      { name: { ru: "Мужской сервис (маникюр + педикюр)", en: "Men's service (mani + pedi)" }, price: p("4 400 ₽"), time: H130 },
      { name: { ru: "Мужской маникюр", en: "Men's manicure" }, price: p("1 400 ₽"), time: H1 },
      { name: { ru: "Мужской маникюр (топ-мастер)", en: "Men's manicure (top master)" }, price: p("1 600 ₽"), time: H1 },
      { name: { ru: "Мужской классический педикюр", en: "Men's classic pedicure" }, price: p("2 700 ₽"), time: H135 },
      { name: { ru: "Мужской педикюр smart-дисками", en: "Men's smart-disc pedicure" }, price: p("2 700 ₽"), time: H130 },
      { name: { ru: "Мужской педикюр smart-дисками (топ-мастер)", en: "Men's smart-disc pedicure (top master)" }, price: p("3 000 ₽"), time: H130 },
    ],
  },
];

export default function SalonPage() {
  return (
    <main>
      <ScrollReveal />
      <Header />
      <div className="relative z-10 bg-white pt-[68px]">
        <SalonServices
          eyebrow={{ ru: "услуги и цены", en: "services & prices" }}
          title={{ ru: "Услуги салона", en: "Salon services" }}
          categories={SALON_CATEGORIES}
          cta={{ label: { ru: "Записаться", en: "Book now" }, href: YCLIENTS }}
        />
        <Reviews />
      </div>
      <Footer />
    </main>
  );
}
