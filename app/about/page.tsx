import type { Metadata } from 'next'
import AboutPage from './about-page'

export const metadata: Metadata = {
  title: 'About Spacebar Clicker - The Ultimate Clicking Challenge',
  description:
    'Learn about Spacebar Clicker, the ultimate clicking speed test game. Discover our story, features, and what makes our game the best clicking challenge online. 20+ achievements, global leaderboards, and precision gaming.',
  keywords: [
    'about spacebar clicker',
    'clicking game story',
    'game features',
    'clicking challenge',
    'online game development',
    'browser game',
    'game statistics',
    'precision gaming',
    'achievements system',
    'global leaderboard',
    'auto-clickers',
    'game development',
    'clicking mechanics',
    'competitive gaming',
  ],
  openGraph: {
    title: 'About Spacebar Clicker - The Ultimate Clicking Challenge',
    description:
      'Learn about Spacebar Clicker, the ultimate clicking speed test game. Discover our story, features, and what makes our game the best clicking challenge online.',
    url: 'https://spacebarclickers.com/about',
    type: 'website',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About Spacebar Clicker - Game Features and Story',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Spacebar Clicker - The Ultimate Clicking Challenge',
    description:
      'Learn about Spacebar Clicker, the ultimate clicking speed test game. Discover our story, features, and what makes our game the best clicking challenge online.',
    images: ['/og-about.png'],
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/about',
  },
}

// Add structured data for the About page
const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Spacebar Clicker',
  description: 'Learn about the ultimate clicking speed test game',
  url: 'https://spacebarclickers.com/about',
  mainEntity: {
    '@type': 'Game',
    name: 'Spacebar Clicker',
    description:
      'Ultimate clicking speed test game with achievements and global leaderboards',
    featureList: [
      '20+ Achievements with unique rewards',
      'Global leaderboard competition',
      'Precision gaming mechanics',
      'Auto-clicker upgrades',
      'Real-time multiplayer',
      'Cross-platform compatibility',
    ],
    applicationCategory: 'Game',
    operatingSystem: [
      'Web Browser',
      'Windows',
      'macOS',
      'Linux',
      'iOS',
      'Android',
    ],
  },
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutStructuredData),
        }}
      />
      <AboutPage />
    </>
  )
}
