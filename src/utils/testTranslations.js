// Test utility to verify translations are working
import i18n from "../lib/i18n";

export const testTranslations = () => {
  console.log("=== Translation Test ===");

  // Test English
  i18n.changeLanguage("en");
  console.log("English translations:");
  console.log("Site title:", i18n.t("site.title"));
  console.log("Company name:", i18n.t("site.companyName"));
  console.log("About section:", i18n.t("sections.about.title"));
  console.log("Contact title:", i18n.t("sections.contact.title"));

  // Test Arabic
  i18n.changeLanguage("ar");
  console.log("\nArabic translations:");
  console.log("Site title:", i18n.t("site.title"));
  console.log("Company name:", i18n.t("site.companyName"));
  console.log("About section:", i18n.t("sections.about.title"));
  console.log("Contact title:", i18n.t("sections.contact.title"));

  // Test array translations
  console.log("\nStrategy investment items (EN):");
  i18n.changeLanguage("en");
  const enItems = i18n.t("sections.strategy.investment.items", {
    returnObjects: true,
  });
  console.log(enItems);

  console.log("\nStrategy investment items (AR):");
  i18n.changeLanguage("ar");
  const arItems = i18n.t("sections.strategy.investment.items", {
    returnObjects: true,
  });
  console.log(arItems);

  console.log("=== End Translation Test ===");
};

// Auto-run test if this file is imported
if (typeof window !== "undefined") {
  // Only run in browser environment
  setTimeout(() => {
    testTranslations();
  }, 1000);
}
