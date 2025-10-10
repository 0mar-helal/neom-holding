"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  useMenu,
  useSettingsAsObject,
  useKPIs,
  useBoard,
  contactService,
} from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Fetch shared data
  const {
    menu,
    isLoading: menuLoading,
    isError: menuError,
  } = useMenu(i18n.language);
  const {
    settings,
    isLoading: settingsLoading,
    isError: settingsError,
  } = useSettingsAsObject(i18n.language);
  const {
    kpis,
    isLoading: kpisLoading,
    isError: kpisError,
  } = useKPIs(i18n.language);
  const {
    board,
    isLoading: boardLoading,
    isError: boardError,
  } = useBoard(i18n.language);

  // Combined loading state
  const isLoading =
    menuLoading || settingsLoading || kpisLoading || boardLoading;
  const isError = menuError || settingsError || kpisError || boardError;

  // Fallback menu items
  const fallbackMenu = [
    { label: "About", href: "#about", sort: 1 },
    { label: "Strategy", href: "#strategy", sort: 2 },
    { label: "Chairman", href: "#chairman", sort: 3 },
    { label: "Board", href: "#board", sort: 4 },
    { label: "Sectors", href: "#sectors", sort: 5 },
    { label: "ESG", href: "#esg", sort: 6 },
    { label: "Contact", href: "#contact", sort: 7 },
  ];

  const menuItems = menu?.results || fallbackMenu;
  const sortedMenuItems = menuItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process KPIs data
  const kpisItems = kpis?.results || [];
  const sortedKpisItems = kpisItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process Board data
  const boardItems = board?.results || [];
  const sortedBoardItems = boardItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Scroll to section function
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  // Contact form submission function
  const submitContactForm = async (formData) => {
    setIsSubmittingContact(true);

    try {
      const response = await contactService.submit(formData, i18n.language);

      // Show success toast
      toast.success(t("sections.contact.toast.success"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: i18n.language === "ar",
      });

      return { success: true, data: response };
    } catch (error) {
      console.error("Contact form submission error:", error);

      // Show error toast
      toast.error(t("sections.contact.toast.error"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: i18n.language === "ar",
      });

      return { success: false, error: error.message };
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = sortedMenuItems.map((item) => item.href);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sortedMenuItems]);

  // Global loading component
  const GlobalLoading = () => (
    <div className="min-h-screen bg-[#0b1224] text-[#e7ecf4] flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-[#9fb1cc]">Loading application data...</p>
      </div>
    </div>
  );

  // Global error component
  const GlobalError = () => (
    <div className="min-h-screen bg-[#0b1224] text-[#e7ecf4] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <ErrorBoundary error={isError} />
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[#3abff8] text-[#0b1224] rounded-lg hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const value = {
    // Data
    menu: sortedMenuItems,
    settings,
    kpis: sortedKpisItems,
    board: sortedBoardItems,

    // Loading states
    isLoading,
    isError,

    // UI state
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    setActiveSection,

    // Contact form state
    isSubmittingContact,

    // Functions
    scrollToSection,
    submitContactForm,

    // Components
    GlobalLoading,
    GlobalError,
  };

  return (
    <AppContext.Provider value={value}>
      {isLoading ? <GlobalLoading /> : isError ? <GlobalError /> : children}
    </AppContext.Provider>
  );
};
