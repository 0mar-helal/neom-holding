"use client";

import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn fixed z-50 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none group backdrop-blur-sm flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
