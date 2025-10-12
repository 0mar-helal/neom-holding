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
  heroService,
  aboutService,
  strategyBlocksService,
  companiesService,
  boardService,
  speechesService,
  govService,
  esgService,
  newsService,
  postsService,
  pagesService,
  legalService,
  contactService,
  searchService,
} from "./services";

export {
  useSettings,
  useSettingsAsObject,
  useMenu,
  useSections,
  useHero,
  useAbout,
  useStrategyBlocks,
  useCompanies,
  useBoard,
  useSpeeches,
  useGov,
  useESG,
  useNews,
  usePosts,
  usePages,
  useLegal,
  useContact,
  useSearch,
  useDashboardData,
} from "./hooks";
