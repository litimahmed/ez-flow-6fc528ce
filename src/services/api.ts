import { LoginPayload, LoginResponse } from "@/types/auth";
import { AboutNousPayload, AboutNousResponse } from "@/types/aboutUs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const AUTH_URL = `${API_BASE_URL}/auth/Admin`;
const ADMINS_URL = `${API_BASE_URL}/admins`;

export const loginAdmin = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${AUTH_URL}/loginAdmin/`, {
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
  const response = await fetch(`${AUTH_URL}/logoutAdmin/`, {
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

// About Us API
export const createAboutNous = async (
  payload: AboutNousPayload
): Promise<AboutNousResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/AboutNous/ajouter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create About Us content.");
  }

  return response.json();
};