import { QueryClient } from "@tanstack/react-query"

const queryKeys = {
  dailyProgress: ["daily-progress"],
  weeklyProgress: ["weekly-progress"],
} as const

export const invalidateWatchQueries = async (queryClient: QueryClient) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.dailyProgress }),
    queryClient.invalidateQueries({ queryKey: queryKeys.weeklyProgress }),
  ])
}