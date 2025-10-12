import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";
import AnimatedMenuIcon from "./AnimatedMenuIcon";

const MobileDynamicNavigation = () => {
  const {
    menu,
    isLoading,
    isError,
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    scrollToSection,
  } = useAppContext();

  if (isLoading) {
    return (
      <div className="lg:hidden relative">
        <div className="relative z-[10000000]">
          <LoadingSpinner size="sm" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="lg:hidden relative">
        <div className="relative z-[10000000]">
          <ErrorBoundary error={isError} />
        </div>
      </div>
    );
  }

  // Group menu items for mobile
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

  const menuGroups = [
    { title: "الرئيسية", items: groupedMenu.main },
    { title: "الحوكمة والاستدامة", items: groupedMenu.governance },
    { title: "المحتوى", items: groupedMenu.content },
    { title: "القانونية", items: groupedMenu.legal },
    { title: "التواصل", items: groupedMenu.contact },
  ];

  return (
    <div className="lg:hidden relative">
      {/* Mobile menu button */}
      <div className="relative z-[10000000]">
        <AnimatedMenuIcon
          active={isMenuOpen}
          setActive={setIsMenuOpen}
          className="rounded-xl text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44] transition-all duration-200 border border-[#1e2a44] hover:border-[#3abff8]/30"
          ariaLabel="Toggle menu"
        />
      </div>

      {/* Mobile Navigation Dropdown - Smooth Toggle */}
      <div
        className={`absolute top-full right-0 mt-2 w-80 max-h-[80vh] overflow-y-auto bg-[#0f172f] border border-[#1e2a44] rounded-xl shadow-2xl transition-all duration-300 ease-in-out z-[9999999] mobile-menu-rtl rtl:right-auto rtl:left-0 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible -translate-y-2 scale-95"
        }`}
      >
        <div className="p-4">
          <nav className="space-y-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-xs font-semibold text-[#3abff8] uppercase tracking-wider mb-2 px-2">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToSection(item.href);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left rtl:text-right px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${
                        activeSection === item.href
                          ? "bg-[#3abff8]/20 text-[#3abff8] border border-[#3abff8]/30"
                          : "text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                {groupIndex < menuGroups.length - 1 && (
                  <div className="border-t border-[#1e2a44] mt-3"></div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileDynamicNavigation;
