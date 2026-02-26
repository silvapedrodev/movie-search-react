"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/auth"
import { createClient } from "@/lib/supabase/client"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()

    const supabase = createClient()
    await supabase.auth.signOut()

    router.refresh()

    router.push("/auth/login")
  }

  return <Button
    className="bg-red-800 py-6 rounded-lg hover:bg-red-900/50 gap-2 border-none hover:cursor-pointer"
    onClick={handleLogout}
  >
    <LogOut size={18} /> Logout
  </Button>
}