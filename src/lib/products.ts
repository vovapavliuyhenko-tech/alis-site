// Каталог мерча ÁLIS. Фото — плейсхолдеры (заменить на съёмку товара).
export type Loc = { ru: string; en: string };
export type Product = {
  id: string;
  name: Loc;
  price: number;
  img: string;
  tag: Loc;
  desc: Loc;
};

export const PRODUCTS: Product[] = [
  {
    id: "hoodie",
    name: { ru: "Худи ÁLIS", en: "ÁLIS hoodie" },
    price: 4900,
    img: "/assets/tild6530-383_-2___1_.jpg",
    tag: { ru: "одежда", en: "apparel" },
    desc: {
      ru: "Мягкое худи оверсайз из плотного хлопкового футера с вышивкой ÁLIS. Унисекс, тёплое и уютное — как атмосфера салона.",
      en: "A soft oversized hoodie in dense cotton fleece with an ÁLIS embroidery. Unisex, warm and cosy — like the salon's mood.",
    },
  },
  {
    id: "tshirt",
    name: { ru: "Футболка ÁLIS", en: "ÁLIS tee" },
    price: 2400,
    img: "/assets/tild3236-393__.jpg",
    tag: { ru: "одежда", en: "apparel" },
    desc: {
      ru: "Базовая футболка из плотного хлопка с минималистичным логотипом. Свободный крой, приятная к телу.",
      en: "A staple heavy-cotton tee with a minimalist logo. Relaxed fit, soft to the touch.",
    },
  },
  {
    id: "shopper",
    name: { ru: "Шоппер ÁLIS", en: "ÁLIS shopper" },
    price: 1500,
    img: "/assets/tild6230-643__.jpg",
    tag: { ru: "аксессуары", en: "accessories" },
    desc: {
      ru: "Плотная хлопковая сумка-шоппер с длинными ручками. Вместительная — для покупок, зала и прогулок.",
      en: "A sturdy cotton shopper with long handles. Roomy — for shopping, the gym and walks.",
    },
  },
  {
    id: "candle",
    name: { ru: "Аромасвеча ÁLIS", en: "ÁLIS candle" },
    price: 1900,
    img: "/assets/tild3561-646_-2___1__5.jpg",
    tag: { ru: "дом", en: "home" },
    desc: {
      ru: "Соевая свеча с фирменным ароматом салона. Мягкое тепло и знакомый запах ухода за собой у вас дома.",
      en: "A soy candle with the salon's signature scent. Soft warmth and the familiar aroma of self-care at home.",
    },
  },
  {
    id: "mug",
    name: { ru: "Термокружка ÁLIS", en: "ÁLIS tumbler" },
    price: 1700,
    img: "/assets/tild3638-373_-2___1__3.jpg",
    tag: { ru: "аксессуары", en: "accessories" },
    desc: {
      ru: "Термокружка из нержавеющей стали, держит тепло до 6 часов. Матовое покрытие и лаконичный логотип.",
      en: "A stainless-steel tumbler that keeps drinks warm up to 6 hours. Matte finish and a clean logo.",
    },
  },
  {
    id: "careset",
    name: { ru: "Набор мини-уходов", en: "Mini care set" },
    price: 3200,
    img: "/assets/tild6536-613_-2___1__4.jpg",
    tag: { ru: "уход", en: "care" },
    desc: {
      ru: "Дорожный набор миниатюр профессионального ухода за волосами и кожей. Идеально в поездку и как подарок.",
      en: "A travel set of professional hair and skin care miniatures. Perfect for trips and as a gift.",
    },
  },
];

export const fmtPrice = (n: number, en = false) =>
  n.toLocaleString(en ? "en-US" : "ru-RU") + " ₽";
