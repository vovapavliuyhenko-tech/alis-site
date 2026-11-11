// НАПОЛНЕНИЕ ПОДАРОЧНОГО БОКСА — список средств от заказчицы (ссылки «Золотого яблока» и LUVU).
// price — розничная цена в ₽ (LUVU — с сайта бренда); без цены — «цена у менеджера»
export type BoxItem = { name: string; brand: string; img?: string; price?: number };
export type BoxGroup = { title: string; items: BoxItem[] };

// Фото товаров — с карточек на сайтах брендов/официальных ритейлеров, приведены к белому квадрату.
// Позиции без фото — с «Золотого яблока» (сайт закрыт защитой) или не удалось однозначно определить.
export const BOX_GROUPS: BoxGroup[] = [
  {
    title: "Уход за волосами",
    items: [
      { name: "Real Shea Nourishing Shampoo", brand: "Rated Green", img: "/assets/products/rg-shea-shampoo-v2.jpg" },
      { name: "Real Shea Protein Recharging Leave-in Treatment", brand: "Rated Green", img: "/assets/products/rg-shea-leavein-v2.jpg" },
      { name: "Real Argan Repairing Shampoo", brand: "Rated Green", img: "/assets/products/rg-argan-shampoo-v2.jpg" },
      { name: "Real Argan Smoothing Hair Serum", brand: "Rated Green", img: "/assets/products/rg-argan-serum-v2.jpg" },
      { name: "Cold Pressed Argan Oil Conditioning Hair Mask", brand: "Rated Green", img: "/assets/products/rg-argan-mask-v2.jpg" },
      { name: "Real Grow Anti Hair Loss Treatment", brand: "Rated Green", img: "/assets/products/rg-antiloss-v2.jpg" },
      { name: "Real Shea Real Change Treatment", brand: "Rated Green", img: "/assets/products/rg-shea-change-v2.jpg" },
      { name: "Rated Green Real Jojoba", brand: "Rated Green" },
      { name: "Real Shea Anti-Frizz Hydrating Hair Lotion", brand: "Rated Green" },
    ],
  },
  {
    title: "Кожа головы",
    items: [
      { name: "Cold Brew Rosemary Exfoliating Scalp Shampoo", brand: "Rated Green", img: "/assets/products/rg-rosemary-shampoo-v2.jpg" },
      { name: "Cold Brew Rosemary Energizing Scalp Spray", brand: "Rated Green", img: "/assets/products/rg-rosemary-spray-v2.jpg" },
      { name: "Cold Brew Rosemary Purifying Scalp Scaler", brand: "Rated Green", img: "/assets/products/rg-rosemary-scaler-v2.jpg" },
      { name: "Cold Brew Rosemary Balancing Scalp Pack", brand: "Rated Green", img: "/assets/products/rg-rosemary-pack-v2.jpg" },
      { name: "Cold Press Avocado Nourishing Scalp Pack", brand: "Rated Green", img: "/assets/products/rg-avocado-pack-v2.jpg" },
      { name: "Cold Press Tamanu Oil Soothing Scalp Pack", brand: "Rated Green", img: "/assets/products/rg-tamanu-pack-v2.jpg" },
    ],
  },
  {
    title: "Davines",
    items: [
      { name: "OI All in One Milk", brand: "Davines", img: "/assets/products/dv-oi-milk-v2.jpg" },
      { name: "OI Oil", brand: "Davines", img: "/assets/products/dv-oi-oil-v2.jpg" },
      { name: "VOLU Hair Mist", brand: "Davines", img: "/assets/products/dv-volu-v2.jpg" },
      { name: "MELU Hair Shield", brand: "Davines", img: "/assets/products/dv-melu-v2.jpg" },
    ],
  },
  {
    title: "Макияж LUVU",
    items: [
      { name: "Lip Pencil Dreamy Nude", brand: "LUVU", img: "/assets/products/luvu-lip-pencil-dreamy-nude-v2.jpg", price: 1120 },
      { name: "Lip Pencil Rose Haze", brand: "LUVU", img: "/assets/products/luvu-lip-pencil-rose-haze-v2.jpg", price: 1120 },
      { name: "Lip Pencil Flirt Alert", brand: "LUVU", img: "/assets/products/luvu-lip-pencil-flirt-alert-v2.jpg", price: 1120 },
      { name: "Lip Gloss Dreamy Nude", brand: "LUVU", img: "/assets/products/luvu-lip-gloss-dreamy-nude-v2.jpg", price: 1070 },
      { name: "Lip Gloss Rose Haze", brand: "LUVU", img: "/assets/products/luvu-lip-gloss-rose-haze-v2.jpg", price: 1070 },
      { name: "Lip Gloss Flirt Alert", brand: "LUVU", img: "/assets/products/luvu-lip-gloss-flirt-alert-v2.jpg", price: 1070 },
      { name: "Lip Gloss Berry Kiss", brand: "LUVU", img: "/assets/products/luvu-lip-gloss-berry-kiss-v2.jpg", price: 1070 },
      { name: "Lip Gloss Dolce Daze", brand: "LUVU", img: "/assets/products/luvu-lip-gloss-dolce-daze-v2.jpg", price: 1070 },
      { name: "Lip Combo Flirt Alert", brand: "LUVU", img: "/assets/products/luvu-nabor-dlya-gub-lip-combo-flirt-alert-v2.jpg", price: 1980 },
      { name: "Glossy Lip Treatment SPF 15", brand: "LUVU", img: "/assets/products/luvu-glossy-lip-treatment-spf-15-v2.jpg", price: 1070 },
      { name: "Lip + Cheek Stick Never Shy", brand: "LUVU", img: "/assets/products/luvu-lip-cheek-stick-never-shy-v2.jpg", price: 1430 },
      { name: "Lip + Cheek Stick Almost Ready", brand: "LUVU", img: "/assets/products/luvu-lip-cheek-stick-almost-ready-v2.jpg", price: 1430 },
      { name: "Lip + Cheek Stick Always Busy", brand: "LUVU", img: "/assets/products/luvu-lip-cheek-stick-always-busy-v2.jpg", price: 1430 },
      { name: "Trio Lip + Cheek Stick", brand: "LUVU", img: "/assets/products/luvu-lip-cheek-stick-trio-v2.jpg", price: 4290 },
      { name: "Brow Sculpture", brand: "LUVU", img: "/assets/products/luvu-brow-sculpture-v2.jpg", price: 890 },
      { name: "Daily Glow Fluid SPF 30", brand: "LUVU", img: "/assets/products/luvu-daily-glow-fluid-spf-30-v2.jpg", price: 2070 },
    ],
  },
  {
    title: "Ароматы",
    items: [
      { name: "Trésor Solaire", brand: "Аромат" },
      { name: "Carbone Glacé", brand: "Аромат" },
      { name: "Exception Rosée", brand: "Аромат" },
      { name: "Elixir Intense", brand: "Аромат" },
    ],
  },
];

export type BoxSize = "S" | "M";
export type BoxColor = "red" | "pink" | "blue" | "green";

export const BOX_SIZES: { id: BoxSize; label: string; dims: string; colors: BoxColor[] }[] = [
  { id: "S", label: "Размер S", dims: "16 × 9 см", colors: ["blue"] },
  { id: "M", label: "Размер M", dims: "30 × 16 см", colors: ["red", "pink", "blue", "green"] },
];

export const BOX_COLORS: Record<BoxColor, { label: string; hex: string }> = {
  red: { label: "Красный", hex: "#e5262f" },
  pink: { label: "Розовый", hex: "#f6d9d6" },
  blue: { label: "Голубой", hex: "#9fb9da" },
  green: { label: "Зелёный", hex: "#3f9b5c" },
};
