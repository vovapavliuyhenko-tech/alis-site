"use client";
// СТРАНИЦА «МАГАЗИН» — блоки по брифу заказчицы:
//  ShopCategories — 4 категории с фото и ценами: уход и инструменты, мерч, подарочный бокс, сертификаты;
//  HairQuiz       — «Подобрать уход за 30 секунд с консультантом»: 5 вопросов о волосах → контакты →
//                   CRM (тип «shop»); тёмная, в формате анкеты консьерж-сервиса;
//  MerchLine      — строка про мерч + условия доставки и самовывоза (над лентой товаров);
//  GiftBox        — подарочный бокс: 3 фото, текст и связь с менеджером;
//  CertBuilder    — конструктор сертификата: открытка, сумма, пожелание, день и час → CRM.
// Цены категорий считаются из каталога. TODO: фото бокса, открыток и суммы сертификатов — от заказчицы.
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import { PRODUCTS } from "@/lib/products";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import DateField from "@/components/ui/DateField";

type Loc = { ru: string; en: string };
const MANAGER_WA = "https://wa.me/79888887758"; // администратор салона — заказы магазина
const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/,/g, " ");
const minPrice = (tags: string[]) => Math.min(...PRODUCTS.filter((p) => tags.includes(p.tag.ru)).map((p) => p.price));

// ——— Категории ———
export function ShopCategories() {
  const { lang } = useLang();
  const en = lang === "en";
  const CATS: { title: Loc; price: Loc; img: string; href: string }[] = [
    { title: { ru: "Уход для волос, инструменты", en: "Hair care & tools" }, price: { ru: `от ${fmt(minPrice(["уход"]))} ₽`, en: `from ${fmt(minPrice(["уход"]))} ₽` }, img: "/assets/alis/img_5910.webp", href: "/shop/catalog?cat=%D1%83%D1%85%D0%BE%D0%B4" },
    { title: { ru: "Мерч ÁLIS BEAUTY", en: "ÁLIS BEAUTY merch" }, price: { ru: `от ${fmt(minPrice(["одежда", "аксессуары"]))} ₽`, en: `from ${fmt(minPrice(["одежда", "аксессуары"]))} ₽` }, img: "/assets/alis/img_1834.jpg", href: "/shop/catalog" },
    { title: { ru: "Подарочный beauty-бокс", en: "Beauty gift box" }, price: { ru: "по запросу", en: "on request" }, img: "/assets/alis/img_6048.jpg", href: MANAGER_WA },
    { title: { ru: "Сертификаты", en: "Gift certificates" }, price: { ru: "любая сумма", en: "any amount" }, img: "/assets/alis/img_1855.jpg", href: "https://o8981.yclients.ru/certificates" },
  ];
  return (
    <section id="categories" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
        {CATS.map((c, i) => {
          const inner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.title[lang]} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] text-[#17191a] backdrop-blur-sm sm:left-4 sm:top-4 sm:text-[12px]">{c.price[lang]}</span>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5">
                <h3 className="font-display text-[13px] leading-[1.25] tracking-[0.02em] sm:text-[17px]">{c.title[lang]}</h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-[#17191a] sm:h-10 sm:w-10">
                  <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
                </span>
              </div>
            </>
          );
          const cls = "r-reveal group relative block aspect-[3/4] overflow-hidden rounded-[20px]";
          return c.href.startsWith("http") ? (
            <a key={c.title.ru} href={c.href} target="_blank" rel="noopener noreferrer" className={cls} style={{ transitionDelay: `${i * 0.08}s` }}>{inner}</a>
          ) : (
            <Link key={c.title.ru} href={c.href} className={cls} style={{ transitionDelay: `${i * 0.08}s` }}>{inner}</Link>
          );
        })}
      </div>
      <h2 className="sr-only">{en ? "Categories" : "Категории"}</h2>
    </section>
  );
}

// ——— Подбор ухода (5 вопросов) ———
type Q = { key: string; label: Loc; q: Loc; opts: Loc[] };
const HAIR: Q[] = [
  { key: "type", label: { ru: "Тип волос", en: "Hair type" }, q: { ru: "Какие у вас волосы?", en: "What's your hair like?" }, opts: [
    { ru: "Прямые", en: "Straight" }, { ru: "Волнистые", en: "Wavy" }, { ru: "Кудрявые", en: "Curly" }, { ru: "Не знаю", en: "Not sure" },
  ] },
  { key: "length", label: { ru: "Длина", en: "Length" }, q: { ru: "Какая длина?", en: "What length?" }, opts: [
    { ru: "Короткие", en: "Short" }, { ru: "Средние", en: "Medium" }, { ru: "Длинные", en: "Long" }, { ru: "Очень длинные", en: "Very long" },
  ] },
  { key: "color", label: { ru: "Окрашивание", en: "Colour" }, q: { ru: "Волосы окрашены?", en: "Is your hair coloured?" }, opts: [
    { ru: "Натуральные", en: "Natural" }, { ru: "Окрашены", en: "Coloured" }, { ru: "Осветлены", en: "Lightened" }, { ru: "Кератин / ботокс", en: "Keratin / botox" },
  ] },
  { key: "scalp", label: { ru: "Кожа головы", en: "Scalp" }, q: { ru: "Какая кожа головы?", en: "What's your scalp like?" }, opts: [
    { ru: "Нормальная", en: "Normal" }, { ru: "Жирная", en: "Oily" }, { ru: "Сухая", en: "Dry" }, { ru: "Чувствительная", en: "Sensitive" },
  ] },
  { key: "goal", label: { ru: "Цель", en: "Goal" }, q: { ru: "Что хотите получить?", en: "What do you want?" }, opts: [
    { ru: "Увлажнение", en: "Moisture" }, { ru: "Восстановление", en: "Repair" }, { ru: "Объём", en: "Volume" }, { ru: "Блеск и гладкость", en: "Shine & smoothness" },
  ] },
];

export function HairQuiz() {
  const { lang } = useLang();
  const en = lang === "en";
  const [step, setStep] = useState(0); // 0..4 вопросы, 5 — контакты, 6 — готово
  const [ans, setAns] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const ok = phoneComplete(phone) && consent;
  const send = () => {
    if (!ok) return;
    void sendLead({ kind: "shop", name, phone, details: { Форма: "Подбор ухода за волосами", ...Object.fromEntries(HAIR.map((x) => [x.label.ru, ans[x.key] || ""])) } });
    setStep(6);
  };
  const label = (x: Q) => x.opts.find((o) => o.ru === ans[x.key])?.[lang] || "";
  const q = HAIR[step];
  const link = "text-[11px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-white";
  const field = "h-[46px] w-full rounded-[14px] bg-white px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:h-[48px] sm:rounded-[16px] sm:px-5 sm:text-[15px] autofill:shadow-[inset_0_0_0_1000px_#fff]";

  return (
    <section id="hair" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto grid w-[96%] max-w-[1760px] gap-8 rounded-[28px] bg-[#17191a] px-5 py-10 text-white sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-20 lg:px-20 lg:py-14">
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="text-white">{en ? "Find your care in 30 seconds with a consultant" : "Подобрать уход за 30 секунд с консультантом"}</h2>
          <p className="mt-2 !text-[12.5px] leading-[1.55] text-white/65 sm:mt-3 sm:!text-[15px]">
            {en ? "Answer 5 questions about your hair, and a specialist will send a selection of products for your type and goals." : "Ответьте на 5 вопросов о волосах, и специалист пришлёт подбор средств под ваш тип и цели."}
          </p>
          <div className="mt-7 hidden grid-cols-2 gap-2 lg:grid">
            {HAIR.map((x, i) => {
              const v = label(x);
              return (
                <div key={x.key} className={`rounded-[14px] border px-4 py-2.5 transition-colors duration-500 ${i === HAIR.length - 1 ? "col-span-2" : ""} ${v ? "border-white/10 bg-white/[0.06]" : "border-dashed border-white/15"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">{x.label[lang]}</span>
                    <span key={v ? "on" : "off"} className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${v ? "bg-white animate-[hq-dot_.9s_ease-out]" : "bg-white/15"}`} />
                  </div>
                  <p className="mt-1 overflow-hidden font-display text-[16px] tracking-[0.02em]">
                    <span key={v || "—"} className={`block ${v ? "animate-[hq-val_.55s_cubic-bezier(.2,.8,.2,1)] text-white" : "text-white/20"}`}>{v || "—"}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">{step < 6 ? `${en ? "Step" : "Шаг"} ${step + 1} / 6` : en ? "Done" : "Готово"}</span>
          <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full bg-white transition-all duration-500" style={{ width: `${(Math.min(step, 6) / 6) * 100}%` }} />
          </div>

          {step < 5 && q && (
            <div key={step} className="animate-[hq-in_.4s_ease]">
              <p className="mt-5 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[17px]">{q.q[lang]}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {q.opts.map((o, k) => (
                  <button
                    key={o.ru}
                    type="button"
                    onClick={() => { setAns({ ...ans, [q.key]: o.ru }); setStep(step + 1); }}
                    style={{ animationDelay: `${k * 0.06}s` }}
                    className={`animate-[hq-in_.45s_ease_both] rounded-[14px] border px-3 py-3 text-[12px] transition-all active:scale-[0.97] sm:rounded-[16px] sm:text-[14px] ${ans[q.key] === o.ru ? "border-white bg-white text-[#17191a]" : "border-white/20 text-white hover:border-white/60"}`}
                  >
                    {o[lang]}
                  </button>
                ))}
              </div>
              {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className={`mt-5 ${link}`}>← {en ? "Back" : "Назад"}</button>}
            </div>
          )}

          {step === 5 && (
            <div className="animate-[hq-in_.4s_ease]">
              <p className="mt-5 font-display text-[15px] uppercase tracking-[0.04em] sm:text-[17px]">{en ? "Where to send the selection?" : "Куда прислать подбор?"}</p>
              <div className="mt-4 flex flex-col gap-2">
                <input type="text" placeholder={en ? "Name" : "Имя"} value={name} onChange={(e) => setName(e.target.value)} className={field} />
                <PhoneField lang={lang} value={phone} onChange={setPhone} />
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-white" />
                <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-white/55">
                  {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                  <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
                </span>
              </label>
              <button type="button" onClick={send} disabled={!ok} className="mt-4 flex w-full items-center justify-center rounded-[12px] border border-white bg-white py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[#17191a] transition-colors duration-300 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]">
                {en ? "Find my care" : "Подобрать уход"}
              </button>
              <button type="button" onClick={() => setStep(4)} className={`mt-4 ${link}`}>← {en ? "Back" : "Назад"}</button>
            </div>
          )}

          {step === 6 && (
            <div className="animate-[hq-in_.4s_ease] py-6 text-center">
              <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[20px] text-[#17191a]">✓</span>
              <p className="mt-5 font-display text-[18px] sm:text-[22px]">{en ? "Thank you!" : "Спасибо!"}</p>
              <p className="mx-auto mt-2 max-w-[34ch] !text-[12.5px] leading-[1.55] text-white/65 sm:!text-[14px]">
                {en ? "A specialist will send you a selection of products." : "Специалист пришлёт вам подбор средств."}
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes hq-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes hq-val { from { opacity: 0; transform: translateY(100%) } to { opacity: 1; transform: none } }
        @keyframes hq-dot { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,.5) } 100% { box-shadow: 0 0 0 10px rgba(255,255,255,0) } }
        @media (prefers-reduced-motion: reduce) { #hair * { animation: none !important } }
      `}</style>
    </section>
  );
}

// ——— Строка про мерч + доставка ———
export function MerchLine() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="merch" className="scroll-mt-24 bg-white section-y">
      <div className="r-reveal mx-auto flex w-[96%] max-w-[1760px] flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">{en ? "Merch" : "Мерч"}</p>
          <h2 className="mt-3 max-w-[32ch] text-[#17191a]">
            {en ? "ÁLIS BEAUTY is a mood you can take with you. For yourself and as a gift." : "ÁLIS BEAUTY — это настроение, которое можно забрать с собой. Для себя и в подарок."}
          </h2>
        </div>
        <ul className="flex flex-col gap-2 text-left lg:max-w-[440px]">
          {[
            { ru: "Самовывоз — в салоне на Пархоменко, 53", en: "Pick-up — at the salon, 53 Parkhomenko St." },
            { ru: "Доставка — согласуем в мессенджере вместе с оплатой", en: "Delivery — arranged in a messenger together with payment" },
          ].map((d) => (
            <li key={d.ru} className="flex items-start gap-3 rounded-[14px] border border-[#17191a]/12 px-4 py-3 text-[12.5px] text-[#17191a] sm:text-[14px]">
              <span aria-hidden className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#17191a] text-[10px] text-white">✓</span>
              {d[lang]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ——— Подарочный бокс ———
const BOX_PHOTOS = ["/assets/alis/img_6048.jpg", "/assets/alis/img_1855.jpg", "/assets/alis/img_5910.webp"];
export function GiftBox() {
  const { lang } = useLang();
  const en = lang === "en";
  return (
    <section id="box" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] items-stretch gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {BOX_PHOTOS.map((src, i) => (
            <div key={src} className={`r-reveal group relative overflow-hidden rounded-[20px] ${i === 0 ? "col-span-2 aspect-[16/9] sm:row-span-2 sm:aspect-auto" : "aspect-square"}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={en ? "ÁLIS BEAUTY gift box" : "Подарочный бокс ÁLIS BEAUTY"} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
            </div>
          ))}
        </div>
        <div className="r-reveal flex flex-col justify-center rounded-[28px] bg-[#f6f4f1] p-6 text-center sm:p-10 lg:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#17191a]/45 sm:text-[11px]">{en ? "Gift box" : "Подарочный бокс"}</p>
          <h2 className="mt-3 text-[#17191a]">{en ? "A beauty box for someone special" : "Подарочный beauty-бокс"}</h2>
          <p className="mt-3 !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:!text-[15px]">
            {en
              ? "Contact a manager within 15 minutes to choose the packaging, contents and card, and discuss any details."
              : "Свяжитесь с менеджером за 15 минут, чтобы выбрать упаковку, наполнение, открытку и обсудить необходимые детали."}
          </p>
          <a href={MANAGER_WA} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]">
            {en ? "Contact a manager" : "Связаться с менеджером"}
          </a>
        </div>
      </div>
    </section>
  );
}

// ——— Конструктор сертификата ———
const CARDS: { id: string; name: Loc; cls: string; ink: string }[] = [
  { id: "black", name: { ru: "Чёрная", en: "Black" }, cls: "bg-[#17191a]", ink: "text-white" },
  { id: "cream", name: { ru: "Сливочная", en: "Cream" }, cls: "bg-[#f1ebe1]", ink: "text-[#17191a]" },
  { id: "photo", name: { ru: "С фото", en: "Photo" }, cls: "bg-[url('/assets/alis/img_1855.jpg')] bg-cover bg-center", ink: "text-white" },
];
const AMOUNTS = ["3 000 ₽", "5 000 ₽", "10 000 ₽"];

export function CertBuilder() {
  const { lang } = useLang();
  const en = lang === "en";
  const [card, setCard] = useState(CARDS[0]);
  const [amount, setAmount] = useState(AMOUNTS[1]);
  const [custom, setCustom] = useState("");
  const [wish, setWish] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const sum = amount === "custom" ? (custom ? `${custom} ₽` : "") : amount;
  const ok = !!sum && phoneComplete(phone) && consent;
  const send = () => {
    if (!ok) return;
    void sendLead({ kind: "shop", phone, details: { Форма: "Сертификат (конструктор)", Открытка: card.name.ru, Сумма: sum, Пожелание: wish, "Дата вручения": date, Время: time } });
    setSent(true);
  };
  const pill = (on: boolean) => `rounded-full border px-4 py-2 text-[12px] transition-colors sm:text-[13px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/15 bg-white text-[#17191a] hover:border-[#17191a]/50"}`;
  const field = "h-[46px] w-full rounded-[14px] bg-white px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:h-[48px] sm:rounded-[16px] sm:px-5 sm:text-[15px]";

  return (
    <section id="certificates" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto grid w-[96%] max-w-[1760px] gap-6 rounded-[28px] bg-[#f6f4f1] p-5 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-16">
        {/* Слева: заголовок и живое превью открытки */}
        <div className="flex flex-col text-center lg:text-left">
          <h2 className="text-[#17191a]">{en ? "Gift certificates" : "Сертификаты"}</h2>
          <p className="mt-3 !text-[12.5px] leading-[1.6] text-[#17191a]/65 sm:!text-[15px]">
            {en
              ? "Give a feeling. Any service or amount. Choose a card, write a wish — we'll deliver it to the recipient on the set day and hour."
              : "Дарите ощущения. Любые услуги и сумма. Выберите открытку, напишите пожелание — отправим получателю в назначенный день и час."}
          </p>
          <div className={`relative mx-auto mt-6 aspect-[1.6] w-full max-w-[460px] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-30px_rgba(23,25,26,0.5)] transition-all duration-500 lg:mx-0 ${card.cls}`}>
            {card.id === "photo" && <div aria-hidden className="absolute inset-0 bg-black/45" />}
            <div key={card.id + sum} className={`absolute inset-0 flex animate-[cert-in_.5s_ease] flex-col justify-between p-5 sm:p-7 ${card.ink}`}>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] opacity-70">
                <span>ÁLIS BEAUTY</span>
                <span>{en ? "Gift certificate" : "Сертификат"}</span>
              </div>
              <p className="line-clamp-2 text-left font-display text-[13px] leading-[1.4] opacity-80 sm:text-[15px]">{wish || (en ? "Your wish will appear here" : "Здесь будет ваше пожелание")}</p>
              <p className="text-left font-display text-[28px] font-extralight tracking-[0.02em] sm:text-[40px]">{sum || "— ₽"}</p>
            </div>
          </div>
        </div>

        {/* Справа: настройки */}
        {sent ? (
          <div className="flex flex-col items-center justify-center rounded-[20px] bg-white p-8 text-center">
            <span aria-hidden className="flex h-14 w-14 items-center justify-center rounded-full bg-[#17191a] text-[20px] text-white">✓</span>
            <p className="mt-5 font-display text-[18px] sm:text-[22px]">{en ? "Thank you!" : "Спасибо!"}</p>
            <p className="mt-2 max-w-[34ch] !text-[12.5px] text-[#17191a]/65 sm:!text-[14px]">{en ? "We'll contact you to confirm and arrange payment." : "Свяжемся с вами, чтобы подтвердить сертификат и оплату."}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{en ? "Card" : "Открытка"}</p>
              <div className="flex flex-wrap gap-2">{CARDS.map((c) => <button key={c.id} type="button" onClick={() => setCard(c)} className={pill(card.id === c.id)}>{c.name[lang]}</button>)}</div>
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{en ? "Amount" : "Сумма"}</p>
              <div className="flex flex-wrap gap-2">
                {AMOUNTS.map((a) => <button key={a} type="button" onClick={() => setAmount(a)} className={pill(amount === a)}>{a}</button>)}
                <button type="button" onClick={() => setAmount("custom")} className={pill(amount === "custom")}>{en ? "Own amount" : "Своя сумма"}</button>
              </div>
              {amount === "custom" && (
                <input inputMode="numeric" placeholder={en ? "Amount, ₽" : "Сумма, ₽"} value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " "))} className={`mt-2 ${field}`} />
              )}
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{en ? "Wish" : "Пожелание"}</p>
              <textarea rows={2} maxLength={140} placeholder={en ? "A few warm words" : "Пара тёплых слов"} value={wish} onChange={(e) => setWish(e.target.value)} className="w-full resize-none rounded-[14px] bg-white px-4 py-3 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 sm:rounded-[16px] sm:px-5 sm:text-[15px]" />
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{en ? "When to deliver" : "Когда отправить"}</p>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <DateField lang={lang} value={date} onChange={setDate} />
                <input type="time" aria-label={en ? "Time" : "Время"} value={time} onChange={(e) => setTime(e.target.value)} className={`${field} w-[120px]`} />
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#17191a]/45">{en ? "Your phone" : "Ваш телефон"}</p>
              <PhoneField lang={lang} value={phone} onChange={setPhone} />
            </div>
            <label className="flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
              <span className="whitespace-nowrap text-[clamp(10px,2.8vw,11px)] text-[#17191a]/55">
                {en ? "I agree to the processing of my " : "Даю согласие на обработку "}
                <a href="/policy" className="underline underline-offset-2">{en ? "personal data" : "персональных данных"}</a>
              </span>
            </label>
            <button type="button" onClick={send} disabled={!ok} className="flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white sm:py-3.5 sm:text-[12px] sm:tracking-[0.16em]">
              {en ? "Choose a certificate" : "Выбрать сертификат"}
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes cert-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
