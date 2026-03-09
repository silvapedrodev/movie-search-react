"use server"

import { getUserId } from "@/utils/get-user-id"
import { getWeekDays } from "@/utils/get-week-days"
import { SupabaseClient } from "@supabase/supabase-js"
import z from "zod"

const schema = z.object({
  minutes: z.number().int().min(1).max(1439,
    "You can't log more than 23h 59min at once."), // max 24h
})

export const saveDailyGoal = async (minutes: number) => {
  const { minutes: validatedMinutes } = schema.parse({ minutes })
  const { supabase, userId } = await getUserId()
  const today = new Date().toISOString().split("T")[0]

  const { error } = await supabase
    .from("user_preferences")
    .upsert({ user_id: userId, daily_goal_minutes: validatedMinutes })

  if (error) throw new Error(error.message)

  const { data: todayData } = await supabase
    .from("user_daily_watch")
    .select("id, total_minutes")
    .eq("user_id", userId)
    .eq("date", today)
    .single()

  if (!todayData) return

  await supabase
    .from("user_daily_watch")
    .update({
      goal_met: todayData.total_minutes !== null && todayData.total_minutes >= validatedMinutes,
    })
    .eq("id", todayData.id)
}

export const getDailyContext = async () => {
  const { supabase, userId } = await getUserId()
  const today = new Date().toISOString().split("T")[0]

  const [preferences, dailyWatch] = await Promise.all([
    supabase
      .from("user_preferences")
      .select("daily_goal_minutes")
      .eq("user_id", userId)
      .single(),
    supabase
      .from("user_daily_watch")
      .select("total_minutes")
      .eq("user_id", userId)
      .eq("date", today)
      .single(),
  ])

  return {
    today,
    goalMinutes: preferences.data?.daily_goal_minutes ?? null,
    currentMinutes: dailyWatch.data?.total_minutes ?? null,
  }
}

export const addWatchTime = async (minutes: number) => {
  const result = schema.safeParse({ minutes })
  if (!result.success) throw new Error(result.error.issues[0].message)

  const validatedMinutes = result.data.minutes
  const { supabase, userId } = await getUserId()
  const {
    today,
    goalMinutes,
    currentMinutes
  } = await getDailyContext()

  if (goalMinutes === null) throw new Error("You need to set a daily goal first.")

  const newTotal = (currentMinutes ?? 0) + validatedMinutes

  if (newTotal > 1439) throw new Error("You can't log more than 23h 59min in a single day.")

  const goalMet = goalMinutes !== null && newTotal >= goalMinutes

  const { error } = await supabase
    .from("user_daily_watch")
    .upsert({
      user_id: userId,
      date: today,
      total_minutes: newTotal,
      goal_met: goalMet,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,date" })
    .eq("user_id", userId)
    .eq("date", today)

  if (error) throw new Error(error.message)

  return { added: validatedMinutes, newTotal, goalMet }
}

export const removeWatchTime = async (minutes: number) => {
  const result = schema.safeParse({ minutes })
  if (!result.success) throw new Error(result.error.issues[0].message)

  const validatedMinutes = result.data.minutes
  const { supabase, userId } = await getUserId()
  const { today, goalMinutes, currentMinutes } = await getDailyContext()

  if (goalMinutes === null) throw new Error("You need to set a daily goal first.")
  if (currentMinutes === null) throw new Error("No watch time to remove")

  const newTotal = currentMinutes - validatedMinutes
  const isInvalid = newTotal <= 0
  const goalMet = !isInvalid && goalMinutes !== null && newTotal >= goalMinutes

  const { error } = await supabase
    .from("user_daily_watch")
    .upsert({
      user_id: userId,
      date: today,
      total_minutes: isInvalid ? null : newTotal,
      goal_met: goalMet,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,date" })
    .eq("user_id", userId)
    .eq("date", today)

  if (error) throw new Error(error.message)

  return { removed: validatedMinutes, newTotal: isInvalid ? null : newTotal }
}

export const getWeeklyProgress = async () => {
  const { supabase, userId } = await getUserId()
  const days = getWeekDays()
  const start = days[0].date
  const end = days[6].date

  const { data, error } = await supabase
    .from("user_daily_watch")
    .select("date, total_minutes, goal_met")
    .eq("user_id", userId)
    .gte("date", start)
    .lte("date", end)

  if (error) throw new Error(error.message)

  return days.map(day => ({
    ...day,
    totalMinutes: data?.find(d => d.date === day.date)?.total_minutes ?? null,
    goalMet: data?.find(d => d.date === day.date)?.goal_met ?? false,
  }))
}

export type ChartPeriod = "days" | "months" | "years"

const chartStrategies: Record<ChartPeriod, (supabase: SupabaseClient, userId: string) => Promise<{ label: string; minutes: number }[]>> = {
  days: async (supabase, userId) => {
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - 4)

    const { data, error } = await supabase
      .from("user_daily_watch")
      .select("date, total_minutes")
      .eq("user_id", userId)
      .gte("date", start.toISOString().split("T")[0])
      .order("date", { ascending: true })

    if (error) throw new Error(error.message)

    return data.map(row => {
      const [year, month, day] = row.date.split("-").map(Number)
      const date = new Date(year, month - 1, day)
      return {
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        minutes: row.total_minutes ?? 0,
      }
    })
  },

  months: async (supabase, userId) => {
    return Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - (4 - i))
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const start = `${year}-${String(month).padStart(2, "0")}-01`
        const end = new Date(year, month, 0).toISOString().split("T")[0]

        const { data } = await supabase
          .from("user_daily_watch")
          .select("total_minutes")
          .eq("user_id", userId)
          .gte("date", start)
          .lte("date", end)

        return {
          label: date.toLocaleDateString("en-US", { month: "short" }),
          minutes: data?.reduce((sum, r) => sum + (r.total_minutes ?? 0), 0) ?? 0,
        }
      })
    )
  },

  years: async (supabase, userId) => {
    return Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        const year = new Date().getFullYear() - (4 - i)

        const { data } = await supabase
          .from("user_daily_watch")
          .select("total_minutes")
          .eq("user_id", userId)
          .gte("date", `${year}-01-01`)
          .lte("date", `${year}-12-31`)

        return {
          label: String(year),
          minutes: data?.reduce((sum, r) => sum + (r.total_minutes ?? 0), 0) ?? 0,
        }
      })
    )
  },
}

export const getChartData = async (period: ChartPeriod) => {
  const { supabase, userId } = await getUserId()
  return chartStrategies[period](supabase, userId)
}