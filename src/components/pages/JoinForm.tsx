"use client";
// Анкета «стать частью команды» (#join) — единая тёмная форма без фото (RequestForm).
import RequestForm from "@/components/pages/RequestForm";

export default function JoinForm() {
  return (
    <RequestForm
      id="join"
      kind="vacancy"
      title={{ ru: "Стать частью команды ÁLIS BEAUTY", en: "Become part of ÁLIS BEAUTY" }}
      text={{
        ru: "Сильная команда, комфортное место и возможность расти.",
        en: "A strong team, a comfortable workplace and room to grow.",
      }}
      bullets={[
      { ru: "Комфортное рабочее место в салоне", en: "A comfortable workplace in the salon" },
      { ru: "Пробный день — знакомимся без обязательств", en: "A trial day — no strings attached" },
      ]}
      fields={[
        { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
        { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
      ]}
      submit={{ ru: "Отправить", en: "Send" }}
      success={{ ru: "Мы получили вашу заявку и скоро свяжемся с вами.", en: "We've received your application and will get back to you soon." }}
    />
  );
}
