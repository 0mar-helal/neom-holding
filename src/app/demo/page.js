"use client";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import DynamicNavigation from "@/components/DynamicNavigation";
import MobileDynamicNavigation from "@/components/MobileDynamicNavigation";
import TestApi from "@/components/TestApi";
import SettingsDisplay from "@/components/SettingsDisplay";
import KPIsDisplay from "@/components/KPIsDisplay";
import BoardDisplay from "@/components/BoardDisplay";
import ContactForm from "@/components/ContactForm";
import ApiExample from "@/components/ApiExample";
import LanguageAwareApiExample from "@/components/LanguageAwareApiExample";

export default function DemoPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0b1224] text-[#e7ecf4]">
      {/* Header */}
      <header className="sticky top-0 bg-[#0b1224]/90 backdrop-blur-lg border-b border-[#1e2a44] z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#22c55e] to-[#3abff8] transition-transform duration-300 hover:scale-105"></div>
              <span className="text-sm sm:text-lg lg:text-xl font-bold text-[#e7ecf4] transition-colors duration-300 hover:text-[#3abff8]">
                {t("site.companyName")} - API Demo
              </span>
            </div>

            {/* Desktop Navigation */}
            <DynamicNavigation />

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <MobileDynamicNavigation />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">API Integration Demo</h1>
            <p className="text-lg text-[#9fb1cc]">
              عرض توضيحي لاستخدام API مع Axios و SWR
            </p>
          </div>

          {/* Test API Component */}
          <TestApi />

          {/* Settings Display */}
          <SettingsDisplay />

          {/* KPIs Display */}
          <KPIsDisplay />

          {/* Board Display */}
          <BoardDisplay />

          {/* Contact Form */}
          <ContactForm />

          {/* Comprehensive API Example */}
          <ApiExample />

          {/* Language-Aware API Example */}
          <LanguageAwareApiExample />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e2a44] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#9fb1cc]">
            © {new Date().getFullYear()} {t("site.companyName")}.{" "}
            {t("footer.allRightsReserved")}
          </p>
        </div>
      </footer>
    </div>
  );
}
