import useSWR from "swr";
import {
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

// Hero hooks
export const useHero = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `hero-${lang}`,
    () => heroService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    hero: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// About hooks
export const useAbout = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `about-${lang}`,
    () => aboutService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    about: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Strategy Blocks hooks
export const useStrategyBlocks = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `strategy-blocks-${lang}`,
    () => strategyBlocksService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    strategyBlocks: data,
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

// Speeches hooks
export const useSpeeches = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `speeches-${lang}`,
    () => speechesService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    speeches: data,
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

export const usePostBySlug = (slug, lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `post-${slug}-${lang}` : null,
    () => postsService.getBySlug(slug, lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    post: data,
    isLoading,
    isError: error,
    mutate,
  };
};

// Pages hooks
export const usePages = (lang = "en") => {
  const { data, error, isLoading, mutate } = useSWR(
    `pages-${lang}`,
    () => pagesService.getAll(lang),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    pages: data,
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
  const hero = useHero(lang);
  const companies = useCompanies(lang);
  const board = useBoard(lang);
  const esg = useESG(lang);

  const isLoading =
    settings.isLoading ||
    hero.isLoading ||
    companies.isLoading ||
    board.isLoading ||
    esg.isLoading;
  const isError =
    settings.isError ||
    hero.isError ||
    companies.isError ||
    board.isError ||
    esg.isError;

  return {
    settings: settings.settings,
    hero: hero.hero,
    companies: companies.companies,
    board: board.board,
    esg: esg.esg,
    isLoading,
    isError,
    mutate: {
      settings: settings.mutate,
      hero: hero.mutate,
      companies: companies.mutate,
      board: board.mutate,
      esg: esg.mutate,
    },
  };
};
