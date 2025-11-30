export interface PartnerPayload {
  nom_partenaire: string;
  description: string;
  email: string;
  telephone: string;
  adresse: string;
  site_web: string;
  actif?: boolean;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  type_partenaire?: string;
  date_deb: string;
  date_fin: string;
  liens_externes?: Record<string, unknown>;
  info_contacte?: Record<string, unknown>;
  priorite_affichage?: number;
}

export interface PartnerResponse extends PartnerPayload {
  id?: number;
  date_creation?: string;
  date_modification?: string;
}

export const TYPE_PARTENAIRE_OPTIONS = [
  "Sponsor",
  "Fournisseur",
  "Distributeur",
  "Collaborateur",
  "Autre"
] as const;
