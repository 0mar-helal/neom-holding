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

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  fallbackLng: "en",
  defaultNS: "neom",
  ns: ["neom"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
