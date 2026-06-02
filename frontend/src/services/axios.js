import axios from "axios";

// ✅ Use environment variable with fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 40000, // 10 second timeout
});

// ✅ Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    
    // ✅ Return a more user-friendly error
    if (error.code === 'ERR_NETWORK') {
      error.userMessage = "Cannot connect to server. Please check your internet connection.";
    } else if (error.response?.status === 500) {
      error.userMessage = "Server error. Please try again later.";
    } else if (error.response?.status === 404) {
      error.userMessage = "API endpoint not found. Please contact support.";
    } else {
      error.userMessage = error.response?.data?.message || "Something went wrong.";
    }
    
    return Promise.reject(error);
  }
);

export default api;