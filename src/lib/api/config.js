// API Configuration
export const API_BASE_URL = "https://neom1dashboard.pythonanywhere.com/api/v1";

// API Endpoints
export const API_ENDPOINTS = {
  SETTINGS: "/settings/",
  MENU: "/menu/",
  SECTIONS: "/sections/",
  KPIS: "/kpis/",
  COMPANIES: "/companies/",
  BOARD: "/board/",
  GOV: "/gov/",
  ESG: "/esg/",
  NEWS: "/news/",
  POSTS: "/posts/",
  LEGAL: "/legal/",
  CONTACT: "/contact/",
  SEARCH: "/search/",
};

// Request timeout (in milliseconds)
export const REQUEST_TIMEOUT = 10000;

// Default headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
