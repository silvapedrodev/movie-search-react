import { MovieOrSerie } from "@/types/tmdb"

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: "w200" | "w300" | "w500" | "original" = "w300"
) {
  if (!path) return "/placeholder.png"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function getYear(data: MovieOrSerie): string {
  const date = data.release_date || data.first_air_date
  if (!date) return ""
  return date.split("-")[0]
}