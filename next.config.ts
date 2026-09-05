import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["titan.local", "127.0.0.1", "10.*.*.*", "172.*.*.*", "192.168.*.*"],
};

export default nextConfig;
