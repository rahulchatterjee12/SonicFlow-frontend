// src/lib/api.ts

import axios from "axios";

// Base URL for the API
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api/";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and refresh token is available, try to refresh the token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        const { data } = await axios.post(`${BASE_URL}auth/login/`, {
          refresh: refreshToken,
        });

        localStorage.setItem("access", data.access);
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
