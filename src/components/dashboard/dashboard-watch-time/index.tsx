import { DailyGoal } from "@/components/dashboard/dashboard-watch-time/daily-goal"
import { LogActivity } from "@/components/dashboard/dashboard-watch-time/log-activity"
import { DailyProgress } from "./daily-progress"

export const Index = () => {
  return (
    <div className="py-7">
      <div className="flex flex-col gap-6">
        <DailyProgress />
        <DailyGoal />
        <LogActivity />
      </div>
    </div>
  )
}