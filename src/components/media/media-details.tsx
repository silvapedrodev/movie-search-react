import { GetImagesResult, MediaCast, MediaItem, MediaStatus, MediaType } from "@/types/tmdb";
import { MediaHero } from "@/components/media/media-hero";
import { MediaStatusProvider } from "@/context/media-status-context";
import { MediaExtras } from "./media-extras";

type Props = {
  data: MediaItem
  cast: MediaCast[]
  rating: string
  images: GetImagesResult | null
  initialStatus: MediaStatus
  mediaId: number
  mediaType: MediaType
};

export const MediaDetails = (
  { data,
    cast,
    rating,
    images,
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
        <MediaExtras mediaType={mediaType} cast={cast}/>
      </main>
    </MediaStatusProvider>
  )
}
