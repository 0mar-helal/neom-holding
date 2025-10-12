import React from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/contexts/AppContext";
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
  const { menu, isLoading, isError, scrollToSection } = useAppContext();

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

  // Group menu items logically
  const groupedMenu = {
    main: menu.filter((item) =>
      ["about", "strategy", "chairman", "board", "sectors"].includes(
        item.href?.replace("#", "")
      )
    ),
    governance: menu.filter((item) =>
      ["governance", "esg"].includes(item.href?.replace("#", ""))
    ),
    content: menu.filter((item) =>
      ["news", "blog"].includes(item.href?.replace("#", ""))
    ),
    legal: menu.filter((item) =>
      ["compliance", "privacy", "supply", "terms"].includes(
        item.href?.replace("#", "")
      )
    ),
    contact: menu.filter((item) =>
      ["contact"].includes(item.href?.replace("#", ""))
    ),
  };

  const dropdownGroups = [
    {
      key: "governance",
      label: t("nav.dropdowns.governance.title"),
      items: groupedMenu.governance,
      icon: FaBuilding,
    },
    {
      key: "content",
      label: t("nav.dropdowns.content.title"),
      items: groupedMenu.content,
      icon: FaNewspaper,
    },
    {
      key: "legal",
      label: t("nav.dropdowns.legal.title"),
      items: groupedMenu.legal,
      icon: FaGavel,
    },
  ];

  return (
    <nav className="hidden xl:flex items-center gap-2">
      {/* Main navigation items */}
      {groupedMenu.main.map((item, index) => {
        const sectionKey = item.href?.replace("#", "");
        return (
          <button
            key={index}
            onClick={() => scrollToSection(item.href)}
            className="nav-button px-4 py-2.5 rounded-xl text-sm font-medium text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]/80 hover:shadow-lg hover:shadow-[#1e2a44]/20"
          >
            {t(`nav.${sectionKey}`)}
          </button>
        );
      })}

      {/* Dropdown groups with CSS hover */}
      {dropdownGroups.map((group) => {
        const IconComponent = group.icon;
        return (
          <div key={group.key} className="relative group dropdown-container">
            <button className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]/60 group-hover:text-[#e7ecf4] group-hover:bg-[#1e2a44]/80 group-hover:shadow-lg group-hover:shadow-[#1e2a44]/20">
              {group.label}
              <FaChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Beautiful dropdown menu - CSS only hover */}
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#0f172f]/95 backdrop-blur-custom border border-[#1e2a44]/50 rounded-2xl shadow-2xl z-50 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {/* Dropdown header with gradient */}
              <div className="px-4 pb-3 border-b border-[#1e2a44]/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3abff8]/20 to-[#22c55e]/20 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-[#3abff8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#e7ecf4]">
                      {group.label}
                    </h3>
                    <p className="text-xs text-[#9fb1cc]">
                      {t(`nav.dropdowns.${group.key}.subtitle`)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dropdown items with enhanced styling */}
              <div className="px-2 py-2 max-h-64 overflow-y-auto dropdown-scroll">
                {group.items.map((item, index) => {
                  const sectionKey = item.href?.replace("#", "");
                  return (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.href)}
                      className="dropdown-item-hover w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group/item text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]/60"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeInScale 0.3s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#1e2a44] group-hover/item:bg-[#3abff8]/60 transition-colors duration-200"></div>
                          <span>{t(`nav.${sectionKey}`)}</span>
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
              <div className="px-4 pt-3 border-t border-[#1e2a44]/30">
                <p className="text-xs text-[#9fb1cc] text-center">
                  {t("nav.dropdowns.footer")}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Contact button with enhanced styling */}
      {groupedMenu.contact.map((item, index) => {
        const sectionKey = item.href?.replace("#", "");
        return (
          <button
            key={index}
            onClick={() => scrollToSection(item.href)}
            className="nav-button px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-gradient-to-r from-[#22c55e] to-[#3abff8] text-[#081225] hover:opacity-90 hover:shadow-lg hover:shadow-[#3abff8]/25 hover:scale-105 flex items-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3abff8] to-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FaPhone className="relative z-10 text-lg group-hover:scale-110 transition-transform duration-200" />
            <span className="relative z-10">{t(`nav.${sectionKey}`)}</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        );
      })}
    </nav>
  );
};

export default DynamicNavigation;
