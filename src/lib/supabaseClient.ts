import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

if (!SUPABASE_KEY || !SUPABASE_URL) {
  throw new Error('Missing supabase configuration')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
