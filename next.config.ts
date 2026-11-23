import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc/**',
      },
    ],
  },
  async redirects() {
    return [
      // Old PDF name -> current version (renamed so mobile devices don't reuse a stale download)
      {
        source: '/TheEthicsCode.pdf',
        destination: '/TheEthicsCode-2026.pdf',
        permanent: false,
      },
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'surrogacyethicsil.org',
          },
        ],
        destination: 'https://www.surrogacyethicsil.org/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
