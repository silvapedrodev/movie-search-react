"use server"

import { SearchMultiItem } from "@/types/tmdb"
import { tmdbFetch } from "@/lib/tmdb"

export async function searchMultiPaginated(query: string, page: number) {
  if (!query) return { results: [], page: 1, total_pages: 0 }

  const data = await tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`)

  if (!data) return { results: [], page: 1, total_pages: 0 }

  const filteredResults = data.results.filter(
    (item: SearchMultiItem) => item.media_type === "movie" || item.media_type === "tv"
  )

  return { ...data, results: filteredResults }
}