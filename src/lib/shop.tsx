"use client";
// Состояние магазина: корзина + избранное + UI (какие drawer/модалка открыты).
// Хранится в localStorage. Оборачивает всё приложение (в layout).
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "./products";

type CartItem = { id: string; qty: number };
type UI = { cart: boolean; fav: boolean; product: string | null };

type ShopCtx = {
  cart: CartItem[];
  favorites: string[];
  ui: UI;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  toggleFav: (id: string) => void;
  isFav: (id: string) => boolean;
  cartCount: number;
  favCount: number;
  cartTotal: number;
  openCart: () => void;
  openFav: () => void;
  openProduct: (id: string) => void;
  closeAll: () => void;
  productById: (id: string) => Product | undefined;
};

const Ctx = createContext<ShopCtx | null>(null);

const read = (key: string): string[] | CartItem[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ui, setUi] = useState<UI>({ cart: false, fav: false, product: null });
  const [ready, setReady] = useState(false);

  // Загрузка из localStorage на клиенте
  useEffect(() => {
    setCart(read("alis-cart") as CartItem[]);
    setFavorites(read("alis-fav") as string[]);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("alis-cart", JSON.stringify(cart)); } catch {}
  }, [cart, ready]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem("alis-fav", JSON.stringify(favorites)); } catch {}
  }, [favorites, ready]);

  // Блокируем скролл body, когда открыт drawer/модалка
  const anyOpen = ui.cart || ui.fav || ui.product !== null;
  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [anyOpen]);

  const add = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((x) => x.id === id);
      if (found) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x));
      return [...c, { id, qty }];
    });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((x) => x.id !== id) : c.map((x) => (x.id === id ? { ...x, qty } : x))));
  }, []);
  const remove = useCallback((id: string) => setCart((c) => c.filter((x) => x.id !== id)), []);
  const toggleFav = useCallback((id: string) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, []);
  const isFav = useCallback((id: string) => favorites.includes(id), [favorites]);

  const productById = useCallback((id: string) => PRODUCTS.find((p) => p.id === id), []);

  const cartCount = useMemo(() => cart.reduce((s, x) => s + x.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((s, x) => s + (productById(x.id)?.price || 0) * x.qty, 0),
    [cart, productById],
  );

  const openCart = useCallback(() => setUi({ cart: true, fav: false, product: null }), []);
  const openFav = useCallback(() => setUi({ cart: false, fav: true, product: null }), []);
  const openProduct = useCallback((id: string) => setUi((u) => ({ ...u, product: id })), []);
  const closeAll = useCallback(() => setUi({ cart: false, fav: false, product: null }), []);

  const value: ShopCtx = {
    cart, favorites, ui, add, setQty, remove, toggleFav, isFav,
    cartCount, favCount: favorites.length, cartTotal,
    openCart, openFav, openProduct, closeAll, productById,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useShop must be used within ShopProvider");
  return c;
}
