import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Lifeline Navigator - Government Assistance Programs Nationwide',
  description = 'Find and apply for government assistance programs across all 50 states. Access healthcare, SNAP, housing, employment, education, and more. 270+ programs with personalized recommendations.',
  keywords = 'government assistance, SNAP benefits, Medicaid, housing assistance, food stamps, unemployment, healthcare, social services, welfare programs, federal benefits, state assistance',
  canonicalUrl = 'https://lifelinenavigator.com',
  ogImage = '/og-image.png',
  structuredData
}) => {
  const fullTitle = title.includes('Lifeline Navigator') ? title : `${title} | Lifeline Navigator`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Lifeline Navigator" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Lifeline Navigator" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-US" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Lifeline Navigator",
          "description": "Government assistance program finder covering all 50 states",
          "url": canonicalUrl,
          "logo": `${canonicalUrl}/logo.png`
        })}
      </script>

      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Lifeline Navigator",
          "url": canonicalUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${canonicalUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;