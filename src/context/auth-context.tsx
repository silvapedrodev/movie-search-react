"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type AuthContextType = {
  username: string | null
  initialName: string | null
  isLoggedIn: boolean
}

type Props = {
  username: string | null
  initialName: string | null
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
  children,
  username: initialUsername,
  initialName: initialInitialName }: Props
) => {
  const [username, setUsername] = useState<string | null>(initialUsername)
  const [initialName, setInitialName] = useState<string | null>(initialInitialName)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

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
          router.refresh()
        }

        if (event === "SIGNED_OUT") {
          setUsername(null)
          setInitialName(null)
          router.refresh()
        }
      })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ username, initialName, isLoggedIn: !!username }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}