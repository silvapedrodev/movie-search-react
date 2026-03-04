"use client"

import { logout } from "@/actions/auth"
import { createClient } from "@/lib/supabase/client"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type AuthContextType = {
  username: string | null
  initialName: string | null
  email: string | null
  isLoggedIn: boolean
  isReady: boolean
  updateProfile: (username: string) => void
  clearProfile: () => void
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string | null>(null)
  const [initialName, setInitialName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const pathname = usePathname()

  const queryClient = useQueryClient()

  const loadProfile = async (userId: string, userEmail: string) => {
    const supabase = createClient()
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single()

    if (error || !profile) {
      await logout()
      setUsername(null)
      setInitialName(null)
      setEmail(null)
      return
    }

    const name = profile.username ?? null
    setUsername(name)
    setInitialName(name ? name.charAt(0).toUpperCase() : null)
    setEmail(userEmail)
  }

  useEffect(() => {
    const supabase = createClient()

    const checkSession = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (!user || error) {
        if (username) {
          await logout()
          setUsername(null)
          setInitialName(null)
          setEmail(null)
        }
      }
    }

    const isProtectedRoute = pathname.startsWith("/profile") || pathname.startsWith("/auth")
    if (isReady && isProtectedRoute && username) checkSession()
  }, [pathname])

  useEffect(() => {
    const supabase = createClient()
    let ready = false

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await loadProfile(session.user.id, session.user.email ?? "")
      }
      ready = true
      setIsReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          setUsername(null)
          setInitialName(null)
          setEmail(null)
          queryClient.removeQueries()
          return
        }

        if (!ready) return

        if (event === "SIGNED_IN" && session?.user) {
          queryClient.removeQueries()
          await loadProfile(session.user.id, session.user.email ?? "")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const updateProfile = (newUsername: string) => {
    setUsername(newUsername)
    setInitialName(newUsername ? newUsername.charAt(0).toUpperCase() : null)
  }

  const clearProfile = () => {
    setUsername(null)
    setInitialName(null)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{
      username,
      initialName,
      email,
      isLoggedIn: !!username,
      isReady,
      updateProfile,
      clearProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}