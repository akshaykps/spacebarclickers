import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/components/google-analytics'
import { JsonLd } from '@/components/json-ld'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://spacebarclickers.com'),
  title: {
    default: 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
    template: '%s | Spacebar Clicker',
  },
  description:
    'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking. Free online game with real-time multiplayer competition.',
  keywords: [
    'spacebar clicker',
    'clicking game',
    'speed test',
    'online game',
    'achievements',
    'leaderboard',
    'multiplayer',
    'free game',
    'browser game',
    'clicking speed',
    'spacebar game',
    'reaction time',
    'finger speed',
    'clicking challenge',
    'auto clicker',
    'click counter',
    'gaming',
    'competitive gaming',
  ],
  authors: [
    { name: 'Spacebar Clicker Team', url: 'https://spacebarclickers.com' },
  ],
  creator: 'Spacebar Clicker Team',
  publisher: 'Spacebar Clicker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spacebarclickers.com',
    siteName: 'Spacebar Clicker',
    title: 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Spacebar Clicker Game - Ultimate Clicking Challenge',
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Spacebar Clicker Game Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking.',
    images: ['/og-image.png'],
    creator: '@spacebarclicker',
    site: '@spacebarclicker',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'games',
  classification: 'Gaming',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  alternates: {
    canonical: 'https://spacebarclickers.com',
    languages: {
      'en-US': 'https://spacebarclickers.com',
      'x-default': 'https://spacebarclickers.com',
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Spacebar Clicker',
    'application-name': 'Spacebar Clicker',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0f172a',
    'msapplication-config': '/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <JsonLd />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  )
}
