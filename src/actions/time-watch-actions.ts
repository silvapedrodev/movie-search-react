"use server"

import { getUserId } from "@/utils/get-user-id"
import { getWeekDays } from "@/utils/get-week-days"
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