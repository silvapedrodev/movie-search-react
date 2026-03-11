import { MediaDetails } from "@/components/media/media-details";
import { getMediaStatus } from "@/lib/media-status";
import { getCast, getImages, getItemByTmdbId, getRating, getVideosById } from "@/lib/tmdb";
import { Metadata } from "next";

type Props = {
  params: { type: string; id: string }
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

  const [data, cast, rating, images, initialStatus, videos] = await Promise.all([
    getItemByTmdbId(mediaType, tmdbId),
    getCast(mediaType, tmdbId),
    getRating(mediaType, tmdbId),
    getImages(mediaType, tmdbId),
    getMediaStatus({ mediaType, mediaId: tmdbId }),
    getVideosById(mediaType, tmdbId),
  ])

  return (
    <MediaDetails
      data={data}
      cast={cast}
      rating={rating}
      images={images}
      videos={videos}
      initialStatus={initialStatus}
      mediaId={tmdbId}
      mediaType={mediaType}
    />
  )
}
