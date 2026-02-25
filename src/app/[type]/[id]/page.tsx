import { MediaDetails } from "@/components/media/media-details";
import { getMediaStatus } from "@/lib/media-status";
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

  const [data, rating, images, initialStatus] = await Promise.all([
    getItemByTmdbId(mediaType, tmdbId),
    getRating(mediaType, tmdbId),
    getImages(mediaType, tmdbId),
    getMediaStatus({ mediaType, mediaId: tmdbId }),
  ])

  return (
    <MediaDetails
      data={data}
      rating={rating}
      images={images}
      initialStatus={initialStatus}
      mediaId={tmdbId}           
      mediaType={mediaType}
    />
  )
}
