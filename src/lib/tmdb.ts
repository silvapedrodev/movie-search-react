import { GetImagesResult, TmdbImagesResponse } from "@/types/tmdb"


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

export async function getImages(type: string, id: number): Promise<GetImagesResult | null> {
  const data = await tmdbFetch(`/${type}/${id}/images`)

  if (!data) return null

  const images = data as TmdbImagesResponse

  const englishLogo =
    images.logos.find(l => l.iso_639_1 === "en") ??
    images.logos[0] ??
    null

  return {
    id: images.id,
    logo: englishLogo,
    posters: images.posters,
    backdrops: images.backdrops,
  }
}

export async function getPopular(
  type: "movie" | "tv",
  timeWindow: "day" | "week" = "week"
) {
  return tmdbFetch(`/trending/${type}/${timeWindow}`)
}

export async function getAllTrending(timeWindow: "day" | "week" = "week") {
  return tmdbFetch(`/trending/all/${timeWindow}`)
}

export async function searchMulti(query: string) {
  return tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}`)
}

export async function getItemByTmdbId(type: "movie" | "tv", id: number) {
  return tmdbFetch(`/${type}/${id}`);
}

export async function getRating(type: "movie" | "tv", id: number, country = "US"): Promise<string> {
  try {
    const endpoint = type === "movie" ? `/movie/${id}/release_dates` : `/tv/${id}/content_ratings`;
    const data = await tmdbFetch(endpoint);

    const result = type === "movie"
      ? data.results.find((r: any) => r.iso_3166_1 === country)?.release_dates[0]?.certification
      : data.results.find((r: any) => r.iso_3166_1 === country)?.rating;

    return result || "NR";
  } catch (err) {
    console.error("Error retrieving classification:", err)
    return "NR"
  }
}
