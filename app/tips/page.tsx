import type { Metadata } from 'next'
import ProTipsPage from './pro-tips-page'

export const metadata: Metadata = {
  title: 'Pro Tips - Master Spacebar Clicker Like a Champion',
  description:
    'Discover advanced strategies, expert techniques, and pro tips to dominate Spacebar Clicker. Learn from top players and maximize your clicking potential with our comprehensive guide.',
  keywords: [
    'spacebar clicker tips',
    'pro tips',
    'advanced strategies',
    'clicking techniques',
    'expert guide',
    'high score tips',
    'achievement strategies',
    'CPS improvement',
    'clicking mastery',
    'game optimization',
    'competitive clicking',
    'leaderboard strategies',
  ],
  openGraph: {
    title: 'Pro Tips - Master Spacebar Clicker Like a Champion',
    description:
      'Discover advanced strategies and expert techniques to dominate Spacebar Clicker. Learn from top players worldwide.',
    url: 'https://spacebarclickers.com/tips',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pro Tips - Master Spacebar Clicker Like a Champion',
    description:
      'Discover advanced strategies and expert techniques to dominate Spacebar Clicker. Learn from top players worldwide.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/tips',
  },
}

const tipsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Pro Tips for Spacebar Clicker',
  description:
    'Advanced strategies and expert techniques for mastering Spacebar Clicker',
  url: 'https://spacebarclickers.com/tips',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  publisher: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
  },
  mainEntity: {
    '@type': 'HowTo',
    name: 'How to Master Spacebar Clicker',
    description:
      'Complete guide to advanced clicking techniques and strategies',
    totalTime: 'PT30M',
    supply: ['Computer or mobile device', 'Internet connection'],
    tool: ['Web browser', 'Spacebar or touchscreen'],
  },
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(tipsStructuredData),
        }}
      />
      <ProTipsPage />
    </>
  )
}
