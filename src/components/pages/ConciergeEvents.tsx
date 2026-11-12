"use client";
// ГАЛЕРЕЯ ВЫЕЗДНЫХ СОБЫТИЙ — та же бегущая лента, что на главной (PhotoMarquee), но карточки
// переворачиваются: на обороте событие, задача/итог и кнопка «Рассчитать стоимость выезда».
// Данные — src/lib/conciergeEvents.ts.
import PhotoMarquee, { type MarqueeItem } from "@/components/pages/PhotoMarquee";
import { CONCIERGE_EVENTS } from "@/lib/conciergeEvents";

const ITEMS: MarqueeItem[] = CONCIERGE_EVENTS.map((e) => ({
  src: e.media,
  cap: e.city,
  back: {
    eyebrow: e.city,
    title: e.event ?? e.city,
    text: e.text ?? { ru: "Подробности события скоро появятся.", en: "Event details coming soon." },
    cta: { label: { ru: "Рассчитать стоимость выезда", en: "Calculate the travel cost" }, href: "#calc" },
  },
}));

export default function ConciergeEvents() {
  return (
    <PhotoMarquee
      sectionId="events"
      items={ITEMS}
      title={{ ru: "Галерея выездных событий", en: "Gallery of our on-location events" }}
      cta={null}
    />
  );
}
