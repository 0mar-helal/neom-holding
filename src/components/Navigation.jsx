"use client";

import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import AnimatedMenuIcon from "./AnimatedMenuIcon";

export const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigationItems = [
    { key: "about", href: "#about" },
    { key: "strategy", href: "#strategy" },
    { key: "chairman", href: "#chairman" },
    { key: "board", href: "#board" },
    { key: "sectors", href: "#sectors" },
    { key: "esg", href: "#esg" },
    { key: "contact", href: "#contact" },
  ];

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

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.href);
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
  }, []);

  return (
    <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
      {navigationItems.map((item) => (
        <button
          key={item.key}
          onClick={() => scrollToSection(item.href)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-item ${
            activeSection === item.href
              ? "bg-[#3abff8]/20 text-[#3abff8] border border-[#3abff8]/30"
              : "text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44]"
          }`}
        >
          {t(`nav.${item.key}`)}
        </button>
      ))}
    </nav>
  );
};

export const MobileNavigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: "about", href: "#about" },
    { key: "strategy", href: "#strategy" },
    { key: "chairman", href: "#chairman" },
    { key: "board", href: "#board" },
    { key: "sectors", href: "#sectors" },
    { key: "esg", href: "#esg" },
    { key: "contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 50;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

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
            {navigationItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="w-full text-left rtl:text-right px-4 py-3 rounded-lg text-[#9fb1cc] hover:text-[#e7ecf4] hover:bg-[#1e2a44] transition-all duration-200 font-medium transform hover:translate-x-1 rtl:hover:-translate-x-1"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen
                    ? "slideInFromRight 0.3s ease-out forwards"
                    : "none",
                }}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
