import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"
import { Skeleton } from "@/components/ui/skeleton"

export const DailyProgressSkeleton = () => {
  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="text-sm text-slate-600 uppercase tracking-wider">
          Daily Progress
        </CardTitle>
        <CardContent className="px-0 mt-5">
          <div className="flex items-end justify-between mb-2">
            <div className="flex items-end gap-2">
              <Skeleton className="h-10 w-32 bg-slate-800" />
              <Skeleton className="h-5 w-20 bg-slate-800" />
            </div>
            <Skeleton className="h-5 w-10 bg-slate-800" />
          </div>
          <Skeleton className="h-2 w-full bg-slate-800 mt-1" />
        </CardContent>
      </CardHeader>
    </DashboardCard>
  )
}