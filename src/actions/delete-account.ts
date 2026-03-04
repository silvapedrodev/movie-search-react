"use server"

import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { clearSupabaseCookies } from "@/actions/clear-supabase-cookies"

export async function deleteAccount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  await supabaseAdmin.auth.admin.signOut(user.id, "global")

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

  if (error) throw error

  clearSupabaseCookies()

  return { success: true }
}