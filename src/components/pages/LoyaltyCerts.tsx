"use client";
// БЛОК «КРАСОТА, КОТОРАЯ ВОЗВРАЩАЕТСЯ БОНУСАМИ» (страница «Салон») — bento:
//  слева высокая чёрная карточка: «500 ₽» (счётчик от 0) и форма бонусов — «Для себя» (свой номер)
//  или «Для подруги» (свой номер + номер подруги) → CRM, тип «bonus»;
//  справа сверху три карточки бонусов (подарок в день рождения, бонус за подругу, бонусы
//  постоянным) — иконка, название, пояснение; снизу — подарочный сертификат с фото.
// Движение: карточки появляются по очереди; наведение — карточку снизу заливает чёрным,
// иконка оживает (подарок «подпрыгивает», люди сходятся, искры вращаются); на телефоне так
// подсвечивается карточка в центре экрана. Сертификат — зум и размытие фото + раскрытие текста.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import CountUp from "@/components/ui/CountUp";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import { sendLead } from "@/lib/sendLead";

const CERT_PHOTO = "/assets/alis/img_1855.jpg";

type Loc = { ru: string; en: string };

// Иконки бонусов — тонкие линии, у каждой своё движение при наведении
function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-data-[on]:-translate-y-0.5 group-data-[on]:rotate-[-8deg]">
      <rect x="3.5" y="9" width="17" height="11.5" rx="1.5" />
      <path d="M2.5 9h19M12 9v11.5" />
      <path d="M12 9c-1.5-3.5-5-4-5-1.5S10 9 12 9Zm0 0c1.5-3.5 5-4 5-1.5S14 9 12 9Z" strokeLinejoin="round" />
    </svg>
  );
}
function FriendsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
      <g className="transition-transform duration-500 group-hover:translate-x-[1.5px] group-data-[on]:translate-x-[1.5px]">
        <circle cx="8.5" cy="8" r="3" />
        <path d="M3 19.5c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" strokeLinecap="round" />
      </g>
      <g className="transition-transform duration-500 group-hover:-translate-x-[1.5px] group-data-[on]:-translate-x-[1.5px]">
        <circle cx="16" cy="9" r="2.6" />
        <path d="M14.8 14.7c.4-.1.8-.2 1.2-.2 2.4 0 4.3 1.8 4.8 4.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6 transition-transform duration-700 group-hover:rotate-90 group-data-[on]:rotate-90">
      <path d="M12 3v5M12 16v5M3 12h5M16 12h5" strokeLinecap="round" />
      <path d="M12 8.5 13.2 10.8 15.5 12 13.2 13.2 12 15.5 10.8 13.2 8.5 12 10.8 10.8Z" strokeLinejoin="round" />
    </svg>
  );
}

const PERKS: { icon: () => React.ReactElement; title: Loc; note: Loc }[] = [
  {
    icon: GiftIcon,
    title: { ru: "Подарок в день рождения", en: "A birthday gift" },
    note: { ru: "Поздравим подарком от салона — подробности расскажет администратор.", en: "We'll celebrate with a gift from the salon — the administrator will tell you more." },
  },
  {
    icon: FriendsIcon,
    title: { ru: "Бонус за подругу", en: "A bonus for a friend" },
    note: { ru: "Посоветуйте ÁLIS BEAUTY подруге — бонусы получите вы обе.", en: "Recommend ÁLIS BEAUTY to a friend — you both get bonuses." },
  },
  {
    icon: SparkIcon,
    title: { ru: "Бонусы постоянным", en: "Regulars' bonuses" },
    note: { ru: "Копятся с каждым визитом.", en: "They add up with every visit." },
  },
];

export default function LoyaltyCerts() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  // Бонусы: для себя или для подруги → номер(а) в CRM (тип «bonus»)
  const [who, setWho] = useState<"me" | "friend">("me");
  const [me, setMe] = useState("");
  const [friend, setFriend] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const canSend = consent && phoneComplete(me) && (who === "me" || phoneComplete(friend));
  const sendBonus = () => {
    if (!canSend) return;
    void sendLead({
      kind: "bonus",
      phone: me,
      details: who === "me"
        ? { Форма: "Салон: 500 бонусов на первый визит (для себя)" }
        : { Форма: "Салон: бонус за подругу", "Телефон подруги": friend },
    });
    setSent(true);
  };

  // Телефон/планшет (нет наведения): эффект наведения у карточки в центре экрана
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState<number>(-1);
  useEffect(() => {
    if (matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        const i = cards.current.indexOf(e.target as HTMLElement);
        if (e.isIntersecting) setActive(i);
        else setActive((a) => (a === i ? -1 : a));
      }
    }, { rootMargin: "-40% 0px -40% 0px" });
    cards.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="loyalty" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{t("Красота, которая возвращается бонусами", "Beauty that comes back as bonuses")}</h2>

        <div className="grid gap-2 sm:gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-4">
          {/* 500 ₽ на первый визит */}
          <div className="r-reveal relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-[#17191a] p-6 text-white sm:p-8 lg:p-10">
            {/* Мягкое «дыхание» света в углу */}
            <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 animate-[alis-glow_6s_ease-in-out_infinite] rounded-full bg-white/[0.06] blur-2xl" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 sm:text-[11px]">{t("Первый визит", "First visit")}</p>
              {/* div, а не p — чтобы общее «мобильное» уменьшение текста не трогало крупную цифру */}
              <div className="mt-4 font-display text-[64px] font-extralight leading-none tracking-[0.01em] sm:mt-6 lg:text-[88px]"><CountUp to={500} /> ₽</div>
              <p className="mt-3 max-w-[26ch] text-[13px] leading-[1.5] text-white/70 sm:text-[15px]">
                {t("бонусных рублей на первый визит — уже на счёте, когда вы придёте", "bonus roubles on your first visit — already in your account when you come")}
              </p>
            </div>
            {/* Форма бонусов: для себя — свой номер; для подруги — свой номер и номер подруги */}
            <div className="relative mt-8">
              {sent ? (
                <p className="animate-[alis-bonus-in_.5s_ease] rounded-[14px] bg-white/10 px-5 py-4 text-center text-[13px] text-white sm:text-[15px]">
                  {who === "me"
                    ? t("Спасибо! Бонусы будут на счёте, когда вы придёте.", "Thank you! The bonuses will be in your account when you come.")
                    : t("Спасибо! Начислим бонусы вам и подруге.", "Thank you! We'll add bonuses for you and your friend.")}
                </p>
              ) : (
                <>
                  {/* Переключатель «Для себя / Для подруги» с бегущей подложкой */}
                  <div className="relative grid grid-cols-2 rounded-full bg-white/10 p-1 text-[11px] uppercase tracking-[0.12em] sm:text-[12px]">
                    <span aria-hidden className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)]" style={{ transform: who === "me" ? "none" : "translateX(100%)" }} />
                    {(["me", "friend"] as const).map((w) => (
                      <button key={w} type="button" onClick={() => setWho(w)} aria-pressed={who === w} className={`relative z-10 rounded-full py-2.5 transition-colors duration-500 ${who === w ? "text-[#17191a]" : "text-white/70 hover:text-white"}`}>
                        {w === "me" ? t("Для себя", "For me") : t("Для подруги", "For a friend")}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <PhoneField lang={lang} value={me} onChange={setMe} />
                    <div className={`grid transition-all duration-500 ease-out ${who === "friend" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="mb-1.5 pl-1 text-[10px] uppercase tracking-[0.16em] text-white/45">{t("Номер подруги", "Your friend's number")}</p>
                        <PhoneField lang={lang} value={friend} onChange={setFriend} />
                      </div>
                    </div>
                  </div>
                  <label className="mt-3 flex cursor-pointer items-center gap-2.5">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-white" />
                    <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-white/55">
                      {t("Даю согласие на обработку ", "I agree to the processing of my ")}
                      <a href="/policy" className="underline underline-offset-2">{t("персональных данных", "personal data")}</a>
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={sendBonus}
                    disabled={!canSend}
                    className="mt-3 flex w-full items-center justify-center rounded-[12px] border border-white bg-white py-3.5 font-display text-[11px] uppercase tracking-[0.14em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#17191a] sm:py-4 sm:text-[13px] sm:tracking-[0.16em]"
                  >
                    {t("Забрать бонусы", "Get my bonuses")}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Справа: три бонуса сверху, сертификат снизу */}
          <div className="grid gap-2 sm:gap-3 lg:grid-rows-[auto_1fr] lg:gap-4">
            <div className="grid gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-4">
              {PERKS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <article
                    key={p.title.ru}
                    ref={(el) => { cards.current[i] = el; }}
                    data-on={active === i ? "" : undefined}
                    className="r-reveal group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#17191a]/12 bg-white p-5 sm:min-h-[220px] sm:p-6 lg:min-h-[240px]"
                    style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
                  >
                    {/* Заливка снизу вверх при наведении */}
                    <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-[#17191a] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100 group-data-[on]:scale-y-100" />
                    <div className="relative flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a] transition-colors duration-500 group-hover:border-white/25 group-hover:text-white group-data-[on]:border-white/25 group-data-[on]:text-white">
                        <Icon />
                      </span>
                      <span className="text-[11px] text-[#17191a]/30 transition-colors duration-500 group-hover:text-white/40 group-data-[on]:text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="relative mt-6">
                      <h3 className="font-display text-[15px] tracking-[0.01em] text-[#17191a] transition-colors duration-500 group-hover:text-white group-data-[on]:text-white sm:text-[17px]">{p.title[lang]}</h3>
                      <p className="mt-1.5 !text-[11.5px] leading-[1.5] text-[#17191a]/60 transition-colors duration-500 group-hover:text-white/70 group-data-[on]:text-white/70 sm:!text-[13px]">{p.note[lang]}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Подарочный сертификат */}
            <a
              href="https://o8981.yclients.ru/certificates"
              target="_blank"
              rel="noopener noreferrer"
              id="certificates"
              className="r-reveal group relative min-h-[200px] scroll-mt-28 overflow-hidden rounded-[20px] sm:min-h-[240px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CERT_PHOTO}
                alt={en ? "ÁLIS BEAUTY gift certificate" : "Подарочный сертификат ÁLIS BEAUTY"}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-out group-hover:scale-105 group-hover:blur-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 transition-colors duration-500 group-hover:from-black/80" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-[#17191a] sm:right-6 sm:top-6 sm:h-11 sm:w-11">
                <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
              </span>
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <h3 className="font-display text-[18px] leading-[1.2] tracking-[0.02em] text-white sm:text-[24px]">
                  {t("Подарочный сертификат ÁLIS BEAUTY", "ÁLIS BEAUTY gift certificate")}
                </h3>
                <p className="mt-1.5 max-w-md !text-[11.5px] leading-relaxed text-white/80 sm:!text-[13px]">
                  {t(
                    "Любая услуга или сумма. Лучший способ подарить заботу — и точно не промахнуться.",
                    "Any service or amount. The best way to gift care — and never miss.",
                  )}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes alis-glow { 0%,100% { transform: scale(1); opacity: .7 } 50% { transform: scale(1.25); opacity: 1 } } @keyframes alis-bonus-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
