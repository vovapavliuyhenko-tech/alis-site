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
  // Новогодние новости — черновые тексты заказчицы (поправим позже)
  {
    slug: "december-booking",
    title: { ru: "Запись на декабрь открыта", en: "December bookings are open" },
    cat: "salon",
    date: "2026-11-13",
    read: 1,
    excerpt: {
      ru: "Волшебство случается с теми, кто позаботился о записи.",
      en: "Magic happens to those who book ahead.",
    },
    image: "/assets/works/nails_red_tile.jpg",
    content: [
      { type: "p", text: { ru: "Волшебство случается с теми, кто позаботился о записи. Встретить Новый год со свежим маникюром намного проще, чем кажется.", en: "Magic happens to those who book ahead. Greeting the New Year with a fresh manicure is easier than it seems." } },
      { type: "quote", text: { ru: "Оформите визит прямо сейчас, чтобы блистать в главную ночь!", en: "Book your visit now and shine on the most important night of the year!" } },
    ],
    cta: { label: { ru: "Оформить визит", en: "Book a visit" }, href: YCLIENTS },
  },
  {
    slug: "new-year-gift-box",
    title: { ru: "Подарок, который захочется открыть задолго до боя курантов", en: "A gift you'll want to open long before midnight" },
    cat: "shop",
    date: "2026-11-12",
    read: 2,
    excerpt: {
      ru: "Бьюти-боксы с продуктами нашей витрины на любой бюджет — подберём наполнение и красиво упакуем.",
      en: "Beauty boxes with products from our shelves for any budget — we'll choose the contents and wrap them beautifully.",
    },
    image: "/assets/box/box_red_open.jpg",
    content: [
      { type: "p", text: { ru: "Подарок, который точно захочется открыть задолго до боя курантов, должен быть от ÁLIS BEAUTY.", en: "A gift you'll want to open long before the clock strikes midnight should be from ÁLIS BEAUTY." } },
      { type: "p", text: { ru: "Мы подготовили всё за вас: бьюти-боксы с продуктами нашей витрины на любой бюджет. Вам остаётся только назвать получателя — подберём наполнение и красиво упакуем.", en: "We've prepared everything for you: beauty boxes with products from our shelves for any budget. Just tell us who it's for — we'll choose the contents and wrap it beautifully." } },
      { type: "h2", text: { ru: "Кому подойдёт?", en: "Who is it for?" } },
      { type: "p", text: { ru: "Бокс размера S — комплимент коллеге, подруге или классному руководителю.", en: "Size S box — a lovely gesture for a colleague, a friend or a class teacher." } },
      { type: "p", text: { ru: "Бокс размера M — для самых близких и родных.", en: "Size M box — for your nearest and dearest." } },
      { type: "quote", text: { ru: "Приятно дарить и получать!", en: "A joy to give and to receive!" } },
    ],
    cta: { label: { ru: "Собрать бокс", en: "Build a box" }, href: "/shop#box" },
  },
  {
    slug: "gift-certificate",
    title: { ru: "Подарочные сертификаты ÁLIS BEAUTY", en: "ÁLIS BEAUTY gift certificates" },
    cat: "salon",
    date: "2026-11-11",
    read: 1,
    excerpt: {
      ru: "Не определились с подарком? Подарите впечатление.",
      en: "Not sure what to give? Give an experience.",
    },
    image: "/assets/works/certificate_envelope.jpg",
    content: [
      { type: "p", text: { ru: "Не определились с подарком? Подарите впечатление.", en: "Not sure what to give? Give an experience." } },
      { type: "p", text: { ru: "Мы подготовим сертификат на любую сумму, комфортную для вашего бюджета. А получатель сам выберет то, что ему по душе: услуги салона или продукцию с наших бьюти-полок.", en: "We'll prepare a certificate for any amount that suits your budget. And the recipient chooses what they love: salon services or products from our beauty shelves." } },
    ],
    cta: { label: { ru: "Купить сертификат", en: "Buy a certificate" }, href: "https://o8981.yclients.ru/certificates" },
  },
  {
    slug: "new-year-movie-night",
    title: { ru: "Ежегодный кинопросмотр новогоднего фильма", en: "Our annual New Year movie night" },
    cat: "salon",
    date: "2026-11-10",
    read: 1,
    excerpt: {
      ru: "Атмосфера праздника с любимой зимней кинокартиной из детства — для создания волшебного настроения.",
      en: "The festive atmosphere of a favourite winter film from childhood — to create a magical mood.",
    },
    image: "/assets/alis/salon_cup.jpg",
    content: [
      { type: "p", text: { ru: "Ежегодный кинопросмотр новогоднего фильма для создания волшебного настроения: атмосфера праздника с любимой зимней кинокартиной из детства.", en: "Our annual New Year movie night to create a magical mood: the festive atmosphere of a favourite winter film from childhood." } },
      { type: "p", text: { ru: "В прошлом году на экране был «Один дома». Что ждёт вас этой зимой?", en: "Last year we watched “Home Alone”. What's in store for you this winter?" } },
      { type: "quote", text: { ru: "Следите за новостями в наших социальных сетях, чтобы не пропустить дату мероприятия.", en: "Follow our social media so you don't miss the date." } },
    ],
    cta: { label: { ru: "Следить за новостями", en: "Follow our news" }, href: "https://www.instagram.com/alisbeauty.ru" },
  },
  {
    slug: "bonus-500",
    title: { ru: "500 бонусных рублей на первый визит", en: "500 bonus roubles on your first visit" },
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
    cta: { label: { ru: "Оформить визит", en: "Book a visit" }, href: YCLIENTS },
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
    image: "/assets/alis/work_makeup_evening.jpg",
    gallery: ["/assets/alis/img_1834.jpg", "/assets/alis/img_1855.jpg", "/assets/alis/salon_cup_flatlay.jpg"],
    content: [
      { type: "p", text: { ru: "Консьерж-сервис ÁLIS BEAUTY — это услуги салона с выездом туда, где вам удобно.", en: "ÁLIS BEAUTY concierge service brings salon treatments wherever suits you." } },
      { type: "h2", text: { ru: "Как это работает", en: "How it works" } },
      { type: "p", text: { ru: "Оставьте заявку на сайте или позвоните по номеру +7 988 888 77 28 — консьерж уточнит детали, подберёт мастеров и время.", en: "Leave a request on the website or call +7 988 888 77 28 — the concierge will confirm details, artists and timing." } },
    ],
    cta: { label: { ru: "Всё о консьерж-сервисе", en: "About the concierge service" }, href: "/concierge" },
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
