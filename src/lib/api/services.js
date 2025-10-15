import apiClient from "./client";
import { API_ENDPOINTS } from "./config";

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Generic API service functions
export const apiService = {
  // Generic GET request with retry logic
  get: async (endpoint, params = {}, retryCount = 0) => {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      // Handle timeout errors with retry logic
      if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        if (retryCount < MAX_RETRIES) {
          console.log(
            `Timeout error for ${endpoint}, retrying... (${
              retryCount + 1
            }/${MAX_RETRIES})`
          );
          await delay(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
          return apiService.get(endpoint, params, retryCount + 1);
        } else {
          throw new Error(
            `Request timeout: The server took too long to respond for ${endpoint} after ${MAX_RETRIES} retries. Please try again later.`
          );
        }
      }
      throw new Error(
        `Failed to fetch data from ${endpoint}: ${error.message}`
      );
    }
  },

  // Generic POST request
  post: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to post data to ${endpoint}: ${error.message}`);
    }
  },

  // Generic PUT request
  put: async (endpoint, data = {}) => {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update data at ${endpoint}: ${error.message}`);
    }
  },

  // Generic DELETE request
  delete: async (endpoint) => {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete data at ${endpoint}: ${error.message}`);
    }
  },
};

// Specific API services for each endpoint
export const settingsService = {
  // Get all settings
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.SETTINGS, { lang }),

  // Get specific setting by key
  getByKey: (key, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.SETTINGS}?key=${key}`, { lang }),

  // Get settings as key-value object
  getAsObject: async (lang = "en") => {
    const response = await apiService.get(API_ENDPOINTS.SETTINGS, { lang });
    const settings = {};

    // Handle both array response and object with results property
    const settingsArray = Array.isArray(response)
      ? response
      : response?.results || [];

    settingsArray.forEach((setting) => {
      if (setting && setting.key) {
        settings[setting.key] = setting.value;
      }
    });

    return settings;
  },
};

export const menuService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.MENU, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.MENU}${id}/`, { lang }),
};

export const sectionsService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.SECTIONS, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.SECTIONS}${id}/`, { lang }),
};

export const heroService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.HERO, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.HERO}${id}/`, { lang }),
};

export const aboutService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.ABOUT, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.ABOUT}${id}/`, { lang }),
};

export const strategyBlocksService = {
  getAll: (lang = "en") =>
    apiService.get(API_ENDPOINTS.STRATEGY_BLOCKS, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.STRATEGY_BLOCKS}${id}/`, { lang }),
};

export const companiesService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.COMPANIES, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.COMPANIES}${id}/`, { lang }),
};

export const boardService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.BOARD, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.BOARD}${id}/`, { lang }),
};

export const speechesService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.SPEECHES, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.SPEECHES}${id}/`, { lang }),
};

export const govService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.GOV, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.GOV}${id}/`, { lang }),
};

export const esgService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.ESG, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.ESG}${id}/`, { lang }),
};

export const newsService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.NEWS, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.NEWS}${id}/`, { lang }),
};

export const postsService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.POSTS, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.POSTS}${id}/`, { lang }),
  getBySlug: (slug, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.POSTS}${slug}/`, { lang }),
};

export const pagesService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.PAGES, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.PAGES}${id}/`, { lang }),
  getByKey: (key, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.PAGES}?key=${key}`, { lang }),
};

export const legalService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.LEGAL, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.LEGAL}${id}/`, { lang }),
};

export const contactService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.CONTACT, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.CONTACT}${id}/`, { lang }),
  submit: (data, lang = "en") =>
    apiService.post(API_ENDPOINTS.CONTACT, { ...data, lang }),
};

export const searchService = {
  search: (query, params = {}) =>
    apiService.get(API_ENDPOINTS.SEARCH, { q: query, ...params }),
};
