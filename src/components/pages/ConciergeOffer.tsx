"use client";
// Заявка на консьерж-сервис (#offer, #booking) — единая тёмная форма без фото (RequestForm).
import RequestForm from "@/components/pages/RequestForm";

export default function ConciergeOffer() {
  return (
    <RequestForm
      id="offer"
      kind="concierge"
      innerId="booking"
      title={{ ru: "Оставить заявку", en: "Leave a request" }}
      text={{
        ru: "Приедем к вам со всем оборудованием — вы будете готовы вовремя.",
        en: "We come to you fully equipped — you'll be ready on time.",
      }}
      bullets={[
      { ru: "Команда визажистов, стилистов и координаторов", en: "A team of makeup artists, stylists and coordinators" },
      { ru: "Полный образ «под ключ» в день события", en: "A turnkey full look on the day" },
      ]}
      fields={[
        { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
        { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
        { key: "event", label: { ru: "Повод и дата", en: "Occasion & date" }, required: false, textarea: true },
      ]}
      submit={{ ru: "Оставить заявку", en: "Leave a request" }}
      success={{
        ru: "Свяжемся с вами в течение дня — подберём формат выезда и назовём стоимость.",
        en: "We'll reach out within a day — shape the format and confirm the price.",
      }}
    />
  );
}
