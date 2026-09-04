import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "10.*.*.*", "172.*.*.*", "192.168.*.*"],
};

export default nextConfig;
