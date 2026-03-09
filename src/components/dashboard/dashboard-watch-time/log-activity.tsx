"use client"

import { CardContent } from "@/components/ui/card"
import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"
import { TimeInput } from "@/components/dashboard/dashboard-watch-time/time-input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BrushCleaning, Clock, Minus, Plus } from "lucide-react"
import { addWatchTime, removeWatchTime } from "@/actions/time-watch-actions"
import { toast } from "sonner"
import { formatMinutes } from "@/utils/format-minutes"
import { useQueryClient } from "@tanstack/react-query"
import { invalidateWatchQueries } from "@/utils/invalidate-watch-queries"
import { DashboardCardTitle } from "@/components/dashboard/dashboard-watch-time/dashboard-card-title"

export const LogActivity = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [isLoading, setIsLoading] = useState<"add" | "remove" | null>(null)

  const queryClient = useQueryClient()

  const toMinutes = () => {
    const total = time.hours * 60 + time.minutes + Math.round(time.seconds / 60)
    return total === 0 && time.seconds > 0 ? 1 : total
  }

  const isTimeEmpty = time.hours === 0 && time.minutes === 0 && time.seconds === 0

  const handleAdd = async () => {
    if (isTimeEmpty) return
    setIsLoading("add")
    try {
      const { added, newTotal, goalMet } = await addWatchTime(toMinutes())
      if (goalMet) {
        toast.success(`Goal reached! You added ${formatMinutes(added)}, your total today is ${formatMinutes(newTotal)} 🎉`)
      } else {
        toast.success(`Added ${formatMinutes(added)}, your total today is ${formatMinutes(newTotal)}`)
      }
      setTime({ hours: 0, minutes: 0, seconds: 0 })
      await invalidateWatchQueries(queryClient)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(null)
    }
  }

  const handleRemove = async () => {
    if (isTimeEmpty) return
    setIsLoading("remove")
    try {
      const { removed, newTotal } = await removeWatchTime(toMinutes())
      if (newTotal === null) {
        toast.success(`Removed ${formatMinutes(removed)}, your watch time has been cleared for today`)
      } else {
        toast.success(`Removed ${formatMinutes(removed)}, your total today is ${formatMinutes(newTotal)}`)
      }
      setTime({ hours: 0, minutes: 0, seconds: 0 })
      await invalidateWatchQueries(queryClient)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <DashboardCard className="bg-slate-900 text-white border border-purple-900/30">
      <DashboardCardTitle label="Log Time" Icon={Clock} />
      <CardContent className="">
        <div className="flex flex-col items-center mx-auto gap-4 w-full max-w-xs">
          <TimeInput value={time} onChange={setTime} />

          <div className="flex gap-2 w-full">
            <Button
              onClick={handleAdd}
              disabled={isTimeEmpty || isLoading !== null}
              className="flex-1 bg-purple-850 hover:bg-purple-850/50 text-white cursor-pointer"
            >
              {isLoading === "add"
                ? 'Adding...'
                : <><Plus /> Add</>
              }
            </Button>
            <Button
              onClick={handleRemove}
              disabled={isTimeEmpty || isLoading !== null}
              className="flex-1 bg-slate-950 border border-purple-850 hover:bg-purple-550/10 text-white cursor-pointer"
            >
              {isLoading === "remove"
                ? 'Removing...'
                : <><Minus /> Remove</>
              }
            </Button>
            <Button
              onClick={() => setTime({ hours: 0, minutes: 0, seconds: 0 })}
              disabled={isTimeEmpty || isLoading !== null}
              className="bg-white/5 hover:bg-slate-600 px-3 text-slate-500 hover:text-white  cursor-pointer"
              title="Clear time"
            >
              <BrushCleaning />
            </Button>
          </div>
        </div>
      </CardContent>
    </DashboardCard>
  )
}