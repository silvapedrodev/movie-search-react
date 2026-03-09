import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"
import { Skeleton } from "@/components/ui/skeleton"

export const WeeklyCalendarSkeleton = () => {
  return (
    <DashboardCard className="p-4">
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-2">
            <Skeleton className="h-3 w-6 bg-slate-800" />
            <Skeleton className="h-4 w-4 bg-slate-800" />
            <Skeleton className="h-3 w-8 bg-slate-800" />
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}