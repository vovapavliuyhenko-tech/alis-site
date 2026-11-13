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

const CERT_PHOTO = "/assets/alis/img_6048.jpg"; // кремовое фото: платок с вышивкой ÁLIS BEAUTY — как фирменный подарок

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

// Куда ведёт карточка: «book» — онлайн-запись (подарок обсуждается при записи), «friend» — форма «Для подруги»
const SALON_BOOKING = "https://n1054895.yclients.com/company/976464/personal/menu";
const PERKS: { icon: () => React.ReactElement; title: Loc; note: Loc; action: "book" | "friend" }[] = [
  {
    icon: GiftIcon,
    action: "book",
    title: { ru: "Подарок в день рождения от салона красоты", en: "A birthday gift from the beauty salon" },
    note: { ru: "Оповестите администратора о дате дня рождения при записи.", en: "Let the administrator know your birthday when you book." },
  },
  {
    icon: FriendsIcon,
    action: "friend",
    title: { ru: "Бонус за подругу", en: "A bonus for a friend" },
    note: { ru: "Посоветуйте ÁLIS BEAUTY подруге, и вы обе получите бонусы на счёт.", en: "Recommend ÁLIS BEAUTY to a friend, and you'll both get bonuses in your account." },
  },
];

export default function LoyaltyCerts() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);

  // Бонусы: для себя или для подруги → номер(а) в CRM (тип «bonus»)
  const [who, setWho] = useState<"me" | "friend">("me");
  const dk = who === "friend"; // режим «Для подруги» — карточка тёмная
  // Кнопка «Пригласить подругу и получить бонус» на обложке салона ведёт сюда (#friend)
  useEffect(() => {
    const go = () => {
      if (location.hash !== "#friend") return;
      setWho("friend"); setCool(false);
      document.getElementById("loyalty")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);
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
  // После повторного нажатия «Бонус за подругу» карточка сразу белая — эффект наведения
  // выключается, пока курсор не уйдёт с карточки
  const [cool, setCool] = useState(false);
  // className карточки меняется — сохраняем класс появления is-in (иначе r-reveal снова прячет карточку)
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        const i = cards.current.indexOf(e.target as HTMLElement);
        if (e.isIntersecting) setActive(i);
        else setActive((a) => (a === i ? -1 : a));
      }
    }, { rootMargin: "-32% 0px -32% 0px" });
    cards.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="loyalty" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-10 text-center text-[#17191a] lg:mb-14">{t("Красота, которая возвращается бонусами", "Beauty that comes back as bonuses")}</h2>

        <div className="grid gap-2 sm:gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-4">
          {/* 500 ₽ на первый визит — белая; в режиме «Для подруги» плавно становится тёмной */}
          <div className="r-reveal flex">
          <div className={`relative flex w-full flex-col justify-between overflow-hidden rounded-[20px] border p-6 transition-[background-color,color,border-color] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] sm:p-8 lg:p-10 ${dk ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/12 bg-white text-[#17191a]"}`}>
            <div className="relative">
              <p className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 sm:text-[11px] ${dk ? "text-white/50" : "text-[#17191a]/50"}`}>{t("Первый визит", "First visit")}</p>
              {/* div, а не p — чтобы общее «мобильное» уменьшение текста не трогало крупную цифру */}
              <div className="mt-4 font-display text-[64px] font-extralight leading-none tracking-[0.01em] sm:mt-6 lg:text-[88px]"><CountUp to={500} /> ₽</div>
              <p className={`mt-3 text-[13px] leading-[1.5] transition-colors duration-700 sm:text-[15px] ${dk ? "text-white/70" : "text-[#17191a]/70"}`}>
                {t("бонусных рублей на первый визит — уже на счёте, когда вы придёте", "bonus roubles on your first visit — already in your account when you come")}
              </p>
            </div>
            {/* Форма бонусов: для себя — свой номер; для подруги — свой номер и номер подруги */}
            <div className="relative mt-8">
              {sent ? (
                <p className={`animate-[alis-bonus-in_.5s_ease] rounded-[14px] px-5 py-4 text-center text-[13px] sm:text-[15px] ${dk ? "bg-white/10 text-white" : "bg-[#f6f4f1] text-[#17191a]"}`}>
                  {who === "me"
                    ? t("Спасибо! Бонусы будут на счёте, когда вы придёте.", "Thank you! The bonuses will be in your account when you come.")
                    : t("Спасибо! Начислим бонусы вам и подруге.", "Thank you! We'll add bonuses for you and your friend.")}
                </p>
              ) : (
                <>
                  {/* Переключатель «Для себя / Для подруги» с бегущей подложкой */}
                  <div className={`relative grid grid-cols-2 rounded-full p-1 text-[11px] uppercase tracking-[0.12em] transition-colors duration-700 sm:text-[12px] ${dk ? "bg-white/10" : "bg-[#f6f4f1]"}`}>
                    <span aria-hidden className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-[transform,background-color] duration-500 ${dk ? "bg-white" : "bg-[#17191a]"}`}  style={{ transform: who === "me" ? "none" : "translateX(100%)" }} />
                    {(["me", "friend"] as const).map((w) => (
                      <button key={w} type="button" onClick={() => { setWho(w); setCool(false); }} aria-pressed={who === w} className={`relative z-10 rounded-full py-2.5 transition-colors duration-500 ${who === w ? (dk ? "text-[#17191a]" : "text-white") : dk ? "text-white/60 hover:text-white" : "text-[#17191a]/60 hover:text-[#17191a]"}`}>
                        {w === "me" ? t("Для себя", "For me") : t("Для подруги", "For a friend")}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <PhoneField lang={lang} value={me} onChange={setMe} className={dk ? "" : "!bg-[#f6f4f1]"} />
                    <div className={`grid transition-all duration-500 ease-out ${who === "friend" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="mb-1.5 pl-1 text-[10px] uppercase tracking-[0.16em] text-white/45">{t("Номер подруги", "Your friend's number")}</p>
                        <PhoneField lang={lang} value={friend} onChange={setFriend} className={dk ? "" : "!bg-[#f6f4f1]"} />
                      </div>
                    </div>
                  </div>
                  <label className="mt-3 flex cursor-pointer items-center gap-2.5">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className={`h-4 w-4 shrink-0 cursor-pointer ${dk ? "accent-white" : "accent-[#17191a]"}`} />
                    <span className={`whitespace-nowrap text-[clamp(10px,2.8vw,11px)] ${dk ? "text-white/55" : "text-[#17191a]/55"}`}>
                      {t("Даю согласие на обработку ", "I agree to the processing of my ")}
                      <a href="/policy" className="underline underline-offset-2">{t("персональных данных", "personal data")}</a>
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={sendBonus}
                    disabled={!canSend}
                    className={`mt-3 flex w-full items-center justify-center rounded-[12px] border py-3.5 font-display text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${dk ? "border-white bg-white text-[#17191a] hover:bg-transparent hover:text-white disabled:hover:bg-white disabled:hover:text-[#17191a]" : "border-[#17191a] bg-[#17191a] text-white hover:bg-transparent hover:text-[#17191a] disabled:hover:bg-[#17191a] disabled:hover:text-white"}`}
                  >
                    {t("Забрать бонусы", "Get my bonuses")}
                  </button>
                </>
              )}
            </div>
          </div>
          </div>

          {/* Справа: три бонуса сверху, сертификат снизу */}
          <div className="grid gap-2 sm:gap-3 lg:grid-rows-[auto_1fr] lg:gap-4">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:gap-4">
              {PERKS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <a
                    key={p.title.ru}
                    ref={(el) => { cards.current[i] = el; }}
                    // Карточка кликабельна: подарок — к онлайн-записи, бонус за подругу — к форме с номером подруги
                    href={p.action === "book" ? SALON_BOOKING : "#friend"}
                    {...(p.action === "book" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={p.action === "friend" ? (e) => {
                      e.preventDefault();
                      // Повторное нажатие на тёмную карточку — обратно «Для себя» (карточка снова белая)
                      setTouched(true);
                      if (dk) { setWho("me"); setCool(true); return; }
                      setCool(false);
                      setWho("friend");
                    } : undefined}
                    // В режиме «Для подруги» карточка «Бонус за подругу» тоже становится тёмной
                    data-on={(active === i && !(cool && p.action === "friend")) || (dk && p.action === "friend") ? "" : undefined}
                    onMouseLeave={p.action === "friend" ? () => setCool(false) : undefined}
                    className={`r-reveal ${touched ? "is-in" : ""} ${cool && p.action === "friend" ? "" : "group"} relative flex min-h-[150px] flex-col justify-start overflow-hidden rounded-[20px] border border-[#17191a]/12 bg-white p-5 sm:min-h-[220px] sm:p-6 lg:min-h-[240px]`}
                    style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
                  >
                    {/* Заливка снизу вверх при наведении */}
                    <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-[#17191a] transition-transform duration-[900ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-y-100 group-data-[on]:scale-y-100" />
                    <div className="relative flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191a]/15 text-[#17191a] transition-colors duration-700 group-hover:border-white/25 group-hover:text-white group-data-[on]:border-white/25 group-data-[on]:text-white">
                        <Icon />
                      </span>
                      {/* Стрелка — видно, что карточка ведёт дальше */}
                      <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-[#17191a]/15 text-[14px] text-[#17191a] transition-all duration-700 group-hover:-rotate-45 group-hover:border-white/30 group-hover:text-white group-data-[on]:border-white/30 group-data-[on]:text-white">→</span>
                    </div>
                    <div className="relative mt-6 sm:mt-10">
                      <h3 className="font-display text-[15px] tracking-[0.01em] text-[#17191a] transition-colors duration-700 group-hover:text-white group-data-[on]:text-white sm:text-[17px]">{p.title[lang]}</h3>
                      {/* Пояснение появляется при наведении (на телефоне — у карточки в центре экрана), заголовок остаётся */}
                      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-data-[on]:grid-rows-[1fr] group-data-[on]:opacity-100">
                        <p className="min-h-0 overflow-hidden pt-1.5 !text-[11.5px] leading-[1.5] text-white/70 sm:!text-[13px]">{p.note[lang]}</p>
                      </div>
                    </div>
                  </a>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-colors duration-700 group-hover:from-black/65" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-[#17191a] sm:right-6 sm:top-6 sm:h-11 sm:w-11">
                <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
              </span>
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <h3 className="font-display text-[18px] leading-[1.2] tracking-[0.02em] text-white sm:text-[24px]">
                  {t("Подарочный сертификат ÁLIS BEAUTY", "ÁLIS BEAUTY gift certificate")}
                </h3>
                <div className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,.61,.36,1)] [@media(hover:none)]:hidden [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
                <p className="min-h-0 overflow-hidden pt-1.5 max-w-md !text-[11.5px] leading-relaxed text-white/80 sm:!text-[13px]">
                  {t(
                    "Любая услуга или сумма. Лучший способ подарить заботу и внимание.",
                    "Any service or amount. The best way to give care and attention.",
                  )}
                </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes alis-glow { 0%,100% { transform: scale(1); opacity: .7 } 50% { transform: scale(1.25); opacity: 1 } } @keyframes alis-bonus-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
