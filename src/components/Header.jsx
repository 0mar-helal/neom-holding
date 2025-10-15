"use client";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import DynamicNavigation from "@/components/DynamicNavigation";
import MobileDynamicNavigation from "@/components/MobileDynamicNavigation";
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

  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border/50 z-30 transition-all duration-300 shadow-lg">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo and Company Name - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt={t("site.logoAlt") || "Neom Holding Logo"}
              width={32}
              height={32}
              className="text-primary-foreground font-bold text-sm sm:text-base"
              priority
              quality={90}
            />
            <span className="w-fit text-sm md:text-lg font-bold transition-colors duration-300 text-primary-light">
              {companyName}
            </span>
          </div>

          {/* Desktop Navigation - Hidden on smaller screens */}
          <div className="hidden xl:block">
            <DynamicNavigation />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <MobileDynamicNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
