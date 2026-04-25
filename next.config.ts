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
