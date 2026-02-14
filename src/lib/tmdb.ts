export async function tmdbFetch(path: string) {
  try {
    const res = await fetch(`${process.env.TMDB_API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    })

    if (!res.ok) {
      console.error(`TMDB fetch failed: ${res.status} ${res.statusText}`)
      return null
    }

    return res.json()
  } catch (error) {
    console.error("TMDB fetch error:", error)
    return null
  }
}

export async function getPopular(
  type: "movie" | "tv",
  timeWindow: "day" | "week" = "week"
) {
  return tmdbFetch(`/trending/${type}/${timeWindow}`)
}

export async function getAllTrending(timeWindow: "day" | "week" = "week" ) {
  return tmdbFetch(`/trending/all/${timeWindow}`)
}

export async function searchMulti(query: string) {
  return tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}`)
}
