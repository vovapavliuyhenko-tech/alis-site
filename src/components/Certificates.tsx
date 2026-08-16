"use client";
// ПОДАРОЧНЫЕ СЕРТИФИКАТЫ — акцентная бордовая плашка во всю ширину.
// Слева: заголовок, продающий текст, кнопка «Купить сертификат».
// Справа: стилизованная карточка сертификата ALIS с номиналом.
// Кнопка открывает модальную форму заказа: выбор номинала → имя/телефон → успех.
// Светлая тема сайта, бордовый акцент. Двуязычно (RU/EN).
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const NOMINALS = ["3 000", "5 000", "10 000", "15 000"];

export default function Certificates() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, enn: string) => (en ? enn : ru);

  const [open, setOpen] = useState(false);
  const [nominal, setNominal] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);

  // Блокируем прокрутку фона, пока открыта форма
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const chosen = nominal === "custom" ? custom.trim() : nominal;
  const canSend = !!chosen && name.trim().length > 1 && phone.replace(/\D/g, "").length >= 6 && agree;

  const submit = () => {
    if (!canSend) return;
    // TODO: реальная отправка заявки (Telegram / e-mail / CRM)
    setSent(true);
  };

  const close = () => {
    setOpen(false);
    // сбрасываем успех с задержкой, чтобы не мигало при закрытии
    setTimeout(() => setSent(false), 300);
  };

  return (
    <section id="certificates" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto w-[92%] max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[32px] bg-[#4E2126] px-7 py-10 text-[#f4efe6] sm:px-10 lg:px-16 lg:py-16">
          {/* Мягкое свечение */}
          <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f4efe6]/10 blur-[90px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {/* Левая часть — продающая структура + CTA (со стаггер-появлением) */}
            <div>
              <span className="r-reveal inline-block rounded-full bg-[#f4efe6]/12 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]/80">
                {t("подарочный сертификат", "gift certificate")}
              </span>
              <h2 className="r-reveal mt-5 font-serif text-[30px] leading-[1.08] lg:text-[46px]">
                {t("Лучший подарок — красота ALIS", "The best gift is ALIS beauty")}
              </h2>
              <p className="r-reveal mt-4 max-w-lg text-[14px] leading-relaxed text-[#f4efe6]/75 lg:text-[15px]">
                {t(
                  "Не гадайте с подарком — подарите впечатление. Сертификат ALIS beauty, которым приятно пользоваться.",
                  "Stop guessing what to gift — give an experience. An ALIS beauty certificate that's a pleasure to use."
                )}
              </p>

              {/* Выгоды */}
              <ul className="r-reveal mt-6 space-y-3">
                {[
                  t("Номинал 3 000 – 15 000 ₽ — на ваш выбор", "Amount 3,000–15,000 ₽ — your choice"),
                  t("Действует на процедуры и продукцию ALIS beauty", "Valid for procedures and ALIS beauty products"),
                  t("Оформление за пару минут — онлайн или на ресепшене", "Ready in a couple of minutes — online or at reception"),
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[14px] leading-snug text-[#f4efe6]/90 lg:text-[15px]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f4efe6]/15">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f4efe6" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="r-reveal mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setOpen(true)}
                  className="group/btn inline-flex items-center gap-3 rounded-full bg-[#f4efe6] px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-[#4E2126] transition-transform duration-300 hover:scale-[1.03]"
                >
                  {t("Купить сертификат", "Buy a certificate")}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover/btn:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <span className="text-[12px] text-[#f4efe6]/60">
                  {t("Подтверждение сразу · без предоплаты", "Instant confirmation · no prepayment")}
                </span>
              </div>

              <p className="r-reveal mt-4 text-[12px] text-[#f4efe6]/45">
                {t("*сертификаты другим номиналом продаются только в онлайн-формате", "*certificates of other amounts are sold online only")}
              </p>
            </div>

            {/* Правая часть — карта: оборот 360° + блик + усиленные искры */}
            <div className="group flex justify-center lg:justify-end" style={{ perspective: "1200px" }}>
              <div className="relative w-full max-w-[360px]">
                {/* Искры — точки, разлетаются при наведении */}
                {[
                  { l: "46%", t: "-7%", s: 9, d: 0, c: "#e7c9a0" },
                  { l: "72%", t: "8%", s: 6, d: 0.12, c: "#f4efe6" },
                  { l: "94%", t: "26%", s: 10, d: 0.06, c: "#e7c9a0" },
                  { l: "6%", t: "16%", s: 6, d: 0.2, c: "#f4efe6" },
                  { l: "18%", t: "-4%", s: 7, d: 0.28, c: "#e7c9a0" },
                  { l: "88%", t: "78%", s: 8, d: 0.1, c: "#e7c9a0" },
                  { l: "-2%", t: "62%", s: 6, d: 0.18, c: "#f4efe6" },
                  { l: "60%", t: "94%", s: 7, d: 0.24, c: "#e7c9a0" },
                ].map((p, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="cert-spark pointer-events-none absolute rounded-full opacity-0 group-hover:[animation:certpop_1.1s_ease_forwards]"
                    style={{ left: p.l, top: p.t, width: p.s, height: p.s, background: p.c, boxShadow: `0 0 8px ${p.c}`, animationDelay: `${p.d}s` }}
                  />
                ))}
                {/* Звёздочки-искры */}
                {[
                  { l: "80%", t: "2%", s: 20, d: 0.05 },
                  { l: "2%", t: "40%", s: 16, d: 0.16 },
                  { l: "96%", t: "58%", s: 18, d: 0.22 },
                  { l: "34%", t: "96%", s: 15, d: 0.3 },
                ].map((p, i) => (
                  <svg
                    key={`s${i}`}
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="cert-spark pointer-events-none absolute opacity-0 group-hover:[animation:certtwinkle_1.1s_ease_forwards]"
                    style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
                  >
                    <path d="M12 0c1 6 5 10 12 12-7 2-11 6-12 12-1-6-5-10-12-12 7-2 11-6 12-12z" fill="#e7c9a0" />
                  </svg>
                ))}

                {/* Карта: front + back, полный оборот по Y */}
                <div className="relative aspect-[1.6/1] [transform-style:preserve-3d] transition-transform duration-[1100ms] ease-[cubic-bezier(.4,.1,.2,1)] [transform:rotateY(0deg)_rotateX(4deg)] group-hover:[transform:rotateY(360deg)_rotateX(0deg)_translateY(-8px)]">
                  {/* Лицевая сторона */}
                  <div className="absolute inset-0 overflow-hidden rounded-[20px] border border-[#f4efe6]/25 bg-gradient-to-br from-[#5c2a30] to-[#3a171b] p-6 shadow-[-18px_24px_50px_rgba(0,0,0,0.4)] [backface-visibility:hidden]">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span className="font-serif text-[26px] tracking-[0.14em] text-[#f4efe6]">ÁLIS</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#f4efe6]/55">gift card</span>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#f4efe6]/55">
                          {t("подарочный сертификат", "gift certificate")}
                        </p>
                        <p className="mt-1 font-serif text-[30px] text-[#f4efe6] lg:text-[34px]">3 000 – 15 000 ₽</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#f4efe6]/45">
                        <span>alis beauty</span>
                        <span>{t("процедуры · продукция", "procedures · products")}</span>
                      </div>
                    </div>
                    {/* Пробегающий блик */}
                    <span aria-hidden className="pointer-events-none absolute top-0 left-[-60%] h-full w-[45%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-[#f4efe6]/35 to-transparent transition-[left] duration-[900ms] ease-out group-hover:left-[120%]" />
                  </div>
                  {/* Оборотная сторона */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[20px] border border-[#f4efe6]/25 bg-gradient-to-br from-[#3a171b] to-[#5c2a30] p-6 text-center shadow-[-18px_24px_50px_rgba(0,0,0,0.4)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="font-serif text-[30px] tracking-[0.14em] text-[#f4efe6]">ÁLIS</span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#f4efe6]/60">{t("с любовью, beauty", "with love, beauty")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальная форма заказа */}
      {open && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-[#17191a]/60 backdrop-blur-sm" onClick={close} />
          <div className="relative w-full max-w-[520px] rounded-t-[24px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:rounded-[24px] sm:p-8">
            <button
              onClick={close}
              aria-label={t("Закрыть", "Close")}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#17191a]/50 transition-colors hover:bg-[#17191a]/5 hover:text-[#17191a]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
            </button>

            {!sent ? (
              <>
                <h3 className="font-serif text-[24px] text-[#4E2126] lg:text-[28px]">
                  {t("Оформить сертификат", "Order a certificate")}
                </h3>
                <p className="mt-2 text-[13px] text-[#17191a]/55">
                  {t("Выберите номинал и оставьте контакты — мы свяжемся и оформим оплату.", "Choose the amount and leave your contacts — we'll get in touch and arrange payment.")}
                </p>

                {/* Номиналы */}
                <p className="mb-2 mt-6 text-[12px] uppercase tracking-[0.12em] text-[#17191a]/45">{t("Номинал", "Amount")}</p>
                <div className="flex flex-wrap gap-2.5">
                  {NOMINALS.map((n) => (
                    <button
                      key={n}
                      onClick={() => setNominal(n)}
                      className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                        nominal === n
                          ? "border-[#4E2126] bg-[#4E2126] text-[#f4efe6]"
                          : "border-[#17191a]/15 text-[#17191a] hover:border-[#4E2126]"
                      }`}
                    >
                      {n} ₽
                    </button>
                  ))}
                  <button
                    onClick={() => setNominal("custom")}
                    className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                      nominal === "custom"
                        ? "border-[#4E2126] bg-[#4E2126] text-[#f4efe6]"
                        : "border-[#17191a]/15 text-[#17191a] hover:border-[#4E2126]"
                    }`}
                  >
                    {t("Свой номинал", "Custom")}
                  </button>
                </div>
                {nominal === "custom" && (
                  <input
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
                    inputMode="numeric"
                    placeholder={t("Сумма, ₽ (только онлайн)", "Amount, ₽ (online only)")}
                    className="mt-3 w-full rounded-2xl border border-[#17191a]/15 px-4 py-3 text-[15px] outline-none focus:border-[#4E2126]"
                  />
                )}

                {/* Контакты */}
                <div className="mt-5 space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("Ваше имя", "Your name")}
                    className="w-full rounded-2xl border border-[#17191a]/15 px-4 py-3 text-[15px] outline-none focus:border-[#4E2126]"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    inputMode="tel"
                    className="w-full rounded-2xl border border-[#17191a]/15 px-4 py-3 text-[15px] outline-none focus:border-[#4E2126]"
                  />
                </div>

                <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] leading-snug text-[#17191a]/55">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#4E2126]" />
                  <span>
                    {t("Даю согласие на обработку персональных данных и соглашаюсь с ", "I consent to the processing of personal data and agree to the ")}
                    <a href="/policy" className="text-[#4E2126] underline underline-offset-2">
                      {t("политикой конфиденциальности", "privacy policy")}
                    </a>
                  </span>
                </label>

                <button
                  onClick={submit}
                  disabled={!canSend}
                  className="mt-6 w-full rounded-full bg-[#4E2126] py-3.5 text-[14px] font-medium text-[#f4efe6] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  {t("Оформить сертификат", "Order certificate")}
                </button>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4E2126]/10">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4E2126" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="mt-5 font-serif text-[24px] text-[#4E2126]">{t("Заявка принята!", "Request received!")}</h3>
                <p className="mx-auto mt-2 max-w-sm text-[14px] text-[#17191a]/60">
                  {t(`Сертификат на ${chosen} ₽ — мы свяжемся с вами для оформления оплаты.`, `Certificate for ${chosen} ₽ — we'll contact you to arrange payment.`)}
                </p>
                <button onClick={close} className="mt-6 rounded-full border border-[#4E2126] px-7 py-3 text-[13px] text-[#4E2126] transition-colors hover:bg-[#4E2126] hover:text-[#f4efe6]">
                  {t("Готово", "Done")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
