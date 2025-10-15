"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageInitializer() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set HTML attributes based on current language
    const updateHtmlAttributes = () => {
      const lang = i18n.language || "ar";
      const dir = lang === "ar" ? "rtl" : "ltr";

      document.documentElement.lang = lang;
      document.documentElement.dir = dir;

      // Update body class for RTL support
      document.body.className = document.body.className.replace(/rtl|ltr/g, "");
      document.body.classList.add(dir);
    };

    // Set initial attributes
    updateHtmlAttributes();

    // Listen for language changes
    i18n.on("languageChanged", updateHtmlAttributes);

    return () => {
      i18n.off("languageChanged", updateHtmlAttributes);
    };
  }, [i18n]);

  return null; // This component doesn't render anything
}
