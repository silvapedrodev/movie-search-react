"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { SortOption } from "@/types/tmdb"
import { getUserLibrarySortMode, setUserLibrarySortMode } from "@/actions/user-preferences"

const QUERY_KEY = ["user-sort-mode"] as const

export function useUserSortMode() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getUserLibrarySortMode(),
    staleTime: Infinity,
  })

  const mutation = useMutation({
    mutationFn: (mode: SortOption) => setUserLibrarySortMode(mode),
    onMutate: async (mode) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY })
      const previous = queryClient.getQueryData<SortOption>(QUERY_KEY)
      queryClient.setQueryData(QUERY_KEY, mode)
      return { previous }
    },
    onError: (_err, _mode, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  return {
    sortMode: query.data ?? "random",
    isLoading: query.isLoading,
    setSortMode: (mode: SortOption) => mutation.mutate(mode),
  }
}