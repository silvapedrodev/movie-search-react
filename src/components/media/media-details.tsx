import { GetImagesResult, MediaCast, MediaItem, MediaStatus, MediaType, MediaVideo, MovieOrSerie } from "@/types/tmdb";
import { MediaHero } from "@/components/media/media-hero";
import { MediaStatusProvider } from "@/context/media-status-context";
import { MediaExtras } from "@/components/media/media-extras";

type Props = {
  data: MediaItem
  cast: MediaCast[]
  recommendation: MovieOrSerie[]
  rating: string
  images: GetImagesResult | null
  videos: MediaVideo | null
  initialStatus: MediaStatus
  mediaId: number
  mediaType: MediaType
};

export const MediaDetails = (
  { data,
    cast,
    rating,
    recommendation,
    images,
    videos,
    initialStatus,
    mediaId,
    mediaType

  }: Props) => {
  return (
    <MediaStatusProvider
      initialStatus={initialStatus}
      mediaId={mediaId}
      mediaType={mediaType}
    >
      <main>
        <MediaHero data={data} rating={rating} images={images} />
        <MediaExtras
          mediaType={mediaType}
          cast={cast}
          video={videos}
          recommendation={recommendation}
        />
      </main>
    </MediaStatusProvider>
  )
}
