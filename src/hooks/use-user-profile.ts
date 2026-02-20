"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function useUserProfile() {
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function fetchProfile() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
          setUsername(null)
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single()

        if (profileError || !profile?.username) {
          setUsername(null)
          return
        }

        setUsername(profile.username)
      } catch {
        setUsername(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile()
    })

    return () => subscription.unsubscribe()
  }, [])

  const initial = username ? username.charAt(0).toUpperCase() : null

  return { username, initial, isLoading, isLoggedIn: !!username }
}
