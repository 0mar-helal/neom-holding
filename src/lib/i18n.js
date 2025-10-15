import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import neomEnJson from "../locales/en/neom.json";
import neomArJson from "../locales/ar/neom.json";

const resources = {
  en: {
    neom: neomEnJson,
  },
  ar: {
    neom: neomArJson,
  },
};

// Get language from localStorage or default to "ar"
const getStoredLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("neom-language") || "ar";
  }
  return "ar";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: "en",
  defaultNS: "neom",
  ns: ["neom"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
