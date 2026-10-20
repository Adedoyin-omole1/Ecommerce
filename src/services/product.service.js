import { fetchAPI } from "../lib/api";

export const productService = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/products${query ? `?${query}` : ""}`);
  },

  getById: async (id) => {
    return fetchAPI(`/products/${id}`);
  },

  create: async (data) => {
    return fetchAPI("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: async (id) => {
    return fetchAPI(`/products/${id}`, { method: "DELETE" });
  },
};
