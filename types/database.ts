/**
 * Supabase database schema types.
 * Mirrors the public schema tables for type-safe queries.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: number;
          user_id: string;
          first_name: string | null;
          avatar_url: string | null;
          email: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          first_name?: string | null;
          avatar_url?: string | null;
          email: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          first_name?: string | null;
          avatar_url?: string | null;
          email?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
