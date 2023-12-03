export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          completed_at: string | null
          created_at: string
          deadline: string
          id: string
          memo: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          deadline?: string
          id?: string
          memo?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          deadline?: string
          id?: string
          memo?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type TodoAdd = Omit<Database['public']['Tables']['todos']['Insert'], 'id' | 'user_id'>
export type TodoUpdate = Omit<Database['public']['Tables']['todos']['Update'], 'id' | 'user_id'>
export type Todo = Omit<Database['public']['Tables']['todos']['Row'], 'user_id'>
