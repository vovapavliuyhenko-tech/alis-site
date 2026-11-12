// ГАЛЕРЕЯ ВЫЕЗДНЫХ СОБЫТИЙ (страница консьержа) — по голосовому заказчицы:
// «событие, город, задача, итоги», + цифры (гостей, за какое время собрали).
// TODO: фото/видео и тексты по каждому городу пришлёт Зера. Пока заполнены только города,
// фото временные. Пустые поля на сайте не показываются; если пусто всё — «Подробности скоро».
// media: .jpg/.webp — фото, .mp4/.webm — видео (автовоспроизведение без звука).
export type Loc = { ru: string; en: string };
export type ConciergeEvent = {
  city: Loc;
  media: string;
  event?: Loc; // какое мероприятие
  task?: Loc; // задача
  result?: Loc; // итог
  facts?: Loc[]; // короткие цифры: «120 гостей», «8 образов за 3 часа»
};

export const CONCIERGE_EVENTS: ConciergeEvent[] = [
  { city: { ru: "Краснодар", en: "Krasnodar" }, media: "/assets/alis/look_red_2.jpg" },
  { city: { ru: "Сочи", en: "Sochi" }, media: "/assets/alis/work_hair_waves.jpg" },
  { city: { ru: "Ереван", en: "Yerevan" }, media: "/assets/alis/img_6009.jpg" },
];
