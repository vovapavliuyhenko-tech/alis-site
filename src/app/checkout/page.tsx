import type { Metadata } from "next";
import Checkout from "@/components/shop/Checkout";

// Оформление заказа из корзины (по образцу paloma.website/checkout.html) — без шапки и подвала сайта,
// чтобы ничего не отвлекало: сверху «Назад / Ваш заказ / ✕».
export const metadata: Metadata = {
  title: "Ваш заказ — ÁLIS BEAUTY",
  robots: { index: false },
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Checkout />
    </main>
  );
}
