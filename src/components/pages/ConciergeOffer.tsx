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
        ru: "Расскажите о событии — подберём формат выезда и назовём стоимость.",
        en: "Tell us about the event — we'll shape the format and confirm the price.",
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
