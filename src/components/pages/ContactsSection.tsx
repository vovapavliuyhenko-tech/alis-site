"use client";
// КОНТАКТЫ — адрес, телефоны (салон/сервис), email, часы, соцсети + ссылка на
// карту. Двуязычно.
import { useLang } from "@/lib/i18n";

const PHONE_SALON = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const IG_RU = "https://www.instagram.com/alisbeauty.ru";
const IG_GLOBAL = "https://www.instagram.com/alisbeauty.global";
const ADDRESS = { ru: "Новороссийск, ул. Пархоменко, 53", en: "Novorossiysk, Parkhomenko St., 53" };
const HOURS = { ru: "Без выходных, с 9:00 до 21:00", en: "Open daily, 9:00–21:00" };

export default function ContactsSection() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, enn: string) => (en ? enn : ru);
  const eyebrow = "text-[11px] uppercase tracking-[0.22em] text-[#4A4B33] mb-2";

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid w-[92%] max-w-[1180px] gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Инфо */}
        <div className="space-y-8">
          <div>
            <p className={eyebrow}>{t("Адрес", "Address")}</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="text-[16px] text-[#2a2320] transition-opacity hover:opacity-70 lg:text-[18px]">
              {ADDRESS[lang]}
            </a>
            <p className="mt-1 text-[14px] text-[#17191a]/55">{HOURS[lang]}</p>
          </div>
          <div>
            <p className={eyebrow}>{t("Телефоны", "Phones")}</p>
            <a href={`tel:${PHONE_SALON.replace(/[^\d+]/g, "")}`} className="block text-[16px] text-[#2a2320] transition-opacity hover:opacity-70 lg:text-[18px]">
              {PHONE_SALON} <span className="text-[#17191a]/45">— {t("салон", "salon")}</span>
            </a>
            <a href={`tel:${PHONE_SERVICE.replace(/[^\d+]/g, "")}`} className="mt-1 block text-[16px] text-[#2a2320] transition-opacity hover:opacity-70 lg:text-[18px]">
              {PHONE_SERVICE} <span className="text-[#17191a]/45">— {t("выездной сервис", "on-location")}</span>
            </a>
          </div>
          <div>
            <p className={eyebrow}>Email</p>
            <a href={`mailto:${EMAIL}`} className="text-[16px] text-[#2a2320] transition-opacity hover:opacity-70 lg:text-[18px]">{EMAIL}</a>
          </div>
          <div>
            <p className={eyebrow}>{t("Соцсети", "Social")}</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Instagram — Новороссийск", href: IG_RU },
                { label: "Instagram — Global", href: IG_GLOBAL },
              ].map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#3B0D1A]/25 px-4 py-2 text-[13px] text-[#3B0D1A] transition-colors hover:bg-[#3B0D1A] hover:text-[#f4efe6]">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Карта */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[320px] items-end overflow-hidden rounded-[24px] bg-[#3B0D1A] p-8 text-[#f4efe6]"
        >
          <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#4A4B33]/25 blur-[80px]" />
          <div className="relative">
            <p className="font-display text-[24px] uppercase tracking-[0.06em] lg:text-[30px]">{t("Мы в Новороссийске", "We're in Novorossiysk")}</p>
            <p className="mt-2 text-[14px] text-[#f4efe6]/75">{ADDRESS[lang]}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f4efe6] px-6 py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-[#3B0D1A] transition-transform duration-300 group-hover:scale-[1.03]">
              {t("Открыть на карте", "Open on map")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
