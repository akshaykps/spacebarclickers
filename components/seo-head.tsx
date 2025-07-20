import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
  structuredData?: object
}

export function SEOHead({
  title = 'Spacebar Clicker - Ultimate Clicking Speed Test Game',
  description = 'Test your clicking speed in the ultimate spacebar clicker game! Unlock 20+ achievements, compete on global leaderboards, and master the art of clicking.',
  keywords = [],
  ogImage = '/og-image.png',
  canonicalUrl,
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const fullTitle = title.includes('Spacebar Clicker')
    ? title
    : `${title} | Spacebar Clicker`
  const keywordString =
    keywords.length > 0
      ? keywords.join(', ')
      : 'spacebar clicker, clicking game, speed test, online game, achievements, leaderboard'

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywordString} />

      {/* Robots */}
      {noIndex && <meta name='robots' content='noindex, nofollow' />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel='canonical' href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta
        property='og:image'
        content={`https://spacebarclickers.com${ogImage}`}
      />
      <meta property='og:type' content='website' />
      {canonicalUrl && <meta property='og:url' content={canonicalUrl} />}

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta
        name='twitter:image'
        content={`https://spacebarclickers.com${ogImage}`}
      />

      {/* Structured Data */}
      {structuredData && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}
