import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Страница сертификатов удалена — сертификаты продаются через YClients
  async redirects() {
    return [{ source: "/certificate", destination: "https://o8981.yclients.ru/certificates", permanent: false }];
  },
};

export default nextConfig;
