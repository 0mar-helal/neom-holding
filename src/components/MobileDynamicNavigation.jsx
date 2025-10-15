import React from "react";
import { useTranslation } from "react-i18next";
import { useHomeContext } from "@/contexts/HomeContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";
import AnimatedMenuIcon from "./AnimatedMenuIcon";

const MobileDynamicNavigation = () => {
  const { t } = useTranslation();
  const { menu, isLoading, isError, isMenuOpen, toggleMenu, scrollToSection } =
    useHomeContext();

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

  // Separate main items and groups from the backend menu
  const mainItems = menu.filter(
    (item) => item.type === "item" && item.children.length === 0
  );
  const groups = menu.filter((item) => item.type === "group");

  const menuGroups = [
    {
      title: "الرئيسية",
      items: mainItems.filter((item) => item.href !== "#contact"),
    },
    ...groups.map((group) => ({
      title: group.label,
      items: group.children,
    })),
    {
      title: "تواصل",
      items: mainItems.filter((item) => item.href === "#contact"),
    },
  ];

  return (
    <div className="lg:hidden relative">
      {/* Mobile menu button */}
      <div className="relative z-[10000000]">
        <AnimatedMenuIcon
          active={isMenuOpen}
          setActive={toggleMenu}
          // className="rounded-xl text-foreground-secondary hover:text-foreground hover:bg-background-accent transition-all duration-200 border border-border hover:border-border-hover/30"
          ariaLabel="Toggle menu"
        />
      </div>

      {/* Mobile Navigation Dropdown - Smooth Toggle */}
      <div
        className={`absolute top-full right-0 mt-2 w-80 max-h-[80vh] overflow-y-auto bg-background-card border border-border rounded-xl shadow-2xl transition-all duration-300 ease-in-out z-[9999999] mobile-menu-rtl rtl:right-auto rtl:left-0 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible -translate-y-2 scale-95"
        }`}
      >
        <div className="p-4">
          <nav className="space-y-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-2">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToSection(item.href);
                      }}
                      className="w-full text-left rtl:text-right px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm whitespace-nowrap text-foreground-secondary hover:text-foreground hover:bg-background-accent"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                {groupIndex < menuGroups.length - 1 && (
                  <div className="border-t border-border mt-3"></div>
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
