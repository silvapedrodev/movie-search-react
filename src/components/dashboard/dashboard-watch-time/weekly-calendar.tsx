"use client"

import { useQuery } from "@tanstack/react-query"
import { formatMinutes } from "@/utils/format-minutes"
import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"
import { getWeeklyProgress } from "@/actions/time-watch-actions"
import { CheckCircle2, CircleDot, ListTodoIcon } from "lucide-react"
import { WeeklyCalendarSkeleton } from "@/components/dashboard/dashboard-watch-time/skeletons/weekly-calendar-skeleton"
import { CardContent } from "@/components/ui/card"
import { DashboardCardTitle } from "@/components/dashboard/dashboard-watch-time/dashboard-card-title"

export const WeeklyCalendar = () => {
  const { data: days, isPending } = useQuery({
    queryKey: ["weekly-progress"],
    queryFn: getWeeklyProgress,
    staleTime: Infinity,
  })

  if (isPending) return <WeeklyCalendarSkeleton />

  return (
    <DashboardCard className="overflow-hidden">
      <DashboardCardTitle label=" Weekly Progress" Icon={ListTodoIcon} />
      <CardContent className="px-4">
        <div className="grid grid-cols-7">
          {days?.map(day => (
            <div
              key={day.date}
              className={`flex flex-col items-center gap-2 py-2 px-1 rounded-lg transition-colors min-w-0
              ${day.isToday ? "bg-purple-900/30 border border-purple-550" : ""}
            `}
            >
              <span className="text-xs uppercase text-slate-400">{day.label}</span>
              <span className={`text-sm font-bold ${day.isToday ? "text-white" : "text-slate-400"}`}>
                {day.dayNumber}
              </span>
              {day.goalMet
                ? <CheckCircle2 className="size-10 text-purple-550 shrink-0" />
                : <CircleDot className="size-10 text-slate-700 shrink-0" />
              }
              <span className={`text-[12px] font-extrabold text-center leading-tight w-full truncate px-1
              ${day.goalMet ? "text-green-500" : "text-slate-500"}`}
              >
                {day.totalMinutes ? formatMinutes(day.totalMinutes) : "-"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </DashboardCard>
  )
}