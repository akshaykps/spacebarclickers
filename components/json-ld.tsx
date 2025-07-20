export function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Spacebar Clicker',
    alternateName: 'Ultimate Spacebar Clicking Game',
    url: 'https://spacebarclickers.com',
    description:
      'Test your clicking speed in the ultimate spacebar clicker game! Unlock 200+ achievements, compete on global leaderboards, and master the art of clicking.',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: 'Spacebar Clicker Team',
      url: 'https://spacebarclickers.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          'https://spacebarclickers.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const gameSchema = {
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

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Spacebar Clicker',
    url: 'https://spacebarclickers.com',
    logo: 'https://spacebarclickers.com/logo.png',
    description: 'Creators of the ultimate spacebar clicking game',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@spacebarclickers.com',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/spacebarclicker',
      'https://github.com/spacebarclicker',
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://spacebarclickers.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: 'https://spacebarclickers.com/frequently-asked-questions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Help Center',
        item: 'https://spacebarclickers.com/help',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Pro Tips',
        item: 'https://spacebarclickers.com/tips',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'About',
        item: 'https://spacebarclickers.com/about',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Contact',
        item: 'https://spacebarclickers.com/contact',
      },
      {
        '@type': 'ListItem',
        position: 7,
        name: 'Privacy Policy',
        item: 'https://spacebarclickers.com/privacy-policy',
      },
      {
        '@type': 'ListItem',
        position: 8,
        name: 'Terms of Service',
        item: 'https://spacebarclickers.com/terms-of-service',
      },
      {
        '@type': 'ListItem',
        position: 9,
        name: 'Cookie Policy',
        item: 'https://spacebarclickers.com/cookies',
      },
    ],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
