// ПРАЙС КОНСЬЕРЖ-СЕРВИСА — с листов заказчицы («Базовые услуги», «Свадебный сервис»,
// «Стоимость выезда», «Сопровождение»). Укладка: цены исправлены заказчицей от руки (5 000 / 7 000 у «топ»).
type Loc = { ru: string; en: string };
type Row = { name: Loc; price: Loc };
type Group = { title?: Loc; rows: Row[] };
export type ConciergeCategory = { slug?: string; label: Loc; sub: Loc; from: Loc; groups: Group[] };

const r = (v: string): Loc => ({ ru: `${v} ₽`, en: `${v} ₽` });
const from = (v: string): Loc => ({ ru: `от ${v} ₽`, en: `from ${v} ₽` });
const TOP = { ru: " (специалисты категории «топ»)", en: " (top artists)" };
const top = (n: Loc): Loc => ({ ru: n.ru + TOP.ru, en: n.en + TOP.en });

const FULL = { ru: "Полный образ", en: "Full look" };
const MAKEUP = { ru: "Макияж", en: "Makeup" };
const STYLING = { ru: "Укладка", en: "Hair styling" };
const WEDDING = { ru: "Свадебный образ", en: "Bridal look" };
const TRIAL = { ru: "Пробный свадебный образ", en: "Bridal trial" };

export const CONCIERGE_PRICES: ConciergeCategory[] = [
  {
    label: { ru: "Базовые услуги", en: "Core services" },
    sub: { ru: "Полный образ, макияж, укладка", en: "Full look, makeup, hair styling" },
    from: from("5 000"),
    groups: [
      {
        rows: [
          { name: FULL, price: r("10 000") },
          { name: top(FULL), price: r("12 500") },
          { name: MAKEUP, price: r("5 000") },
          { name: top(MAKEUP), price: r("7 000") },
          { name: STYLING, price: r("5 000") },
          { name: top(STYLING), price: r("7 000") },
        ],
      },
    ],
  },
  {
    label: { ru: "Свадебный сервис", en: "Bridal service" },
    sub: { ru: "Свадебный и пробный образ, подбор look от стилиста", en: "Bridal and trial looks, a stylist-picked look" },
    from: from("9 500"),
    groups: [
      {
        rows: [
          { name: WEDDING, price: r("14 000") },
          { name: top(WEDDING), price: r("16 500") },
          { name: TRIAL, price: r("9 500") },
          { name: top(TRIAL), price: r("12 000") },
          { name: { ru: "Свадебный образ и подбор 1-го look от стилиста", en: "Bridal look + one look picked by a stylist" }, price: r("19 000") },
          { name: { ru: "Полный образ и подбор 1-го look на мероприятие от стилиста", en: "Full look + one event look picked by a stylist" }, price: r("15 000") },
        ],
      },
    ],
  },
  {
    label: { ru: "Стоимость выезда", en: "Travel fee" },
    sub: { ru: "От 2-х специалистов; другое количество специалистов обговаривается отдельно", en: "From 2 specialists; other team sizes are agreed separately" },
    from: from("4 000"),
    groups: [
      {
        rows: [
          { name: { ru: "Новороссийск", en: "Novorossiysk" }, price: from("4 000") },
          { name: { ru: "Геленджик / Анапа / Абрау-Дюрсо и близлежащие локации", en: "Gelendzhik / Anapa / Abrau-Durso and nearby" }, price: from("12 000") },
          { name: { ru: "Краснодар / Ростов", en: "Krasnodar / Rostov" }, price: from("30 000") },
          { name: { ru: "Сочи / Адлер", en: "Sochi / Adler" }, price: from("45 000") },
          { name: { ru: "Москва / Санкт-Петербург", en: "Moscow / Saint Petersburg" }, price: { ru: "по запросу", en: "on request" } },
        ],
      },
    ],
  },
  {
    label: { ru: "Сопровождение", en: "Stay-on support" },
    sub: { ru: "Специалист рядом в течение события, смена образа", en: "A specialist by your side during the event, look changes" },
    from: from("2 000"),
    groups: [
      {
        rows: [
          { name: { ru: "1 специалист (час) — стилист или визажист", en: "1 specialist per hour — hairstylist or makeup artist" }, price: r("2 000") },
          { name: { ru: "2 специалиста (час)", en: "2 specialists per hour" }, price: r("4 000") },
          { name: { ru: "Полная смена образа", en: "Full look change" }, price: r("10 000") },
          { name: top({ ru: "Полная смена образа", en: "Full look change" }), price: r("12 500") },
          { name: { ru: "Частичная смена образа (причёска или макияж)", en: "Partial look change (hair or makeup)" }, price: r("5 000") },
        ],
      },
    ],
  },
];
