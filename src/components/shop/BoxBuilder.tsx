"use client";
// КОНФИГУРАТОР ПОДАРОЧНОГО БОКСА (магазин, #box) — по принципу Apple Store: справа всегда ОДИН шаг
// (размер → цвет → наполнение → контакты), слева — сама коробка (S заметно меньше M; когда выбрано
// средство — «открывается»). Внизу — строка-итог и кнопки «Назад / Далее». Ничего лишнего на экране.
// Заявка уходит менеджеру (CRM, тип «shop»): он подтверждает наличие, упаковку, открытку и стоимость.
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import { BOX_COLORS, BOX_GROUPS, BOX_SIZES, type BoxColor, type BoxSize } from "@/lib/boxProducts";

const ALL = BOX_GROUPS.flatMap((g) => g.items);
// В выбор попадают только товары с фото (без фото карточка выглядит пустой); пустые вкладки скрыты
const GROUPS = BOX_GROUPS.map((g) => ({ ...g, items: g.items.filter((p) => p.img) })).filter((g) => g.items.length);
const STEPS = ["Размер", "Цвет", "Наполнение", "Контакты"];

export default function BoxBuilder() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [size, setSize] = useState<BoxSize>("M");
  const [color, setColor] = useState<BoxColor>("pink");
  const [items, setItems] = useState<string[]>([]);
  const [group, setGroup] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  const sizeDef = BOX_SIZES.find((s) => s.id === size)!;
  const pickSize = (s: BoxSize) => {
    setSize(s);
    const def = BOX_SIZES.find((x) => x.id === s)!;
    if (!def.colors.includes(color)) setColor(def.colors[0]);
  };
  const toggle = (it: string) => setItems((cur) => (cur.includes(it) ? cur.filter((x) => x !== it) : [...cur, it]));
  const opened = items.length > 0;
  const img = `/assets/box/box_${color}_${opened ? "open" : "closed"}.jpg`;
  const ok = !!name.trim() && phoneComplete(phone) && consent && items.length > 0;
  const canNext = step === 2 ? items.length > 0 : true;
  const [nudge, setNudge] = useState(0); // «покачать» подсказку, если нажали «Далее» без наполнения
  const next = () => (canNext ? setStep(step + 1) : setNudge((n) => n + 1));

  const send = () => {
    if (!ok) return;
    void sendLead({
      kind: "shop",
      name,
      phone,
      details: {
        Форма: "Подарочный бокс",
        Размер: `${sizeDef.label} (${sizeDef.dims})`,
        Цвет: BOX_COLORS[color].label,
        Наполнение: items.join("; "),
        Комментарий: comment,
      },
    });
    setSent(true);
  };

  const card = (on: boolean) =>
    `rounded-[16px] border p-5 text-left transition-all duration-300 ${on ? "border-[#17191a] ring-1 ring-[#17191a]" : "border-[#17191a]/12 hover:border-[#17191a]/40"}`;
  const field = "h-[48px] w-full rounded-[14px] bg-[#f6f4f1] px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 focus:ring-1 focus:ring-[#17191a]/25";
  const count = items.length;
  const total = items.reduce((sum, it) => sum + (ALL.find((x) => x.name === it)?.price || 0), 0);
  const partial = items.some((it) => !ALL.find((x) => x.name === it)?.price);
  const word = count === 1 ? "средство" : count > 1 && count < 5 ? "средства" : "средств";

  return (
    <section id="box" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="text-[#17191a]">{lang === "en" ? "Build your gift box" : "Соберите подарочный бокс"}</h2>
          <p className="mx-auto mt-3 max-w-[60ch] !text-[12.5px] leading-[1.6] text-[#17191a]/60 sm:!text-[14px]">
            Свяжитесь с менеджером за 15 минут, чтобы выбрать упаковку, наполнение, открытку и обсудить необходимые детали.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[22px] border border-[#17191a]/[0.06] bg-white shadow-[0_24px_50px_-28px_rgba(23,25,26,0.35)] sm:rounded-[28px] lg:grid-cols-2">
          {/* Слева — коробка */}
          <div className="flex flex-col items-center justify-center bg-white p-6 sm:p-10 lg:min-h-[600px] lg:border-r lg:border-[#17191a]/[0.06]">
            <div className="flex aspect-square w-full max-w-[440px] items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={img}
                src={img}
                alt={`Подарочный бокс ÁLIS BEAUTY — ${BOX_COLORS[color].label.toLowerCase()}, ${sizeDef.label}`}
                className="animate-[box-in_.6s_cubic-bezier(.22,.61,.36,1)] object-contain transition-[width] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
                style={{ width: size === "S" ? "58%" : "100%" }}
              />
            </div>
            {/* Выбранное наполнение — мини-фото под коробкой (нажатие убирает) */}
            {opened && (
              <div className="mt-4 flex max-w-[440px] flex-wrap justify-center gap-2">
                {items.map((it) => {
                  const p = ALL.find((x) => x.name === it);
                  return (
                    <button key={it} type="button" onClick={() => toggle(it)} title={`Убрать: ${it}`} className="group/i relative h-11 w-11 overflow-hidden rounded-[10px] bg-white ring-1 ring-[#17191a]/10">
                      {p?.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.img} alt={it} className="h-full w-full object-contain" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-[8px] uppercase text-[#17191a]/50">{p?.brand.slice(0, 4)}</span>
                      )}
                      <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-[#17191a]/70 text-[11px] text-white opacity-0 transition-opacity group-hover/i:opacity-100">✕</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Справа — один шаг */}
          <div className="flex flex-col p-6 sm:p-10">
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => (
                <span key={s} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-[#17191a]" : "bg-[#17191a]/12"}`} />
              ))}
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[#17191a]/45">
              Шаг {step + 1} из 4 · {STEPS[step]}
            </p>

            <div key={step} className="mt-2 flex-1 animate-[box-in_.5s_cubic-bezier(.22,.61,.36,1)]">
              {step === 0 && (
                <>
                  <h3 className="!text-[22px] text-[#17191a] lg:!text-[28px]">Какой размер?</h3>
                  <div className="mt-6 grid gap-3">
                    {BOX_SIZES.map((s) => (
                      <button key={s.id} type="button" onClick={() => pickSize(s.id)} className={card(size === s.id)}>
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-[18px] uppercase tracking-[0.04em] text-[#17191a]">{s.label}</span>
                          <span className="text-[13px] text-[#17191a]/55">{s.dims}</span>
                        </span>
                        <span className="mt-1 block text-[12.5px] text-[#17191a]/55">{s.id === "S" ? "Компактный — несколько средств" : "Большой — для полного набора"}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h3 className="!text-[22px] text-[#17191a] lg:!text-[28px]">Цвет коробки</h3>
                  <p className="mt-2 text-[13px] text-[#17191a]/55">{BOX_COLORS[color].label}</p>
                  <div className="mt-6 flex flex-wrap gap-5">
                    {sizeDef.colors.map((c) => (
                      <button key={c} type="button" onClick={() => setColor(c)} aria-pressed={color === c} aria-label={BOX_COLORS[c].label}>
                        <span className={`block h-12 w-12 rounded-full transition-all duration-300 ${color === c ? "ring-2 ring-[#17191a] ring-offset-4" : "ring-1 ring-[#17191a]/15 hover:ring-[#17191a]/40"}`} style={{ background: BOX_COLORS[c].hex }} />
                      </button>
                    ))}
                  </div>
                  {size === "S" && <p className="mt-4 text-[12px] text-[#17191a]/50">Размер S — в голубом цвете.</p>}
                </>
              )}

              {step === 2 && (
                <>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="!text-[22px] text-[#17191a] lg:!text-[28px]">Наполнение</h3>
                    {/* Счётчик выбранного — «тикает» при каждом изменении */}
                    <span key={count} className={`text-[12px] tabular-nums transition-colors ${count ? "animate-[box-pop_.35s_ease] text-[#17191a]" : "text-[#17191a]/40"}`}>
                      {count ? `Выбрано: ${count}` : "Выберите средства"}
                    </span>
                  </div>
                  {/* Вкладки-«таблетки» с числом выбранного в каждой */}
                  <div className="-mx-1 mt-4 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {GROUPS.map((g, i) => {
                      const n = g.items.filter((p) => items.includes(p.name)).length;
                      return (
                        <button key={g.title} type="button" onClick={() => setGroup(i)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] transition-colors duration-300 ${group === i ? "bg-[#17191a] text-white" : "bg-[#f6f4f1] text-[#17191a]/70 hover:text-[#17191a]"}`}>
                          {g.title}
                          {n > 0 && <span className={`flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] tabular-nums ${group === i ? "bg-white text-[#17191a]" : "bg-[#17191a] text-white"}`}>{n}</span>}
                        </button>
                      );
                    })}
                  </div>
                  {/* Сетка товаров: без своей полосы прокрутки, мягкое растворение снизу; вся карточка — кнопка */}
                  <div key={group} className="relative mt-4">
                    <div className="grid max-h-[392px] grid-cols-3 content-start gap-x-2.5 gap-y-4 overflow-y-auto pb-6 [scrollbar-width:none] sm:grid-cols-4 [&::-webkit-scrollbar]:hidden">
                      {GROUPS[group].items.map((p, k) => {
                        const on = items.includes(p.name);
                        return (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => toggle(p.name)}
                            aria-pressed={on}
                            style={{ animationDelay: `${k * 25}ms` }}
                            className="group flex animate-[box-in_.45s_cubic-bezier(.22,.61,.36,1)_both] flex-col text-left outline-none"
                          >
                            <span className={`relative block aspect-square overflow-hidden rounded-[14px] bg-[#f6f4f1] transition-all duration-300 ${on ? "ring-2 ring-[#17191a]" : "ring-0 group-hover:ring-1 group-hover:ring-[#17191a]/25"}`}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={p.img} alt={p.name} className={`h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${on ? "scale-[0.92]" : "group-hover:scale-[1.04]"}`} />
                              <span aria-hidden className={`absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[12px] transition-all duration-300 ${on ? "scale-100 bg-[#17191a] text-white" : "scale-90 bg-white text-[#17191a]/50 shadow-[0_1px_4px_rgba(0,0,0,.08)] group-hover:scale-100 group-hover:text-[#17191a]"}`}>
                                {on ? "✓" : "+"}
                              </span>
                            </span>
                            <span className="mt-2 line-clamp-2 min-h-[2.6em] text-[11.5px] leading-[1.3] text-[#17191a]">{p.name}</span>
                            {p.price ? <span className="mt-0.5 text-[11.5px] tabular-nums text-[#17191a]/55">{p.price.toLocaleString("ru-RU")} ₽</span> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {step === 3 &&
                (sent ? (
                  <div className="py-10 text-center">
                    <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#17191a] text-[20px] text-white">✓</span>
                    <p className="mt-5 font-display text-[20px]">Спасибо!</p>
                    <p className="mx-auto mt-2 max-w-[36ch] !text-[13px] text-[#17191a]/65">Менеджер свяжется с вами в течение 15 минут, чтобы подтвердить состав, упаковку, открытку и стоимость.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="!text-[22px] text-[#17191a] lg:!text-[28px]">Куда прислать детали?</h3>
                    <div className="mt-6 flex flex-col gap-2">
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className={field} />
                      <PhoneField lang={lang} value={phone} onChange={setPhone} className="!bg-[#f6f4f1]" />
                      <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder="Пожелания: открытка, текст, дата" className={`${field} h-auto py-3`} />
                      <label className="mt-1 flex cursor-pointer items-center gap-2.5">
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
                        <span className="text-[12px] text-[#17191a]/60">Даю согласие на обработку <a href="/policy" className="underline underline-offset-2">персональных данных</a></span>
                      </label>
                    </div>
                  </>
                ))}
            </div>

            {/* Итог и кнопки — как в Apple Store */}
            {!sent && step === 2 && !count && nudge > 0 && (
              <p key={nudge} className="mt-4 animate-[box-shake_.4s_ease] text-[12px] text-[#17191a]">Добавьте хотя бы одно средство — нажмите на «+» у товара</p>
            )}
            {!sent && (
              <div className="mt-8 flex flex-col gap-4 border-t border-[#17191a]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[12.5px] text-[#17191a]/60">
                  {sizeDef.label} · {BOX_COLORS[color].label} · {count ? `${count} ${word}` : "без наполнения"}
                  {total > 0 && <span className="ml-1 font-medium text-[#17191a]">· {partial ? "от " : ""}{total.toLocaleString("ru-RU")} ₽</span>}
                </p>
                <div className="flex items-center gap-3">
                  {step > 0 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="px-3 py-3 text-[11.5px] uppercase tracking-[0.14em] text-[#17191a]/55 transition-colors hover:text-[#17191a]">
                      Назад
                    </button>
                  )}
                  {step < 3 ? (
                    <button type="button" onClick={next} className="rounded-full bg-[#17191a] px-8 py-3.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-white transition-opacity disabled:opacity-35">
                      {step === 2 && count ? `Далее · ${count}` : "Далее"}
                    </button>
                  ) : (
                    <button type="button" onClick={send} disabled={!ok} className="rounded-full bg-[#17191a] px-8 py-3.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-white transition-opacity disabled:opacity-35">
                      Связаться с менеджером
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes box-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } } @keyframes box-pop { 0% { transform: scale(.85); opacity: .4 } 60% { transform: scale(1.08) } 100% { transform: none; opacity: 1 } } @keyframes box-shake { 0%,100% { transform: none } 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }`}</style>
    </section>
  );
}
