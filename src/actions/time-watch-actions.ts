"use server"

import { getUserId } from "@/utils/get-user-id"
import z from "zod"

const schema = z.object({
  minutes: z.number().int().positive().max(1440), // max 24h
})

export const saveDailyGoal = async (minutes: number) => {
  const { minutes: validatedMinutes } = schema.parse({ minutes })

  const { supabase, userId } = await getUserId()

  const { error } = await supabase
    .from("user_preferences")
    .upsert({ user_id: userId, daily_goal_minutes: validatedMinutes })

  if (error) throw new Error(error.message)
}