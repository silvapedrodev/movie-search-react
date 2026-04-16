import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [128, 160, 192, 224, 256],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
