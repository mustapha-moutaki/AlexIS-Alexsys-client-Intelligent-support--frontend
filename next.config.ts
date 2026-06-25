import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

   typescript: {
    ignoreBuildErrors: true,   // ← Skip type checking during build
  },
  eslint: {
    ignoreDuringBuilds: true,  // ← Skip ESLint during build
  },
};

export default nextConfig;
