import type { Metadata } from "next";
import Header from "@/components/Header";
import Concierge from "@/components/Concierge";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ALIS Beauty Concierge — персональный бьюти-консьерж",
  description:
    "Персональный beauty-консьерж ALIS: подбор мастеров, планирование образа, организация выезда по России и за рубежом, сопровождение на событии.",
};

export default function ConciergePage() {
  return (
    <>
      <Header />
      <Concierge />
      <Footer />
    </>
  );
}
