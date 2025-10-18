"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("ar");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    // Save to localStorage
    localStorage.setItem("neom-language", langCode);
  };

  useEffect(() => {
    // Initialize from localStorage or i18n language
    const storedLang = localStorage.getItem("neom-language");
    const initialLang = storedLang || i18n.language || "ar";

    // Only change language if we have a stored language different from current
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }

    setCurrentLang(initialLang);
  }, []);

  // Listen for language changes from i18n
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLang(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="sr-only">
        {t("language.select") || "Select Language"}
      </label>
      <select
        id="language-select"
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="border-1 border-border px-1 text-foreground text-[12px] sm:text-sm rounded-lg  py-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label={t("language.select") || "Select Language"}
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-background-accent text-foreground"
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
