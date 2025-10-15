"use client";

import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsAsObject } from "@/lib/api";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // Get settings data that's shared across the app
  const {
    settings,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useSettingsAsObject(i18n.language);

  const value = {
    // Shared data
    settings,

    // Loading states
    settingsLoading,

    // Error states
    settingsError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
