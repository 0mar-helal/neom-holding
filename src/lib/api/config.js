// API Configuration
export const API_BASE_URL = "https://neom1dashboard.pythonanywhere.com/api/v1";

// API Endpoints
export const API_ENDPOINTS = {
  SETTINGS: "/settings/",
  MENU: "/menu/",
  SECTIONS: "/sections/",
  HERO: "/hero/",
  ABOUT: "/about/",
  STRATEGY_BLOCKS: "/strategy-blocks/",
  COMPANIES: "/companies/",
  BOARD: "/board/",
  SPEECHES: "/speeches/",
  GOV: "/governance/",
  ESG: "/esg/",
  NEWS: "/news/",
  POSTS: "/blogs/",
  PAGES: "/pages/",
  LEGAL: "/legal/",
  CONTACT: "/contact/",
  INVESTORS: "/investors/",
  SEARCH: "/search/",
};

// Request timeout (in milliseconds) - increased to 30 seconds
export const REQUEST_TIMEOUT = 30000;

// Default headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
