import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";

const DynamicNavigation = () => {
  const { menu, isLoading, isError, activeSection, scrollToSection } =
    useAppContext();

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

  return (
    <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
      {menu.map((item, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(item.href)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-item ${
            activeSection === item.href
              ? "bg-[#3abff8]/20 text-[#3abff8] border border-[#3abff8]/30"
              : "text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DynamicNavigation;
