/**
 * Profile-related type definitions.
 * Re-exports from database types for convenience.
 */

import type { Database } from './database';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
