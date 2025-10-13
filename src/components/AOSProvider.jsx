"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSProvider = ({ children }) => {
  useEffect(() => {
    // Initialize AOS with custom configuration
    AOS.init({
      // Global settings
      duration: 800,
      easing: "ease-in-out-cubic",
      //   once: true,
      mirror: false,
      anchorPlacement: "top-bottom",

      // Custom settings for better performance
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // Offset and delay
      offset: 120,
      delay: 0,

      // Custom animations
      customEasing: {
        "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
        "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    });

    // Refresh AOS on language change
    const handleLanguageChange = () => {
      AOS.refresh();
    };

    // Listen for language changes
    window.addEventListener("languageChanged", handleLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      AOS.refresh();
    };
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
