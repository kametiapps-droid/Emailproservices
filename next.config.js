/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  allowedDevOrigins: ['*.replit.dev', '*.repl.co', '*.replit.app'],
  experimental: {
    serverActions: {
      allowedOrigins: ['*.replit.dev', '*.repl.co', '*.replit.app'],
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
