"use client";

import { useTranslation } from "react-i18next";
import { useAppContext } from "@/contexts/AppContext";
import { useState, useEffect } from "react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { settings } = useAppContext();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get company name from settings or fallback to translation
  const companyName = mounted
    ? i18n.language === "ar"
      ? settings?.brand_name_ar || t("site.companyName")
      : settings?.brand_name_en || t("site.companyName")
    : t("site.companyName"); // Always use translation during SSR

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-foreground-secondary">
          © {new Date().getFullYear()} {companyName}.{" "}
          {t("footer.allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
