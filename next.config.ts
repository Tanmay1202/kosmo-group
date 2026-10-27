import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kosmo/group-config", "@kosmo/group-bar", "@kosmo/lead-client"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
