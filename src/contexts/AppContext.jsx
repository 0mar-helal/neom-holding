"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import {
  useMenu,
  useSettingsAsObject,
  useHero,
  useAbout,
  useStrategyBlocks,
  useCompanies,
  useBoard,
  useSpeeches,
  useGov,
  useESG,
  useNews,
  usePosts,
  usePages,
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
    hero,
    isLoading: heroLoading,
    isError: heroError,
  } = useHero(i18n.language);
  const {
    about,
    isLoading: aboutLoading,
    isError: aboutError,
  } = useAbout(i18n.language);
  const {
    strategyBlocks,
    isLoading: strategyBlocksLoading,
    isError: strategyBlocksError,
  } = useStrategyBlocks(i18n.language);
  const {
    companies,
    isLoading: companiesLoading,
    isError: companiesError,
  } = useCompanies(i18n.language);
  const {
    board,
    isLoading: boardLoading,
    isError: boardError,
  } = useBoard(i18n.language);
  const {
    speeches,
    isLoading: speechesLoading,
    isError: speechesError,
  } = useSpeeches(i18n.language);
  const {
    gov,
    isLoading: govLoading,
    isError: govError,
  } = useGov(i18n.language);
  const {
    esg,
    isLoading: esgLoading,
    isError: esgError,
  } = useESG(i18n.language);
  const {
    news,
    isLoading: newsLoading,
    isError: newsError,
  } = useNews(i18n.language);
  const {
    posts,
    isLoading: postsLoading,
    isError: postsError,
  } = usePosts(i18n.language);
  const {
    pages,
    isLoading: pagesLoading,
    isError: pagesError,
  } = usePages(i18n.language);

  // Combined loading state
  const isLoading =
    menuLoading ||
    settingsLoading ||
    heroLoading ||
    aboutLoading ||
    strategyBlocksLoading ||
    companiesLoading ||
    boardLoading ||
    speechesLoading ||
    govLoading ||
    esgLoading ||
    newsLoading ||
    postsLoading ||
    pagesLoading;
  const isError =
    menuError ||
    settingsError ||
    heroError ||
    aboutError ||
    strategyBlocksError ||
    companiesError ||
    boardError ||
    speechesError ||
    govError ||
    esgError ||
    newsError ||
    postsError ||
    pagesError;

  // Fallback menu items
  const fallbackMenu = [
    { label: "About", href: "#about", sort: 1 },
    { label: "Strategy", href: "#strategy", sort: 2 },
    { label: "Chairman", href: "#chairman", sort: 3 },
    { label: "Board", href: "#board", sort: 4 },
    { label: "Sectors", href: "#sectors", sort: 5 },
    { label: "ESG", href: "#esg", sort: 6 },
    { label: "Investor Relations", href: "#investor-relations", sort: 7 },
    { label: "Contact", href: "#contact", sort: 8 },
  ];

  // Get menu items from API or fallback
  const apiMenuItems = Array.isArray(menu) ? menu : menu?.results || [];

  // Always include Investor Relations item from frontend
  const investorRelationsItem = {
    label: "Investor Relations",
    href: "#investor-relations",
    sort: 7,
  };

  // Check if investor-relations already exists in API menu
  const hasInvestorRelations = apiMenuItems.some(
    (item) =>
      item.href === "#investor-relations" || item.href === "investor-relations"
  );

  // Combine API menu with frontend items
  const menuItems = hasInvestorRelations
    ? apiMenuItems
    : [...apiMenuItems, investorRelationsItem];

  // Use fallback if no API menu items
  const finalMenuItems = menuItems.length > 0 ? menuItems : fallbackMenu;

  const sortedMenuItems = finalMenuItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process Hero data (including KPIs)
  const heroData = hero?.[0] || null;
  const kpisItems = heroData?.kpis || [];
  const sortedKpisItems = kpisItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process About data
  const aboutData = about?.[0] || null;

  // Process Strategy Blocks data
  const strategyBlocksItems = Array.isArray(strategyBlocks)
    ? strategyBlocks
    : strategyBlocks?.results || [];
  const sortedStrategyBlocksItems = strategyBlocksItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process Companies data
  const companiesItems = Array.isArray(companies)
    ? companies
    : companies?.results || [];
  const sortedCompaniesItems = companiesItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process Board data
  const boardItems = Array.isArray(board) ? board : board?.results || [];
  const sortedBoardItems = boardItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Process Speeches data
  const speechesItems = Array.isArray(speeches)
    ? speeches
    : speeches?.results || [];
  const sortedSpeechesItems = speechesItems.sort(
    (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
  );

  // Process Governance data
  const govItems = Array.isArray(gov) ? gov : gov?.results || [];
  const sortedGovItems = govItems.sort((a, b) => (a.sort || 0) - (b.sort || 0));

  // Process ESG data
  const esgItems = Array.isArray(esg) ? esg : esg?.results || [];
  const sortedEsgItems = esgItems.sort(
    (a, b) => (a.pillar || 0) - (b.pillar || 0) || (a.sort || 0) - (b.sort || 0)
  );

  // Process News data
  const newsItems = Array.isArray(news) ? news : news?.results || [];
  const sortedNewsItems = newsItems.sort(
    (a, b) => new Date(b.date_published || 0) - new Date(a.date_published || 0)
  );

  // Process Posts data
  const postsItems = Array.isArray(posts) ? posts : posts?.results || [];
  const sortedPostsItems = postsItems.sort(
    (a, b) => new Date(b.date_published || 0) - new Date(a.date_published || 0)
  );

  // Process Pages data
  const pagesItems = Array.isArray(pages) ? pages : pages?.results || [];
  const sortedPagesItems = pagesItems.sort(
    (a, b) => (a.sort || 0) - (b.sort || 0)
  );

  // Scroll to section function
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 90;

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

  // Use imported components to prevent re-renders

  const value = {
    // Data
    menu: sortedMenuItems,
    settings,
    hero: heroData,
    about: aboutData,
    strategyBlocks: sortedStrategyBlocksItems,
    companies: sortedCompaniesItems,
    kpis: sortedKpisItems,
    board: sortedBoardItems,
    speeches: sortedSpeechesItems,
    gov: sortedGovItems,
    esg: sortedEsgItems,
    news: sortedNewsItems,
    posts: sortedPostsItems,
    pages: sortedPagesItems,

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
      {isLoading ? (
        <GlobalLoading />
      ) : isError ? (
        <GlobalError error={isError} />
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};
