"use client";
// КОНФИГУРАТОР ПОДАРОЧНОГО БОКСА (магазин, #box): размер → цвет коробки → наполнение → контакты.
// Слева — коробка выбранного цвета: размер S показан заметно меньше M; когда выбрано хоть одно
// средство, коробка «открывается» (фото с открытой крышкой) и под ней — список наполнения.
// Заявка уходит менеджеру (CRM, тип «shop»): он подтверждает наличие, упаковку, открытку и стоимость.
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { sendLead } from "@/lib/sendLead";
import PhoneField, { phoneComplete } from "@/components/ui/PhoneField";
import { BOX_COLORS, BOX_GROUPS, BOX_SIZES, type BoxColor, type BoxSize } from "@/lib/boxProducts";

export default function BoxBuilder() {
  const { lang } = useLang();
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

  const step = "text-[11px] uppercase tracking-[0.16em] text-[#17191a]/50";
  const chip = (on: boolean) =>
    `rounded-[12px] border px-3.5 py-2.5 text-left text-[12px] leading-tight transition-colors sm:text-[13px] ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-transparent bg-[#f6f4f1] text-[#17191a] hover:border-[#17191a]/30"}`;

  return (
    <section id="box" className="scroll-mt-24 bg-white section-y">
      <div className="mx-auto w-[96%] max-w-[1760px]">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="text-[#17191a]">{lang === "en" ? "Build your gift box" : "Соберите подарочный бокс"}</h2>
          <p className="mx-auto mt-3 max-w-[60ch] !text-[12.5px] leading-[1.6] text-[#17191a]/60 sm:!text-[14px]">
            Свяжитесь с менеджером за 15 минут, чтобы выбрать упаковку, наполнение, открытку и обсудить необходимые детали.
          </p>
        </div>

        <div className="grid gap-6 rounded-[22px] border border-[#17191a]/[0.06] bg-white p-4 shadow-[0_24px_50px_-28px_rgba(23,25,26,0.35)] sm:rounded-[28px] sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:p-12">
          {/* Коробка */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[20px] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={img}
                src={img}
                alt={`Подарочный бокс ÁLIS BEAUTY — ${BOX_COLORS[color].label.toLowerCase()}, ${sizeDef.label}`}
                className="animate-[box-in_.6s_cubic-bezier(.22,.61,.36,1)] object-contain transition-[width] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
                style={{ width: size === "S" ? "58%" : "96%" }}
              />
            </div>
            <p className="mt-3 text-center text-[12px] text-[#17191a]/60">
              {sizeDef.label} · {sizeDef.dims} · {BOX_COLORS[color].label}
            </p>
            {opened && (
              <div className="mt-4 rounded-[16px] bg-[#f6f4f1] p-4">
                <p className={step}>В боксе · {items.length}</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {items.map((it) => (
                    <li key={it} className="flex items-start justify-between gap-3 text-[12px] text-[#17191a]/80 sm:text-[13px]">
                      {it}
                      <button type="button" onClick={() => toggle(it)} aria-label={`Убрать ${it}`} className="shrink-0 text-[#17191a]/40 hover:text-[#17191a]">✕</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Шаги */}
          <div className="flex flex-col gap-8">
            <div>
              <p className={step}>1 · Размер</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {BOX_SIZES.map((s) => (
                  <button key={s.id} type="button" onClick={() => pickSize(s.id)} className={chip(size === s.id)}>
                    <span className="block font-display text-[14px] uppercase tracking-[0.04em] sm:text-[16px]">{s.label}</span>
                    <span className="mt-1 block text-[11px] opacity-70">{s.dims}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={step}>2 · Цвет коробки</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {sizeDef.colors.map((c) => (
                  <button key={c} type="button" onClick={() => setColor(c)} aria-pressed={color === c} className="flex flex-col items-center gap-1.5">
                    <span className={`h-10 w-10 rounded-full border transition-all ${color === c ? "scale-110 border-[#17191a] ring-2 ring-[#17191a] ring-offset-2" : "border-[#17191a]/15"}`} style={{ background: BOX_COLORS[c].hex }} />
                    <span className="text-[11px] text-[#17191a]/60">{BOX_COLORS[c].label}</span>
                  </button>
                ))}
              </div>
              {size === "S" && <p className="mt-2 text-[11.5px] text-[#17191a]/50">Размер S — в голубом цвете.</p>}
            </div>

            <div>
              <p className={step}>3 · Наполнение</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BOX_GROUPS.map((g, i) => (
                  <button key={g.title} type="button" onClick={() => setGroup(i)} className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.1em] transition-colors sm:text-[12px] ${group === i ? "bg-[#17191a] text-white" : "bg-[#f6f4f1] text-[#17191a]/70 hover:text-[#17191a]"}`}>
                    {g.title}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid max-h-[420px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                {BOX_GROUPS[group].items.map((it) => (
                  <button key={it} type="button" onClick={() => toggle(it)} aria-pressed={items.includes(it)} className={chip(items.includes(it))}>
                    <span className="flex items-start gap-2">
                      <span aria-hidden className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border text-[10px] ${items.includes(it) ? "border-white bg-white text-[#17191a]" : "border-[#17191a]/30"}`}>{items.includes(it) ? "✓" : ""}</span>
                      {it}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={step}>4 · Контакты</p>
              {sent ? (
                <div className="mt-4 rounded-[16px] bg-[#f6f4f1] p-6 text-center">
                  <p className="font-display text-[18px]">Спасибо!</p>
                  <p className="mt-2 !text-[13px] text-[#17191a]/65">Менеджер свяжется с вами в течение 15 минут, чтобы подтвердить состав, упаковку, открытку и стоимость.</p>
                </div>
              ) : (
                <div className="mt-3 flex flex-col gap-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className="h-[46px] w-full rounded-[14px] bg-[#f6f4f1] px-4 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 focus:ring-1 focus:ring-[#17191a]/25 sm:h-[48px]" />
                  <PhoneField lang={lang} value={phone} onChange={setPhone} className="!bg-[#f6f4f1]" />
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder="Пожелания: открытка, текст, дата" className="w-full rounded-[14px] bg-[#f6f4f1] px-4 py-3 text-[13px] text-[#17191a] outline-none placeholder:text-[#17191a]/35 focus:ring-1 focus:ring-[#17191a]/25" />
                  <label className="mt-1 flex cursor-pointer items-center gap-2.5">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#17191a]" />
                    <span className="text-[12px] text-[#17191a]/60">Даю согласие на обработку <a href="/policy" className="underline underline-offset-2">персональных данных</a></span>
                  </label>
                  <button type="button" onClick={send} disabled={!ok} className="mt-2 flex w-full items-center justify-center rounded-[12px] border border-[#17191a] bg-[#17191a] py-4 text-[11.5px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#17191a] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#17191a] disabled:hover:text-white">
                    {items.length ? "Связаться с менеджером" : "Выберите наполнение бокса"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes box-in { from { opacity: 0; transform: scale(.96) } to { opacity: 1; transform: none } }`}</style>
    </section>
  );
}
