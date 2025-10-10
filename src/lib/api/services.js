import apiClient from "./client";
import { API_ENDPOINTS } from "./config";

// Generic API service functions
export const apiService = {
  // Generic GET request
  get: async (endpoint, params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
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
    response.results.forEach((setting) => {
      settings[setting.key] = setting.value;
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

export const kpisService = {
  getAll: (lang = "en") => apiService.get(API_ENDPOINTS.KPIS, { lang }),
  getById: (id, lang = "en") =>
    apiService.get(`${API_ENDPOINTS.KPIS}${id}/`, { lang }),
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
