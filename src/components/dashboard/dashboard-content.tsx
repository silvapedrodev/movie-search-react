"use client"

import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"
import { DashboardSection } from "@/components/dashboard/dashboard-section"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export const DashboardContent = () => {
  const { username, isReady, isLoggedIn } = useAuth()
  const router = useRouter()

  if (!isReady || !isLoggedIn) return null

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  return (
    <div className="w-full min-h-screen mx-auto px-4 sm:px-6 lg:px-20 pt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4  py-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Hello, {username}</h1>
          <p>Welcome back! Check your lists, track what you've seen, or update your settings.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleEditProfile}
            className="py-6 bg-slate-800 text-white rounded-lg hover:cursor-pointer hover:bg-purple-850">
            <Pencil size={18} />
            Edit Profile
          </Button>
          <LogoutButton />
        </div>
      </div>
      <DashboardSection />
    </div>

  )
}