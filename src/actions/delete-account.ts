"use server"

import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { cookies } from "next/headers"

export async function deleteAccount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

  if (error) throw error

  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()
  allCookies.forEach(({ name }) => {
    if (name.includes("sb-")) cookieStore.delete(name)
  })

   return { success: true }
}