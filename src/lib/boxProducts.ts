// НАПОЛНЕНИЕ ПОДАРОЧНОГО БОКСА — список средств от заказчицы (ссылки «Золотого яблока» и LUVU).
// Названия LUVU — с сайта бренда. Названия позиций «Золотого яблока» восстановлены по ссылкам
// (сайт закрыт защитой от программ) — ПРОВЕРИТЬ с заказчицей, при необходимости поправить бренд/объём.
// Цены не выводим: стоимость бокса уточняет менеджер.

export type BoxGroup = { title: string; items: string[] };

export const BOX_GROUPS: BoxGroup[] = [
  {
    title: "Уход за волосами и кожей головы",
    items: [
      "Cold Pressed Shea Butter Nourishing Shampoo",
      "Cold Pressed Shea Butter Real Change Treatment",
      "Cold Pressed Shea Butter Protein Recharging Leave-in Treatment",
      "Cold Pressed Shea Butter",
      "Cold Brew Rosemary Exfoliating Scalp Shampoo",
      "Cold Brew Rosemary Purifying Scalp Scaler with Sea Salt",
      "Cold Brew Rosemary Balancing Scalp Pack with Charcoal",
      "Cold Brew Rosemary Energizing Scalp Spray",
      "Cold Press Avocado Nourishing Scalp Pack with Banana",
      "Cold Press Tamanu Oil Soothing Scalp Pack with Black Currant",
      "Cold Pressed Argan Oil",
      "Cold Pressed Argan Oil Repairing",
      "Средство с маслом арганы холодного отжима",
      "Rated Green Cold Pressed",
      "Rated Green Rosemary",
      "Rated Green Real Jojoba",
      "Anti-Frizz Hydrating Hair Lotion",
      "Anti Hair Loss Treatment",
    ],
  },
  {
    title: "Davines",
    items: [
      "Davines OI All in One Milk",
      "Davines OI Oil",
      "Davines OI",
      "Davines VOLU Hair Mist",
      "Davines MELU Spray",
    ],
  },
  {
    title: "Ароматы",
    items: [
      "Trésor Solaire",
      "Carbone Glacé",
      "Exception Rosée",
      "Elixir Intense",
    ],
  },
  {
    title: "Макияж LUVU",
    items: [
      "Lip Pencil Dreamy Nude — карандаш для губ",
      "Lip Pencil Rose Haze — карандаш для губ",
      "Lip Pencil Flirt Alert — карандаш для губ",
      "Lip Gloss Dreamy Nude — блеск для губ",
      "Lip Gloss Rose Haze — блеск для губ",
      "Lip Gloss Flirt Alert — блеск для губ",
      "Lip Gloss Berry Kiss — блеск для губ",
      "Lip Gloss Dolce Daze — блеск для губ",
      "Lip Combo Flirt Alert — набор для макияжа губ",
      "Glossy Lip Treatment SPF 15 — глянцевый бальзам для губ",
      "Lip + Cheek Stick Never Shy — стик для губ и щёк",
      "Lip + Cheek Stick Almost Ready — стик для губ и щёк",
      "Lip + Cheek Stick Always Busy — стик для губ и щёк",
      "Trio Lip + Cheek Stick — набор из трёх оттенков",
      "Brow Sculpture — гель для бровей",
      "Daily Glow Fluid SPF 30 — флюид с декоративным эффектом",
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
