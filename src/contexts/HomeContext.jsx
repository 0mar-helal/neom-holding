"use client";

import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import {
  useMenu,
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
import { useAppContext } from "./AppContext";

const HomeContext = createContext();

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

export const HomeProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { settings } = useAppContext();
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Home page specific API calls
  const {
    menu,
    isLoading: menuLoading,
    isError: menuError,
  } = useMenu(i18n.language);
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

  // Combined loading state for home page
  const isLoading =
    menuLoading ||
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

  // Combined error state for home page
  const isError =
    menuError ||
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

  // Process posts data
  const postsItems = Array.isArray(posts) ? posts : posts?.results || [];
  const sortedPostsItems = postsItems.sort(
    (a, b) => new Date(b.date_published) - new Date(a.date_published)
  );

  // Process news data
  const newsItems = Array.isArray(news) ? news : news?.results || [];
  const sortedNewsItems = newsItems.sort(
    (a, b) => new Date(b.date_published) - new Date(a.date_published)
  );

  // Process board data
  const boardItems = Array.isArray(board) ? board : board?.results || [];
  const sortedBoardItems = boardItems.sort((a, b) => a.order - b.order);

  // Process speeches data
  const speechesItems = Array.isArray(speeches)
    ? speeches
    : speeches?.results || [];
  const sortedSpeechesItems = speechesItems.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Process pages data
  const pagesItems = Array.isArray(pages) ? pages : pages?.results || [];

  // Contact form submission
  const submitContactForm = async (formData) => {
    setIsSubmittingContact(true);
    try {
      const response = await contactService.submit(formData);
      if (response.success) {
        toast.success(
          i18n.language === "ar"
            ? "تم إرسال رسالتك بنجاح!"
            : "Your message has been sent successfully!"
        );
        return { success: true };
      } else {
        throw new Error(response.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        i18n.language === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
          : "An error occurred while sending your message. Please try again."
      );
      return { success: false, error: error.message };
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Search function
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // This would be replaced with actual search API call
      // For now, we'll simulate a search
      const mockResults = [];
      setSearchResults(mockResults);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close search
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Show loading screen for home page data
  if (isLoading) {
    return <GlobalLoading />;
  }

  // Show error screen for home page data errors
  if (isError) {
    return <GlobalError />;
  }

  // Scroll to section function
  const scrollToSection = (href) => {
    if (!href || href.trim() === "") {
      setIsMenuOpen(false);
      return;
    }

    // Add a small delay to ensure elements are rendered
    setTimeout(() => {
      const element = document.querySelector(href);

      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 90;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        // Try again after a longer delay for elements that might load later
        setTimeout(() => {
          const retryElement = document.querySelector(href);
          if (retryElement) {
            const elementPosition = retryElement.offsetTop;
            const offsetPosition = retryElement.offsetTop - 90;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          } else {
            // Final attempt - scroll to bottom if element still not found
            console.warn(`Element ${href} not found, scrolling to bottom`);
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 500);
      }
    }, 100);

    setIsMenuOpen(false);
  };

  const value = {
    // Global state
    isMenuOpen,
    isSearchOpen,
    searchQuery,
    searchResults,
    isSearching,

    // Data
    settings,
    menu,
    hero: hero[0],
    about: about[0],
    strategyBlocks,
    companies,
    board: sortedBoardItems,
    speeches: sortedSpeechesItems,
    gov,
    esg,
    news: sortedNewsItems,
    posts: sortedPostsItems,
    pages: pagesItems,

    // Loading states
    isLoading,
    isSubmittingContact,

    // Error states
    isError,

    // Functions
    toggleMenu,
    toggleSearch,
    closeMenu,
    closeSearch,
    handleSearchChange,
    scrollToSection,
    submitContactForm,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
