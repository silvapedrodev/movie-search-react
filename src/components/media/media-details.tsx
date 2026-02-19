import { GetImagesResult, MediaItem } from "@/types/tmdb";
import { MediaHero } from "@/components/media/media-hero";

type Props = {
  data: MediaItem
  rating: string
  images: GetImagesResult | null
};

export const MediaDetails = ({ data, rating, images }: Props) => {
  return (
    <main>
      <MediaHero data={data} rating={rating} images={images} />  
    </main>
  )
}
