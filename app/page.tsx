import type { Metadata } from 'next'
import SpacebarClickerGame from './game-page'

export const metadata: Metadata = {
  title: 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
  description:
    'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking. Free online browser game.',
  keywords: [
    'spacebar clicker',
    'clicking game',
    'speed test',
    'online game',
    'browser game',
    'achievements',
    'leaderboard',
    'multiplayer',
    'free game',
    'clicking speed',
    'spacebar game',
    'reaction time',
    'finger speed',
    'clicking challenge',
    'auto clicker',
    'click counter',
    'gaming',
    'competitive gaming',
    'skill game',
    'arcade game',
  ],
  openGraph: {
    title: 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking.',
    url: 'https://spacebarclickers.com',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Spacebar Clicker Game - Ultimate Clicking Challenge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://spacebarclickers.com',
  },
  other: {
    'game-category': 'Arcade',
    'game-genre': 'Skill',
    'game-platform': 'Web Browser',
    'game-rating': 'Everyone',
  },
}

// Add JSON-LD structured data for the game
const gameStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Game',
  name: 'Spacebar Clicker',
  description:
    'Ultimate clicking speed test game with achievements and global leaderboards',
  url: 'https://spacebarclickers.com',
  image: 'https://spacebarclickers.com/og-image.png',
  genre: ['Casual', 'Arcade', 'Skill'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
  applicationCategory: 'Game',
  isAccessibleForFree: true,
  inLanguage: 'en-US',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: {
    '@type': 'Organization',
    name: 'Spacebar Clicker Team',
    url: 'https://spacebarclickers.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://spacebarclickers.com/logo.png',
      width: 512,
      height: 512,
    },
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  gameItem: [
    {
      '@type': 'Thing',
      name: 'Achievements',
      description: '20+ unlockable achievements with unique rewards',
    },
    {
      '@type': 'Thing',
      name: 'Leaderboards',
      description: 'Global competitive rankings',
    },
    {
      '@type': 'Thing',
      name: 'Auto-Clickers',
      description: 'Automated clicking upgrades',
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gameStructuredData),
        }}
      />
      <SpacebarClickerGame />
    </>
  )
}
