import { LoginPayload, LoginResponse } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/auth/Admin";

export const loginAdmin = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/loginAdmin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An unknown error occurred.");
  }

  return response.json();
};

export const logoutAdmin = async (refreshToken?: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/logoutAdmin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(refreshToken && { "Authorization": `Bearer ${refreshToken}` }),
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Logout failed.");
  }
};