"use client";
// Блок перед подвалом: слева — карта Яндекс с салоном, справа — заголовок,
// телефон и мессенджеры. По мотивам massage-romanova, в стиле ÁLIS. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHONE = "+7 988 888 77 58";
const WA = "79888887758";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const MAP_EMBED = "https://yandex.ru/map-widget/v1/org/63024642190/";
const IG = "https://www.instagram.com/alisbeauty.ru";
const ADDRESS = { ru: "Новороссийск, ул. Пархоменко, 53", en: "Novorossiysk, Parkhomenko St., 53" };

export default function ContactsCTA() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const tel = PHONE.replace(/[^\d+]/g, "");

  const pill =
    "inline-flex items-center justify-center gap-2 rounded-full border border-[#3B0D1A]/25 px-6 py-3 text-[13px] uppercase tracking-[0.1em] text-[#3B0D1A] transition-colors duration-300 hover:border-[#3B0D1A] hover:bg-[#3B0D1A] hover:text-[#f4efe6]";

  return (
    <section id="contacts" className="scroll-mt-24 bg-white py-24 lg:py-28">
      <div className="mx-auto grid w-[94%] max-w-[1400px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Карта */}
        <div className="overflow-hidden rounded-[24px] border border-[#17191a]/10 shadow-[0_18px_44px_rgba(0,0,0,0.08)]">
          <iframe
            src={MAP_EMBED}
            title={t("Салон ÁLIS на карте", "ÁLIS salon on the map")}
            className="h-[320px] w-full lg:h-[440px]"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Текст + контакты */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
            {t("Контакты", "Contacts")}
          </span>
          <h2 className="mt-5 font-display text-[30px] font-normal uppercase leading-[1.12] tracking-[0.05em] text-[#3B0D1A] lg:text-[44px]">
            {t("Остались вопросы?", "Still have questions?")}
            <br />
            <span className="text-[#4A4B33]">{t("Напишите нам", "Message us")}</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#17191a]/60 lg:text-[16px]">
            {t(
              "С радостью ответим и поможем подобрать услуги под вашу задачу и удобное время.",
              "We'll gladly answer and help you choose services for your goal and a convenient time.",
            )}
          </p>

          <a href={`tel:${tel}`} className="mt-8 block font-display text-[26px] tracking-[0.04em] text-[#3B0D1A] transition-opacity hover:opacity-70 lg:text-[32px]">
            {PHONE}
          </a>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className={pill}>WhatsApp</a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className={pill}>Instagram</a>
            <a href={`tel:${tel}`} className={pill}>{t("Позвонить", "Call")}</a>
          </div>

          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="mt-8 block text-[14px] text-[#17191a]/55 transition-opacity hover:opacity-70">
            <span className="text-[#17191a]/45">{t("Адрес:", "Address:")}</span> {ADDRESS[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
