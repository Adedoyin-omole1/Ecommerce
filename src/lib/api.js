export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Something went wrong" }));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
