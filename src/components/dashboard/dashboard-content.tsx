"use client"

import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"
import { DashboardMediaList } from "@/components/dashboard/dashboard-media-list"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DashboardWatchTime } from "@/components/dashboard/dashboard-watch-time"

type DashboardView = "list" | "time"

const tabs: { id: DashboardView; label: string }[] = [
  { id: "list", label: "My List" },
  { id: "time", label: "My Time" }
]

const tabComponent: Record<DashboardView, React.ComponentType> = {
  list: DashboardMediaList,
  time: DashboardWatchTime
}

export const DashboardContent = () => {
  const { username, isReady, isLoggedIn } = useAuth()
  const [currentTab, setCurrentTab] = useState<DashboardView>('list')
  const router = useRouter()

  if (!isReady || !isLoggedIn) return null

  const ActiveComponente = tabComponent[currentTab]

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
      <div className="flex items-end gap-5">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`
              relative text-xl md:text-2xl font-bold pb-2
              after:absolute after:left-0 after:bottom-0
              after:h-1 after:w-14 after:bg-purple-550
              after:origin-left after:transition-transform after:duration-300
              ${currentTab === tab.id ? "after:scale-x-100" : "after:scale-x-0"}
              `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ActiveComponente />
    </div>

  )
}