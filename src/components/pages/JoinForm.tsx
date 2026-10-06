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
      { ru: "Салон в Новороссийске или международная команда", en: "The Novorossiysk salon or the international team" },
      { ru: "Собеседование и пробная работа по стандартам ÁLIS BEAUTY", en: "An interview and a trial work to ÁLIS BEAUTY standards" },
      ]}
      fields={[
        { key: "name", label: { ru: "Имя", en: "Name" }, required: true },
        { key: "phone", label: { ru: "Телефон", en: "Phone" }, required: true, type: "tel" },
        { key: "direction", label: { ru: "Салон или международная команда, специализация", en: "Salon or international team, speciality" }, required: false },
        { key: "portfolio", label: { ru: "Ссылка на 10 работ (портфолио, соцсеть, облако)", en: "Link to 10 works (portfolio, social, cloud)" }, required: false, textarea: true },
      ]}
      submit={{ ru: "Отправить", en: "Send" }}
      success={{ ru: "Мы получили вашу заявку и скоро свяжемся с вами.", en: "We've received your application and will get back to you soon." }}
    />
  );
}
