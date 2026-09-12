import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SalonServices from "@/components/pages/SalonServices";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

// Прайс салона — основные категории и услуги (по актуальной онлайн-записи).
// Полный список — в виджете записи; здесь ключевые позиции.
const SALON_CATEGORIES = [
  {
    label: { ru: "Маникюр и педикюр", en: "Manicure & pedicure" },
    sub: { ru: "Маникюр, педикюр, наращивание, уход", en: "Manicure, pedicure, extensions, care" },
    from: { ru: "от 1 450 ₽", en: "from 1 450 ₽" },
    rows: [
      { name: { ru: "Маникюр без покрытия", en: "Manicure, no coating" }, price: { ru: "1 450 ₽", en: "1 450 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Маникюр + гель-лак", en: "Manicure + gel polish" }, price: { ru: "2 400 ₽", en: "2 400 ₽" }, time: { ru: "2 ч", en: "2 h" } },
      { name: { ru: "Классический педикюр + гель-лак", en: "Classic pedicure + gel polish" }, price: { ru: "3 000 ₽", en: "3 000 ₽" }, time: { ru: "1 ч 30 мин", en: "1 h 30 min" } },
      { name: { ru: "Особенный сервис (маникюр + педикюр)", en: "Signature service (mani + pedi)" }, price: { ru: "5 700 ₽", en: "5 700 ₽" }, time: { ru: "2 ч", en: "2 h" } },
      { name: { ru: "Наращивание ногтей", en: "Nail extensions" }, price: { ru: "от 2 700 ₽", en: "from 2 700 ₽" }, time: { ru: "3 ч", en: "3 h" } },
    ],
  },
  {
    label: { ru: "Парикмахерские услуги", en: "Hairdressing" },
    sub: { ru: "Стрижки, укладки, уход, свадебные образы", en: "Cuts, styling, care, bridal looks" },
    from: { ru: "от 1 800 ₽", en: "from 1 800 ₽" },
    rows: [
      { name: { ru: "Детская стрижка (до 14 лет)", en: "Kids' haircut (under 14)" }, price: { ru: "1 800 ₽", en: "1 800 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Укладка (средняя длина)", en: "Styling (medium length)" }, price: { ru: "3 500 ₽", en: "3 500 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Вечерняя причёска", en: "Evening hairstyle" }, price: { ru: "от 3 500 ₽", en: "from 3 500 ₽" }, time: { ru: "1 ч 30 мин", en: "1 h 30 min" } },
      { name: { ru: "SPA-уход для волос NASHI Argan", en: "NASHI Argan hair SPA care" }, price: { ru: "от 5 500 ₽", en: "from 5 500 ₽" }, time: { ru: "2 ч", en: "2 h" } },
      { name: { ru: "Свадебный образ", en: "Bridal look" }, price: { ru: "10 000 ₽", en: "10 000 ₽" }, time: { ru: "1 ч", en: "1 h" } },
    ],
  },
  {
    label: { ru: "Окрашивание волос", en: "Hair colouring" },
    sub: { ru: "Тонирование, сложное окрашивание, уход", en: "Toning, complex colouring, care" },
    from: { ru: "от 1 000 ₽", en: "from 1 000 ₽" },
    rows: [
      { name: { ru: "Консультация колориста", en: "Colourist consultation" }, price: { ru: "1 000 ₽", en: "1 000 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Окрашивание в один тон", en: "Single-tone colouring" }, price: { ru: "от 6 000 ₽", en: "from 6 000 ₽" }, time: { ru: "2 ч", en: "2 h" } },
      { name: { ru: "Окрашивание GLOW UP + уход", en: "GLOW UP colouring + care" }, price: { ru: "от 5 000 ₽", en: "from 5 000 ₽" }, time: { ru: "2 ч", en: "2 h" } },
      { name: { ru: "Окрашивание ARGAN & KERATIN от pH", en: "ARGAN & KERATIN colouring by pH" }, price: { ru: "от 6 500 ₽", en: "from 6 500 ₽" }, time: { ru: "1 ч 30 мин", en: "1 h 30 min" } },
    ],
  },
  {
    label: { ru: "Для мужчин", en: "For men" },
    sub: { ru: "Мужской маникюр, педикюр, комплекс", en: "Men's manicure, pedicure, combo" },
    from: { ru: "от 1 400 ₽", en: "from 1 400 ₽" },
    rows: [
      { name: { ru: "Мужской маникюр", en: "Men's manicure" }, price: { ru: "1 400 ₽", en: "1 400 ₽" }, time: { ru: "1 ч", en: "1 h" } },
      { name: { ru: "Мужской классический педикюр", en: "Men's classic pedicure" }, price: { ru: "2 700 ₽", en: "2 700 ₽" }, time: { ru: "1 ч 35 мин", en: "1 h 35 min" } },
      { name: { ru: "Мужской сервис (маникюр + педикюр)", en: "Men's service (mani + pedi)" }, price: { ru: "4 400 ₽", en: "4 400 ₽" }, time: { ru: "1 ч 30 мин", en: "1 h 30 min" } },
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
