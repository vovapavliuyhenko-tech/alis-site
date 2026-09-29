// Отправка заявки с сайта в CRM. Best-effort: если CRM недоступна, клиент всё равно
// видит «Спасибо», а заявка дублируется в консоль — сайт не ломается.
export type LeadKind = "concierge" | "coop_private" | "coop_business" | "vacancy" | "chat" | "shop" | "other";

export async function sendLead(lead: {
  kind: LeadKind;
  name?: string;
  phone?: string;
  company?: string;
  details?: Record<string, unknown>;
}): Promise<boolean> {
  try {
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, details: { ...(lead.details || {}), page: typeof window !== "undefined" ? window.location.pathname : "" } }),
      keepalive: true,
    });
    return r.ok;
  } catch {
    return false;
  }
}
