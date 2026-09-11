"use client";
// КОНТАКТЫ — сплит: слева карта Яндекс, справа БЕЛАЯ карточка с бордовой обводкой:
// название салона, подзаголовок, линия и строки «поле — значение» (адрес, часы,
// телефон, запись), две кнопки действия. Ниже — сетка соц-кнопок в том же стиле.
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

// Видео слева (как на референсе). Положи ролик сюда — покажется вместо постера.
const VIDEO_SRC = "/assets/contacts.mp4";
const VIDEO_POSTER = "/assets/tild3236-393__.jpg";
const SALON_URL = "/salon#uslugi";

const PHONE = "+7 988 888 77 58";
const PHONE_SERVICE = "+7 988 888 77 28";
const WA = "79888887758";
const EMAIL = "alisbeautyclub@gmail.com";
const MAP_URL = "https://yandex.ru/maps/org/lis_byuti/63024642190";
const IG = "https://www.instagram.com/alisbeauty.ru";
const IG_GLOBAL = "https://www.instagram.com/alisbeauty.global";
const ADDRESS = { ru: "Новороссийск, ул. Пархоменко, 53", en: "Novorossiysk, Parkhomenko St., 53" };
const HOURS = { ru: "Без выходных, 9:00–21:00", en: "Open daily, 9:00–21:00" };

const WINE = "#3B0D1A";

/* ── иконки соц-кнопок (одним штрихом, наследуют currentColor) ───────────── */
const IcWhatsApp = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.4-.2-2.6.7.7-2.5-.2-.4A8 8 0 0 1 12 4zm-3.3 4c-.2 0-.5 0-.7.3-.3.3-.9.9-.9 2s.9 2.3 1 2.5c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.6-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.2-.1-1.1-.4-2-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.8-1.8c-.2-.4-.4-.4-.6-.4z" /></svg>
);
const IcInstagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.6-2.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" /></svg>
);
const IcPhone = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M6.6 2c.5 0 1 .3 1.2.8l1.4 3.3c.2.5.1 1-.3 1.4L7.6 8.8a12.6 12.6 0 0 0 5.9 5.9l1.3-1.3c.4-.4.9-.5 1.4-.3l3.3 1.4c.5.2.8.7.8 1.2v3.2c0 .8-.6 1.5-1.4 1.5C10.1 20.4 3.6 13.9 3 5.4c0-.8.6-1.5 1.4-1.5h2.2z" /></svg>
);
const IcMap = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11.5a2.5 2.5 0 0 0 0-5z" /></svg>
);
const IcMail = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.7 2L12 12.2 19.3 7H4.7zM20 8.9l-7.4 5.3a1 1 0 0 1-1.2 0L4 8.9V17h16V8.9z" /></svg>
);

export default function ContactsCTA() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const tel = PHONE.replace(/[^\d+]/g, "");
  const telService = PHONE_SERVICE.replace(/[^\d+]/g, "");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  // строки «поле — значение» в карточке
  const ROWS: { label: string; value: React.ReactNode }[] = [
    {
      label: t("Адрес", "Address"),
      value: (
        <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60">
          {ADDRESS[lang]}
        </a>
      ),
    },
    { label: t("Часы работы", "Hours"), value: HOURS[lang] },
    {
      label: t("Телефон", "Phone"),
      value: <a href={`tel:${tel}`} className="transition-opacity hover:opacity-60">{PHONE}</a>,
    },
    {
      label: t("Сервис-служба", "Service line"),
      value: <a href={`tel:${telService}`} className="transition-opacity hover:opacity-60">{PHONE_SERVICE}</a>,
    },
    {
      label: "E-mail",
      value: <a href={`mailto:${EMAIL}`} className="transition-opacity hover:opacity-60">{EMAIL}</a>,
    },
  ];

  const SOCIALS = [
    { icon: IcWhatsApp, title: "WhatsApp", sub: t("Написать в чат", "Message us"), href: `https://wa.me/${WA}` },
    { icon: IcInstagram, title: "Instagram", sub: "@alisbeauty.ru", href: IG },
    { icon: IcInstagram, title: "Instagram Global", sub: "@alisbeauty.global", href: IG_GLOBAL },
    { icon: IcPhone, title: t("Позвонить", "Call"), sub: PHONE, href: `tel:${tel}` },
    { icon: IcMap, title: t("Яндекс Карты", "Yandex Maps"), sub: t("Маршрут и отзывы", "Route & reviews"), href: MAP_URL },
    { icon: IcMail, title: "E-mail", sub: EMAIL, href: `mailto:${EMAIL}` },
  ];

  return (
    <section id="contacts" className="scroll-mt-24 bg-white pb-20 pt-2 lg:pb-28 lg:pt-4">
      {/* Шапка блока — в едином стиле с главной/командой */}
      <div className="r-reveal mx-auto mb-10 w-[94%] max-w-[1400px] lg:mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#4A4B33]/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4A4B33]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4B33]" />
          {t("контакты", "contacts")}
        </span>
        <h2 className="mt-5 max-w-2xl font-display text-[24px] font-normal uppercase leading-[1.12] tracking-[0.04em] text-[#3B0D1A] lg:text-[36px]">
          {t("Мы всегда на связи", "We're always in touch")}
        </h2>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#17191a]/60 lg:text-[15px]">
          {t(
            "Приезжайте в салон на Пархоменко или напишите нам удобным способом — поможем с записью и подберём услуги под вашу задачу.",
            "Visit our salon on Parkhomenko or message us in any way that suits you — we'll help you book and choose the right services.",
          )}
        </p>
      </div>

      <div className="mx-auto grid w-[94%] max-w-[1400px] items-stretch gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Видео слева (постер-заглушка, пока не добавлен ролик) + кнопка звука */}
        <div className="r-reveal relative overflow-hidden rounded-[24px] border border-[#17191a]/10 shadow-[0_18px_44px_rgba(0,0,0,0.08)]">
          <video
            ref={videoRef}
            className="h-[360px] w-full object-cover lg:h-full lg:min-h-[520px]"
            poster={VIDEO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? t("Включить звук", "Unmute") : t("Выключить звук", "Mute")}
            className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M11 5 6 9H3v6h3l5 4V5zm5.5 3.5-1.4 1.4L16.6 12l-1.5 1.5 1.4 1.4L18 13.4l1.5 1.5 1.4-1.4L19.4 12l1.5-1.5-1.4-1.4L18 10.6z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M11 5 6 9H3v6h3l5 4V5zm4.5 2.1a5 5 0 0 1 0 9.8v-2.1a3 3 0 0 0 0-5.6V7.1zM15 10.3a2 2 0 0 1 0 3.4v-3.4z" /></svg>
            )}
          </button>
        </div>

        {/* Белая карточка (как на референсе) */}
        <div className="flex flex-col justify-center rounded-[24px] border border-[#17191a]/12 bg-white px-6 py-7 text-[#3B0D1A] shadow-[0_18px_44px_rgba(0,0,0,0.06)] lg:min-h-[520px] lg:px-9 lg:py-10">
          <h2 className="r-reveal font-display text-[22px] font-normal leading-[1.1] tracking-[0.02em] lg:text-[30px]">
            ÁLIS Beauty <span className="opacity-70">{t("на Пархоменко", "on Parkhomenko")}</span>
          </h2>
          <p className="r-reveal mt-2 text-[12.5px] italic leading-relaxed text-[#3B0D1A]/55 lg:text-[13.5px]">
            {t("Премиальный салон красоты · Новороссийск", "Premium beauty salon · Novorossiysk")}
            <br />
            {t("Запись по телефону, в WhatsApp или онлайн", "Book by phone, on WhatsApp or online")}
          </p>

          <div className="r-reveal mt-5 h-[2px] w-full" style={{ background: WINE }} />

          <dl className="r-reveal mt-4">
            {ROWS.map((r) => (
              <div
                key={r.label}
                className="flex flex-col gap-0.5 border-b py-2.5 sm:flex-row sm:items-baseline sm:gap-6"
                style={{ borderColor: `${WINE}1f` }}
              >
                <dt className="w-full text-[10px] uppercase tracking-[0.16em] text-[#3B0D1A]/60 sm:w-[40%] sm:shrink-0">
                  {r.label}
                </dt>
                <dd className="text-[13px] italic leading-snug text-[#3B0D1A] lg:text-[14px]">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="r-reveal mt-6 flex flex-wrap gap-2.5">
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#3B0D1A] px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-[#5a1a2c]"
            >
              {t("Построить маршрут", "Get directions")}
            </a>
            <a
              href={SALON_URL}
              className="inline-flex items-center justify-center rounded-full border border-[#3B0D1A] px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#3B0D1A] transition-colors duration-300 hover:bg-[#3B0D1A] hover:text-[#f4efe6]"
            >
              {t("Смотреть услуги", "View services")}
            </a>
          </div>
        </div>
      </div>

      {/* Соц-сети — кнопки-карточки */}
      <div className="mx-auto mt-3 grid w-[94%] max-w-[1400px] gap-3 sm:grid-cols-2 lg:mt-4 lg:grid-cols-3 lg:gap-4">
        {SOCIALS.map(({ icon: Icon, title, sub, href }) => (
          <a
            key={title}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="r-reveal group flex items-center gap-3.5 rounded-[18px] border bg-white px-4 py-3 transition-colors duration-300 hover:bg-[#3B0D1A]"
            style={{ borderColor: `${WINE}33` }}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#3B0D1A]/8 text-[#3B0D1A] transition-colors duration-300 group-hover:bg-[#f4efe6]/15 group-hover:text-[#f4efe6]">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[14px] font-medium text-[#3B0D1A] transition-colors duration-300 group-hover:text-[#f4efe6]">
                {title}
              </span>
              <span className="block truncate text-[12px] italic text-[#3B0D1A]/55 transition-colors duration-300 group-hover:text-[#f4efe6]/70">
                {sub}
              </span>
            </span>
            <span className="ml-auto shrink-0 text-[#3B0D1A]/40 transition-colors duration-300 group-hover:text-[#f4efe6]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
