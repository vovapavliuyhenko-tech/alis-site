"use client";
// ФИНАЛЬНЫЙ БЛОК ГЛАВНОЙ перед подвалом — «куда идти»: слева карта, справа адрес,
// часы, телефон салона и кнопка «Оформить визит» (бордовая, как на всём сайте) +
// ссылка «Построить маршрут». Все данные — уже согласованные. Ч/б. Двуязычно.
import { useLang } from "@/lib/i18n";

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const PHONE = "+7 988 888 77 58";

export default function HomeVisit() {
  const { lang } = useLang();
  const t = (ru: string, en: string) => (lang === "en" ? en : ru);

  const rows = [
    { label: t("Адрес", "Address"), value: t("Новороссийск, ул. Пархоменко, 53", "Novorossiysk, Parkhomenko St., 53"), href: MAP_URL },
    { label: t("Часы работы", "Opening hours"), value: t("Без перерывов и выходных, 9:00–21:00", "No breaks, open daily, 9:00–21:00") },
    { label: t("Телефон", "Phone"), value: PHONE, href: `tel:${PHONE.replace(/[^\d+]/g, "")}` },
  ];

  return (
    <section id="visit" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-1 gap-3 lg:grid-cols-[1.3fr_1fr] lg:gap-4">
        {/* Карта */}
        <div className="relative min-h-[320px] overflow-hidden rounded-[12px] bg-[#f2f1ee] lg:min-h-[480px]">
          <iframe
            title={t("Карта: ÁLIS BEAUTY", "Map: ÁLIS BEAUTY")}
            src="https://yandex.ru/map-widget/v1/?text=Новороссийск%2C%20улица%20Пархоменко%2C%2053&z=16"
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.6]"
          />
        </div>

        {/* Контакты и кнопка */}
        <div className="flex flex-col justify-between rounded-[12px] border border-[#17191a]/12 bg-white p-7 lg:p-10">
          <div>
            <h2 className="text-[#17191a]">{t("Салон красоты ÁLIS BEAUTY", "ÁLIS BEAUTY beauty salon")}</h2>
            <dl className="mt-8 divide-y divide-[#17191a]/10 border-t border-[#17191a]/10">
              {rows.map((r) => (
                <div key={r.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-[12px] text-[#17191a]/45">{r.label}</dt>
                  <dd className="text-[15px] text-[#242424] sm:text-right">
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="transition-colors hover:text-[#46131E]"
                      >
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href={YCLIENTS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-[12px] border border-[#46131E] bg-[#46131E] py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-white hover:text-[#46131E]"
            >
              {t("Оформить визит", "Arrange a visit")}
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-center border-b border-[#17191a]/30 pb-0.5 text-[13px] text-[#17191a] transition-colors hover:border-[#17191a]"
            >
              {t("Построить маршрут", "Get directions")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
