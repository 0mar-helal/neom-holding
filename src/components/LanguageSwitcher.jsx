"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "ar");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
    // Update dir attribute for RTL support
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
    // Force a re-render by updating the body class
    document.body.className = document.body.className.replace(/rtl|ltr/g, "");
    document.body.classList.add(langCode === "ar" ? "rtl" : "ltr");
  };

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    // Set body class for RTL support
    document.body.className = document.body.className.replace(/rtl|ltr/g, "");
    document.body.classList.add(currentLang === "ar" ? "rtl" : "ltr");
  }, [currentLang]);

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="border-1 border-[#1e2a44] px-1 text-[#e7ecf4] text-[12px] sm:text-sm rounded-xl  py-2 transition-all duration-200 cursor-pointer focus:outline-none"
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-[#0f172f] text-[#e7ecf4]"
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
