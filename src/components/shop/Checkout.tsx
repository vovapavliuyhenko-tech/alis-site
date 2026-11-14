"use client";
// ОФОРМЛЕНИЕ ЗАКАЗА (/checkout) — по образцу paloma.website/checkout.html, но под салон красоты:
// слева — контакты, получатель (себе / в подарок), способ получения (самовывоз из салона, курьер по
// Новороссийску, доставка по России, «узнать у получателя»), открытка, удобный способ связи,
// комментарий и «дополнят заказ»; справа (на телефоне — ниже) — состав заказа, итог и способ оплаты.
// Без интервалов доставки ко времени: день и время менеджер согласует сам. Заказ уходит в бот команды
// (тип «shop»), после отправки — экран «Заказ принят» с номером, корзина очищается.
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { PRODUCTS, fmtPrice } from "@/lib/products";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";

type Delivery = "pickup" | "courier" | "russia" | "ask";
type Contact = "call" | "telegram" | "messenger" | "max";
type Pay = "receipt" | "link";

// Размеры и скругления — как на paloma.website/checkout.html
const card = (on: boolean) =>
  `flex min-h-[150px] flex-col items-center rounded-[12px] border px-3 py-4 text-center transition-colors duration-300 ${on ? "border-[#17191a] bg-[#17191a]/[0.04]" : "border-[#17191a]/10 hover:border-[#17191a]/40"}`;
const pill = (on: boolean) =>
  `rounded-full border px-[18px] py-[9px] text-[14px] font-medium transition-colors duration-300 ${on ? "border-[#17191a] bg-[#17191a]/[0.05] text-[#17191a]" : "border-[#17191a]/10 text-[#17191a]/60 hover:border-[#17191a]/40"}`;
const opt = (on: boolean) =>
  `rounded-[12px] border px-2.5 py-3 text-center text-[14px] font-medium transition-colors duration-300 ${on ? "border-[#17191a] bg-[#17191a]/[0.05] text-[#17191a]" : "border-[#17191a]/10 text-[#17191a]/70 hover:border-[#17191a]/40"}`;
const field = "h-[46px] w-full rounded-[12px] border border-[#17191a]/10 bg-white px-4 py-[13px] text-[15px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#17191a]/40";
const label = "mb-1.5 block text-[13px] font-medium tracking-[0.02em] text-[#17191a]/50";
const legend = "mb-4 text-[16px] font-semibold text-[#17191a]";

export default function Checkout() {
  const { lang } = useLang();
  const en = lang === "en";
  const T = (ru: string, e: string) => (en ? e : ru);
  const s = useShop();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [gift, setGift] = useState(false);
  const [rName, setRName] = useState("");
  const [rPhone, setRPhone] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("pickup");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [flat, setFlat] = useState("");
  const [courierNote, setCourierNote] = useState("");
  const [withCard, setWithCard] = useState(false);
  const [cardText, setCardText] = useState("");
  const [contact, setContact] = useState<Contact>("call");
  const [contactValue, setContactValue] = useState("");
  const [comment, setComment] = useState("");
  const [pay, setPay] = useState<Pay>("receipt");
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const items = s.cart.map((it) => ({ ...it, p: s.productById(it.id) })).filter((x) => x.p);
  const extras = useMemo(() => PRODUCTS.filter((p) => !s.cart.some((c) => c.id === p.id)).slice(0, 3), [s.cart]);

  const DELIVERY: { id: Delivery; icon: string; title: string; note: string; price: string }[] = [
    { id: "pickup", icon: "◎", title: T("Самовывоз", "Pick-up"), note: T("Салон, ул. Пархоменко, 53", "Salon, 53 Parkhomenko St."), price: T("Бесплатно", "Free") },
    { id: "courier", icon: "→", title: T("Курьер", "Courier"), note: T("По Новороссийску, до двери", "Novorossiysk, to your door"), price: T("Подтвердит менеджер", "Confirmed by manager") },
    { id: "russia", icon: "✈", title: T("По России", "Across Russia"), note: T("Службой доставки", "By a delivery service"), price: T("По тарифу", "By tariff") },
    { id: "ask", icon: "?", title: T("Узнать у получателя", "Ask the recipient"), note: T("Уточним адрес и удобное время", "We'll confirm the address and time"), price: "—" },
  ];
  const CONTACTS: { id: Contact; title: string; hint: string; ph?: string }[] = [
    { id: "call", title: T("Звонок", "Call"), hint: T("Позвоним на номер, указанный выше.", "We'll call the number above.") },
    { id: "telegram", title: "Telegram", hint: T("Укажите @username или телефон в Telegram.", "Enter your @username or phone in Telegram."), ph: "@username" },
    { id: "messenger", title: T("Мессенджер", "Messenger"), hint: T("Напишем в мессенджер на этот номер.", "We'll message this number."), ph: "+7 (000) 000-00-00" },
    { id: "max", title: "MAX", hint: T("Укажите телефон или username в MAX.", "Enter your phone or username in MAX."), ph: T("Телефон или username", "Phone or username") },
  ];
  const deliveryPrice = delivery === "pickup" ? T("Бесплатно", "Free") : delivery === "ask" ? "—" : delivery === "courier" ? T("Подтвердит менеджер", "Confirmed by manager") : T("По тарифу", "By tariff");

  // Проверка обязательного
  const needAddr = delivery === "courier" || delivery === "russia";
  const errs = {
    name: !name.trim(),
    phone: !phoneComplete(phone),
    consent: !consent,
    rName: gift && !rName.trim(),
    city: delivery === "russia" && !city.trim(),
    street: needAddr && !street.trim(),
    contact: contact !== "call" && !contactValue.trim(),
  };
  const ok = !Object.values(errs).some(Boolean);
  const bad = (k: keyof typeof errs) => tried && errs[k];
  const ring = (k: keyof typeof errs) => (bad(k) ? "!border-[#b42318]/60" : "");

  const submit = () => {
    setTried(true);
    if (!ok) {
      document.querySelector("[data-err='1']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // eslint-disable-next-line react-hooks/purity -- номер заказа считается по нажатию, не при отрисовке
    const num = "AB-" + String(Date.now()).slice(-5);
    const dl = DELIVERY.find((d) => d.id === delivery)!;
    void sendLead({
      kind: "shop",
      name,
      phone,
      details: {
        Форма: "Оформление заказа (магазин)",
        "Номер заказа": num,
        Состав: items.map((x) => `${x.p!.name.ru} × ${x.qty} — ${x.p!.price * x.qty} ₽`).join("; "),
        "Сумма товаров": `${s.cartTotal} ₽`,
        Получатель: gift ? `другой: ${rName}${rPhone ? `, ${rPhone}` : ""}` : "сам заказчик",
        Получение: `${dl.title}${delivery === "russia" ? ` — ${city}, ${street}` : delivery === "courier" ? ` — ${street}${flat ? `, ${flat}` : ""}` : ""}`,
        "Комментарий курьеру": courierNote,
        Открытка: withCard ? `да${cardText.trim() ? ` — «${cardText.trim()}»` : ""}` : "нет",
        "Способ связи": `${CONTACTS.find((c) => c.id === contact)!.title}${contactValue ? `: ${contactValue}` : ""}`,
        Оплата: pay === "receipt" ? "при получении" : "онлайн по ссылке от менеджера",
        Комментарий: comment,
      },
    });
    s.clear();
    setDone(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Ошибка под полем — как у Paloma
  const err = (k: keyof typeof errs, text: string) => (bad(k) ? <p className="mt-1.5 text-[12px] text-[#b42318]">{text}</p> : null);

  // Шапка как у Paloma: высота 60, «← Назад» слева, логотип и «Ваш заказ» по центру, крестик справа
  const top = (
    <header className="sticky top-0 z-30 border-b border-[#17191a]/[0.08] bg-white/[0.92] backdrop-blur-md">
      <div className="mx-auto grid h-[60px] max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-10">
        <Link href="/shop" className="flex items-center gap-2 justify-self-start text-[14px] text-[#17191a]/60 transition-colors hover:text-[#17191a]">
          <span aria-hidden className="text-[16px]">←</span> <span className="hidden sm:inline">{T("Назад", "Back")}</span>
        </Link>
        <div className="text-center leading-tight">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#17191a]/35">ÁLIS BEAUTY</p>
          <p className="text-[15px] font-semibold text-[#17191a]">{T("Ваш заказ", "Your order")}</p>
        </div>
        <Link href="/shop" aria-label={T("Закрыть", "Close")} className="flex h-9 w-9 items-center justify-center justify-self-end text-[18px] text-[#17191a]/60 transition-colors hover:text-[#17191a]">✕</Link>
      </div>
    </header>
  );

  const primaryBtn = "flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#17191a] bg-[#17191a] px-6 py-[14px] text-[14px] font-semibold tracking-[0.04em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a]";

  if (done)
    return (
      <>
        {top}
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[520px] flex-col items-center justify-center px-6 py-16 text-center">
          <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-[#17191a] text-[24px] text-white">✓</span>
          <h1 className="mt-6 !text-[28px] font-normal text-[#17191a]">{T("Заказ принят!", "Order received!")}</h1>
          <p className="mt-2 text-[13px] text-[#17191a]/50">№ {done}</p>
          <p className="mt-4 text-[15px] leading-[1.6] text-[#17191a]/65">
            {T("Мы свяжемся с вами в ближайшее время, подтвердим наличие, состав и итоговую стоимость. Оплата — только после согласования.", "We'll contact you shortly to confirm availability, the order and the final price. Payment only after confirmation.")}
          </p>
          <Link href="/shop" className={`mt-8 !w-auto ${primaryBtn}`}>{T("Продолжить покупки →", "Continue shopping →")}</Link>
        </div>
      </>
    );

  if (!items.length)
    return (
      <>
        {top}
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[520px] flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="!text-[28px] font-normal text-[#17191a]">{T("Корзина пуста", "Your cart is empty")}</h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#17191a]/60">{T("Добавьте средства, мерч или подарочный бокс — мы соберём всё с заботой.", "Add products, merch or a gift box — we'll put it all together with care.")}</p>
          <Link href="/shop/catalog" className={`mt-8 !w-auto ${primaryBtn}`}>{T("Перейти в каталог", "Go to the catalogue")}</Link>
        </div>
      </>
    );

  return (
    <>
      {top}
      <main className="mx-auto max-w-[1280px] px-4 pb-[120px] pt-8 sm:px-10 sm:pt-[41px]">
        <div className="grid items-start gap-[41px] lg:grid-cols-[minmax(0,1fr)_420px]">
          {/* ===== Слева: форма ===== */}
          <div className="flex flex-col gap-[31px]">
            {/* Контакты */}
            <fieldset>
              <legend className={legend}>{T("Ваши контакты", "Your contacts")}</legend>
              <div className="flex flex-col gap-4">
                <div data-err={bad("name") ? 1 : 0}>
                  <label className={label}>{T("Ваше имя", "Your name")} <span className="text-[#17191a]">*</span></label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={T("Анна", "Anna")} autoComplete="name" className={`${field} ${ring("name")}`} />
                  {err("name", T("Введите ваше имя", "Enter your name"))}
                </div>
                <div data-err={bad("phone") ? 1 : 0}>
                  <label className={label}>{T("Телефон", "Phone")} <span className="text-[#17191a]">*</span></label>
                  <PhoneField lang={lang} value={phone} onChange={setPhone} error={bad("phone")} className="!h-[46px] !rounded-[12px]" />
                  {err("phone", T("Введите номер телефона", "Enter your phone number"))}
                </div>
                <div data-err={bad("consent") ? 1 : 0}>
                  <Check checked={consent} onChange={setConsent} bad={bad("consent")}>
                    {T("Даю согласие на обработку ", "I agree to the processing of my ")}
                    <a href="/policy" className="underline underline-offset-2">{T("персональных данных", "personal data")}</a>
                    {T(" и принимаю ", " and accept the ")}
                    <a href="/offer" className="underline underline-offset-2">{T("оферту", "offer")}</a>.
                  </Check>
                  {err("consent", T("Нужно согласие на обработку персональных данных.", "Consent to personal data processing is required."))}
                </div>
              </div>
            </fieldset>

            {/* Получатель */}
            <fieldset>
              <legend className={legend}>{T("Получатель", "Recipient")}</legend>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setGift(false)} aria-pressed={!gift} className={pill(!gift)}>{T("Я получатель", "It's for me")}</button>
                <button type="button" onClick={() => setGift(true)} aria-pressed={gift} className={pill(gift)}>{T("Другой получатель", "Someone else")}</button>
              </div>
              {gift && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div data-err={bad("rName") ? 1 : 0}>
                    <label className={label}>{T("Имя получателя", "Recipient's name")} <span className="text-[#17191a]">*</span></label>
                    <input value={rName} onChange={(e) => setRName(e.target.value)} className={`${field} ${ring("rName")}`} />
                    {err("rName", T("Введите имя получателя", "Enter the recipient's name"))}
                  </div>
                  <div>
                    <label className={label}>{T("Телефон получателя", "Recipient's phone")}</label>
                    <PhoneField lang={lang} value={rPhone} onChange={setRPhone} className="!h-[46px] !rounded-[12px]" />
                  </div>
                </div>
              )}
            </fieldset>

            {/* Получение */}
            <fieldset>
              <legend className={legend}>{T("Получение", "Delivery")}</legend>
              <div className="grid grid-cols-2 gap-2">
                {DELIVERY.map((d) => (
                  <button key={d.id} type="button" onClick={() => setDelivery(d.id)} aria-pressed={delivery === d.id} className={card(delivery === d.id)}>
                    <span aria-hidden className="text-[20px] leading-none text-[#17191a]/70">{d.icon}</span>
                    <span className="mt-2.5 text-[13px] font-semibold text-[#17191a]">{d.title}</span>
                    <span className="mt-1 text-[11px] leading-[1.45] text-[#17191a]/50">{d.note}</span>
                    <span className="mt-auto pt-2 text-[13px] font-semibold text-[#17191a]">{d.price}</span>
                  </button>
                ))}
              </div>
              {needAddr && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div data-err={bad("city") ? 1 : 0}>
                    <label className={label}>{T("Город", "City")}{delivery === "russia" && <span className="text-[#17191a]"> *</span>}</label>
                    <input value={delivery === "courier" ? T("Новороссийск", "Novorossiysk") : city} readOnly={delivery === "courier"} onChange={(e) => setCity(e.target.value)} className={`${field} ${ring("city")} ${delivery === "courier" ? "bg-[#17191a]/[0.03] text-[#17191a]/50" : ""}`} />
                    {err("city", T("Укажите город", "Enter the city"))}
                  </div>
                  <div data-err={bad("street") ? 1 : 0}>
                    <label className={label}>{delivery === "russia" ? T("Адрес или пункт выдачи", "Address or pick-up point") : T("Улица и дом", "Street and building")} <span className="text-[#17191a]">*</span></label>
                    <input value={street} onChange={(e) => setStreet(e.target.value)} className={`${field} ${ring("street")}`} />
                    {err("street", T("Укажите адрес", "Enter the address"))}
                  </div>
                  {delivery === "courier" && (
                    <>
                      <div>
                        <label className={label}>{T("Квартира / подъезд / этаж", "Flat / entrance / floor")}</label>
                        <input value={flat} onChange={(e) => setFlat(e.target.value)} className={field} />
                      </div>
                      <div>
                        <label className={label}>{T("Комментарий курьеру", "Note for the courier")}</label>
                        <input value={courierNote} onChange={(e) => setCourierNote(e.target.value)} className={field} />
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="mt-3 flex gap-2 rounded-[8px] bg-[#17191a]/[0.06] px-[14px] py-3 text-[13px] leading-[1.5] text-[#17191a]/70">
                <span aria-hidden>ⓘ</span>
                {T("Менеджер заранее согласует день и время получения.", "Our manager will agree the day and time in advance.")}
              </div>
            </fieldset>

            {/* Открытка */}
            <fieldset>
              <legend className={legend}>{T("Открытка", "Greeting card")}</legend>
              <Check checked={withCard} onChange={setWithCard}>{T("Добавить открытку (бесплатно)", "Add a card (free)")}</Check>
              {withCard && (
                <div className="mt-4">
                  <label className={label}>{T("Текст открытки", "Card message")}</label>
                  <textarea value={cardText} onChange={(e) => setCardText(e.target.value.slice(0, 150))} rows={3} className={`${field} h-auto py-[13px]`} />
                  <p className="mt-1.5 text-[12px] text-[#17191a]/45">{T("До 150 символов", "Up to 150 characters")} · {cardText.length}/150</p>
                </div>
              )}
            </fieldset>

            {/* Способ связи */}
            <fieldset>
              <legend className={legend}>{T("Удобный способ связи", "Preferred way to contact you")}</legend>
              <p className="-mt-1.5 mb-3 text-[13px] leading-[1.5] text-[#17191a]/50">{T("Менеджер свяжется с вами, чтобы подтвердить наличие, состав и стоимость.", "Our manager will contact you to confirm availability, the order and the price.")}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CONTACTS.map((c) => (
                  <button key={c.id} type="button" onClick={() => { setContact(c.id); setContactValue(""); }} aria-pressed={contact === c.id} className={opt(contact === c.id)}>{c.title}</button>
                ))}
              </div>
              {(() => {
                const c = CONTACTS.find((x) => x.id === contact)!;
                return (
                  <div className="mt-3" data-err={bad("contact") ? 1 : 0}>
                    {c.ph && <input value={contactValue} onChange={(e) => setContactValue(e.target.value)} placeholder={c.ph} className={`${field} ${ring("contact")}`} />}
                    <p className="mt-1.5 text-[12px] text-[#17191a]/45">{c.hint}</p>
                  </div>
                );
              })()}
            </fieldset>

            {/* Комментарий */}
            <fieldset>
              <legend className={legend}>{T("Комментарий к заказу", "Order comment")}</legend>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder={T("Пожелания по упаковке, дате, подарку", "Notes on packaging, date or the gift")} className={`${field} h-auto py-[13px]`} />
            </fieldset>

            {/* Дополнят заказ */}
            {extras.length > 0 && (
              <section>
                <h2 className="!text-[24px] font-normal leading-[1.3] text-[#17191a] sm:!text-[25.6px]">{T("Идеально дополнят ваш заказ", "Perfect additions to your order")}</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {extras.map((p) => (
                    <div key={p.id} className="flex flex-col overflow-hidden rounded-[12px] border border-[#17191a]/10 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt={p.name[lang]} loading="lazy" className="h-[110px] w-full bg-[#17191a]/[0.06] object-cover sm:h-[80px]" />
                      <div className="flex flex-1 flex-col p-3">
                        <span className="line-clamp-2 text-[12px] font-medium leading-[1.35] text-[#17191a]">{p.name[lang]}</span>
                        <span className="mt-1 text-[12px] font-semibold text-[#17191a]">{fmtPrice(p.price, en)}</span>
                        <button type="button" onClick={() => s.add(p.id)} className="mt-auto flex h-9 items-center justify-center rounded-[8px] border border-[#17191a]/10 pt-0 text-[12px] font-semibold text-[#17191a] transition-colors hover:border-[#17191a] hover:bg-[#17191a] hover:text-white [margin-top:10px]">
                          + {T("Добавить", "Add")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ===== Справа: состав, итог, оплата и кнопка ===== */}
          <aside id="co-summary" className="scroll-mt-20 lg:sticky lg:top-[80px]">
            <div className="rounded-[12px] border border-[#17191a]/10 bg-white p-5 sm:p-7">
              <h2 className="!text-[16px] font-semibold tracking-[-0.01em] text-[#17191a]">{T("Состав заказа", "Your order")}</h2>
              <div className="mt-4 flex flex-col gap-3">
                {items.map(({ id, qty, p }) => (
                  <div key={id} className="flex gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p!.img} alt={p!.name[lang]} className="h-16 w-16 shrink-0 rounded-[8px] bg-[#17191a]/[0.06] object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[13px] font-medium leading-[1.3] text-[#17191a]">{p!.name[lang]}</span>
                      <span className="mt-0.5 text-[11px] text-[#17191a]/50">{fmtPrice(p!.price, en)} × {qty}</span>
                      <div className="mt-auto flex items-center gap-1 pt-1.5">
                        <button type="button" onClick={() => s.setQty(id, qty - 1)} aria-label={T("Меньше", "Less")} className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-[#17191a]/10 text-[14px] text-[#17191a]">−</button>
                        <span className="w-5 text-center text-[14px] font-semibold tabular-nums">{qty}</span>
                        <button type="button" onClick={() => s.setQty(id, qty + 1)} aria-label={T("Больше", "More")} className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-[#17191a]/10 text-[14px] text-[#17191a]">+</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <span className="text-[14px] font-semibold text-[#17191a]">{fmtPrice(p!.price * qty, en)}</span>
                      <button type="button" onClick={() => s.remove(id)} className="text-[11px] text-[#17191a]/45 underline underline-offset-2 hover:text-[#17191a]">{T("Удалить", "Remove")}</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2 border-t border-[#17191a]/10 pt-4 text-[14px]">
                <div className="flex justify-between"><span className="text-[#17191a]/50">{T("Товары", "Items")}</span><span className="font-semibold">{fmtPrice(s.cartTotal, en)}</span></div>
                <div className="flex justify-between gap-4"><span className="text-[#17191a]/50">{T("Доставка", "Delivery")}</span><span className="text-right font-semibold">{deliveryPrice}</span></div>
                <div className="flex justify-between"><span className="text-[#17191a]/50">{T("Открытка", "Card")}</span><span className="font-semibold">{withCard ? T("Бесплатно", "Free") : "—"}</span></div>
                <div className="mt-1 flex items-baseline justify-between border-t border-[#17191a]/10 pt-3">
                  <span className="text-[16px] font-bold">{T("Итого", "Total")}</span>
                  <span className="text-[16px] font-bold">{fmtPrice(s.cartTotal, en)}</span>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] leading-[1.5] text-[#17191a]/40">
                {T("Оформляя заказ, вы соглашаетесь с ", "By placing an order you accept the ")}
                <a href="/offer" className="underline underline-offset-2">{T("публичной офертой", "public offer")}</a>.
                {T(" Сумма предварительная — итог подтверждает менеджер.", " The total is preliminary — our manager confirms the final amount.")}
              </p>

              <h3 className="mt-6 text-[14px] font-semibold text-[#17191a]">{T("Способ оплаты", "Payment method")}</h3>
              <div className="mt-3 flex flex-col gap-2">
                {([
                  ["receipt", T("Оплата при получении", "Pay on receipt"), T("Картой или наличными в салоне либо курьеру.", "By card or cash at the salon or to the courier.")],
                  ["link", T("Онлайн-оплата картой", "Online card payment"), T("После подтверждения менеджер пришлёт ссылку на оплату.", "After confirmation our manager will send a payment link.")],
                ] as [Pay, string, string][]).map(([id, t1, t2]) => (
                  <button key={id} type="button" onClick={() => setPay(id)} aria-pressed={pay === id} className={`grid grid-cols-[96px_1fr] items-center gap-2.5 rounded-[8px] border px-[14px] py-3 text-left transition-colors ${pay === id ? "border-[#17191a] bg-[#17191a]/[0.04]" : "border-[#17191a]/10 hover:border-[#17191a]/40"}`}>
                    <span className="text-[14px] font-medium leading-[1.3] text-[#17191a]">{t1}</span>
                    <span className="text-[12px] leading-[1.45] text-[#17191a]/50">{t2}</span>
                  </button>
                ))}
              </div>

              {tried && !ok && <p className="mt-4 text-[13px] text-[#b42318]">{T("Заполните обязательные поля и дайте согласие — они подсвечены в форме.", "Fill in the required fields and give your consent — they are highlighted in the form.")}</p>}
              <button type="button" onClick={submit} className={`mt-5 ${primaryBtn}`}>{T("Оформить заказ", "Place order")}</button>
              <p className="mt-3 text-center text-[12px] leading-[1.5] text-[#17191a]/50">{T("После оформления менеджер проверит наличие, свяжется с вами и подтвердит итоговую стоимость. Оплата — только после согласования.", "After you order, our manager checks availability, contacts you and confirms the final price. Payment only after approval.")}</p>

              <ul className="mt-5 flex flex-col gap-2 border-t border-[#17191a]/10 pt-4 text-[12.5px] leading-[1.5] text-[#17191a]/60">
                <li>✓ {T("Красиво упакуем — подарок можно отправить сразу получателю.", "Beautifully packed — the gift can go straight to the recipient.")}</li>
                <li>✓ {T("4,9 — более 75 отзывов на Яндексе и 2ГИС.", "4.9 — 75+ reviews on Yandex and 2GIS.")}</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Телефон: плавающая кнопка «Оформить заказ ниже» — ведёт к итогу и кнопке (как у Paloma) */}
      <a href="#co-summary" className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#17191a]/10 bg-white/[0.94] px-[18px] py-[9px] text-[12px] font-semibold text-[#17191a] shadow-[0_6px_24px_rgba(0,0,0,.12)] backdrop-blur-md lg:hidden">
        {T("Оформить заказ ниже", "Checkout below")} <span aria-hidden>↓</span>
      </a>
    </>
  );
}

// Чекбокс как у Paloma: квадрат 20px, скругление 6px
function Check({ checked, onChange, bad, children }: { checked: boolean; onChange: (v: boolean) => void; bad?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span aria-hidden className={`mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border text-[12px] text-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#17191a]/30 ${checked ? "border-[#17191a] bg-[#17191a]" : bad ? "border-[#b42318]/60 bg-white" : "border-[#17191a]/10 bg-white"}`}>{checked ? "✓" : ""}</span>
      <span className={`text-[13px] leading-[1.5] ${bad ? "text-[#b42318]" : "text-[#17191a]/70"}`}>{children}</span>
    </label>
  );
}
