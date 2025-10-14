/**
 * Global constants for the application
 */

// Base URL configuration
export const BASE_URL = "https://neomsyria.com";

// Contact information
export const DEFAULT_CONTACT_EMAIL = "info@neomsyria.com";

// SEO configuration
export const SITE_NAME = "Neom Syria";
export const SITE_DESCRIPTION =
  "Neom Syria - Saudi-Syrian Investment Holding Company";

// Social media and branding
export const LOGO_URL = `${BASE_URL}/logo.png`;
export const FAVICON_URL = `${BASE_URL}/logo.png`;

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || BASE_URL;

// Language configuration
export const SUPPORTED_LANGUAGES = {
  en: "en-US",
  ar: "ar-SA",
};

// Default language
export const DEFAULT_LANGUAGE = "en";
