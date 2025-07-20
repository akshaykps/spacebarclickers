import type { Metadata } from 'next'
import TermsOfServicePage from './terms-of-service-page'

export const metadata: Metadata = {
  title: 'Terms of Service - Spacebar Clicker Legal Agreement',
  description:
    'Read the Terms of Service for Spacebar Clicker. Understand your rights and responsibilities when using our clicking game platform and services.',
  keywords: [
    'terms of service',
    'legal agreement',
    'user agreement',
    'terms and conditions',
    'spacebar clicker terms',
    'game rules',
    'user responsibilities',
    'service terms',
    'legal terms',
    'usage policy',
  ],
  openGraph: {
    title: 'Terms of Service - Spacebar Clicker Legal Agreement',
    description:
      'Read the Terms of Service for Spacebar Clicker. Understand your rights and responsibilities when using our game platform.',
    url: 'https://spacebarclickers.com/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service - Spacebar Clicker Legal Agreement',
    description:
      'Read the Terms of Service for Spacebar Clicker. Understand your rights and responsibilities when using our game platform.',
  },
  robots: {
    index: true,
    follow: false,
    noarchive: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/terms',
  },
}

const termsStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service',
  description: 'Spacebar Clicker terms of service and user agreement',
  url: 'https://spacebarclickers.com/terms',
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  publisher: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
  },
  mainEntity: {
    '@type': 'TermsOfService',
    name: 'Spacebar Clicker Terms of Service',
    description:
      'Legal agreement governing the use of Spacebar Clicker services',
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
          __html: JSON.stringify(termsStructuredData),
        }}
      />
      <TermsOfServicePage />
    </>
  )
}
