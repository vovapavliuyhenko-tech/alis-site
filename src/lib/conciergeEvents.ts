// ГАЛЕРЕЯ ВЫЕЗДНЫХ СОБЫТИЙ (страница консьержа) — по голосовому заказчицы:
// лента как на главной, карточка переворачивается (как на paloma.website), на обороте —
// событие, город, задача, итог, цифры (гостей, за какое время) и призыв к действию.
// TODO: фото/видео и тексты по каждому событию пришлёт Зера. Сейчас города и форматы — из текста
// заказчицы на главной («Свадьба в Ереване, съёмка в Москве, ужин в Каннах») + Краснодар и Сочи
// из голосового; фото временные, описания — «Подробности скоро».
// media: .jpg/.webp — фото, .mp4/.webm — видео.
export type Loc = { ru: string; en: string };
export type ConciergeEvent = {
  city: Loc;
  media: string;
  event?: Loc; // какое мероприятие — заголовок оборота
  text?: Loc; // задача и итог, цифры
};

export const CONCIERGE_EVENTS: ConciergeEvent[] = [
  { city: { ru: "Ереван", en: "Yerevan" }, event: { ru: "Свадьба", en: "Wedding" }, media: "/assets/alis/img_6009.jpg" },
  { city: { ru: "Москва", en: "Moscow" }, event: { ru: "Съёмка", en: "Photo shoot" }, media: "/assets/alis/look_red_2.jpg" },
  { city: { ru: "Канны", en: "Cannes" }, event: { ru: "Ужин", en: "Dinner" }, media: "/assets/alis/look_leopard.jpg" },
  { city: { ru: "Краснодар", en: "Krasnodar" }, media: "/assets/alis/work_hair_waves.jpg" },
  { city: { ru: "Сочи", en: "Sochi" }, media: "/assets/alis/work_makeup_evening.jpg" },
];
