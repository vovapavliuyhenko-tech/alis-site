import type { Metadata } from "next";

// Служебная страница — не индексируем
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
