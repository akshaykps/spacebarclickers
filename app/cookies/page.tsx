import type { Metadata } from 'next'
import CookiePolicyPage from './cookie-policy-page'

export const metadata: Metadata = {
  title: 'Cookie Policy - How Spacebar Clicker Uses Cookies',
  description:
    'Learn about how Spacebar Clicker uses cookies and similar technologies to enhance your gaming experience. Understand your cookie preferences and privacy options.',
  keywords: [
    'cookie policy',
    'cookies',
    'web cookies',
    'browser storage',
    'privacy settings',
    'data storage',
    'local storage',
    'session storage',
    'tracking cookies',
    'analytics cookies',
    'game data storage',
  ],
  openGraph: {
    title: 'Cookie Policy - How Spacebar Clicker Uses Cookies',
    description:
      'Learn about how Spacebar Clicker uses cookies and similar technologies to enhance your gaming experience and protect your privacy.',
    url: 'https://spacebarclickers.com/cookies',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy - How Spacebar Clicker Uses Cookies',
    description:
      'Learn about how Spacebar Clicker uses cookies and similar technologies to enhance your gaming experience and protect your privacy.',
  },
  robots: {
    index: true,
    follow: false,
    noarchive: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/cookies',
  },
}

const cookieStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Cookie Policy',
  description: 'Spacebar Clicker cookie policy and data storage information',
  url: 'https://spacebarclickers.com/cookies',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  publisher: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
  },
  mainEntity: {
    '@type': 'PrivacyPolicy',
    name: 'Spacebar Clicker Cookie Policy',
    description: 'How we use cookies and similar technologies',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  },
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cookieStructuredData),
        }}
      />
      <CookiePolicyPage />
    </>
  )
}
