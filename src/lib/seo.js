/**
 * SEO utility functions for better search engine optimization
 */

import { BASE_URL } from "@/lib/constants";

// Generate meta description with optimal length
export const generateMetaDescription = (text, maxLength = 160) => {
  if (!text) return "";

  const cleanText = text.replace(/<[^>]*>/g, "").trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // Find the last complete word within the limit
  const truncated = cleanText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + "..."
    : truncated + "...";
};

// Generate keywords from content
export const generateKeywords = (content, additionalKeywords = []) => {
  const defaultKeywords = [
    "Neom Holding",
    "Saudi-Syrian investment",
    "Syria reconstruction",
    "holding company",
    "investment management",
    "corporate governance",
    "ESG standards",
    "sustainable investment",
  ];

  if (!content) return [...defaultKeywords, ...additionalKeywords];

  // Extract keywords from content (simple implementation)
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter(
      (word) =>
        ![
          "this",
          "that",
          "with",
          "from",
          "they",
          "have",
          "been",
          "were",
          "said",
          "each",
          "which",
          "their",
          "time",
          "will",
          "about",
          "there",
          "could",
          "other",
          "after",
          "first",
          "well",
          "also",
          "where",
          "much",
          "some",
          "very",
          "when",
          "here",
          "just",
          "into",
          "over",
          "think",
          "more",
          "your",
          "work",
          "know",
          "than",
          "then",
          "them",
          "these",
          "so",
          "its",
          "now",
          "find",
          "any",
          "new",
          "way",
          "may",
          "say",
          "use",
          "man",
          "day",
          "get",
          "come",
          "made",
          "part",
        ].includes(word)
    );

  // Count word frequency
  const wordCount = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Get top keywords
  const topKeywords = Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);

  return [...defaultKeywords, ...topKeywords, ...additionalKeywords];
};

// Generate Open Graph data
export const generateOpenGraphData = (pageData) => {
  const baseUrl = BASE_URL;

  return {
    title: pageData.title || "Neom Holding | شركة نيوم القابضة",
    description:
      pageData.description ||
      "A world-class Saudi-Syrian holding company investing in Syria's future",
    url: `${baseUrl}${pageData.url || ""}`,
    image: pageData.image || `${baseUrl}/og-image.jpg`,
    type: pageData.type || "website",
    siteName: "Neom Holding",
    locale: pageData.locale || "en_US",
    alternateLocale: "ar_SA",
  };
};

// Generate structured data for different content types
export const generateStructuredData = (type, data) => {
  const baseUrl = BASE_URL;

  switch (type) {
    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: data.name || "Neom Holding",
        alternateName: data.alternateName || "شركة نيوم القابضة",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: data.description,
        address: {
          "@type": "PostalAddress",
          addressCountry: "SA",
          addressLocality: "Riyadh",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: data.phone,
          email: data.email,
          contactType: "customer service",
        },
      };

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        author: {
          "@type": "Organization",
          name: "Neom Holding",
        },
        publisher: {
          "@type": "Organization",
          name: "Neom Holding",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
        datePublished: data.publishedDate,
        dateModified: data.modifiedDate || data.publishedDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}${data.url}`,
        },
      };

    case "breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      };

    default:
      return null;
  }
};

// Validate SEO data
export const validateSEOData = (data) => {
  const errors = [];

  if (!data.title || data.title.length < 30) {
    errors.push("Title should be at least 30 characters long");
  }

  if (data.title && data.title.length > 60) {
    errors.push("Title should be less than 60 characters for optimal display");
  }

  if (!data.description || data.description.length < 120) {
    errors.push("Description should be at least 120 characters long");
  }

  if (data.description && data.description.length > 160) {
    errors.push(
      "Description should be less than 160 characters for optimal display"
    );
  }

  if (!data.keywords || data.keywords.length < 5) {
    errors.push("Should have at least 5 keywords");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Generate canonical URL
export const generateCanonicalUrl = (path, baseUrl = BASE_URL) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Generate hreflang tags for internationalization
export const generateHreflangTags = (path, baseUrl = BASE_URL) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return [
    { hreflang: "en", href: `${baseUrl}${cleanPath}` },
    { hreflang: "ar", href: `${baseUrl}/ar${cleanPath}` },
    { hreflang: "x-default", href: `${baseUrl}${cleanPath}` },
  ];
};
