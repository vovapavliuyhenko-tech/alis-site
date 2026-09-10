"use client";
// КОНТАКТЫ — сплит: слева карта Яндекс (скруглённая, с отступом), справа винная
// панель с кремовым текстом: надстрочник, крупный заголовок, КРУПНЫЙ телефон,
// адрес/часы и ряд соц-кнопок с инверсией на ховере. Появление лесенкой (r-reveal).
import { useLang } from "@/lib/i18n";

const PHONE = "+7 988 888 77 58";
const WA = "79888887758";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const MAP_EMBED = "https://yandex.ru/map-widget/v1/org/63024642190/";
const IG = "https://www.instagram.com/alisbeauty.ru";
const ADDRESS = { ru: "Новороссийск, ул. Пархоменко, 53", en: "Novorossiysk, Parkhomenko St., 53" };
const HOURS = { ru: "Без выходных, 9:00–21:00", en: "Open daily, 9:00–21:00" };

export default function ContactsCTA() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const tel = PHONE.replace(/[^\d+]/g, "");

  const pill =
    "inline-flex items-center justify-center rounded-full border border-[#f4efe6]/40 px-6 py-3 text-[13px] uppercase tracking-[0.12em] text-[#f4efe6] transition-colors duration-300 hover:border-[#f4efe6] hover:bg-[#f4efe6] hover:text-[#3B0D1A]";

  return (
    <section id="contacts" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto grid w-[94%] max-w-[1400px] items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Карта */}
        <div className="r-reveal overflow-hidden rounded-[24px] border border-[#17191a]/10 shadow-[0_18px_44px_rgba(0,0,0,0.08)]">
          <iframe
            src={MAP_EMBED}
            title={t("Салон ÁLIS на карте", "ÁLIS salon on the map")}
            className="h-[320px] w-full lg:h-full lg:min-h-[520px]"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Винная панель с контактами */}
        <div className="flex flex-col justify-center rounded-[24px] bg-[#3B0D1A] px-8 py-12 text-[#f4efe6] lg:min-h-[520px] lg:px-12">
          <span className="r-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#f4efe6]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#f4efe6]/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f4efe6]" />
            {t("Контакты", "Contacts")}
          </span>

          <h2 className="r-reveal mt-6 font-display text-[28px] font-normal uppercase leading-[1.12] tracking-[0.04em] lg:text-[42px]">
            {t("Остались вопросы?", "Still have questions?")}
            <br />
            <span className="text-[#c9a98f]">{t("Напишите нам", "Message us")}</span>
          </h2>

          <p className="r-reveal mt-5 max-w-md text-[14px] leading-relaxed text-[#f4efe6]/70 lg:text-[15px]">
            {t(
              "С радостью ответим и поможем подобрать услуги под вашу задачу и удобное время.",
              "We'll gladly answer and help you choose services for your goal and a convenient time.",
            )}
          </p>

          <a href={`tel:${tel}`} className="r-reveal mt-8 block w-fit font-display text-[30px] tracking-[0.04em] text-[#f4efe6] transition-opacity hover:opacity-70 lg:text-[40px]">
            {PHONE}
          </a>

          <div className="r-reveal mt-3 space-y-1 text-[13.5px] text-[#f4efe6]/55">
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70">
              <span className="text-[#f4efe6]/40">{t("Адрес:", "Address:")}</span> {ADDRESS[lang]}
            </a>
            <p><span className="text-[#f4efe6]/40">{t("Часы:", "Hours:")}</span> {HOURS[lang]}</p>
          </div>

          <div className="r-reveal mt-8 flex flex-wrap gap-3">
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className={pill}>WhatsApp</a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className={pill}>Instagram</a>
            <a href={`tel:${tel}`} className={pill}>{t("Позвонить", "Call")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
