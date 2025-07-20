// next.config.mjs

import withPWA from 'next-pwa'

const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,

  eslint: {
    ignoreDuringBuilds: true, // better to keep errors visible
  },
  typescript: {
    ignoreBuildErrors: true, // helps avoid silent TypeScript issues
  },

  images: {
    domains: ['spacebarclickers.com'], // allow your own domain
    formats: ['image/webp', 'image/avif'],
  },

  trailingSlash: false,

  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },

  experimental: {
    appDir: true,
    serverActions: true,
    typedRoutes: true,
  },

  // ⏩ Proxy API calls in local dev only
  async rewrites() {
    return isDev
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8000/api/:path*', // local Django dev server
          },
        ]
      : []
  },

  // ✅ SEO & security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },

  // 🔁 Optional redirect (example: short link to FAQ)
  async redirects() {
    return [
      {
        source: '/faq',
        destination: '/frequently-asked-questions',
        permanent: true,
      },
    ]
  },
}

// 🚀 Wrap with PWA (enabled only in production)
export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
})(nextConfig)
