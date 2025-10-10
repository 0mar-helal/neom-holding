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
        className={`absolute top-full right-0 mt-2 w-64 bg-[#0f172f] border border-[#1e2a44] rounded-xl shadow-2xl transition-all duration-300 ease-in-out z-[9999999] mobile-menu-rtl rtl:right-auto rtl:left-0 ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible -translate-y-2 scale-95"
        }`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            {menu.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className={`w-full text-left rtl:text-right px-4 py-3 rounded-lg transition-all duration-200 font-medium transform hover:translate-x-1 rtl:hover:-translate-x-1 ${
                  activeSection === item.href
                    ? "bg-[#3abff8]/20 text-[#3abff8] border border-[#3abff8]/30"
                    : "text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen
                    ? "slideInFromRight 0.3s ease-out forwards"
                    : "none",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileDynamicNavigation;
