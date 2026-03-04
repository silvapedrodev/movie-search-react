"use server"

import { createClient } from "@/lib/supabase/server"
import { clearSupabaseCookies } from "@/actions/clear-supabase-cookies"

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  clearSupabaseCookies()
}