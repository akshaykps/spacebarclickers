import type { Metadata } from 'next'
import FAQPage from './faq-page'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Spacebar Clicker',
  description:
    'Find quick answers to the most frequently asked questions about Spacebar Clicker. Learn about gameplay, achievements, leaderboards, and technical support.',
  keywords: [
    'FAQ',
    'frequently asked questions',
    'spacebar clicker questions',
    'game help',
    'common questions',
    'gameplay questions',
    'achievement help',
    'leaderboard questions',
    'technical support',
    'game guide',
  ],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Spacebar Clicker',
    description:
      'Find quick answers to the most frequently asked questions about Spacebar Clicker gameplay, achievements, and features.',
    url: 'https://spacebarclickers.com/faq',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ - Frequently Asked Questions | Spacebar Clicker',
    description:
      'Find quick answers to the most frequently asked questions about Spacebar Clicker gameplay, achievements, and features.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/faq',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'Spacebar Clicker FAQ',
  description: 'Frequently asked questions about Spacebar Clicker game',
  url: 'https://spacebarclickers.com/faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I play Spacebar Clicker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply press your spacebar or click anywhere on the game area to start accumulating clicks. Your goal is to achieve the highest score possible while unlocking achievements and competing on global leaderboards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Spacebar Clicker free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Spacebar Clicker is completely free to play with no hidden costs, subscriptions, or pay-to-win mechanics.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <FAQPage />
    </>
  )
}
