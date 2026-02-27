import { UserMediaItem } from "@/actions/library"
import { SortOption } from "@/types/tmdb"

export const sortItems = (items: UserMediaItem[], mode: SortOption) => {
  switch (mode) {
    case "a-z":
      return [...items].sort((a, b) => {
        const titleA = (a.tmdb.title || a.tmdb.name || "").toLowerCase()
        const titleB = (b.tmdb.title || b.tmdb.name || "").toLowerCase()
        return titleA.localeCompare(titleB)
      })
    case "last":
      return [...items].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    case "random":
    default:
      return items
  }
}