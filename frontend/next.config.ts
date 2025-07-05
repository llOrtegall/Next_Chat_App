import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: "anonymous",
    allowedDevOrigins: [
    "172.20.1.*",  // Permite toda la subred
  ],
};

export default nextConfig;
