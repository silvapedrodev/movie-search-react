"use client"

import { saveDailyGoal } from "@/actions/time-watch-actions"
import { InputContainer } from "@/components/elements/input-container"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Goal } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"

export const DailyGoal = () => {
  const [dailyGoal, setDailyGoal] = useState<number | "">("")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!dailyGoal) return
    setLoading(true)
    try {
      await saveDailyGoal(dailyGoal)
      toast.success("Daily goal saved!")
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : "Failed to save goal. Try again."
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardCard>
      <CardHeader>
        <CardTitle className="text-sm">Set Your Daily Goal</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2 items-center">
        <InputContainer className="flex-1 bg-slate-800 border-slate-700">
          <Goal />
          <Input
            value={dailyGoal}
            type="number"
            max={1440}
            placeholder="Minutes"
            className="border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550"
            onChange={e => setDailyGoal(e.target.value === ""
              ? ""
              : parseInt(e.target.value)
            )}
            onKeyDown={key => {
              if (key.code === "Enter") handleSave()
            }}
          />
        </InputContainer>
        <Button
          disabled={!dailyGoal || loading}
          onClick={handleSave}
          className="py-6 bg-purple-850 hover:bg-purple-850/50 cursor-pointer"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </CardContent>
    </DashboardCard>
  )
}