import { toggleWatchlist } from "@/actions/media-status";
import { MediaDetails } from "@/components/media/media-details";
import { getImages, getItemByTmdbId, getRating } from "@/lib/tmdb";
import { GetImagesResult, MediaItem } from "@/types/tmdb";
import { Metadata } from "next";

type Props = {
  params: Promise<{ type: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params
  const mediaType = type === "tv" ? "tv" : "movie"
  const tmdbId = Number(id)

  const item = await getItemByTmdbId(mediaType, tmdbId)

  return {
    title: item?.name || item?.title || "Untitled",
  }
}

export default async function Page({ params }: Props) {
  const { type, id } = await params

  const mediaType = type === "tv" ? "tv" : "movie"
  const tmdbId = Number(id);

  const [data, rating, images]: [MediaItem, string, GetImagesResult | null] = await Promise.all([
    getItemByTmdbId(mediaType, tmdbId),
    getRating(mediaType, tmdbId),
    getImages(mediaType, tmdbId),
  ])

  const teste = await toggleWatchlist({ mediaId: tmdbId, mediaType: mediaType })
  console.log(teste)

  return (
    <MediaDetails
      data={data}
      rating={rating}
      images={images}
    />
  )
}
