"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/auth"
import { LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function LogoutButton() {
  const router = useRouter()

  const { clearProfile } = useAuth()

  const handleLogout = async () => {
    await logout()
    clearProfile()
    router.push("/auth/login")
  }

  return <Button
    className="bg-red-800 py-6 rounded-lg hover:bg-red-900/50 gap-2 border-none hover:cursor-pointer"
    onClick={handleLogout}
  >
    <LogOut size={18} /> Logout
  </Button>
}