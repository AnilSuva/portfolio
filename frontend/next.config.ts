import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network and dev origins for HMR and mobile testing
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000", "172.30.242.222:3000", "172.30.242.222"],
};

export default nextConfig;
