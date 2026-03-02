"use client"

import { createClient } from "@/lib/supabase/client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type AuthContextType = {
  username: string | null
  initialName: string | null
  email: string | null
  isLoggedIn: boolean
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

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single()

        const name = profile?.username ?? null
        setUsername(name)
        setInitialName(name ? name.charAt(0).toUpperCase() : null)
        setEmail(session.user.email ?? null)
      }
      setIsReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", session.user.id)
            .single()

          const name = profile?.username ?? null
          setUsername(name)
          setInitialName(name ? name.charAt(0).toUpperCase() : null)
          setEmail(session.user.email ?? null)
        }

        if (event === "SIGNED_OUT") {
          setUsername(null)
          setInitialName(null)
          setEmail(null)
        }
      })

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

  if (!isReady) return null

  return (
    <AuthContext.Provider value={{
      username,
      initialName,
      email,
      isLoggedIn: !!username,
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