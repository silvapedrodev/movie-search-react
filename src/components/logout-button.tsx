"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/auth"
import { createClient } from "@/lib/supabase/client"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()

    const supabase = createClient()
    await supabase.auth.signOut()

    router.refresh()

    router.push("/auth/login")
  }

  return <Button onClick={handleLogout}>Logout</Button>
}