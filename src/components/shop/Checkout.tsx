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

const card = (on: boolean) =>
  `flex flex-col items-center rounded-[16px] border px-4 py-5 text-center transition-colors duration-300 ${on ? "border-[#17191a] bg-[#17191a]/[0.03]" : "border-[#17191a]/12 hover:border-[#17191a]/40"}`;
const pill = (on: boolean) =>
  `rounded-full border px-5 py-2.5 text-[13px] transition-colors duration-300 sm:text-[14px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/15 text-[#17191a]/70 hover:border-[#17191a]/40"}`;
const field = "h-[50px] w-full rounded-[14px] border border-[#17191a]/12 bg-white px-4 text-[14px] text-[#17191a] outline-none transition-colors placeholder:text-[#17191a]/35 focus:border-[#17191a]/40 sm:px-5";
const label = "mb-2 block text-[12px] text-[#17191a]/55";
const h = "font-display text-[18px] text-[#17191a] sm:text-[20px]";

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

  // Верхняя полоса: «Назад», название, крестик
  const top = (
    <div className="sticky top-0 z-30 border-b border-[#17191a]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[64px] w-[94%] max-w-[1320px] items-center justify-between sm:h-[76px]">
        <Link href="/shop" className="flex items-center gap-2 text-[13px] text-[#17191a]/60 transition-colors hover:text-[#17191a]">
          <span aria-hidden>←</span> {T("Назад", "Back")}
        </Link>
        <div className="text-center leading-tight">
          <p className="font-display text-[11px] uppercase tracking-[0.3em] text-[#17191a]/50">ÁLIS BEAUTY</p>
          <p className="text-[15px] text-[#17191a] sm:text-[17px]">{T("Ваш заказ", "Your order")}</p>
        </div>
        <Link href="/shop" aria-label={T("Закрыть", "Close")} className="flex h-9 w-9 items-center justify-center text-[20px] text-[#17191a]/60 transition-colors hover:text-[#17191a]">✕</Link>
      </div>
    </div>
  );

  if (done)
    return (
      <>
        {top}
        <div className="mx-auto flex min-h-[70vh] w-[92%] max-w-[560px] flex-col items-center justify-center py-16 text-center">
          <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-[#17191a] text-[24px] text-white">✓</span>
          <h1 className="mt-6 font-display text-[26px] text-[#17191a] sm:text-[32px]">{T("Заказ принят!", "Order received!")}</h1>
          <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-[#17191a]/45">№ {done}</p>
          <p className="mt-4 text-[14px] leading-[1.6] text-[#17191a]/65 sm:text-[15px]">
            {T("Менеджер свяжется с вами в ближайшее время, подтвердит наличие, состав и итоговую стоимость. Оплата — только после согласования.", "Our manager will contact you shortly to confirm availability, the order and the final price. Payment only after confirmation.")}
          </p>
          <Link href="/shop" className="mt-8 rounded-[12px] border border-[#17191a] bg-[#17191a] px-10 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent hover:text-[#17191a]">
            {T("Продолжить покупки →", "Continue shopping →")}
          </Link>
        </div>
      </>
    );

  if (!items.length)
    return (
      <>
        {top}
        <div className="mx-auto flex min-h-[70vh] w-[92%] max-w-[520px] flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-[26px] text-[#17191a] sm:text-[32px]">{T("Корзина пуста", "Your cart is empty")}</h1>
          <p className="mt-3 text-[14px] leading-[1.6] text-[#17191a]/60">{T("Добавьте средства, мерч или подарочный бокс — мы соберём всё с заботой.", "Add products, merch or a gift box — we'll put it all together with care.")}</p>
          <Link href="/shop/catalog" className="mt-8 rounded-[12px] border border-[#17191a] bg-[#17191a] px-10 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent hover:text-[#17191a]">
            {T("Перейти в каталог", "Go to the catalogue")}
          </Link>
        </div>
      </>
    );

  return (
    <>
      {top}
      <div className="mx-auto grid w-[94%] max-w-[1320px] gap-8 pb-32 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14 lg:pb-24">
        {/* ===== Слева: форма ===== */}
        <div className="flex flex-col gap-10 sm:gap-12">
          {/* Контакты */}
          <section>
            <h2 className={h}>{T("Ваши контакты", "Your contacts")}</h2>
            <div className="mt-5 flex flex-col gap-4">
              <div data-err={bad("name") ? 1 : 0}>
                <label className={label}>{T("Ваше имя", "Your name")} *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={T("Анна", "Anna")} className={`${field} ${ring("name")}`} />
              </div>
              <div data-err={bad("phone") ? 1 : 0}>
                <label className={label}>{T("Телефон", "Phone")} *</label>
                <PhoneField lang={lang} value={phone} onChange={setPhone} error={bad("phone")} />
              </div>
              <label data-err={bad("consent") ? 1 : 0} className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#17191a]" />
                <span className={`text-[12.5px] leading-[1.5] ${bad("consent") ? "text-[#b42318]" : "text-[#17191a]/60"}`}>
                  {T("Даю согласие на обработку ", "I agree to the processing of my ")}
                  <a href="/policy" className="underline underline-offset-2">{T("персональных данных", "personal data")}</a>
                  {T(" и принимаю ", " and accept the ")}
                  <a href="/offer" className="underline underline-offset-2">{T("оферту", "offer")}</a>.
                </span>
              </label>
            </div>
          </section>

          {/* Получатель */}
          <section>
            <h2 className={h}>{T("Получатель", "Recipient")}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={() => setGift(false)} aria-pressed={!gift} className={pill(!gift)}>{T("Я получатель", "It's for me")}</button>
              <button type="button" onClick={() => setGift(true)} aria-pressed={gift} className={pill(gift)}>{T("Другой получатель (подарок)", "Someone else (a gift)")}</button>
            </div>
            {gift && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div data-err={bad("rName") ? 1 : 0}>
                  <label className={label}>{T("Имя получателя", "Recipient's name")} *</label>
                  <input value={rName} onChange={(e) => setRName(e.target.value)} className={`${field} ${ring("rName")}`} />
                </div>
                <div>
                  <label className={label}>{T("Телефон получателя", "Recipient's phone")}</label>
                  <PhoneField lang={lang} value={rPhone} onChange={setRPhone} />
                </div>
              </div>
            )}
          </section>

          {/* Получение */}
          <section>
            <h2 className={h}>{T("Получение", "Delivery")}</h2>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
              {DELIVERY.map((d) => (
                <button key={d.id} type="button" onClick={() => setDelivery(d.id)} aria-pressed={delivery === d.id} className={card(delivery === d.id)}>
                  <span aria-hidden className="text-[18px] text-[#17191a]/70">{d.icon}</span>
                  <span className="mt-2 text-[13.5px] font-medium text-[#17191a] sm:text-[14px]">{d.title}</span>
                  <span className="mt-1 text-[11.5px] leading-[1.4] text-[#17191a]/45">{d.note}</span>
                  <span className="mt-3 text-[12px] font-medium text-[#17191a]">{d.price}</span>
                </button>
              ))}
            </div>
            {needAddr && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div data-err={bad("city") ? 1 : 0}>
                  <label className={label}>{T("Город", "City")}{delivery === "russia" ? " *" : ""}</label>
                  <input value={delivery === "courier" ? T("Новороссийск", "Novorossiysk") : city} readOnly={delivery === "courier"} onChange={(e) => setCity(e.target.value)} className={`${field} ${ring("city")} ${delivery === "courier" ? "text-[#17191a]/50" : ""}`} />
                </div>
                <div data-err={bad("street") ? 1 : 0}>
                  <label className={label}>{delivery === "russia" ? T("Адрес или пункт выдачи", "Address or pick-up point") : T("Улица и дом", "Street and building")} *</label>
                  <input value={street} onChange={(e) => setStreet(e.target.value)} className={`${field} ${ring("street")}`} />
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
            <p className="mt-3 text-[12px] text-[#17191a]/45">{T("Менеджер заранее согласует день и время получения.", "Our manager will agree the day and time in advance.")}</p>
          </section>

          {/* Открытка */}
          <section>
            <h2 className={h}>{T("Открытка", "Greeting card")}</h2>
            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input type="checkbox" checked={withCard} onChange={(e) => setWithCard(e.target.checked)} className="h-[18px] w-[18px] cursor-pointer accent-[#17191a]" />
              <span className="text-[14px] text-[#17191a]">{T("Добавить открытку (бесплатно)", "Add a card (free)")}</span>
            </label>
            {withCard && (
              <div className="mt-4">
                <label className={label}>{T("Текст открытки", "Card message")}</label>
                <textarea value={cardText} onChange={(e) => setCardText(e.target.value.slice(0, 150))} rows={3} className={`${field} h-auto py-3`} />
                <p className="mt-1 text-right text-[11px] text-[#17191a]/40">{cardText.length} / 150</p>
              </div>
            )}
          </section>

          {/* Способ связи */}
          <section>
            <h2 className={h}>{T("Удобный способ связи", "Preferred way to contact you")}</h2>
            <p className="mt-2 text-[13px] text-[#17191a]/55">{T("Менеджер свяжется с вами, чтобы подтвердить наличие, состав и стоимость.", "Our manager will contact you to confirm availability, the order and the price.")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CONTACTS.map((c) => (
                <button key={c.id} type="button" onClick={() => { setContact(c.id); setContactValue(""); }} aria-pressed={contact === c.id} className={pill(contact === c.id)}>{c.title}</button>
              ))}
            </div>
            {(() => {
              const c = CONTACTS.find((x) => x.id === contact)!;
              return (
                <div className="mt-3" data-err={bad("contact") ? 1 : 0}>
                  {c.ph && <input value={contactValue} onChange={(e) => setContactValue(e.target.value)} placeholder={c.ph} className={`${field} ${ring("contact")}`} />}
                  <p className="mt-2 text-[12px] text-[#17191a]/45">{c.hint}</p>
                </div>
              );
            })()}
          </section>

          {/* Комментарий */}
          <section>
            <h2 className={h}>{T("Комментарий к заказу", "Order comment")}</h2>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder={T("Пожелания по упаковке, дате, подарку", "Notes on packaging, date or the gift")} className={`${field} mt-5 h-auto py-3`} />
          </section>

          {/* Дополнят заказ */}
          {extras.length > 0 && (
            <section>
              <h2 className={h}>{T("Идеально дополнят ваш заказ", "Perfect additions to your order")}</h2>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {extras.map((p) => (
                  <div key={p.id} className="flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#f6f4f1]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt={p.name[lang]} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      <button type="button" onClick={() => s.add(p.id)} aria-label={T("Добавить", "Add")} className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[18px] text-[#17191a] shadow-[0_2px_10px_rgba(0,0,0,.12)] transition-colors hover:bg-[#17191a] hover:text-white">+</button>
                    </div>
                    <span className="mt-2 line-clamp-2 text-[12px] leading-[1.35] text-[#17191a]">{p.name[lang]}</span>
                    <span className="mt-0.5 text-[12px] text-[#17191a]/55">{fmtPrice(p.price, en)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tried && !ok && <p className="text-[13px] text-[#b42318]">{T("Заполните, пожалуйста, обязательные поля, отмеченные звёздочкой, и дайте согласие.", "Please fill in the required fields marked with an asterisk and give your consent.")}</p>}
          <button type="button" onClick={submit} className="hidden w-full rounded-[12px] border border-[#17191a] bg-[#17191a] py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-transparent hover:text-[#17191a] lg:block">
            {T("Оформить заказ", "Place order")}
          </button>
        </div>

        {/* ===== Справа: состав и оплата ===== */}
        <aside className="lg:sticky lg:top-[100px] lg:self-start">
          <div className="rounded-[20px] border border-[#17191a]/10 p-5 sm:p-7">
            <h2 className={h}>{T("Состав заказа", "Your order")}</h2>
            <div className="mt-5 flex flex-col gap-4">
              {items.map(({ id, qty, p }) => (
                <div key={id} className="flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p!.img} alt={p!.name[lang]} className="h-20 w-20 shrink-0 rounded-[12px] object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[13.5px] text-[#17191a]">{p!.name[lang]}</span>
                      <span className="shrink-0 text-[13.5px] font-medium text-[#17191a]">{fmtPrice(p!.price * qty, en)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => s.setQty(id, qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[#17191a]/15 text-[#17191a]">−</button>
                        <span className="w-7 text-center text-[13px] tabular-nums">{qty}</span>
                        <button type="button" onClick={() => s.setQty(id, qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[#17191a]/15 text-[#17191a]">+</button>
                      </div>
                      <button type="button" onClick={() => s.remove(id)} className="text-[11.5px] text-[#17191a]/45 underline underline-offset-2 hover:text-[#17191a]">{T("Удалить", "Remove")}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-2.5 border-t border-[#17191a]/10 pt-5 text-[13.5px]">
              <div className="flex justify-between"><span className="text-[#17191a]/50">{T("Товары", "Items")}</span><span>{fmtPrice(s.cartTotal, en)}</span></div>
              <div className="flex justify-between gap-4"><span className="text-[#17191a]/50">{T("Доставка", "Delivery")}</span><span className="text-right">{deliveryPrice}</span></div>
              <div className="flex justify-between"><span className="text-[#17191a]/50">{T("Открытка", "Card")}</span><span>{withCard ? T("Бесплатно", "Free") : "—"}</span></div>
              <div className="mt-2 flex items-baseline justify-between border-t border-[#17191a]/10 pt-4">
                <span className="font-display text-[18px]">{T("Итого", "Total")}</span>
                <span className="font-display text-[22px]">{fmtPrice(s.cartTotal, en)}</span>
              </div>
            </div>
            <p className="mt-4 text-center text-[11px] leading-[1.5] text-[#17191a]/40">
              {T("Оформляя заказ, вы соглашаетесь с ", "By placing an order you accept the ")}
              <a href="/offer" className="underline underline-offset-2">{T("публичной офертой", "public offer")}</a>.
              {T(" Сумма предварительная — итог подтверждает менеджер.", " The total is preliminary — our manager confirms the final amount.")}
            </p>

            <h3 className="mt-7 text-[15px] text-[#17191a]">{T("Способ оплаты", "Payment method")}</h3>
            <div className="mt-3 flex flex-col gap-2">
              {([
                ["receipt", T("Оплата при получении", "Pay on receipt"), T("Картой или наличными в салоне либо курьеру.", "By card or cash at the salon or to the courier.")],
                ["link", T("Онлайн-оплата картой", "Online card payment"), T("После подтверждения менеджер пришлёт ссылку на оплату.", "After confirmation our manager will send a payment link.")],
              ] as [Pay, string, string][]).map(([id, t1, t2]) => (
                <button key={id} type="button" onClick={() => setPay(id)} aria-pressed={pay === id} className={`flex items-start gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-colors ${pay === id ? "border-[#17191a]" : "border-[#17191a]/12 hover:border-[#17191a]/40"}`}>
                  <span aria-hidden className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${pay === id ? "border-[#17191a]" : "border-[#17191a]/30"}`}>{pay === id && <span className="h-2 w-2 rounded-full bg-[#17191a]" />}</span>
                  <span><span className="block text-[13.5px] text-[#17191a]">{t1}</span><span className="mt-0.5 block text-[12px] leading-[1.45] text-[#17191a]/50">{t2}</span></span>
                </button>
              ))}
            </div>

            <ul className="mt-6 flex flex-col gap-2 border-t border-[#17191a]/10 pt-5 text-[12.5px] leading-[1.5] text-[#17191a]/60">
              <li>✓ {T("Менеджер проверит наличие и подтвердит заказ — оплата только после согласования.", "Our manager checks availability and confirms — payment only after approval.")}</li>
              <li>✓ {T("Красиво упакуем — подарок можно отправить сразу получателю.", "Beautifully packed — the gift can go straight to the recipient.")}</li>
              <li>✓ {T("4,9 — более 75 отзывов на Яндексе и 2ГИС.", "4.9 — 75+ reviews on Yandex and 2GIS.")}</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Телефон: закреплённая снизу полоса с итогом и кнопкой */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#17191a]/10 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4">
          <div className="leading-tight">
            <p className="text-[11px] text-[#17191a]/50">{T("Итого", "Total")}</p>
            <p className="font-display text-[18px] text-[#17191a]">{fmtPrice(s.cartTotal, en)}</p>
          </div>
          <button type="button" onClick={submit} className="flex-1 rounded-[12px] bg-[#17191a] py-3.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-white">
            {T("Оформить заказ", "Place order")}
          </button>
        </div>
      </div>
    </>
  );
}
