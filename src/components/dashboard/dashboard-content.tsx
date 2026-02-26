import { Filter, Pencil } from "lucide-react"
import { Button } from "../ui/button"
import { LogoutButton } from "../logout-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { DashboardSection } from "./dashboard-section"

type Props = {
  user: string
}

export const DashboardContent = ({ user }: Props) => {
  return (
    <div className="w-screen h-screen mx-auto px-4 sm:px-6 lg:px-20 pt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4  py-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Hello, {user}</h1>
          <p>Welcome back! Check your lists, track what you've seen, or update your settings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="py-6 bg-purple-850 text-white rounded-lg hover:cursor-pointer hover:bg-purple-850/50">
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