import axios from "axios";
import { API_BASE_URL, REQUEST_TIMEOUT, DEFAULT_HEADERS } from "./config";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    console.log(
      `Making API request to: ${config.url} (timeout: ${config.timeout}ms)`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Add any response modifications here
    console.log(`API response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else if (
      error.code === "ECONNABORTED" &&
      error.message.includes("timeout")
    ) {
      // Timeout error
      console.error("Request timeout: The server took too long to respond");
      console.error("Timeout duration:", REQUEST_TIMEOUT, "ms");
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
