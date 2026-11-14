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
    image: "/assets/works/nails_red_tile_news.jpg",
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
    image: "/assets/works/news_box.jpg",
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
    image: "/assets/works/news_movie.jpg",
    content: [
      { type: "p", text: { ru: "Ежегодный кинопросмотр новогоднего фильма для создания волшебного настроения: атмосфера праздника с любимой зимней кинокартиной из детства.", en: "Our annual New Year movie night to create a magical mood: the festive atmosphere of a favourite winter film from childhood." } },
      { type: "p", text: { ru: "В прошлом году на экране был «Один дома». Что ждёт вас этой зимой?", en: "Last year we watched “Home Alone”. What's in store for you this winter?" } },
      { type: "quote", text: { ru: "Следите за новостями в наших социальных сетях, чтобы не пропустить дату мероприятия.", en: "Follow our social media so you don't miss the date." } },
    ],
    cta: { label: { ru: "Следить за новостями", en: "Follow our news" }, href: "https://www.instagram.com/alisbeauty.ru" },
  },
];
