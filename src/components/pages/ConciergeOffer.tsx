"use client";
// Заявка на консьерж-сервис (#offer, #booking) — единая тёмная форма без фото (RequestForm).
import RequestForm from "@/components/pages/RequestForm";

export default function ConciergeOffer() {
  return (
    <RequestForm
      id="offer"
      innerId="booking"
      title={{ ru: "Оставить заявку", en: "Leave a request" }}
      text={{
        ru: "Не тратьте утро праздника на дорогу в салон и поиски мастеров. Команда ÁLIS BEAUTY приедет к вам со всем оборудованием — вам останется только быть готовой вовремя.",
        en: "Don't spend the morning of your big day travelling to a salon or hunting for artists. The ÁLIS BEAUTY team comes to you fully equipped — all you have to do is be ready on time.",
      }}
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
