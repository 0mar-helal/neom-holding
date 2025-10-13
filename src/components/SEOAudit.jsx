"use client";

import { useEffect, useState } from "react";

const SEOAudit = () => {
  const [auditResults, setAuditResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runSEOAudit = async () => {
    setIsLoading(true);

    try {
      // Check for basic SEO elements
      const results = {
        title: checkTitle(),
        metaDescription: checkMetaDescription(),
        headings: checkHeadings(),
        images: checkImages(),
        links: checkLinks(),
        performance: await checkPerformance(),
        accessibility: checkAccessibility(),
        mobile: checkMobile(),
        structuredData: checkStructuredData(),
      };

      setAuditResults(results);
    } catch (error) {
      console.error("SEO Audit failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkTitle = () => {
    const title = document.querySelector("title");
    const titleText = title?.textContent || "";

    return {
      exists: !!title,
      length: titleText.length,
      isValid: titleText.length >= 30 && titleText.length <= 60,
      text: titleText,
    };
  };

  const checkMetaDescription = () => {
    const meta = document.querySelector('meta[name="description"]');
    const content = meta?.getAttribute("content") || "";

    return {
      exists: !!meta,
      length: content.length,
      isValid: content.length >= 120 && content.length <= 160,
      content,
    };
  };

  const checkHeadings = () => {
    const h1 = document.querySelectorAll("h1");
    const h2 = document.querySelectorAll("h2");
    const h3 = document.querySelectorAll("h3");

    return {
      h1Count: h1.length,
      h2Count: h2.length,
      h3Count: h3.length,
      hasH1: h1.length > 0,
      isValid: h1.length === 1 && h1[0]?.textContent?.length > 0,
    };
  };

  const checkImages = () => {
    const images = document.querySelectorAll("img");
    const imagesWithAlt = Array.from(images).filter((img) => img.alt);

    return {
      total: images.length,
      withAlt: imagesWithAlt.length,
      withoutAlt: images.length - imagesWithAlt.length,
      isValid: images.length === 0 || imagesWithAlt.length === images.length,
    };
  };

  const checkLinks = () => {
    const links = document.querySelectorAll("a[href]");
    const internalLinks = Array.from(links).filter((link) =>
      link.href.startsWith(window.location.origin)
    );
    const externalLinks = Array.from(links).filter(
      (link) => !link.href.startsWith(window.location.origin)
    );

    return {
      total: links.length,
      internal: internalLinks.length,
      external: externalLinks.length,
      hasInternalLinks: internalLinks.length > 0,
    };
  };

  const checkPerformance = async () => {
    if (!("performance" in window)) return { available: false };

    const navigation = performance.getEntriesByType("navigation")[0];
    const paint = performance.getEntriesByType("paint");

    return {
      available: true,
      loadTime: navigation?.loadEventEnd - navigation?.loadEventStart,
      domContentLoaded:
        navigation?.domContentLoadedEventEnd -
        navigation?.domContentLoadedEventStart,
      firstPaint: paint.find((entry) => entry.name === "first-paint")
        ?.startTime,
      firstContentfulPaint: paint.find(
        (entry) => entry.name === "first-contentful-paint"
      )?.startTime,
    };
  };

  const checkAccessibility = () => {
    const hasLang = document.documentElement.hasAttribute("lang");
    const hasDir = document.documentElement.hasAttribute("dir");
    const images = document.querySelectorAll("img");
    const imagesWithAlt = Array.from(images).filter((img) => img.alt);

    return {
      hasLang,
      hasDir,
      imagesAccessible:
        images.length === 0 || imagesWithAlt.length === images.length,
    };
  };

  const checkMobile = () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    const hasViewport = !!viewport;
    const isResponsive = viewport
      ?.getAttribute("content")
      ?.includes("width=device-width");

    return {
      hasViewport,
      isResponsive,
      isValid: hasViewport && isResponsive,
    };
  };

  const checkStructuredData = () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    return {
      count: scripts.length,
      hasStructuredData: scripts.length > 0,
    };
  };

  useEffect(() => {
    // Auto-run audit on component mount
    runSEOAudit();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 bg-background-card border border-border rounded-lg p-4 shadow-lg z-50">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-foreground-secondary">
            Running SEO Audit...
          </span>
        </div>
      </div>
    );
  }

  if (!auditResults) return null;

  const overallScore = calculateOverallScore(auditResults);

  return (
    <div className="fixed bottom-4 right-4 bg-background-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-foreground">SEO Audit</h3>
        <button
          onClick={runSEOAudit}
          className="text-primary hover:text-primary-hover text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-secondary">Overall Score:</span>
          <span
            className={`font-bold ${
              overallScore >= 80
                ? "text-green-500"
                : overallScore >= 60
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {overallScore}/100
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-foreground-secondary">Title:</span>
            <span
              className={
                auditResults.title.isValid ? "text-green-500" : "text-red-500"
              }
            >
              {auditResults.title.isValid ? "✓" : "✗"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground-secondary">Meta Description:</span>
            <span
              className={
                auditResults.metaDescription.isValid
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {auditResults.metaDescription.isValid ? "✓" : "✗"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground-secondary">H1 Tag:</span>
            <span
              className={
                auditResults.headings.isValid
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {auditResults.headings.isValid ? "✓" : "✗"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground-secondary">Images Alt:</span>
            <span
              className={
                auditResults.images.isValid ? "text-green-500" : "text-red-500"
              }
            >
              {auditResults.images.isValid ? "✓" : "✗"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground-secondary">Mobile Ready:</span>
            <span
              className={
                auditResults.mobile.isValid ? "text-green-500" : "text-red-500"
              }
            >
              {auditResults.mobile.isValid ? "✓" : "✗"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateOverallScore = (results) => {
  let score = 0;
  let total = 0;

  // Title (20 points)
  total += 20;
  if (results.title.exists && results.title.isValid) score += 20;
  else if (results.title.exists) score += 10;

  // Meta Description (20 points)
  total += 20;
  if (results.metaDescription.exists && results.metaDescription.isValid)
    score += 20;
  else if (results.metaDescription.exists) score += 10;

  // Headings (15 points)
  total += 15;
  if (results.headings.isValid) score += 15;
  else if (results.headings.hasH1) score += 10;

  // Images (15 points)
  total += 15;
  if (results.images.isValid) score += 15;
  else if (results.images.total === 0) score += 15;
  else score += 5;

  // Mobile (15 points)
  total += 15;
  if (results.mobile.isValid) score += 15;
  else if (results.mobile.hasViewport) score += 10;

  // Accessibility (10 points)
  total += 10;
  if (results.accessibility.hasLang && results.accessibility.imagesAccessible)
    score += 10;
  else if (results.accessibility.hasLang) score += 5;

  // Structured Data (5 points)
  total += 5;
  if (results.structuredData.hasStructuredData) score += 5;

  return Math.round((score / total) * 100);
};

export default SEOAudit;
