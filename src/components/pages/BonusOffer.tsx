"use client";
// «КОМПЛИМЕНТ ОТ ALIS BEAUTY» (главная) — тексты заказчицы. Вариант B: слева подарочная карта
// ÁLIS BEAUTY «500 ₽» — медленно покачивается в 3D и наклоняется за курсором; справа белая панель с тонкой рамкой, мелкая подпись капсом, заголовок
// раздела, поле телефона и чёрная кнопка. Номер уходит в CRM (тип «bonus») и в Telegram.
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { LogoWord } from "@/components/Logo";

export default function BonusOffer() {
  const { lang } = useLang();
  const en = lang === "en";
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  // Наклон карты за курсором (на телефоне — только плавное покачивание)
  const card = useRef<HTMLDivElement>(null);
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !card.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.setProperty("transform", `rotateY(${x * 22}deg) rotateX(${-y * 16}deg)`);
  };
  const reset = () => card.current?.style.removeProperty("transform");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 10) {
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
    <section id="bonus" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] overflow-hidden rounded-[12px] border border-[#17191a]/12 md:grid-cols-2">
        {/* Подарочная карта */}
        <div onPointerMove={tilt} onPointerLeave={reset} className="flex min-h-[300px] items-center justify-center bg-[#f6f4f1] px-6 py-12 [perspective:1000px] md:min-h-[460px]">
          <div className="alis-gift-float">
            <div
              ref={card}
              className="flex aspect-[1.6] w-[min(78vw,380px)] flex-col justify-between rounded-[18px] bg-[#17191a] p-6 text-[#f4efe6] shadow-[0_30px_60px_-24px_rgba(23,25,26,0.6)] transition-transform duration-300 ease-out [transform-style:preserve-3d] lg:p-8"
            >
              <LogoWord variant="cream" className="h-[16px] w-auto self-start lg:h-[18px]" />
              <p className="font-display !text-[56px] font-extralight leading-none tracking-[0.02em] text-[#f4efe6] lg:!text-[72px]">500 ₽</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#f4efe6]/70 lg:text-[11px]">{en ? "On your first visit" : "На первый визит"}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#17191a]/60">{en ? "A gift from ALIS BEAUTY" : "Комплимент от ALIS BEAUTY"}</p>
          <h2 className="mt-3 text-[#17191a]">{en ? "500 bonus roubles on your first visit" : "500 бонусных рублей на первый визит"}</h2>
          {state === "done" ? (
            <p className="mt-4 !text-[15px] leading-[1.6] text-[#17191a]">
              {en ? "Thank you! The bonuses will be in your account when you come." : "Спасибо! Бонусы будут на счёте, когда вы придёте."}
            </p>
          ) : (
            <>
              <p className="mt-3 !text-[14px] leading-[1.6] text-[#17191a]/75 lg:!text-[15px]">
                {en ? "Leave your number — the bonuses will be in your account when you come" : "Оставьте номер — бонусы уже будут на счёте, когда вы придёте"}
              </p>
              <form onSubmit={submit} noValidate className="mt-7 flex flex-col gap-3 sm:flex-row">
                {/* Поле-ловушка для ботов */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label htmlFor="bonus-phone" className="sr-only">{en ? "Phone" : "Телефон"}</label>
                <input
                  id="bonus-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); if (err) setErr(""); }}
                  className="h-[52px] w-full shrink-0 rounded-[12px] border border-[#17191a]/20 bg-white px-5 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#17191a] sm:w-auto sm:flex-1"
                />
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="h-[52px] shrink-0 rounded-[12px] border border-[#17191a] bg-[#17191a] px-8 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:opacity-60"
                >
                  {state === "sending" ? (en ? "Sending…" : "Отправляем…") : en ? "Get my bonuses" : "Забрать бонусы"}
                </button>
              </form>
              {(err || state === "error") && (
                <p className="mt-3 text-[13px] text-[#b42318]">{err || (en ? "Something went wrong. Please call us." : "Не получилось отправить. Позвоните нам, пожалуйста.")}</p>
              )}
              <p className="mt-4 text-[11px] leading-relaxed text-[#17191a]/50">
                {en ? "By sending, you agree to the " : "Нажимая кнопку, вы соглашаетесь с "}
                <a href="/policy" className="underline underline-offset-2">{en ? "processing of personal data" : "обработкой персональных данных"}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
