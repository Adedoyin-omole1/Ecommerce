import { fetchAPI } from "../lib/api";

export const authService = {
  login: async (email, password) => {
    return fetchAPI("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return fetchAPI("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return fetchAPI("/auth/logout", { method: "POST" });
  },

  forgotPassword: async (email) => {
    return fetchAPI("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token, password) => {
    return fetchAPI("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  },

  getMe: async () => {
    return fetchAPI("/auth/me");
  },
};
