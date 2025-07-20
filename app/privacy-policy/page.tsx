import type { Metadata } from 'next'
import PrivacyPolicyPage from './privacy-policy-page'

export const metadata: Metadata = {
  title: 'Privacy Policy - Spacebar Clicker Data Protection',
  description:
    'Read our privacy policy to understand how Spacebar Clicker collects, uses, and protects your personal data and game information. GDPR compliant data handling.',
  keywords: [
    'privacy policy',
    'data protection',
    'user privacy',
    'game data',
    'personal information',
    'cookies',
    'GDPR compliance',
    'data security',
    'user rights',
    'data collection',
    'privacy rights',
    'data usage',
  ],
  openGraph: {
    title: 'Privacy Policy - Spacebar Clicker Data Protection',
    description:
      'Read our privacy policy to understand how Spacebar Clicker collects, uses, and protects your personal data and game information.',
    url: 'https://spacebarclickers.com/privacy-policy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Spacebar Clicker Data Protection',
    description:
      'Read our privacy policy to understand how Spacebar Clicker collects, uses, and protects your personal data and game information.',
  },
  robots: {
    index: true,
    follow: false,
    noarchive: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/privacy-policy',
  },
}

// Add structured data for privacy policy
const privacyStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  description:
    'Spacebar Clicker privacy policy and data protection information',
  url: 'https://spacebarclickers.com/privacy-policy',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  publisher: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
  },
  mainEntity: {
    '@type': 'PrivacyPolicy',
    name: 'Spacebar Clicker Privacy Policy',
    description: 'How we collect, use, and protect your data',
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
          __html: JSON.stringify(privacyStructuredData),
        }}
      />
      <PrivacyPolicyPage />
    </>
  )
}
