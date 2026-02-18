export type SearchMultiItem = {
  id: number;
  media_type: "movie" | "tv"
  name: string;
  poster_path?: string | null
  backdrop_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
}

export type MovieOrSerie = {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  overview: string
  media_type?: string
  first_air_date?: string
  vote_average?: number
}

export type MediaItem = {
  id: number
  type: "movie" | "tv"
  title?: string
  name?: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  genres: { id: number; name: string }[]
  homepage?: string
  release_date?: string
  first_air_date?: string
  last_air_date?: string
  status: string
  tagline?: string
  popularity: number
  vote_average: number
  vote_count: number
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; name: string; english_name: string }[]
  runtime?: number
  episode_run_time?: number[]
  number_of_seasons?: number
  number_of_episodes?: number
  created_by?: { id: number; name: string; profile_path?: string }[]
  networks?: { id: number; name: string; logo_path?: string }[]
  production_companies?: { id: number; name: string; logo_path?: string | null; origin_country?: string }[]
}

export type TmdbImage = {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

export type TmdbImagesResponse = {
  id: number
  backdrops: TmdbImage[]
  logos: TmdbImage[]
  posters: TmdbImage[]
}

export type GetImagesResult = {
  id: number
  logo: TmdbImage | null
  posters: TmdbImage[]
  backdrops: TmdbImage[]
}