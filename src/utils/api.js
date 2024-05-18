import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 5000000,
});

instance.interceptors.request.use(
  (config) => {
    // Add token to request headers
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers
        ? (config.headers.Authorization = `Bearer ${accessToken}`)
        : (config.headers = { Authorization: `Bearer ${accessToken}` });
    }
    return config;
  }
);

// Automatically redirect to login page if token is invalid
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;