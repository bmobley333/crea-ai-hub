import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pgxryatkaznmxtfzejel.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBneHJ5YXRrYXpubXh0ZnplamVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMjk0MzIsImV4cCI6MjEwMjkwNTQzMn0.zwZL7m5V9FwMmO12FciojISTGvpBY6Tjn-l-A0ENFjc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
