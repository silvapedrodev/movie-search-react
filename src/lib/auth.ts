import { createClient } from "@/lib/supabase/server"

export type UserSession = {
  username: string | null
  initialName: string | null
  isLoggedIn: boolean
}

export const getUserSession = async (): Promise<UserSession> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { username: null, initialName: null, isLoggedIn: false }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single()

  const username = profile?.username ?? null
  const initialName = username ? username.charAt(0).toUpperCase() : null

  return { username, initialName, isLoggedIn: true }
}