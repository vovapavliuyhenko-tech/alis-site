"use client";
// Глобальный UI магазина: drawer корзины, drawer избранного и модалка товара.
// Монтируется один раз в layout. Оформление заказа — сообщением в WhatsApp.
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useShop } from "@/lib/shop";
import { fmtPrice, PRODUCTS } from "@/lib/products";

const WA_PHONE = "79888887758";

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}
function IconHeart({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z" strokeLinejoin="round" />
    </svg>
  );
}

export default function ShopUI() {
  const { lang } = useLang();
  const en = lang === "en";
  const t = (ru: string, e: string) => (en ? e : ru);
  const s = useShop();

  const whatsappHref = () => {
    const lines = s.cart.map((it) => {
      const p = s.productById(it.id);
      return `• ${p?.name[lang]} × ${it.qty} — ${fmtPrice((p?.price || 0) * it.qty, en)}`;
    });
    const msg =
      t("Здравствуйте! Хочу заказать мерч ÁLIS:", "Hello! I'd like to order ÁLIS merch:") +
      "\n" + lines.join("\n") +
      "\n\n" + t("Итого:", "Total:") + " " + fmtPrice(s.cartTotal, en);
    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Затемнение-подложка */}
      <div
        onClick={s.closeAll}
        aria-hidden
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          s.ui.cart || s.ui.fav ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ===== Drawer корзины ===== */}
      <Drawer open={s.ui.cart} onClose={s.closeAll} title={t("Корзина", "Cart")}>
        {s.cart.length === 0 ? (
          <Empty text={t("Корзина пуста", "Your cart is empty")} />
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-6">
              {s.cart.map((it) => {
                const p = s.productById(it.id);
                if (!p) return null;
                return (
                  <div key={it.id} className="flex gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" className="h-20 w-16 shrink-0 rounded-[12px] object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[14px] font-medium text-[#2a2320]">{p.name[lang]}</span>
                        <button onClick={() => s.remove(it.id)} aria-label={t("Удалить", "Remove")} className="text-[#2a2320]/40 transition-colors hover:text-[#6E7248]"><IconClose /></button>
                      </div>
                      <span className="mt-1 text-[13px] text-[#6E7248]">{fmtPrice(p.price, en)}</span>
                      <div className="mt-auto flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-[#6E7248]/25">
                          <button onClick={() => s.setQty(it.id, it.qty - 1)} className="flex h-8 w-8 items-center justify-center text-[#6E7248]">−</button>
                          <span className="w-6 text-center text-[13px] tabular-nums text-[#2a2320]">{it.qty}</span>
                          <button onClick={() => s.setQty(it.id, it.qty + 1)} className="flex h-8 w-8 items-center justify-center text-[#6E7248]">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#6E7248]/15 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] uppercase tracking-[0.14em] text-[#2a2320]/60">{t("Итого", "Total")}</span>
                <span className="font-display text-[22px] text-[#2a2320]">{fmtPrice(s.cartTotal, en)}</span>
              </div>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center rounded-2xl border border-[#6E7248] bg-[#6E7248] py-4 font-display text-[13px] uppercase tracking-[0.16em] text-[#f4efe6] transition-colors duration-300 hover:bg-transparent hover:text-[#6E7248]"
              >
                {t("Оформить в WhatsApp", "Order via WhatsApp")}
              </a>
              <p className="mt-3 text-center text-[11px] text-[#2a2320]/45">
                {t("Состав заказа отправится сообщением — подтвердим наличие и доставку.", "Your order is sent as a message — we'll confirm stock and delivery.")}
              </p>
            </div>
          </>
        )}
      </Drawer>

      {/* ===== Drawer избранного ===== */}
      <Drawer open={s.ui.fav} onClose={s.closeAll} title={t("Избранное", "Favourites")}>
        {s.favorites.length === 0 ? (
          <Empty text={t("В избранном пусто", "No favourites yet")} />
        ) : (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-6">
            {s.favorites.map((id) => {
              const p = PRODUCTS.find((x) => x.id === id);
              if (!p) return null;
              return (
                <div key={id} className="flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" className="h-20 w-16 shrink-0 rounded-[12px] object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/product/${id}`} onClick={s.closeAll} className="text-left text-[14px] font-medium text-[#2a2320] hover:text-[#6E7248]">{p.name[lang]}</Link>
                      <button onClick={() => s.toggleFav(id)} aria-label={t("Убрать", "Remove")} className="text-[#6E7248]"><IconHeart filled /></button>
                    </div>
                    <span className="mt-1 text-[13px] text-[#6E7248]">{fmtPrice(p.price, en)}</span>
                    <button
                      onClick={() => { s.add(id); s.openCart(); }}
                      className="mt-auto w-fit rounded-full border border-[#6E7248]/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[#6E7248] transition-colors hover:border-[#6E7248] hover:bg-[#6E7248] hover:text-[#f4efe6]"
                    >
                      {t("В корзину", "Add to cart")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Drawer>
    </>
  );
}

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <aside
      className={`fixed right-0 top-0 z-[95] flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#6E7248]/15 px-6 py-5">
        <span className="font-display text-[16px] uppercase tracking-[0.14em] text-[#6E7248]">{title}</span>
        <button onClick={onClose} aria-label="close" className="flex h-9 w-9 items-center justify-center rounded-full text-[#2a2320] transition-colors hover:bg-[#6E7248]/10">
          <IconClose />
        </button>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden px-6">{children}</div>
    </aside>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="flex flex-1 items-center justify-center py-20 text-[14px] text-[#2a2320]/45">{text}</div>;
}
