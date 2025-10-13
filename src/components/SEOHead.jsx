"use client";

import { useTranslation } from "react-i18next";
import Head from "next/head";

const SEOHead = ({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  url,
  type = "website",
  structuredData,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";

  const fullTitle = title
    ? `${title} | Neom Holding`
    : "Neom Holding | شركة نيوم القابضة";
  const fullDescription =
    description ||
    "A world-class Saudi-Syrian holding company investing in Syria's future through agriculture, industry, infrastructure, tourism, contracting, and international trade with robust governance and ESG standards.";
  const fullUrl = url
    ? `https://neomholding.com${url}`
    : "https://neomholding.com";

  const defaultKeywords = [
    "Neom Holding",
    "Saudi-Syrian investment",
    "Syria reconstruction",
    "holding company",
    "agriculture investment",
    "infrastructure development",
    "tourism investment",
    "ESG standards",
    "corporate governance",
    "sustainable investment",
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Neom Holding" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={currentLang} />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Neom Holding" />
      <meta property="og:image" content={`https://neomholding.com${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content={isRTL ? "ar_SA" : "en_US"} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`https://neomholding.com${image}`} />
      <meta name="twitter:creator" content="@neomholding" />
      <meta name="twitter:site" content="@neomholding" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#8141e8" />
      <meta name="msapplication-TileColor" content="#8141e8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href="https://neomholding.com/en" />
      <link rel="alternate" hrefLang="ar" href="https://neomholding.com/ar" />
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://neomholding.com"
      />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
};

export default SEOHead;
