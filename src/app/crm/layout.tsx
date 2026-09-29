import type { Metadata } from "next";

// Рабочая панель — не индексируем
export const metadata: Metadata = {
  title: "CRM — заявки ÁLIS BEAUTY",
  robots: { index: false, follow: false },
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return children;
}
