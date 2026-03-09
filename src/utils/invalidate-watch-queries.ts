import { QueryClient } from "@tanstack/react-query"

const queryKeys = {
  dailyProgress: ["daily-progress"],
  weeklyProgress: ["weekly-progress"],
  chart: (period: string) => ["chart", period]
} as const

export const invalidateWatchQueries = async (queryClient: QueryClient) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.dailyProgress }),
    queryClient.invalidateQueries({ queryKey: queryKeys.weeklyProgress }),
    queryClient.invalidateQueries({ queryKey: ["chart"] })
  ])
}