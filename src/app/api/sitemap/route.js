import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://neomholding.com";
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: "",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: "/about",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      url: "/strategy",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/chairman",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: "/board",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: "/sectors",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      url: "/governance",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      url: "/esg",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      url: "/investor-relations",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.6",
    },
    {
      url: "/news",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.7",
    },
    {
      url: "/blog",
      lastmod: currentDate,
      changefreq: "daily",
      priority: "0.7",
    },
    {
      url: "/contact",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/compliance",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      url: "/privacy",
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      url: "/terms",
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.3",
    },
    {
      url: "/supply",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  // Language variants
  const languageVariants = ["en", "ar"];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPages
  .map((page) => {
    return languageVariants
      .map((lang) => {
        const langUrl = lang === "en" ? page.url : `/${lang}${page.url}`;
        return `  <url>
    <loc>${baseUrl}${langUrl}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}" />
  </url>`;
      })
      .join("\n");
  })
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
