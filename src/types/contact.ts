export interface ContactPayload {
  nom?: string | null;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  wilaya: string;
  horaires: string;
  site_web?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  linkedin?: string | null;
  x?: string | null;
  message_acceuil?: string | null;
}

export interface ContactResponse extends ContactPayload {
  date_creation?: string;
  date_modification?: string;
}
