import { LoginPayload, LoginResponse } from "@/types/auth";
import { AboutNousPayload, AboutNousResponse } from "@/types/aboutUs";
import { ContactPayload, ContactResponse } from "@/types/contact";
import { PartnerPayload, PartnerResponse } from "@/types/partner";

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

// Contact API
export const getAllContacts = async (): Promise<ContactResponse[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/contacte/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch contacts.");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

export const getContact = async (): Promise<ContactResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/contacte/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch contact information.");
  }

  return response.json();
};

export const createContact = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/contacte/ajouter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create contact information.");
  }

  return response.json();
};

export const updateContact = async (
  payload: ContactPayload
): Promise<ContactResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/contacte/modifier/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update contact information.");
  }

  return response.json();
};

// Partner API
export const getAllPartners = async (): Promise<PartnerResponse[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/partenaire/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch partners.");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

export const getPartner = async (partnerId: number): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/partenaire/${partnerId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch partner information.");
  }

  return response.json();
};

export const createPartner = async (
  payload: PartnerPayload
): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/partenaire/ajouter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create partner.");
  }

  return response.json();
};

export const updatePartner = async (
  partnerId: number,
  payload: PartnerPayload
): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/partenaire/modifier/${partnerId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update partner.");
  }

  return response.json();
};

export const deletePartner = async (partnerId: number): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${ADMINS_URL}/partenaire/supprimer/${partnerId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete partner.");
  }
};