"use client";

import { useTranslation } from "react-i18next";
import { useAppContext } from "@/contexts/AppContext";

const StructuredData = () => {
  const { t, i18n } = useTranslation();
  const { settings, companies, board, kpis } = useAppContext();
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://neomholding.com/#organization",
    name: settings?.brand_name_en || t("site.companyName"),
    alternateName: settings?.brand_name_ar || "شركة نيوم القابضة",
    url: "https://neomholding.com",
    logo: {
      "@type": "ImageObject",
      url: "https://neomholding.com/logo.png",
      width: 200,
      height: 200,
    },
    description: t("site.description"),
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh Province",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings?.contact_phone || "+966-XX-XXX-XXXX",
      contactType: "customer service",
      email: settings?.contact_email || "info@neomholding.com",
    },
    sameAs: [
      "https://linkedin.com/company/neomholding",
      "https://twitter.com/neomholding",
    ],
    knowsAbout: [
      "Investment Management",
      "Corporate Governance",
      "ESG Standards",
      "Agriculture Investment",
      "Infrastructure Development",
      "Tourism Investment",
      "International Trade",
    ],
    areaServed: {
      "@type": "Country",
      name: "Syria",
    },
  };

  // Corporation Schema (if board data is available)
  const corporationSchema =
    board && board.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Corporation",
          "@id": "https://neomholding.com/#corporation",
          name: settings?.brand_name_en || t("site.companyName"),
          alternateName: settings?.brand_name_ar || "شركة نيوم القابضة",
          url: "https://neomholding.com",
          description: t("site.description"),
          foundingDate: "2020",
          address: {
            "@type": "PostalAddress",
            addressCountry: "SA",
            addressLocality: "Riyadh",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: settings?.contact_phone || "+966-XX-XXX-XXXX",
            contactType: "customer service",
            email: settings?.contact_email || "info@neomholding.com",
          },
          memberOf: {
            "@type": "Organization",
            name: "Saudi-Syrian Business Council",
          },
          knowsAbout: [
            "Investment Management",
            "Corporate Governance",
            "ESG Standards",
            "Syria Reconstruction",
            "Sustainable Development",
          ],
        }
      : null;

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://neomholding.com/#website",
    url: "https://neomholding.com",
    name: settings?.brand_name_en || t("site.companyName"),
    description: t("site.description"),
    publisher: {
      "@id": "https://neomholding.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://neomholding.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: currentLang,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://neomholding.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isRTL ? "من نحن" : "About",
        item: "https://neomholding.com/#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isRTL ? "الاستراتيجية" : "Strategy",
        item: "https://neomholding.com/#strategy",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: isRTL ? "القطاعات" : "Sectors",
        item: "https://neomholding.com/#sectors",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: isRTL ? "تواصل معنا" : "Contact",
        item: "https://neomholding.com/#contact",
      },
    ],
  };

  // FAQ Schema (if we have FAQ content)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isRTL ? "ما هي شركة نيوم القابضة؟" : "What is Neom Holding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: t("site.description"),
        },
      },
      {
        "@type": "Question",
        name: isRTL
          ? "ما هي قطاعات الاستثمار؟"
          : "What are the investment sectors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isRTL
            ? "نستثمر في الزراعة، الصناعة، البنية التحتية، السياحة، المقاولات، والتجارة الدولية"
            : "We invest in agriculture, industry, infrastructure, tourism, contracting, and international trade",
        },
      },
      {
        "@type": "Question",
        name: isRTL
          ? "ما هي معايير الحوكمة؟"
          : "What are the governance standards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isRTL
            ? "نتبع أعلى معايير الحوكمة والاستدامة البيئية والاجتماعية والحوكمة"
            : "We follow the highest standards of governance and ESG (Environmental, Social, and Governance) practices",
        },
      },
    ],
  };

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    corporationSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
  ].filter(Boolean);

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
};

export default StructuredData;
