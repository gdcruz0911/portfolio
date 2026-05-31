import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Spotify album art CDN
      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
};

export default nextConfig;
