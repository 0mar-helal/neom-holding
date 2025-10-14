"use client";

import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images
      const criticalImages = ["/logo.png"];

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
      // Only load if needed (icons are already bundled)
      if (document.querySelector("[data-react-icons]")) {
        // Icons are already available through bundling
        return;
      }
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
  // useEffect(() => {
  //   if (typeof window !== "undefined" && "performance" in window) {
  //     // Monitor Core Web Vitals
  //     const observer = new PerformanceObserver((list) => {
  //       for (const entry of list.getEntries()) {
  //         if (entry.entryType === "largest-contentful-paint") {
  //           console.log("LCP:", entry.startTime);
  //         }
  //         if (entry.entryType === "first-input") {
  //           console.log("FID:", entry.processingStart - entry.startTime);
  //         }
  //         if (entry.entryType === "layout-shift") {
  //           if (!entry.hadRecentInput) {
  //             console.log("CLS:", entry.value);
  //           }
  //         }
  //       }
  //     });

  //     observer.observe({
  //       entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"],
  //     });

  //     return () => observer.disconnect();
  //   }
  // }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
