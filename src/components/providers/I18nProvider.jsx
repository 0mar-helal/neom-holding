"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";


export const I18nProvider = ({ children }) => {
  useEffect(() => {
    // Ensure i18n is initialized
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
