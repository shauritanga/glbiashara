import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "localhost"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
    turbo: {
      rules: {
        "util/types": { resolve: false }, // Ignore 'util/types' in Turbopack
      },
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add polyfills for Node.js core modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve("util/"), // Polyfill for 'util/types'
        fs: false, // Disable 'fs' for the browser
      };
    }
    return config;
  },
};

export default nextConfig;
