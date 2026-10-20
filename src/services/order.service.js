import { fetchAPI } from "../lib/api";

export const orderService = {
  getAll: async () => {
    return fetchAPI("/orders");
  },

  getById: async (id) => {
    return fetchAPI(`/orders/${id}`);
  },

  create: async (data) => {
    return fetchAPI("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateStatus: async (id, status) => {
    return fetchAPI(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
