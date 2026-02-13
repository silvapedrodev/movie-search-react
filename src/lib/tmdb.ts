const BASE_URL = "https://api.themoviedb.org/3"

export async function tmdbFetch(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: "application/json",
    },
  })

  return res.json()
}

export async function getPopular(
  type: "movie" | "tv",
  timeWindow: "day" | "week" = "week"
) {
  return tmdbFetch(`/trending/${type}/${timeWindow}`)
}

export async function getAllTrending() {
  return tmdbFetch(`/movie/now_playing`)
}

export async function searchMulti(query: string) {
  return tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}`)
}
