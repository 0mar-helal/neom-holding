// Main API module exports
export { default as apiClient } from "./client";
export {
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_TIMEOUT,
  DEFAULT_HEADERS,
} from "./config";
export * from "./services";
export * from "./hooks";

// Re-export commonly used services and hooks
export {
  settingsService,
  menuService,
  sectionsService,
  kpisService,
  companiesService,
  boardService,
  govService,
  esgService,
  newsService,
  postsService,
  legalService,
  contactService,
  searchService,
} from "./services";

export {
  useSettings,
  useSettingsAsObject,
  useMenu,
  useSections,
  useKPIs,
  useCompanies,
  useBoard,
  useGov,
  useESG,
  useNews,
  usePosts,
  useLegal,
  useContact,
  useSearch,
  useDashboardData,
} from "./hooks";
