"use client";
// АДМИНКА ЗАПИСИ ALIS (прототип). Логин по паролю (прототип — не для прода).
// Вкладки: услуги (цены/длительность), мастера (услуги + график по дням недели),
// брони (входящие записи). Данные — localStorage (общий стор с витриной записи).
import { useEffect, useState } from "react";
import {
  ADMIN_PASSWORD,
  DaySchedule,
  Master,
  Service,
  Store,
  fmtPrice,
  loadStore,
  localISO,
  resetStore,
  saveStore,
  uid,
} from "@/lib/booking-store";

const WD = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

type Tab = "services" | "masters" | "bookings";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [store, setStore] = useState<Store | null>(null);
  const [tab, setTab] = useState<Tab>("services");

  useEffect(() => {
    if (sessionStorage.getItem("alis-admin") === "1") setAuthed(true);
    setStore(loadStore());
    const sync = () => setStore(loadStore());
    window.addEventListener("alis-booking-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("alis-booking-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const commit = (next: Store) => {
    saveStore(next);
    setStore(next);
  };

  if (!authed) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-cream px-6">
        <div className="w-full max-w-sm">
          <h1 className="mb-2 font-serif text-[28px] text-ink">Админка ALIS</h1>
          <p className="mb-6 text-[13px] text-ink/50">Введите пароль для управления записью.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && pw === ADMIN_PASSWORD) {
                sessionStorage.setItem("alis-admin", "1");
                setAuthed(true);
              }
            }}
            placeholder="Пароль"
            className="w-full border-b border-ink/25 bg-transparent pb-3 text-[16px] text-ink outline-none focus:border-wine"
          />
          <button
            onClick={() => {
              if (pw === ADMIN_PASSWORD) {
                sessionStorage.setItem("alis-admin", "1");
                setAuthed(true);
              }
            }}
            className="mt-6 w-full rounded-full border border-wine bg-wine py-3 text-[14px] font-medium text-cream transition-colors hover:bg-transparent hover:text-wine"
          >
            Войти
          </button>
          <p className="mt-4 text-[12px] text-ink/35">Пароль прототипа: <code>alis</code></p>
          <a href="/" className="mt-6 block text-[13px] text-wine underline underline-offset-4">← на сайт</a>
        </div>
      </main>
    );
  }

  if (!store) return <main className="p-10 text-ink/50">Загрузка…</main>;

  return (
    <main className="min-h-svh bg-cream text-ink">
      <div className="mx-auto w-[94%] max-w-[1100px] py-10">
        {/* Шапка */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-[30px]">Запись — управление</h1>
          <div className="flex items-center gap-3 text-[13px]">
            <a href="/#online" className="text-wine underline underline-offset-4">Открыть витрину</a>
            <button
              onClick={() => { if (confirm("Сбросить все данные к значениям по умолчанию?")) { resetStore(); setStore(loadStore()); } }}
              className="text-ink/50 hover:text-ink"
            >
              Сбросить данные
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("alis-admin"); setAuthed(false); }}
              className="rounded-full border border-ink/20 px-4 py-1.5 hover:border-wine"
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Вкладки */}
        <div className="mb-8 flex gap-2 border-b border-ink/10">
          {([["services", "Услуги и цены"], ["masters", "Мастера и график"], ["bookings", `Записи (${store.bookings.length})`]] as [Tab, string][]).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`-mb-px border-b-2 px-4 py-2.5 text-[14px] transition-colors ${
                tab === k ? "border-wine text-wine" : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "services" && <ServicesTab store={store} commit={commit} />}
        {tab === "masters" && <MastersTab store={store} commit={commit} />}
        {tab === "bookings" && <BookingsTab store={store} commit={commit} />}
      </div>
    </main>
  );
}

/* ---------- Услуги ---------- */
function ServicesTab({ store, commit }: { store: Store; commit: (s: Store) => void }) {
  const update = (id: string, patch: Partial<Service>) =>
    commit({ ...store, services: store.services.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const add = () =>
    commit({ ...store, services: [...store.services, { id: uid(), title: "Новая услуга", price: 5000, durationMin: 60 }] });
  const del = (id: string) =>
    commit({
      ...store,
      services: store.services.filter((s) => s.id !== id),
      masters: store.masters.map((m) => ({ ...m, serviceIds: m.serviceIds.filter((x) => x !== id) })),
    });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-[14px]">
          <thead>
            <tr className="text-left text-[12px] uppercase tracking-wide text-ink/40">
              <th className="pb-3 pr-4 font-medium">Название</th>
              <th className="pb-3 pr-4 font-medium">Цена, ₽</th>
              <th className="pb-3 pr-4 font-medium">Длительность, мин</th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody>
            {store.services.map((s) => (
              <tr key={s.id} className="border-t border-ink/10">
                <td className="py-3 pr-4">
                  <input value={s.title} onChange={(e) => update(s.id, { title: e.target.value })} className="w-full rounded-lg border border-ink/15 px-3 py-2 outline-none focus:border-wine" />
                </td>
                <td className="py-3 pr-4">
                  <input type="number" value={s.price} onChange={(e) => update(s.id, { price: Number(e.target.value) })} className="w-28 rounded-lg border border-ink/15 px-3 py-2 tabular-nums outline-none focus:border-wine" />
                </td>
                <td className="py-3 pr-4">
                  <input type="number" step={5} value={s.durationMin} onChange={(e) => update(s.id, { durationMin: Number(e.target.value) })} className="w-24 rounded-lg border border-ink/15 px-3 py-2 tabular-nums outline-none focus:border-wine" />
                </td>
                <td className="py-3 text-right">
                  <button onClick={() => del(s.id)} className="text-[13px] text-wine/70 hover:text-wine">удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={add} className="mt-6 rounded-full border border-wine px-5 py-2.5 text-[13px] text-wine transition-colors hover:bg-wine hover:text-cream">
        + услуга
      </button>
    </div>
  );
}

/* ---------- Мастера ---------- */
function MastersTab({ store, commit }: { store: Store; commit: (s: Store) => void }) {
  const update = (id: string, patch: Partial<Master>) =>
    commit({ ...store, masters: store.masters.map((m) => (m.id === id ? { ...m, ...patch } : m)) });
  const add = () =>
    commit({
      ...store,
      masters: [
        ...store.masters,
        { id: uid(), name: "Новый мастер", role: "визажист", photo: "/assets/tild6230-643__.jpg", serviceIds: [], week: Array.from({ length: 7 }, (_, i) => ({ on: i < 6, start: "10:00", end: "19:00" })), stepMin: 30 },
      ],
    });
  const del = (id: string) => commit({ ...store, masters: store.masters.filter((m) => m.id !== id) });

  return (
    <div className="space-y-6">
      {store.masters.map((m) => (
        <div key={m.id} className="rounded-2xl border border-ink/10 p-5">
          <div className="mb-5 flex flex-wrap items-center gap-4">
            <input value={m.name} onChange={(e) => update(m.id, { name: e.target.value })} className="rounded-lg border border-ink/15 px-3 py-2 text-[15px] outline-none focus:border-wine" />
            <input value={m.role} onChange={(e) => update(m.id, { role: e.target.value })} className="rounded-lg border border-ink/15 px-3 py-2 text-[13px] outline-none focus:border-wine" />
            <label className="flex items-center gap-2 text-[13px] text-ink/60">
              шаг слота
              <input type="number" step={5} value={m.stepMin} onChange={(e) => update(m.id, { stepMin: Number(e.target.value) })} className="w-20 rounded-lg border border-ink/15 px-3 py-2 tabular-nums outline-none focus:border-wine" />
              мин
            </label>
            <button onClick={() => del(m.id)} className="ml-auto text-[13px] text-wine/70 hover:text-wine">удалить мастера</button>
          </div>

          {/* Услуги мастера */}
          <p className="mb-2 text-[12px] uppercase tracking-wide text-ink/40">Услуги</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {store.services.map((s) => {
              const on = m.serviceIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => update(m.id, { serviceIds: on ? m.serviceIds.filter((x) => x !== s.id) : [...m.serviceIds, s.id] })}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${on ? "border-wine bg-wine text-cream" : "border-ink/15 text-ink/70 hover:border-wine/50"}`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          {/* График по дням недели */}
          <p className="mb-2 text-[12px] uppercase tracking-wide text-ink/40">График по дням недели</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {m.week.map((d, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-ink/10 px-3 py-2">
                <button
                  onClick={() => { const week = m.week.map((x, j) => (j === i ? { ...x, on: !x.on } : x)); update(m.id, { week }); }}
                  className={`flex h-6 w-12 shrink-0 items-center rounded-full px-0.5 transition-colors ${d.on ? "bg-wine" : "bg-ink/15"}`}
                  aria-label={d.on ? "выходной" : "рабочий"}
                >
                  <span className={`h-5 w-5 rounded-full bg-white transition-transform ${d.on ? "translate-x-6" : ""}`} />
                </button>
                <span className="w-7 text-[13px] font-medium">{WD[i]}</span>
                {d.on ? (
                  <>
                    <TimeInput value={d.start} onChange={(v) => setDay(m, i, { start: v }, update)} />
                    <span className="text-ink/30">–</span>
                    <TimeInput value={d.end} onChange={(v) => setDay(m, i, { end: v }, update)} />
                  </>
                ) : (
                  <span className="text-[13px] text-ink/35">выходной</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={add} className="rounded-full border border-wine px-5 py-2.5 text-[13px] text-wine transition-colors hover:bg-wine hover:text-cream">
        + мастер
      </button>
    </div>
  );
}

function setDay(m: Master, i: number, patch: Partial<DaySchedule>, update: (id: string, p: Partial<Master>) => void) {
  const week = m.week.map((x, j) => (j === i ? { ...x, ...patch } : x));
  update(m.id, { week });
}

function TimeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input type="time" value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border border-ink/15 px-2 py-1 text-[13px] tabular-nums outline-none focus:border-wine" />
  );
}

/* ---------- Записи ---------- */
function BookingsTab({ store, commit }: { store: Store; commit: (s: Store) => void }) {
  const rows = [...store.bookings].sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1));
  const del = (id: string) => commit({ ...store, bookings: store.bookings.filter((b) => b.id !== id) });
  const human = (iso: string) => { const d = new Date(iso + "T00:00:00"); return `${d.getDate()} ${MONTHS[d.getMonth()]}`; };
  const todayISO = localISO(new Date());

  if (rows.length === 0) return <p className="text-[14px] text-ink/50">Пока нет записей. Оформите запись на витрине — она появится здесь.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-[14px]">
        <thead>
          <tr className="text-left text-[12px] uppercase tracking-wide text-ink/40">
            <th className="pb-3 pr-4 font-medium">Дата</th>
            <th className="pb-3 pr-4 font-medium">Время</th>
            <th className="pb-3 pr-4 font-medium">Услуга</th>
            <th className="pb-3 pr-4 font-medium">Мастер</th>
            <th className="pb-3 pr-4 font-medium">Клиент</th>
            <th className="pb-3 pr-4 font-medium">Телефон</th>
            <th className="pb-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => {
            const s = store.services.find((x) => x.id === b.serviceId);
            const m = store.masters.find((x) => x.id === b.masterId);
            const upcoming = b.date >= todayISO;
            return (
              <tr key={b.id} className={`border-t border-ink/10 ${upcoming ? "" : "text-ink/40"}`}>
                <td className="py-3 pr-4 whitespace-nowrap">{human(b.date)}</td>
                <td className="py-3 pr-4 tabular-nums">{b.time}</td>
                <td className="py-3 pr-4">{s?.title || "—"} <span className="text-ink/40">{s ? fmtPrice(s.price) : ""}</span></td>
                <td className="py-3 pr-4">{m?.name || "—"}</td>
                <td className="py-3 pr-4">{b.name || "—"}</td>
                <td className="py-3 pr-4 whitespace-nowrap">{b.phone || "—"}</td>
                <td className="py-3 text-right"><button onClick={() => del(b.id)} className="text-[13px] text-wine/70 hover:text-wine">отменить</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
