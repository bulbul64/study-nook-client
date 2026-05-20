import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/backend/:path*', 
        destination: 'https://server-beige-three-39.vercel.app/:path*', 
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This wildcard allows all hostnames
      },
    ],
  },
};

export default nextConfig;
