/**
 * Database Type Definitions
 *
 * These types are generated from your Supabase database schema.
 * To regenerate, run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
 *
 * For now, we're using a placeholder. After creating your Supabase project,
 * you should generate the actual types.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          company_name: string
          company_email: string | null
          company_phone: string | null
          company_website: string | null
          industry: string
          logo_url: string | null
          primary_color: string
          n8n_workflow_id: string | null
          n8n_webhook_url: string | null
          twilio_phone_number: string | null
          status: string
          plan: string
          timezone: string
          settings: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          company_name: string
          company_email?: string | null
          company_phone?: string | null
          company_website?: string | null
          industry?: string
          logo_url?: string | null
          primary_color?: string
          n8n_workflow_id?: string | null
          n8n_webhook_url?: string | null
          twilio_phone_number?: string | null
          status?: string
          plan?: string
          timezone?: string
          settings?: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          company_name?: string
          company_email?: string | null
          company_phone?: string | null
          company_website?: string | null
          industry?: string
          logo_url?: string | null
          primary_color?: string
          n8n_workflow_id?: string | null
          n8n_webhook_url?: string | null
          twilio_phone_number?: string | null
          status?: string
          plan?: string
          timezone?: string
          settings?: Json
        }
      }
      // Add other tables as needed
      // For now, this is a placeholder structure
      [key: string]: {
        Row: { [key: string]: any }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// ============================================================================
// Helper Types
// ============================================================================

export type Client = Database['public']['Tables']['clients']['Row']
export type ClientInsert = Database['public']['Tables']['clients']['Insert']
export type ClientUpdate = Database['public']['Tables']['clients']['Update']

// Add more helper types as we build out the schema
