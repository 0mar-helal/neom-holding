import React from "react";
import { useTranslation } from "react-i18next";
import { useHomeContext } from "@/contexts/HomeContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";
import {
  FaBuilding,
  FaNewspaper,
  FaGavel,
  FaPhone,
  FaChevronDown,
} from "react-icons/fa";
import "@/styles/dropdown-animations.css";

const DynamicNavigation = () => {
  const { t } = useTranslation();
  const { menu, isLoading, isError, scrollToSection } = useHomeContext();

  if (isLoading) {
    return (
      <nav className="hidden lg:flex items-center space-x-8">
        <LoadingSpinner size="sm" />
      </nav>
    );
  }

  if (isError) {
    return (
      <nav className="hidden lg:flex items-center space-x-8">
        <ErrorBoundary error={isError} />
      </nav>
    );
  }

  // Separate main items and groups from the backend menu
  const mainItems = menu.filter(
    (item) => item.type === "item" && item.children.length === 0
  );
  const groups = menu.filter((item) => item.type === "group");

  const dropdownGroups = groups.map((group) => {
    // Map group labels to icons (both Arabic and English)
    const iconMap = {
      // English keys
      governance: FaBuilding,
      content: FaNewspaper,
      legal: FaGavel,
      // Arabic keys
      الحوكمة: FaBuilding,
      المحتوى: FaNewspaper,
      القانونية: FaGavel,
      // Additional variations
      governance: FaBuilding,
      content: FaNewspaper,
      legal: FaGavel,
      "الحوكمة-والاستدامة-وعلاقات-المستثمرين": FaBuilding,
      "الأخبار-والمدونة": FaNewspaper,
      "الشروط-والأحكام": FaGavel,
    };

    // Get the icon based on the group label
    const getIcon = (label) => {
      const normalizedLabel = label.toLowerCase().replace(/\s+/g, "-");
      return iconMap[label] || iconMap[normalizedLabel] || FaBuilding;
    };

    return {
      key: group.label.toLowerCase().replace(/\s+/g, "-"),
      label: group.label,
      items: group.children,
      icon: getIcon(group.label),
    };
  });

  return (
    <nav className="hidden xl:flex items-center gap-2">
      {/* Main navigation items */}
      {mainItems
        .filter((item) => item.href !== "#contact")
        .map((item, index) => {
          const sectionKey = item.href?.replace("#", "");
          return (
            <button
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="nav-button px-4 py-2.5 rounded-xl text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-background-accent/80 hover:shadow-lg hover:shadow-background-accent/20 whitespace-nowrap"
            >
              {item.label}
            </button>
          );
        })}

      {/* Dropdown groups with CSS hover */}
      {dropdownGroups.map((group) => {
        const IconComponent = group.icon;
        return (
          <div key={group.key} className="relative group dropdown-container">
            <button className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 text-foreground-secondary hover:text-foreground hover:bg-background-accent/60 group-hover:text-foreground group-hover:bg-background-accent/80 group-hover:shadow-lg group-hover:shadow-background-accent/20 whitespace-nowrap">
              {group.label}
              <FaChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Beautiful dropdown menu - CSS only hover */}
            <div className="absolute top-full left-0 mt-2 w-72 bg-background-card/95 backdrop-blur-custom border border-border/50 rounded-2xl shadow-2xl z-50 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {/* Dropdown header with gradient */}
              <div className="px-4 pb-3 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {group.label}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Dropdown items with enhanced styling */}
              <div className="px-2 py-2 max-h-64 overflow-y-auto dropdown-scroll">
                {group.items.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.href)}
                      className="dropdown-item-hover w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group/item text-foreground-secondary hover:text-foreground hover:bg-background-accent/60"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeInScale 0.3s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-background-accent group-hover/item:bg-primary/60 transition-colors duration-200"></div>
                          <span>{item.label}</span>
                        </div>
                        <svg
                          className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-all duration-200 transform group-hover/item:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dropdown footer */}
              <div className="px-4 pt-3 border-t border-border/30">
                <p className="text-xs text-foreground-secondary text-center">
                  {t("nav.dropdowns.footer")}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Contact button with enhanced styling */}
      {mainItems
        .filter((item) => item.href === "#contact")
        .map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="nav-button px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 flex items-center gap-2 relative overflow-hidden group whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaPhone className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-200" />
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          );
        })}
    </nav>
  );
};

export default DynamicNavigation;
