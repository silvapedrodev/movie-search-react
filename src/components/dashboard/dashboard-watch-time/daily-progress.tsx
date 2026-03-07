"use client"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"
import { Progress } from "@/components/ui/progress"
import { getDailyContext } from "@/actions/time-watch-actions"
import { formatMinutes } from "@/utils/format-minutes"
import { useQuery } from "@tanstack/react-query"
import { DailyProgressSkeleton } from "@/components/dashboard/dashboard-watch-time/skeletons/daily-progress-skeleton"


export const DailyProgress = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["daily-progress"],
    queryFn: getDailyContext,
    staleTime: Infinity,
  })

  if (isLoading) return <DailyProgressSkeleton />

  const total = data?.currentMinutes ?? 0
  const goal = data?.goalMinutes ?? 0
  const percentage = goal > 0 ? Math.min(Math.round((total / goal) * 100), 100) : 0

  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="text-sm text-slate-600 uppercase tracking-wider">
          Daily Progress
        </CardTitle>
        <CardContent className="px-0 mt-5">
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-4xl font-bold">{formatMinutes(total)}</span>
              <span className="text-slate-500 ml-2">/ {formatMinutes(goal)} goal</span>
            </div>
            <span
              className={`text-sm font-bold
                ${percentage >= 100 ? 'text-green-600' : 'text-purple-550'}
                `}
            >{percentage}%</span>
          </div>
          <Progress
            className="bg-slate-800 [&>div]:bg-purple-550 [&>div]:transition-all"
            value={percentage}
          />
        </CardContent>
      </CardHeader>
    </DashboardCard>
  )
}