export interface Valeurs {
  [key: string]: string | null;
}

export interface AboutNousPayload {
  titre: string;
  contenu: string;
  version: number;
  active: string;
  mission?: string | null;
  vision?: string | null;
  valeurs?: Valeurs | null;
  date_publication?: string;
}

export interface AboutNousResponse extends AboutNousPayload {
  id: number;
  created_at: string;
  updated_at: string;
}
