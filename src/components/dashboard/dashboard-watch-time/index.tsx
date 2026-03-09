import { DailyGoal } from "@/components/dashboard/dashboard-watch-time/daily-goal"
import { LogActivity } from "@/components/dashboard/dashboard-watch-time/log-activity"
import { DailyProgress } from "@/components/dashboard/dashboard-watch-time/daily-progress"
import { WeeklyCalendar } from "@/components/dashboard/dashboard-watch-time/weekly-calendar"
import { WatchTimeChart } from "@/components/dashboard/dashboard-watch-time/charts/watch-time-chart"

export const Index = () => {
  return (
    <div className="py-7">
      <div className="flex flex-col gap-6">

        <DailyProgress />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LogActivity />
          <WeeklyCalendar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          <DailyGoal />
          <WatchTimeChart />
        </div>

      </div>
    </div>
  )
}