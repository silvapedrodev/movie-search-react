import { GetImagesResult, MediaItem, MediaStatus, MediaType } from "@/types/tmdb";
import { MediaHero } from "@/components/media/media-hero";
import { MediaStatusProvider } from "@/context/media-status-context";

type Props = {
  data: MediaItem
  rating: string
  images: GetImagesResult | null
  initialStatus: MediaStatus
  mediaId: number
  mediaType: MediaType
};

export const MediaDetails = (
  { data,
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
      </main>
    </MediaStatusProvider>
  )
}
