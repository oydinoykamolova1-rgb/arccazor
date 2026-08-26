import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel uchun kerak — tashqi rasmlar domeniga ruxsat berish
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
