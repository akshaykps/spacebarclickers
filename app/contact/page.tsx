import type { Metadata } from 'next'
import ContactPage from './contact-page'

export const metadata: Metadata = {
  title: 'Contact Us - Spacebar Clicker Support & Feedback',
  description:
    'Get in touch with the Spacebar Clicker team. Contact us for support, feedback, bug reports, or general inquiries about our clicking game. We respond within 24 hours.',
  keywords: [
    'contact spacebar clicker',
    'game support',
    'customer service',
    'feedback',
    'bug report',
    'help',
    'contact form',
    'technical support',
    'game assistance',
    'user support',
    'email support',
    'game questions',
  ],
  openGraph: {
    title: 'Contact Us - Spacebar Clicker Support & Feedback',
    description:
      'Get in touch with the Spacebar Clicker team. Contact us for support, feedback, bug reports, or general inquiries about our clicking game.',
    url: 'https://spacebarclickers.com/contact',
    type: 'website',
    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Spacebar Clicker Support Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Spacebar Clicker Support & Feedback',
    description:
      'Get in touch with the Spacebar Clicker team. Contact us for support, feedback, bug reports, or general inquiries about our clicking game.',
    images: ['/og-contact.png'],
  },
  alternates: {
    canonical: 'https://spacebarclickers.com/contact',
  },
}

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Spacebar Clicker',
  description: 'Get in touch with the Spacebar Clicker support team',
  url: 'https://spacebarclickers.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'hello@spacebarclickers.com',
        contactType: 'General Inquiries',
        availableLanguage: 'English',
        areaServed: 'Worldwide',
      },
      {
        '@type': 'ContactPoint',
        email: 'support@spacebarclickers.com',
        contactType: 'Technical Support',
        availableLanguage: 'English',
        areaServed: 'Worldwide',
      },
    ],
  },
}

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <ContactPage />
    </>
  )
}
