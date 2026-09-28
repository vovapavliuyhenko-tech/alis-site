"use client";
// Форма заявки на сотрудничество (#request) — единая тёмная форма без фото (RequestForm).
import RequestForm from "@/components/pages/RequestForm";

export default function CooperationForm() {
  return (
    <RequestForm
      id="request"
      title={{ ru: "Оставить заявку на сотрудничество", en: "Leave a partnership request" }}
      fields={[
        { key: "name", label: { ru: "Имя / компания", en: "Name / company" }, required: true },
        { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
        { key: "message", label: { ru: "Коротко о задаче", en: "About your idea" }, required: false, textarea: true },
      ]}
      submit={{ ru: "Оставить заявку", en: "Leave a request" }}
      success={{ ru: "Мы получили вашу заявку и скоро свяжемся с вами.", en: "We've received your request and will get back to you soon." }}
    />
  );
}
