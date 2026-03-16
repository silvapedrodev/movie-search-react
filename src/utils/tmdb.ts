import { MovieOrSerie } from "@/types/tmdb"

type TmdbImageSize =
  | "w45"
  | "w92"
  | "w154"
  | "w185"
  | "w300"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original"

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"
const FALLBACK_IMAGE = "https://placehold.net/default.svg"

export function getTmdbImageUrl(
  path: string | null | undefined,
  size: TmdbImageSize = "original"
) {
  if (!path) return FALLBACK_IMAGE
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