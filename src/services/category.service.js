import { fetchAPI } from "../lib/api";

export const categoryService = {
  getAll: async () => {
    return fetchAPI("/categories");
  },

  getById: async (id) => {
    return fetchAPI(`/categories/${id}`);
  },

  create: async (data) => {
    return fetchAPI("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
