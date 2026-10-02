"use client";
// БЛОКИ ГЛАВНОЙ по правкам заказчицы (тексты — её, дословно):
// «Почему выбирают» → галерея работ → отзывы → выездной сервис → комплимент 500 бонусов →
// финальный экран выбора. Нигде нет мигающих / светящихся кнопок. Двуязычно.
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { REVIEWS } from "@/components/Reviews";

type Loc = { ru: string; en: string };

const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
const OUTCALL = "/concierge#booking"; // выезд — форма заявки менеджеру консьерж-сервиса
const PHONE_SALON = "+7 988 888 77 58";
const PHONE_CONCIERGE = "+7 988 888 77 28";
// Место под третий номер для международных клиентов — пока не добавлен (null = не показываем)
const PHONE_INTL: string | null = null;

const h2 = "font-serif-display font-normal uppercase leading-[1.15] tracking-[0.03em] text-[#17191a]";
const btnDark =
  "flex items-center justify-center rounded-xl border border-[#17191a] bg-[#17191a] px-8 py-4 text-[12.5px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a]";
const btnLight =
  "flex items-center justify-center rounded-xl border border-[#17191a]/80 bg-white px-8 py-4 text-[12.5px] font-medium uppercase tracking-[0.16em] text-[#17191a] transition-colors duration-300 hover:bg-[#17191a] hover:text-white";
const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

/* ---------- 2. Почему выбирают ALIS BEAUTY ---------- */
const WHY: Loc[] = [
  { ru: "Предсказуемый качественный результат", en: "Predictable, high-quality results" },
  { ru: "Опытная команда специалистов", en: "An experienced team of specialists" },
  { ru: "Профессиональный сервис по высоким стандартам бренда", en: "Professional service to the brand’s high standards" },
  { ru: "Работа в 4–6 рук", en: "Working with 4–6 hands at once" },
];

export function WhyUs() {
  const { lang } = useLang();
  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <h2 className={`${h2} r-reveal text-center !text-[26px] sm:!text-[32px] lg:!text-[44px]`}>
          {lang === "en" ? "Why choose ALIS BEAUTY" : "Почему выбирают ALIS BEAUTY"}
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[12px] border border-[#17191a]/10 bg-[#17191a]/10 sm:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {WHY.map((w, i) => (
            <li key={w.ru} className="r-reveal flex flex-col gap-6 bg-white p-6 lg:min-h-[200px] lg:p-8">
              <span className="font-serif-display text-[13px] tracking-[0.12em] text-[#17191a]/45">{String(i + 1).padStart(2, "0")}</span>
              <p className="!text-[17px] leading-[1.35] text-[#17191a] lg:!text-[19px]">{w[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 3. Галерея работ: 6 вертикальных карточек со скруглённым верхом ---------- */
// Пока плейсхолдеры — финальные фото заказчица отберёт сама (впишите пути в массив).
const WORKS: (string | null)[] = [null, null, null, null, null, null];

export function WorksGrid() {
  const { lang } = useLang();
  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1600px]">
        <h2 className={`${h2} r-reveal text-center !text-[22px] sm:!text-[28px] lg:!text-[36px]`}>
          {lang === "en" ? "Created by ALIS BEAUTY specialists" : "То, что создают специалисты ALIS BEAUTY"}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:mt-14 lg:grid-cols-6 lg:gap-4">
          {WORKS.map((src, i) => (
            <div key={i} className="r-reveal relative aspect-[3/4.6] overflow-hidden rounded-b-[12px] rounded-t-[999px] bg-[#efece8]">
              {src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={lang === "en" ? `ALIS BEAUTY work ${i + 1}` : `Работа ALIS BEAUTY ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Так говорят гости ---------- */
const PLATFORMS = [
  { label: "Яндекс", en: "Yandex", href: "https://yandex.ru/maps/org/lis_byuti/63024642190/reviews/", hover: "hover:border-[#FC3F1D] hover:bg-[#FC3F1D] hover:text-white" },
  { label: "2ГИС", en: "2GIS", href: "https://2gis.ru/novorossiysk/firm/70000001086737494/tab/reviews", hover: "hover:border-[#19AA1E] hover:bg-[#19AA1E] hover:text-white" },
];

export function HomeReviews() {
  const { lang } = useLang();
  const track = useRef<HTMLDivElement>(null);
  const items = REVIEWS.slice(0, 8);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: "smooth" });
  };
  return (
    <section id="reviews" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1600px]">
        <div className="flex items-end justify-between gap-4">
          <h2 className={`${h2} r-reveal !text-[26px] sm:!text-[32px] lg:!text-[44px]`}>{lang === "en" ? "What our guests say" : "Так говорят гости"}</h2>
          <div className="hidden gap-2 sm:flex">
            {[-1, 1].map((d) => (
              <button key={d} type="button" onClick={() => scroll(d)} aria-label={d < 0 ? (lang === "en" ? "Previous" : "Назад") : lang === "en" ? "Next" : "Дальше"} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17191a]/25 text-[#17191a] transition-colors hover:bg-[#17191a] hover:text-white">
                {d < 0 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
        <div ref={track} className="-mx-[4%] mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[4%] pb-2 [scrollbar-width:none] lg:mt-12 lg:gap-4 [&::-webkit-scrollbar]:hidden">
          {items.map((r) => (
            <article key={r.name.ru} className="flex w-[82%] shrink-0 snap-start flex-col rounded-[12px] border border-[#17191a]/10 bg-white p-6 sm:w-[46%] lg:w-[calc((100%-48px)/4)]">
              <div className="flex items-center gap-3">
                {/* Круглая аватарка: фото гостей нет — первая буква имени */}
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#efece8] font-serif-display text-[16px] text-[#17191a]">
                  {r.name[lang].charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium text-[#17191a]">{r.name[lang]}</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#17191a]/55">{r.role[lang]}</p>
                </div>
              </div>
              <span className="mt-4 text-[12px] tracking-[0.3em] text-[#C9A227]" aria-label="5/5">★★★★★</span>
              <p className="mt-3 !text-[14px] leading-[1.6] text-[#17191a]/85">{r.text[lang]}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-[12px] uppercase tracking-[0.14em] text-[#17191a]/55">{lang === "en" ? "Reviews on" : "Отзывы на"}</span>
          {PLATFORMS.map((p) => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-1.5 rounded-full border border-[#17191a]/25 px-4 py-2 text-[13px] text-[#17191a] transition-colors ${p.hover}`}>
              {lang === "en" ? p.en : p.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:-rotate-45">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Выездной сервис: широкая плашка — фото ИЛИ видео ---------- */
// Чтобы поставить видео: media = { type: "video", src: "/assets/....mp4", poster: "/assets/....jpg" }
type Media = { type: "image"; src: string } | { type: "video"; src: string; poster?: string };
const OUTCALL_MEDIA: Media = { type: "image", src: "/assets/alis/img_6009.jpg" };

export function OutcallService({ media = OUTCALL_MEDIA }: { media?: Media }) {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section className="bg-white section-y">
      <div className="mx-auto w-[92%] max-w-[1600px]">
        <div className="r-reveal mx-auto max-w-[1000px] text-center">
          <h2 className={`${h2} !text-[30px] sm:!text-[40px] lg:!text-[56px]`}>{en ? "Outcall service" : "Выездной сервис"}</h2>
          <p className="mt-5 !text-[17px] leading-[1.45] text-[#17191a] lg:mt-6 lg:!text-[22px]">
            {en
              ? "A wedding in Yerevan, a shoot in Moscow, a dinner in Cannes — the international ALIS BEAUTY team is already on its way."
              : "Свадьба в Ереване, съёмка в Москве, ужин в Каннах — международная команда ALIS BEAUTY уже в пути."}
          </p>
        </div>
        <div className="r-reveal relative mt-10 aspect-[4/5] overflow-hidden rounded-[20px] bg-[#efece8] sm:aspect-[16/9] lg:mt-14 lg:aspect-[21/9]">
          {media.type === "video" ? (
            <video src={media.src} poster={media.poster} autoPlay muted loop playsInline className="h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={en ? "ALIS BEAUTY outcall service" : "Выездной сервис ALIS BEAUTY"} loading="lazy" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="r-reveal mx-auto mt-8 flex max-w-[720px] flex-col items-center text-center lg:mt-10">
          <p className="!text-[15px] leading-[1.6] text-[#17191a]/85 lg:!text-[16px]">
            {en
              ? "You choose the place; we bring the specialists, the timing and the peace of mind — all that’s left is to enjoy your day."
              : "Вы выбираете место, мы приводим специалистов, тайминг и спокойствие — вам остаётся только наслаждаться днём."}
          </p>
          <a href={OUTCALL} className={`${btnDark} mt-7 w-full sm:w-auto`}>
            {en ? "Get a travel quote in 1 minute" : "Рассчитать выезд за 1 минуту"}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Комплимент: 500 бонусов — телефон уходит в CRM (тип «bonus») ---------- */
export function BonusOffer() {
  const { lang } = useLang();
  const en = lang === "en";
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setErr(en ? "Enter your phone number" : "Введите номер телефона");
      return;
    }
    setErr("");
    setState("sending");
    try {
      const fd = new FormData(e.currentTarget);
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "bonus", phone, website: fd.get("website"), details: { source: "Главная: комплимент 500 бонусных рублей" } }),
      });
      if (!r.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="bg-white section-y">
      <div className="r-reveal mx-auto w-[92%] max-w-[1100px] rounded-[20px] border border-[#17191a]/10 bg-[#f6f4f1] px-6 py-12 text-center sm:px-10 lg:px-16 lg:py-16">
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#17191a]/60">{en ? "A gift from ALIS BEAUTY" : "Комплимент от ALIS BEAUTY"}</p>
        <h2 className={`${h2} mt-4 !text-[28px] sm:!text-[36px] lg:!text-[48px]`}>
          {en ? "500 bonus roubles on your first visit" : "500 бонусных рублей на первый визит"}
        </h2>
        {state === "done" ? (
          <p className="mx-auto mt-6 max-w-[520px] !text-[16px] leading-[1.6] text-[#17191a]">
            {en ? "Thank you! The bonuses will be in your account when you come." : "Спасибо! Бонусы будут на счёте, когда вы придёте."}
          </p>
        ) : (
          <>
            <p className="mx-auto mt-5 max-w-[520px] !text-[15px] leading-[1.6] text-[#17191a]/80 lg:!text-[16px]">
              {en ? "Leave your number — the bonuses will be in your account when you come" : "Оставьте номер — бонусы уже будут на счёте, когда вы придёте"}
            </p>
            <form onSubmit={submit} noValidate className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3 sm:flex-row">
              {/* Поле-ловушка для ботов */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <label className="sr-only" htmlFor="bonus-phone">{en ? "Phone" : "Телефон"}</label>
              <input
                id="bonus-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); if (err) setErr(""); }}
                className="h-[54px] w-full shrink-0 rounded-xl sm:w-auto sm:flex-1 border border-[#17191a]/20 bg-white px-5 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#17191a]"
              />
              <button type="submit" disabled={state === "sending"} className={`${btnDark} h-[54px] py-0 disabled:opacity-60`}>
                {state === "sending" ? (en ? "Sending…" : "Отправляем…") : en ? "Get my bonuses" : "Забрать бонусы"}
              </button>
            </form>
            {(err || state === "error") && (
              <p className="mt-3 text-[13px] text-[#b42318]">{err || (en ? "Something went wrong. Please call us." : "Не получилось отправить. Позвоните нам, пожалуйста.")}</p>
            )}
            <p className="mx-auto mt-4 max-w-[460px] text-[11px] leading-relaxed text-[#17191a]/50">
              {en ? "By sending, you agree to the " : "Нажимая кнопку, вы соглашаетесь с "}
              <a href="/policy" className="underline underline-offset-2">{en ? "processing of personal data" : "обработкой персональных данных"}</a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- 8. Финальный экран перед подвалом ---------- */
export function FinalChoice() {
  const { lang } = useLang();
  const en = lang === "en";
  const BTNS = [
    { label: en ? "Book a salon visit" : "Оформить визит в салон", href: YCLIENTS, dark: true },
    { label: en ? "Order an outcall" : "Заказать выезд", href: OUTCALL, dark: false },
    { label: en ? "Message or call" : "Написать или позвонить", href: "/contacts", dark: false },
  ];
  const PHONES = [
    { label: en ? "Beauty salon" : "Салон красоты", phone: PHONE_SALON },
    { label: en ? "Concierge service" : "Консьерж-сервис", phone: PHONE_CONCIERGE },
    ...(PHONE_INTL ? [{ label: en ? "International clients" : "Для международных клиентов", phone: PHONE_INTL }] : []),
  ];
  return (
    <section className="bg-white section-y">
      <div className="r-reveal mx-auto w-[92%] max-w-[1100px] text-center">
        <h2 className={`${h2} !text-[26px] sm:!text-[34px] lg:!text-[48px]`}>
          {en ? "Choose where it suits you to be beautiful" : "Выберите, где вам удобнее быть красивой"}
        </h2>
        <div className="mx-auto mt-10 grid max-w-[960px] gap-3 sm:grid-cols-3 lg:mt-12">
          {BTNS.map((b) => (
            <a key={b.label} href={b.href} {...ext(b.href)} className={`${b.dark ? btnDark : btnLight} px-4 text-center`}>
              {b.label}
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PHONES.map((p) => (
            <a key={p.phone} href={`tel:${p.phone.replace(/[^\d+]/g, "")}`} className="text-[14px] text-[#17191a] transition-opacity hover:opacity-60">
              <span className="text-[#17191a]/55">{p.label}: </span>
              {p.phone}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
