import { MovieOrSerie } from "@/types/tmdb"

type BackdropSize = "w300" | "w780" | "w1280" | "original"
type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original"
type LogoSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original"

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export function getBackdropUrl(
  path: string | null | undefined,
  size: BackdropSize = "w1280"
) {
  if (!path) return "/placeholder.png"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function getPosterUrl(
  path: string | null | undefined,
  size: PosterSize = "w500"
) {
  if (!path) return "/placeholder.png"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function getLogoUrl(
  path: string | null | undefined,
  size: LogoSize = "w300"
) {
  if (!path) return "/placeholder.png"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function getYear(data: MovieOrSerie): string {
  const date = data.release_date || data.first_air_date
  if (!date) return ""
  return date.split("-")[0]
}

export function formatRuntime(minutes: number | null) {
  if (!minutes) return "N/A";

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h === 0) return `${m} min`;
  return `${h} h ${m} min`;
}