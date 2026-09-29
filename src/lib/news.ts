// Новости ÁLIS BEAUTY — по образцу блога paloma.website/blog.html.
// Тексты-черновики собраны из того, что уже есть на сайте, — согласовать с клиенткой.
// Фото временные. Чтобы добавить новость — допишите объект в начало массива.

export type Loc = { ru: string; en: string };

export type NewsBlock =
  | { type: "p"; text: Loc }
  | { type: "h2"; text: Loc }
  | { type: "quote"; text: Loc };

export type NewsItem = {
  slug: string;
  title: Loc;
  cat: "salon" | "concierge" | "shop";
  date: string; // ГГГГ-ММ-ДД
  read: number; // минут чтения
  excerpt: Loc;
  image: string;
  gallery?: string[];
  content: NewsBlock[];
  cta?: { label: Loc; href: string };
};

export const NEWS_CATS: { id: "all" | NewsItem["cat"]; label: Loc }[] = [
  { id: "all", label: { ru: "Все", en: "All" } },
  { id: "salon", label: { ru: "Салон красоты", en: "Beauty salon" } },
  { id: "concierge", label: { ru: "Консьерж-сервис", en: "Concierge service" } },
  { id: "shop", label: { ru: "Магазин", en: "Shop" } },
];

export const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";

export const NEWS: NewsItem[] = [
  {
    slug: "bonus-500",
    title: { ru: "500 бонусных рублей на первый визит", en: "500 bonus roubles for your first visit" },
    cat: "salon",
    date: "2026-09-25",
    read: 2,
    excerpt: {
      ru: "Впервые в ÁLIS BEAUTY? Дарим 500 бонусных рублей — их можно потратить уже на первой процедуре.",
      en: "First time at ÁLIS BEAUTY? We give you 500 bonus roubles to spend on your very first treatment.",
    },
    image: "/assets/alis/img_6009.jpg",
    gallery: ["/assets/alis/img_2745.jpg", "/assets/alis/img_2746.jpg", "/assets/alis/img_2749.jpg"],
    content: [
      { type: "p", text: { ru: "Для новых гостей салона ÁLIS BEAUTY действует приветственный бонус — 500 бонусных рублей на первый визит.", en: "New guests of ÁLIS BEAUTY receive a welcome bonus — 500 bonus roubles for the first visit." } },
      { type: "h2", text: { ru: "Как получить", en: "How to get it" } },
      { type: "p", text: { ru: "Оформите визит онлайн или по телефону +7 988 888 77 58 — бонусы начислятся автоматически и будут учтены при оплате.", en: "Book online or call +7 988 888 77 58 — the bonus is credited automatically and applied at checkout." } },
      { type: "quote", text: { ru: "Без перерывов и выходных, 9:00–21:00.", en: "Open daily without breaks, 9:00–21:00." } },
    ],
    cta: { label: { ru: "Оформить визит", en: "Arrange a visit" }, href: YCLIENTS },
  },
  {
    slug: "concierge-service",
    title: { ru: "Салон красоты там, где вам удобно", en: "A beauty salon wherever suits you" },
    cat: "concierge",
    date: "2026-09-18",
    read: 3,
    excerpt: {
      ru: "ÁLIS BEAUTY CONCIERGE — мастера приезжают к вам: домой, в отель, на площадку мероприятия или съёмку.",
      en: "ÁLIS BEAUTY CONCIERGE — our artists come to you: home, hotel, event venue or photo shoot.",
    },
    image: "/assets/alis/img_2672.jpg",
    gallery: ["/assets/alis/img_1834.jpg", "/assets/alis/img_1855.jpg", "/assets/alis/img_2455.jpg"],
    content: [
      { type: "p", text: { ru: "Консьерж-сервис ÁLIS BEAUTY — это услуги салона с выездом туда, где вам удобно.", en: "ÁLIS BEAUTY concierge service brings salon treatments wherever suits you." } },
      { type: "h2", text: { ru: "Как это работает", en: "How it works" } },
      { type: "p", text: { ru: "Оставьте заявку на сайте или позвоните по номеру +7 988 888 77 28 — консьерж уточнит детали, подберёт мастеров и время.", en: "Leave a request on the website or call +7 988 888 77 28 — the concierge will confirm details, artists and timing." } },
    ],
    cta: { label: { ru: "Всё о консьерж-сервисе", en: "About the concierge service" }, href: "/concierge" },
  },
  {
    slug: "gift-certificate",
    title: { ru: "Подарочный сертификат ÁLIS BEAUTY", en: "ÁLIS BEAUTY gift certificate" },
    cat: "salon",
    date: "2026-09-10",
    read: 1,
    excerpt: {
      ru: "Немного ÁLIS BEAUTY — с собой. Сертификат можно купить онлайн и подарить близким.",
      en: "A little ÁLIS BEAUTY to take away. Buy a certificate online and give it to someone special.",
    },
    image: "/assets/alis/img_3283.jpg",
    content: [
      { type: "p", text: { ru: "Подарочный сертификат ÁLIS BEAUTY можно оформить онлайн за пару минут и подарить на любой повод.", en: "An ÁLIS BEAUTY gift certificate can be purchased online in a couple of minutes for any occasion." } },
    ],
    cta: { label: { ru: "Купить сертификат", en: "Buy a certificate" }, href: "https://o8981.yclients.ru/certificates" },
  },
  {
    slug: "shop-opening",
    title: { ru: "Открылся магазин ÁLIS BEAUTY", en: "The ÁLIS BEAUTY shop is open" },
    cat: "shop",
    date: "2026-09-01",
    read: 1,
    excerpt: {
      ru: "Новинки и выбор салона — теперь на сайте. Оформить заказ можно в пару кликов.",
      en: "New arrivals and salon favourites are now online. Order in a couple of clicks.",
    },
    image: "/assets/alis/img_8578.jpg",
    content: [
      { type: "p", text: { ru: "На сайте появился магазин ÁLIS BEAUTY: новинки, все товары и подарочный сертификат — в одном месте.", en: "The ÁLIS BEAUTY shop is now on the website: new arrivals, all products and the gift certificate in one place." } },
    ],
    cta: { label: { ru: "В магазин", en: "To the shop" }, href: "/shop" },
  },
];
