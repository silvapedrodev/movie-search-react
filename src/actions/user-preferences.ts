"use server"

import { createClient } from "@/lib/supabase/server"
import { SortOption } from "@/types/tmdb"

export async function setUserLibrarySortMode(mode: SortOption) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase
    .from("user_preferences")
    .upsert(
      {
        user_id: user.id,
        library_sort_mode: mode,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
}

export async function getUserLibrarySortMode(): Promise<SortOption> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return "random"

  const { data } = await supabase
    .from("user_preferences")
    .select("library_sort_mode")
    .eq("user_id", user.id)
    .maybeSingle()

  return (data?.library_sort_mode as SortOption) ?? "random"
}