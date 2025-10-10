import useSWR from "swr";
import {
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

// Generic SWR fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

// Settings hooks
export const useSettings = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `settings-${lang}`,
    () => settingsService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useSettingsAsObject = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `settings-object-${lang}`,
    () => settingsService.getAsObject(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Menu hooks
export const useMenu = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `menu-${lang}`,
    () => menuService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    menu: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Sections hooks
export const useSections = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `sections-${lang}`,
    () => sectionsService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    sections: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// KPIs hooks
export const useKPIs = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `kpis-${lang}`,
    () => kpisService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    kpis: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Companies hooks
export const useCompanies = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `companies-${lang}`,
    () => companiesService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    companies: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Board hooks
export const useBoard = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `board-${lang}`,
    () => boardService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    board: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Government hooks
export const useGov = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `gov-${lang}`,
    () => govService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    gov: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// ESG hooks
export const useESG = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `esg-${lang}`,
    () => esgService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    esg: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// News hooks
export const useNews = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `news-${lang}`,
    () => newsService.getAll(lang),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    news: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Posts hooks
export const usePosts = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `posts-${lang}`,
    () => postsService.getAll(lang),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Legal hooks
export const useLegal = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `legal-${lang}`,
    () => legalService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    legal: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Contact hooks
export const useContact = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `contact-${lang}`,
    () => contactService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    contact: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Search hooks
export const useSearch = (query, options = {}) => {
  const { data, error, isLoading, mutate } = useSWR(
    query ? `search-${query}-${options.lang || "en"}` : null,
    () => searchService.search(query, options),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds
    }
  );

  return {
    searchResults: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Custom hook for multiple data sources
export const useDashboardData = (lang = "en") => {
  const settings = useSettings(lang);
  const kpis = useKPIs(lang);
  const companies = useCompanies(lang);
  const board = useBoard(lang);
  const esg = useESG(lang);

  const isLoading =
    settings.isLoading ||
    kpis.isLoading ||
    companies.isLoading ||
    board.isLoading ||
    esg.isLoading;
  const isError =
    settings.isError ||
    kpis.isError ||
    companies.isError ||
    board.isError ||
    esg.isError;

  return {
    settings: settings.settings,
    kpis: kpis.kpis,
    companies: companies.companies,
    board: board.board,
    esg: esg.esg,
    isLoading,
    isError,
    mutate: {
      settings: settings.mutate,
      kpis: kpis.mutate,
      companies: companies.mutate,
      board: board.mutate,
      esg: esg.mutate,
    },
  };
};
