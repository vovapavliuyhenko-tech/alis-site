"use client";
// «КОМПЛИМЕНТ ОТ ALIS BEAUTY» (главная) — тексты заказчицы. Одна светлая полоса во всю ширину
// со скруглением 28px (как «Выездной сервис»), всё по центру: подпись, крупная тонкая «500 ₽»
// (набегает от 0, когда блок появляется на экране), текст и форма телефона в одну строку.
// Номер уходит в CRM (тип «bonus») и в Telegram.
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { formatPhone } from "@/components/pages/RequestForm";

export default function BonusOffer() {
  const { lang } = useLang();
  const en = lang === "en";
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [consent, setConsent] = useState(false); // кнопка активна только после галочки согласия
  // Счётчик 0 → 500, когда блок попадает в кадр
  const box = useRef<HTMLElement>(null);
  const [n, setN] = useState(500);
  useEffect(() => {
    const el = box.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        setN(Math.round(500 * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      setN(0);
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone.replace(/\D/g, "").length < 11) {
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
    <section ref={box} id="bonus" className="scroll-mt-24 bg-white section-y">
      {/* Слева — крупная «500 ₽», справа — заголовок, текст и форма (на телефоне — друг под другом) */}
      <div className="r-reveal grid w-full items-center gap-8 rounded-[28px] bg-white px-6 py-16 text-center md:grid-cols-2 md:gap-12 md:px-12 md:text-left lg:px-24 lg:py-24">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#17191a]/60">{en ? "A gift from ALIS BEAUTY" : "Комплимент от ALIS BEAUTY"}</p>
          <p aria-hidden className="mt-4 font-display !text-[52px] font-extralight leading-none tracking-[0.01em] text-[#17191a] tabular-nums sm:!text-[96px] lg:!text-[150px]">
            {n}<span className="ml-1 align-top !text-[22px] sm:!text-[36px] lg:!text-[52px]">₽</span>
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start">
        <h2 className="text-[#17191a]">{en ? "500 bonus roubles on your first visit" : "500 бонусных рублей на первый визит"}</h2>
        {state === "done" ? (
          <p className="mt-4 !text-[15px] leading-[1.6] text-[#17191a]">
            {en ? "Thank you! The bonuses will be in your account when you come." : "Спасибо! Бонусы будут на счёте, когда вы придёте."}
          </p>
        ) : (
          <>
            <p className="mt-3 max-w-[520px] !text-[14px] leading-[1.6] text-[#17191a]/75 lg:!text-[15px]">
              {/* В одну строку на любом экране: размер от ширины */}
              <span className="block whitespace-nowrap text-[clamp(9.5px,2.6vw,15px)]">{en ? "Leave your number — the bonuses will be in your account when you come" : "Оставьте номер — бонусы уже будут на счёте, когда вы придёте"}</span>
            </p>
            <form onSubmit={submit} noValidate className="mt-8 flex w-full max-w-[560px] flex-col gap-3 sm:flex-row">
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
                // Маска +7 (XXX) XXX-XX-XX: цифры раскладываются сами, «8» в начале → «+7»
                onFocus={() => { if (!phone) setPhone("+7 ("); }}
                onBlur={() => { if (phone.replace(/\D/g, "").length <= 1) setPhone(""); }}
                onChange={(e) => {
                  let v = e.target.value;
                  const d = v.replace(/\D/g, "");
                  // Вставили полный номер (8… или +7…) в поле с готовым «+7 (» — убираем лишнюю 7
                  if (d.length > 11 && (d.startsWith("78") || d.startsWith("77"))) v = d.slice(1);
                  setPhone(d.length === 0 ? "" : formatPhone(v));
                  if (err) setErr("");
                }}
                maxLength={18}
                className="h-[52px] w-full shrink-0 rounded-[12px] border border-[#17191a]/20 bg-white px-5 text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#17191a] sm:w-auto sm:flex-1"
              />
              <button
                type="submit"
                disabled={state === "sending" || !consent}
                className="h-[52px] shrink-0 rounded-[12px] border border-[#17191a] bg-[#17191a] px-8 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white"
              >
                {state === "sending" ? (en ? "Sending…" : "Отправляем…") : en ? "Get my bonuses" : "Забрать бонусы"}
              </button>
            </form>
            {(err || state === "error") && (
              <p className="mt-3 text-[13px] text-[#b42318]">{err || (en ? "Something went wrong. Please call us." : "Не получилось отправить. Позвоните нам, пожалуйста.")}</p>
            )}
            {/* Галочка согласия — без неё кнопка «Забрать бонусы» неактивна */}
            <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-left">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]"
              />
              {/* В одну строку: ссылка на политику — на словах «персональных данных» */}
              <span className="whitespace-nowrap text-[clamp(10px,2.9vw,11px)] leading-relaxed text-[#17191a]/50">
                {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
              </span>
            </label>
          </>
        )}
        </div>
      </div>
    </section>
  );
}
