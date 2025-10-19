"use client";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import DynamicNavigation from "@/components/DynamicNavigation";
import MobileDynamicNavigation from "@/components/MobileDynamicNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import { useAppContext } from "@/contexts/AppContext";
import Image from "next/image";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { settings } = useAppContext();

  // Get company name from settings or fallback to translation
  const companyName =
    i18n.language === "ar"
      ? settings?.brand_name_ar || t("site.companyName")
      : settings?.brand_name_en || t("site.companyName");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border/50 z-30 transition-all duration-300 shadow-lg">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo and Company Name - Responsive */}
          <div
            onClick={scrollToTop}
            className="cursor-pointer flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0 min-w-0"
          >
            <Image
              src="/logo.png"
              alt={t("site.logoAlt") || "Neom Holding Logo"}
              width={28}
              height={28}
              className="text-primary-foreground font-bold text-sm sm:text-base flex-shrink-0"
              priority
              quality={90}
            />
            <span className="hidden sm:inline text-xs sm:text-sm md:text-lg font-bold transition-colors duration-300 text-primary-light truncate">
              {companyName}
            </span>
          </div>

          {/* Desktop Navigation - Hidden on smaller screens */}
          <div className="hidden xl:block">
            <DynamicNavigation />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <MobileDynamicNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
