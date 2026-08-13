"use client";
// Отдельная страница «Заявка» — квиз-форма (Booking) с шапкой и подвалом.
// Вынесена с главной как самостоятельная страница.
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";

export default function RequestPage() {
  return (
    <main className="bg-white">
      <Header />
      {/* отступ, чтобы фикс-шапка не перекрывала заголовок блока */}
      <div className="h-16 bg-white" />
      <Booking />
      <Footer />
    </main>
  );
}
