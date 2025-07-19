import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spacebar Clicker Game - Ultimate Clicking Challenge',
  description:
    'Test your clicking speed in the ultimate spacebar clicker game! Unlock achievements, compete on global leaderboards, and become the clicking champion.',
  keywords:
    'spacebar clicker, clicking game, online game, achievements, leaderboard, speed test',
  authors: [{ name: 'Spacebar Clicker Team' }],
  openGraph: {
    title: 'Spacebar Clicker Game - Ultimate Clicking Challenge',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock achievements, compete on global leaderboards, and become the clicking champion.',
    type: 'website',
    url: 'https://spacebar-clicker.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Spacebar Clicker Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spacebar Clicker Game - Ultimate Clicking Challenge',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock achievements, compete on global leaderboards, and become the clicking champion.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
