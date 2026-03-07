import { DailyGoal } from "@/components/dashboard/dashboard-watch-time/daily-goal"
import { LogActivity } from "@/components/dashboard/dashboard-watch-time/log-activity"

export const Index = () => {
  return (
    <div className="py-7">
      <div className="flex flex-col gap-6">
        <DailyGoal />
        <LogActivity />
      </div>
    </div>
  )
}