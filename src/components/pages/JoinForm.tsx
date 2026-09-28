"use client";
// Анкета «стать частью команды» (#join) — единая тёмная форма без фото (RequestForm).
import RequestForm from "@/components/pages/RequestForm";

export default function JoinForm() {
  return (
    <RequestForm
      id="join"
      title={{ ru: "Стать частью команды ÁLIS BEAUTY", en: "Become part of ÁLIS BEAUTY" }}
      text={{
        ru: "Оставьте контакты — расскажем об условиях и позовём на пробный день.",
        en: "Leave your contacts — we'll tell you about the terms and invite you to a trial day.",
      }}
      fields={[
        { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
        { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
      ]}
      submit={{ ru: "Отправить", en: "Send" }}
      success={{ ru: "Мы получили вашу заявку и скоро свяжемся с вами.", en: "We've received your application and will get back to you soon." }}
    />
  );
}
