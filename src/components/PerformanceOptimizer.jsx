"use client";

import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts
      const fontPreloads = [
        "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
        "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap",
      ];

      fontPreloads.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "style";
        link.href = href;
        link.onload = () => {
          link.rel = "stylesheet";
        };
        document.head.appendChild(link);
      });

      // Preload critical images
      const criticalImages = ["/logo.png", "/og-image.jpg"];

      criticalImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Lazy load icons
      const iconScript = document.createElement("script");
      iconScript.src = "https://unpkg.com/react-icons@5.5.0/lib/index.js";
      iconScript.async = true;
      document.head.appendChild(iconScript);
    };

    // Optimize scroll performance
    const optimizeScroll = () => {
      let ticking = false;

      const updateScrollPosition = () => {
        // Add any scroll-based optimizations here
        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      };

      window.addEventListener("scroll", requestTick, { passive: true });

      return () => {
        window.removeEventListener("scroll", requestTick);
      };
    };

    // Initialize optimizations
    preloadCriticalResources();

    // Delay non-critical resources
    setTimeout(lazyLoadResources, 2000);

    // Setup scroll optimization
    const cleanupScroll = optimizeScroll();

    // Cleanup on unmount
    return () => {
      cleanupScroll();
    };
  }, []);

  // Add performance monitoring
  useEffect(() => {
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }
          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime);
          }
          if (entry.entryType === "layout-shift") {
            if (!entry.hadRecentInput) {
              console.log("CLS:", entry.value);
            }
          }
        }
      });

      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
      });

      return () => observer.disconnect();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
