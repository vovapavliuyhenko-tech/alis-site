// CRM ÁLIS BEAUTY — серверная часть (только для API-маршрутов, не для браузера).
// Как у PALOMA: одна таблица с заявками, у каждой — тип, статус, контакты,
// детали (JSON) и заметка менеджера. База — любой Postgres по DATABASE_URL
// (например, Neon из Vercel Storage). Уведомления — в Telegram, если заданы
// TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID. Всё best-effort: ошибка CRM не ломает сайт.
import { Pool } from "pg";

export const STATUSES = ["new", "work", "booked", "done", "cancelled"] as const;
export type Status = (typeof STATUSES)[number];

export const KINDS = ["concierge", "coop_private", "coop_business", "vacancy", "chat", "shop", "other"] as const;
export type Kind = (typeof KINDS)[number];

export type Lead = {
  id: string;
  kind: Kind;
  status: Status;
  name: string;
  phone: string; // только цифры
  company: string;
  details: Record<string, unknown>;
  note: string;
  tg_delivered: boolean;
  created_at: string;
};

let pool: Pool | null = null;
let ready = false;

export function dbConfigured() {
  return !!process.env.DATABASE_URL;
}

function db() {
  if (!process.env.DATABASE_URL) throw new Error("База данных не подключена (нет DATABASE_URL)");
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL) ? undefined : { rejectUnauthorized: false },
      max: 3,
    });
  }
  return pool;
}

async function ensure() {
  if (ready) return;
  await db().query(`
    CREATE TABLE IF NOT EXISTS crm_leads (
      id text PRIMARY KEY,
      kind text NOT NULL DEFAULT 'other',
      status text NOT NULL DEFAULT 'new',
      name text NOT NULL DEFAULT '',
      phone text NOT NULL DEFAULT '',
      company text NOT NULL DEFAULT '',
      details jsonb NOT NULL DEFAULT '{}'::jsonb,
      note text NOT NULL DEFAULT '',
      tg_delivered boolean NOT NULL DEFAULT false,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`);
  await db().query("CREATE INDEX IF NOT EXISTS crm_leads_created_idx ON crm_leads (created_at DESC)");
  ready = true;
}

const str = (v: unknown, max = 256) => String(v ?? "").trim().slice(0, max);
const digits = (v: unknown) => String(v ?? "").replace(/\D/g, "").slice(0, 20);

// Номер заявки: A-260929-4F7K (дата + 4 символа) — удобно называть по телефону
function newId() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `A-${ymd}-${rnd}`;
}

export const KIND_LABEL: Record<Kind, string> = {
  concierge: "Консьерж-сервис · заявка на выезд",
  coop_private: "Сотрудничество · частное лицо",
  coop_business: "Сотрудничество · агентство / бизнес",
  vacancy: "Вакансии · отклик",
  chat: "Онлайн-консьерж · чат",
  shop: "Магазин · заказ",
  other: "Заявка с сайта",
};

async function notifyTelegram(lead: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return false;
  const d = lead.details as Record<string, string>;
  const lines = [
    `🆕 ${KIND_LABEL[lead.kind]}`,
    `№ ${lead.id}`,
    lead.name && `Имя: ${lead.name}`,
    lead.phone && `Телефон: +${lead.phone}`,
    lead.company && `Компания: ${lead.company}`,
    ...Object.entries(d)
      .filter(([k, v]) => v && k !== "items" && k !== "page")
      .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`),
  ].filter(Boolean);
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: lines.join("\n") }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

export async function saveLead(input: { kind?: string; name?: string; phone?: string; company?: string; details?: Record<string, unknown> }) {
  await ensure();
  const kind = (KINDS as readonly string[]).includes(String(input.kind)) ? (input.kind as Kind) : "other";
  const details: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input.details || {}).slice(0, 20)) {
    details[str(k, 40)] = typeof v === "string" ? str(v, 2000) : v;
  }
  const lead: Lead = {
    id: newId(),
    kind,
    status: "new",
    name: str(input.name, 120),
    phone: digits(input.phone),
    company: str(input.company, 160),
    details,
    note: "",
    tg_delivered: false,
    created_at: new Date().toISOString(),
  };
  await db().query(
    "INSERT INTO crm_leads (id, kind, status, name, phone, company, details) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [lead.id, lead.kind, lead.status, lead.name, lead.phone, lead.company, JSON.stringify(lead.details)],
  );
  const sent = await notifyTelegram(lead);
  if (sent) await db().query("UPDATE crm_leads SET tg_delivered = true WHERE id = $1", [lead.id]).catch(() => {});
  return lead.id;
}

export async function listLeads(f: { q?: string; status?: string; kind?: string; from?: string; to?: string; limit?: number; offset?: number }) {
  await ensure();
  const where: string[] = [];
  const args: unknown[] = [];
  const add = (sql: string, v: unknown) => { args.push(v); where.push(sql.replace("$?", `$${args.length}`)); };
  if (f.q) {
    const q = str(f.q, 80);
    const qd = digits(q);
    args.push(`%${q}%`);
    const i = args.length;
    let cond = `(id ILIKE $${i} OR name ILIKE $${i} OR company ILIKE $${i} OR details::text ILIKE $${i} OR note ILIKE $${i}`;
    if (qd.length >= 4) { args.push(`%${qd}%`); cond += ` OR phone LIKE $${args.length}`; }
    where.push(cond + ")");
  }
  if (f.kind && (KINDS as readonly string[]).includes(f.kind)) add("kind = $?", f.kind);
  if (f.from) add("created_at >= $?::date", f.from);
  if (f.to) add("created_at < ($?::date + 1)", f.to);
  const base = where.length ? " WHERE " + where.join(" AND ") : "";

  // Счётчики по статусам — с учётом поиска/типа/дат, но без фильтра статуса
  const counts: Record<string, number> = {};
  const c = await db().query(`SELECT status, count(*)::int AS n FROM crm_leads${base} GROUP BY status`, args);
  for (const r of c.rows) counts[r.status] = r.n;

  const whereAll = [...where];
  const argsAll = [...args];
  if (f.status && (STATUSES as readonly string[]).includes(f.status)) {
    argsAll.push(f.status);
    whereAll.push(`status = $${argsAll.length}`);
  }
  const limit = Math.min(Math.max(Number(f.limit) || 50, 1), 200);
  const offset = Math.max(Number(f.offset) || 0, 0);
  argsAll.push(limit, offset);
  const rows = await db().query(
    `SELECT id, kind, status, name, phone, company, details, note, tg_delivered, created_at FROM crm_leads` +
      (whereAll.length ? " WHERE " + whereAll.join(" AND ") : "") +
      ` ORDER BY created_at DESC LIMIT $${argsAll.length - 1} OFFSET $${argsAll.length}`,
    argsAll,
  );
  return { leads: rows.rows as Lead[], counts };
}

export async function updateLead(id: string, patch: { status?: string; note?: string }) {
  await ensure();
  if (patch.status !== undefined) {
    if (!(STATUSES as readonly string[]).includes(patch.status)) throw new Error("Неизвестный статус");
    await db().query("UPDATE crm_leads SET status = $1, updated_at = now() WHERE id = $2", [patch.status, str(id, 40)]);
  }
  if (patch.note !== undefined) {
    await db().query("UPDATE crm_leads SET note = $1, updated_at = now() WHERE id = $2", [str(patch.note, 4000), str(id, 40)]);
  }
}

// Пароль панели сравниваем за постоянное время — чтобы по времени ответа нельзя было подобрать
export function checkPassword(pass: unknown) {
  const real = process.env.CRM_PASSWORD || "";
  const got = String(pass ?? "");
  if (!real || got.length !== real.length) return false;
  let diff = 0;
  for (let i = 0; i < real.length; i++) diff |= real.charCodeAt(i) ^ got.charCodeAt(i);
  return diff === 0;
}
