"use client";
// CRM ÁLIS BEAUTY — панель заявок (по образцу CRM PALOMA, под функционал салона).
// Вход по паролю (CRM_PASSWORD на сервере), пароль хранится только в этой вкладке.
// Статусы: новая → в работе → записан(а) → выполнена / отказ. Типы: консьерж-сервис,
// сотрудничество (частные / бизнес), вакансии, онлайн-консьерж, магазин.
// Поиск по номеру, имени, телефону, компании и тексту; фильтр по датам; заметка
// менеджера (сохраняется при выходе из поля); выгрузка в Excel (CSV).
import { useCallback, useEffect, useState } from "react";

type Lead = {
  id: string;
  kind: string;
  status: string;
  name: string;
  phone: string;
  company: string;
  details: Record<string, unknown>;
  note: string;
  tg_delivered: boolean;
  created_at: string;
};

const KEY = "alis_crm_token";
const PAGE = 50;

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "Новая", cls: "bg-[#46131E] text-white" },
  work: { label: "В работе", cls: "bg-[#a16207] text-white" },
  booked: { label: "Записан(а)", cls: "bg-[#1d4ed8] text-white" },
  done: { label: "Выполнена", cls: "bg-[#15803d] text-white" },
  cancelled: { label: "Отказ", cls: "bg-[#8a857c] text-white" },
};
const ORDER = ["new", "work", "booked", "done", "cancelled"];

const KIND: Record<string, string> = {
  concierge: "Консьерж-сервис · заявка на выезд",
  coop_private: "Сотрудничество · частное лицо",
  coop_business: "Сотрудничество · агентство / бизнес",
  vacancy: "Вакансии · отклик",
  chat: "Онлайн-консьерж · чат",
  shop: "Магазин · заказ",
  bonus: "Главная · 500 бонусов на первый визит",
  other: "Заявка с сайта",
};
const KIND_TABS: [string, string][] = [
  ["", "Все"],
  ["concierge", "Консьерж"],
  ["chat", "Чат"],
  ["coop_private", "Сотрудн. · частные"],
  ["coop_business", "Сотрудн. · бизнес"],
  ["vacancy", "Вакансии"],
  ["shop", "Магазин"],
  ["bonus", "Бонусы"],
];

const phoneFmt = (d: string) =>
  d.length === 11 ? `+${d[0]} (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}` : d ? `+${d}` : "";
const when = (v: string) =>
  new Date(v).toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });

async function api(body: Record<string, unknown>) {
  const token = sessionStorage.getItem(KEY) || "";
  const r = await fetch("/api/crm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, ...body }) });
  const d = await r.json().catch(() => ({ error: `Сервер вернул не JSON (${r.status})` }));
  if (!r.ok || d.error) throw new Error(d.error || `Ошибка ${r.status}`);
  return d;
}

export default function CrmPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [gateErr, setGateErr] = useState("");
  const [busy, setBusy] = useState(false);

  const [status, setStatus] = useState("");
  const [kind, setKind] = useState("");
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rows, setRows] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [offset, setOffset] = useState(0);
  const [more, setMore] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState("");

  const load = useCallback(
    async (reset: boolean, off = 0) => {
      setLoading(true);
      setErr("");
      try {
        const d = await api({ action: "list", q, status, kind, from, to, limit: PAGE, offset: reset ? 0 : off });
        setRows((r) => (reset ? d.leads : [...r, ...d.leads]));
        setCounts(d.counts || {});
        setMore((d.leads || []).length === PAGE);
        if (reset) setOffset(0);
        setUpdated(new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }));
      } catch (e) {
        setErr((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [q, status, kind, from, to],
  );

  // Уже входили в этой вкладке — не спрашиваем пароль снова
  useEffect(() => {
    if (sessionStorage.getItem(KEY)) setAuthed(true);
  }, []);
  useEffect(() => {
    if (authed) void load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, status, kind]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pass.trim()) return;
    setBusy(true);
    setGateErr("");
    sessionStorage.setItem(KEY, pass.trim());
    try {
      await api({ action: "list", limit: 1 });
      setAuthed(true);
    } catch (ex) {
      sessionStorage.removeItem(KEY);
      setGateErr((ex as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const setLeadStatus = async (id: string, next: string) => {
    try {
      await api({ action: "update", id, status: next });
      await load(true);
    } catch (e) {
      alert("Не удалось изменить статус: " + (e as Error).message);
    }
  };

  const saveNote = async (id: string, note: string) => {
    try {
      await api({ action: "update", id, note });
      setRows((r) => r.map((x) => (x.id === id ? { ...x, note } : x)));
    } catch (e) {
      alert("Заметка не сохранилась: " + (e as Error).message);
    }
  };

  const exportCsv = () => {
    if (!rows.length) return alert("Нечего выгружать.");
    const head = ["Номер", "Дата", "Статус", "Тип", "Имя", "Телефон", "Компания", "Детали", "Заметка"];
    const lines = [head, ...rows.map((o) => [
      o.id, when(o.created_at), STATUS[o.status]?.label || o.status, KIND[o.kind] || o.kind, o.name, phoneFmt(o.phone), o.company,
      Object.entries(o.details || {}).filter(([k]) => k !== "page").map(([k, v]) => `${k}: ${v}`).join("; "), o.note,
    ])];
    const csv = "﻿" + lines.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = `alis-zayavki-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const total = ORDER.reduce((s, k) => s + (counts[k] || 0), 0);

  /* ── Вход ── */
  if (!authed) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-[#f6f4f1] px-4">
        <form onSubmit={login} className="w-full max-w-[380px] rounded-[16px] border border-[#17191a]/10 bg-white p-8 shadow-[0_18px_40px_rgba(23,25,26,0.07)]">
          <p className="text-center text-[12px] uppercase tracking-[0.3em] text-[#17191a]/45">ÁLIS BEAUTY</p>
          <h1 className="mt-1 text-center text-[21px] text-[#17191a]">Заявки и клиенты</h1>
          <label htmlFor="pass" className="mt-6 block text-[12px] text-[#17191a]/55">Пароль</label>
          <input
            id="pass"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-[#17191a]/15 px-3 py-2.5 text-[15px] outline-none focus:border-[#46131E]"
          />
          <button disabled={busy} className="mt-5 w-full rounded-[10px] bg-[#46131E] py-3 text-[14px] text-white transition-opacity disabled:opacity-50">
            {busy ? "Проверяю…" : "Войти"}
          </button>
          {gateErr && <p className="mt-4 rounded-[10px] border border-[#f0c7c3] bg-[#fdf3f2] p-3 text-[13px] text-[#b3261e]">{gateErr}</p>}
        </form>
      </div>
    );
  }

  /* ── Панель ── */
  const pill = (on: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${on ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/12 bg-white text-[#17191a] hover:border-[#17191a]/30"}`;
  const ghost = "rounded-[10px] border border-[#17191a]/15 bg-white px-3.5 py-2 text-[13px] text-[#17191a] transition-colors hover:border-[#17191a]/40";

  return (
    <div className="min-h-[100dvh] bg-[#f6f4f1] text-[#17191a]">
      <div className="mx-auto max-w-[1100px] px-4 pb-20 pt-6">
        {/* Шапка */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <h1 className="flex-1 text-[20px]">Заявки ÁLIS BEAUTY</h1>
          {updated && <span className="text-[12px] text-[#17191a]/45">обновлено в {updated}</span>}
          <button className={ghost} onClick={() => load(true)}>Обновить</button>
          <button className={ghost} onClick={exportCsv}>Выгрузить в Excel</button>
          <button className={ghost} onClick={() => { sessionStorage.removeItem(KEY); location.reload(); }}>Выйти</button>
        </div>

        {/* Статусы */}
        <div className="mb-3 flex flex-wrap gap-2">
          <button className={pill(status === "")} onClick={() => setStatus("")}>
            Все <span className="rounded-full bg-current/10 px-1.5 text-[11px] opacity-70">{total}</span>
          </button>
          {ORDER.map((k) => (
            <button key={k} className={pill(status === k)} onClick={() => setStatus(k)}>
              {STATUS[k].label} <span className="text-[11px] opacity-60">{counts[k] || 0}</span>
            </button>
          ))}
        </div>

        {/* Типы заявок */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {KIND_TABS.map(([k, label]) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`rounded-full px-3 py-1 text-[12px] transition-colors ${kind === k ? "bg-[#46131E] text-white" : "bg-white text-[#17191a]/70 hover:text-[#17191a]"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Поиск и даты */}
        <form
          onSubmit={(e) => { e.preventDefault(); void load(true); }}
          className="mb-5 grid grid-cols-2 items-end gap-3 rounded-[14px] border border-[#17191a]/10 bg-white p-4 sm:grid-cols-[2fr_1fr_1fr_auto]"
        >
          <label className="col-span-2 block text-[12px] text-[#17191a]/55 sm:col-span-1">
            Поиск — номер, имя, телефон, компания, текст
            <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="например: 9054086955 или Анна" className="mt-1.5 w-full rounded-[10px] border border-[#17191a]/15 px-3 py-2 text-[14px] text-[#17191a] outline-none focus:border-[#46131E]" />
          </label>
          <label className="block text-[12px] text-[#17191a]/55">
            С
            <input value={from} onChange={(e) => setFrom(e.target.value)} type="date" className="mt-1.5 w-full rounded-[10px] border border-[#17191a]/15 px-3 py-2 text-[14px] text-[#17191a] outline-none" />
          </label>
          <label className="block text-[12px] text-[#17191a]/55">
            по
            <input value={to} onChange={(e) => setTo(e.target.value)} type="date" className="mt-1.5 w-full rounded-[10px] border border-[#17191a]/15 px-3 py-2 text-[14px] text-[#17191a] outline-none" />
          </label>
          <button className="col-span-2 rounded-[10px] bg-[#17191a] px-5 py-2.5 text-[14px] text-white sm:col-span-1">Найти</button>
        </form>

        {/* Список */}
        {err && <p className="mb-4 rounded-[12px] border border-[#f0c7c3] bg-[#fdf3f2] p-4 text-[14px] text-[#b3261e]">{err}</p>}
        {!err && !loading && rows.length === 0 && (
          <p className="rounded-[12px] border border-[#17191a]/10 bg-white p-4 text-[14px] text-[#17191a]/55">Ничего не нашлось. Попробуйте снять фильтры.</p>
        )}

        <div className="space-y-3">
          {rows.map((o) => {
            const st = STATUS[o.status] || STATUS.new;
            const det = Object.entries(o.details || {}).filter(([k, v]) => k !== "page" && v);
            return (
              <div key={o.id} className="rounded-[14px] border border-[#17191a]/10 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="text-[16px] font-medium">№ {o.id}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-[0.04em] ${st.cls}`}>{st.label}</span>
                  <span className="text-[13px] text-[#17191a]/45">{when(o.created_at)}</span>
                  {!o.tg_delivered && <span className="text-[12px] text-[#17191a]/35">без уведомления в Telegram</span>}
                </div>
                <p className="mt-0.5 text-[12px] text-[#17191a]/50">{KIND[o.kind] || o.kind}</p>

                {(o.name || o.phone || o.company) && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
                    {o.name && <b className="font-medium">{o.name}</b>}
                    {o.company && <span>{o.company}</span>}
                    {o.phone && <a href={`tel:+${o.phone}`} className="underline decoration-[#17191a]/20 underline-offset-4">{phoneFmt(o.phone)}</a>}
                    {o.phone && <a href={`https://wa.me/${o.phone}`} target="_blank" rel="noopener noreferrer" className="text-[#46131E] underline decoration-[#46131E]/30 underline-offset-4">написать в мессенджере</a>}
                  </div>
                )}

                {det.length > 0 && (
                  <div className="mt-3 rounded-[10px] bg-[#f6f4f1] px-3.5 py-2.5 text-[14px]">
                    {det.map(([k, v]) => (
                      <div key={k}><span className="text-[#17191a]/50">{k}:</span> {String(v)}</div>
                    ))}
                    {o.details.page ? <div className="text-[12px] text-[#17191a]/40">страница: {String(o.details.page)}</div> : null}
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ORDER.map((k) => (
                    <button
                      key={k}
                      onClick={() => o.status !== k && setLeadStatus(o.id, k)}
                      className={`rounded-[10px] border px-3 py-1.5 text-[13px] transition-colors ${o.status === k ? "border-[#17191a] bg-[#17191a] text-white" : "border-[#17191a]/15 bg-white text-[#17191a] hover:border-[#17191a]/40"}`}
                    >
                      {STATUS[k].label}
                    </button>
                  ))}
                </div>

                <textarea
                  defaultValue={o.note}
                  placeholder="Заметка менеджера — сохраняется при выходе из поля"
                  onBlur={(e) => { if (e.target.value !== o.note) void saveNote(o.id, e.target.value); }}
                  className="mt-3 min-h-[46px] w-full resize-y rounded-[10px] border border-[#17191a]/15 px-3 py-2 text-[14px] outline-none focus:border-[#46131E]"
                />
              </div>
            );
          })}
        </div>

        {loading && <p className="mt-4 text-center text-[13px] text-[#17191a]/45">Загружаю…</p>}
        {more && !loading && (
          <div className="mt-5 text-center">
            <button className={ghost} onClick={() => { const n = offset + PAGE; setOffset(n); void load(false, n); }}>Показать ещё</button>
          </div>
        )}
      </div>
    </div>
  );
}
