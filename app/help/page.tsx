import type { Metadata } from 'next'
import HelpCenterPage from './help-center-page'

export const metadata: Metadata = {
  title: 'Help Center - Spacebar Clicker Support & Guides',
  description:
    'Get help with Spacebar Clicker! Find answers to common questions, troubleshooting guides, gameplay tips, and technical support for the ultimate clicking game.',
  keywords: [
    'help center',
    'spacebar clicker help',
    'game support',
    'troubleshooting',
    'gameplay guide',
    'technical support',
    'user manual',
    'game instructions',
    'clicking game help',
    'browser game support',
    'achievement guide',
    'leaderboard help',
  ],
  openGraph: {
    title: 'Help Center - Spacebar Clicker Support & Guides',
    description:
      'Get help with Spacebar Clicker! Find answers to common questions, troubleshooting guides, and gameplay tips.',
    url: 'https://spacebarclickers.com/help',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Help Center - Spacebar Clicker Support & Guides',
    description:
      'Get help with Spacebar Clicker! Find answers to common questions, troubleshooting guides, and gameplay tips.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/help',
  },
}

const helpStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Help Center',
  description: 'Spacebar Clicker help center and support guides',
  url: 'https://spacebarclickers.com/help',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  publisher: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
  },
  mainEntity: {
    '@type': 'HelpPage',
    name: 'Spacebar Clicker Help Center',
    description: 'Comprehensive support and guides for Spacebar Clicker game',
  },
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(helpStructuredData),
        }}
      />
      <HelpCenterPage />
    </>
  )
}
