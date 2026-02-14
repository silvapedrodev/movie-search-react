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