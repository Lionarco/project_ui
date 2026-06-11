import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // Wajib ditambah jika lu menggunakan komponen <Image /> dari Next.js
  },
};

export default nextConfig;