import { BACKEND_URL } from "../context/AppContext";

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
