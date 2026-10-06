"use client";
// СТРАНИЦА «САЛОН КРАСОТЫ» — блоки по брифу заказчицы:
//  SalonBonusStrip — плашка «500 бонусных рублей на первый визит» + «Пригласить подругу и получить
//                    бонус»: по кнопке раскрывается форма (ваш номер + номер подруги) → CRM, тип «bonus»;
//  PopularServices — «Популярные процедуры»: лента карточек с фото, ценой и кнопкой «Записаться»;
//  SalonReviews    — 3 отзыва + «Оставить свой отзыв о визите».
// Цены — из прайса салона на этой странице. TODO: фото процедур и ссылку на отзывы пришлёт заказчица.
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import { REVIEWS } from "@/components/Reviews";

type Loc = { ru: string; en: string };
const YCLIENTS = "https://n1054895.yclients.com/company/976464/personal/menu";
export const SALON_ADMIN_WA = "https://wa.me/79888887758"; // администратор салона

// ——— 500 бонусов + пригласить подругу ———
export function SalonBonusStrip() {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState("");
  const [friend, setFriend] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const ok = phoneComplete(me) && phoneComplete(friend) && consent;

  const send = () => {
    if (!ok) return;
    void sendLead({ kind: "bonus", phone: me, details: { Форма: "Салон: пригласить подругу", "Телефон подруги": friend } });
    setDone(true);
  };

  return (
    <section id="bonus" className="scroll-mt-24 bg-white pt-6 sm:pt-10">
      <div className="mx-auto w-[96%] max-w-[1760px] rounded-[20px] border border-[#17191a]/12 bg-white px-5 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-3">
            <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#17191a] text-[12px] text-white">✓</span>
            <p className="font-display text-[14px] uppercase tracking-[0.04em] text-[#17191a] sm:text-[17px]">
              {en ? "500 bonus roubles on your first visit" : "500 бонусных рублей на первый визит"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-center justify-center whitespace-nowrap rounded-[12px] border border-[#17191a] bg-[#17191a] px-5 py-3 text-[10.5px] font-medium uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] md:w-auto sm:text-[11.5px]"
          >
            {en ? "Invite a friend and get a bonus" : "Пригласить подругу и получить бонус"}
          </button>
        </div>

        {/* Раскрывающаяся форма */}
        <div className={`grid transition-all duration-500 ease-out ${open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            {done ? (
              <p className="rounded-[14px] bg-[#f6f4f1] px-5 py-4 text-center text-[13px] text-[#17191a] sm:text-[15px]">
                {en ? "Thank you! We'll add bonuses for you and your friend." : "Спасибо! Начислим бонусы вам и подруге."}
              </p>
            ) : (
              <div className="rounded-[16px] bg-[#f6f4f1] p-3 sm:p-4">
                <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                  <div>
                    <p className="mb-1.5 pl-1 text-[10px] uppercase tracking-[0.16em] text-[#17191a]/45">{en ? "Your number" : "Ваш номер"}</p>
                    <PhoneField lang={lang} value={me} onChange={setMe} />
                  </div>
                  <div>
                    <p className="mb-1.5 pl-1 text-[10px] uppercase tracking-[0.16em] text-[#17191a]/45">{en ? "Your friend's number" : "Номер подруги"}</p>
                    <PhoneField lang={lang} value={friend} onChange={setFriend} />
                  </div>
                  <button
                    type="button"
                    onClick={send}
                    disabled={!ok}
                    className="h-[46px] self-end whitespace-nowrap rounded-[14px] border border-[#17191a] bg-[#17191a] px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white sm:h-[48px]"
                  >
                    {en ? "Get my bonuses" : "Забрать бонусы"}
                  </button>
                </div>
                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2.5 md:justify-start md:pl-1">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
                  <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-[#17191a]/50">
                    {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                    <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ——— Популярные процедуры ———
const POPULAR: { name: Loc; price: Loc; img: string }[] = [
  { name: { ru: "Маникюр + покрытие", en: "Manicure + polish" }, price: { ru: "от 1 900 ₽", en: "from 1 900 ₽" }, img: "/assets/alis/img_8578.jpg" },
  { name: { ru: "Express-укладка", en: "Express styling" }, price: { ru: "от 2 000 ₽", en: "from 2 000 ₽" }, img: "/assets/alis/img_3283.jpg" },
  { name: { ru: "Коррекция бровей", en: "Brow shaping" }, price: { ru: "по запросу", en: "on request" }, img: "/assets/alis/img_2672.jpg" },
  { name: { ru: "Маникюр + педикюр в 4 руки", en: "Mani + pedi, 4 hands" }, price: { ru: "от 5 700 ₽", en: "from 5 700 ₽" }, img: "/assets/tild3638-373_-2___1__3.jpg" },
  { name: { ru: "Макияж", en: "Makeup" }, price: { ru: "по запросу", en: "on request" }, img: "/assets/alis/img_2746.jpg" },
];

export function PopularServices() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="popular" className="scroll-mt-24 overflow-hidden bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{en ? "Popular treatments" : "Популярные процедуры"}</h2>
        {/* Лента: на телефоне листается вбок, на компьютере — 5 в ряд */}
        <div className="-mx-[2%] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[2%] pb-2 [scrollbar-width:none] sm:gap-3 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0 lg:gap-4">
          {POPULAR.map((s, i) => (
            <article key={s.name.ru} className="r-reveal group flex w-[62%] shrink-0 snap-start flex-col sm:w-[40%] lg:w-auto" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={`${s.name[lang]} — ÁLIS BEAUTY`} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] text-[#17191a] backdrop-blur-sm sm:text-[12px]">{s.price[lang]}</span>
              </div>
              <h3 className="mt-3 font-display text-[13px] uppercase tracking-[0.04em] text-[#17191a] sm:text-[15px]">{s.name[lang]}</h3>
              <a
                href={YCLIENTS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center rounded-[12px] border border-[#17191a]/20 py-2.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-300 hover:border-[#17191a] hover:bg-[#17191a] hover:text-white sm:text-[11px]"
              >
                {en ? "Book" : "Записаться"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——— Отзывы: 3 карточки + оставить свой ———
export function SalonReviews() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="reviews" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <h2 className="r-reveal mb-8 text-center text-[#17191a] lg:mb-10">{en ? "Reviews" : "Отзывы"}</h2>
        <div className="grid gap-2 sm:gap-3 md:grid-cols-3 lg:gap-4">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <figure key={r.name.ru} className="r-reveal flex flex-col justify-between rounded-[20px] border border-[#17191a]/12 bg-white p-5 sm:p-7" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div>
                <span aria-hidden className="text-[13px] tracking-[0.2em] text-[#b8955a]">★★★★★</span>
                <blockquote className="mt-3 text-[13px] leading-[1.6] text-[#17191a]/80 sm:text-[15px]">«{r.text[lang]}»</blockquote>
              </div>
              <figcaption className="mt-5 border-t border-[#17191a]/10 pt-4">
                <span className="block font-display text-[13px] uppercase tracking-[0.04em] text-[#17191a] sm:text-[14px]">{r.name[lang]}</span>
                <span className="mt-0.5 block text-[11px] text-[#17191a]/50 sm:text-[12px]">{r.role[lang]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          {/* TODO: ссылку на площадку отзывов (Яндекс/2ГИС) пришлёт заказчица — пока к администратору */}
          <a href={SALON_ADMIN_WA} target="_blank" rel="noopener noreferrer" className="flex w-full max-w-[360px] items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px]">
            {en ? "Leave your review" : "Оставить свой отзыв о визите"}
          </a>
        </div>
      </div>
    </section>
  );
}
