export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          activity: string
          booking_required: boolean | null
          completed: boolean | null
          contact_info: string | null
          created_at: string
          duration: string | null
          id: string
          location: string | null
          notes: string | null
          time: string
          trip_day_id: string
          type: string
          updated_at: string
        }
        Insert: {
          activity: string
          booking_required?: boolean | null
          completed?: boolean | null
          contact_info?: string | null
          created_at?: string
          duration?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          time: string
          trip_day_id: string
          type?: string
          updated_at?: string
        }
        Update: {
          activity?: string
          booking_required?: boolean | null
          completed?: boolean | null
          contact_info?: string | null
          created_at?: string
          duration?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          time?: string
          trip_day_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_trip_day_id_fkey"
            columns: ["trip_day_id"]
            isOneToOne: false
            referencedRelation: "trip_days"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          api_key: string
          created_at: string
          id: string
          service: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          id?: string
          service: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          id?: string
          service?: string
          user_id?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string
          description: string | null
          id: string
          receipt_image_url: string | null
          trip_day_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          receipt_image_url?: string | null
          trip_day_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          receipt_image_url?: string | null
          trip_day_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_trip_day_id_fkey"
            columns: ["trip_day_id"]
            isOneToOne: false
            referencedRelation: "trip_days"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount: number
          category: string
          country_of_purchase: string
          created_at: string
          currency: string
          id: string
          item_name: string
          receipt_image_url: string | null
          trip_day_id: string
        }
        Insert: {
          amount: number
          category: string
          country_of_purchase: string
          created_at?: string
          currency?: string
          id?: string
          item_name: string
          receipt_image_url?: string | null
          trip_day_id: string
        }
        Update: {
          amount?: number
          category?: string
          country_of_purchase?: string
          created_at?: string
          currency?: string
          id?: string
          item_name?: string
          receipt_image_url?: string | null
          trip_day_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_trip_day_id_fkey"
            columns: ["trip_day_id"]
            isOneToOne: false
            referencedRelation: "trip_days"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_days: {
        Row: {
          accommodation_address: string | null
          accommodation_checkin: string | null
          accommodation_checkout: string | null
          accommodation_confirmation: string | null
          accommodation_contact: string | null
          accommodation_name: string | null
          city: string
          country: string
          created_at: string
          date: string
          day_number: number
          description: string | null
          id: string
          title: string | null
          trip_id: string
          updated_at: string
          weather_condition: string | null
          weather_temp: string | null
        }
        Insert: {
          accommodation_address?: string | null
          accommodation_checkin?: string | null
          accommodation_checkout?: string | null
          accommodation_confirmation?: string | null
          accommodation_contact?: string | null
          accommodation_name?: string | null
          city: string
          country: string
          created_at?: string
          date: string
          day_number: number
          description?: string | null
          id?: string
          title?: string | null
          trip_id: string
          updated_at?: string
          weather_condition?: string | null
          weather_temp?: string | null
        }
        Update: {
          accommodation_address?: string | null
          accommodation_checkin?: string | null
          accommodation_checkout?: string | null
          accommodation_confirmation?: string | null
          accommodation_contact?: string | null
          accommodation_name?: string | null
          city?: string
          country?: string
          created_at?: string
          date?: string
          day_number?: number
          description?: string | null
          id?: string
          title?: string | null
          trip_id?: string
          updated_at?: string
          weather_condition?: string | null
          weather_temp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trip_days_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_images: {
        Row: {
          activity_id: string | null
          caption: string | null
          created_at: string
          id: string
          image_type: string
          image_url: string
          trip_day_id: string | null
          trip_id: string | null
        }
        Insert: {
          activity_id?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_type?: string
          image_url: string
          trip_day_id?: string | null
          trip_id?: string | null
        }
        Update: {
          activity_id?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_type?: string
          image_url?: string
          trip_day_id?: string | null
          trip_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trip_images_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_images_trip_day_id_fkey"
            columns: ["trip_day_id"]
            isOneToOne: false
            referencedRelation: "trip_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_images_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: string
          name: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          name: string
          start_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          default_currency: string | null
          distance_unit: string | null
          id: string
          language: string | null
          temperature_unit: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_currency?: string | null
          distance_unit?: string | null
          id?: string
          language?: string | null
          temperature_unit?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_currency?: string | null
          distance_unit?: string | null
          id?: string
          language?: string | null
          temperature_unit?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
