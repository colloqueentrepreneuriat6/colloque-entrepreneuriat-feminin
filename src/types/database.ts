export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type StatutProposition = "nouvelle" | "attribuee" | "evaluee" | "notifiee";
export type Decision = "accepte" | "refuse";

export interface Database {
  public: {
    Tables: {
      propositions: {
        Row: {
          id: string;
          titre: string;
          auteur_nom: string | null;
          auteur_email: string | null;
          document_url: string | null;
          statut: StatutProposition;
          created_at: string;
        };
        Insert: {
          id?: string;
          titre: string;
          auteur_nom?: string | null;
          auteur_email?: string | null;
          document_url?: string | null;
          statut?: StatutProposition;
          created_at?: string;
        };
        Update: {
          titre?: string;
          auteur_nom?: string | null;
          auteur_email?: string | null;
          document_url?: string | null;
          statut?: StatutProposition;
        };
      };
      attributions: {
        Row: {
          id: string;
          proposition_id: string;
          rapporteur_id: string;
          assigned_at: string;
        };
        Insert: {
          id?: string;
          proposition_id: string;
          rapporteur_id: string;
          assigned_at?: string;
        };
        Update: {
          proposition_id?: string;
          rapporteur_id?: string;
        };
      };
      evaluations: {
        Row: {
          id: string;
          proposition_id: string;
          rapporteur_id: string;
          decision: Decision;
          remarques: string | null;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          proposition_id: string;
          rapporteur_id: string;
          decision: Decision;
          remarques?: string | null;
          submitted_at?: string;
        };
        Update: {
          decision?: Decision;
          remarques?: string | null;
        };
      };
    };
  };
}

export type Proposition = Database["public"]["Tables"]["propositions"]["Row"];
export type Attribution = Database["public"]["Tables"]["attributions"]["Row"];
export type Evaluation = Database["public"]["Tables"]["evaluations"]["Row"];
