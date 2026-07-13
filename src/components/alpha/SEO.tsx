import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: string;
  imageUrl?: string;
  schemaMarkup?: string;
  noindex?: boolean;
  keywords?: string;
  locale?: string;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  type = 'website',
  imageUrl,
  schemaMarkup,
  noindex = false,
  keywords,
  locale = 'en_US',
}: SEOProps) {
  const defaultImage = '/favicon.svg';
  const siteName = 'RezFix';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <meta name="googlebot" content="index, follow" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImage} />
      <meta name="twitter:site" content="@rezfix" />

      {schemaMarkup && (
        <script type="application/ld+json">{schemaMarkup}</script>
      )}
    </Helmet>
  );
}