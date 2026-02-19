import Image from "next/image"
import { GetImagesResult, MediaItem } from "@/types/tmdb"
import { getBackdropUrl } from "@/utils/tmdb"
import UserScore from "@/components/ui/user-score"
import { MediaMeta } from "@/components/media/media-meta"
import { MediaActions } from "@/components/media/media-actions"
import { MediaOverview } from "@/components/media/media-overview"

type Props = {
  data: MediaItem
  rating: string
  images: GetImagesResult | null
};

export const MediaHero = ({ data, rating, images }: Props) => {
  const title = data.title || data.name || "Poster"

  return (
    <div className="relative w-full bg-black/90 h-[30vh] md:h-[70vh]">
      <Image
        src={getBackdropUrl(images?.backdrops?.[0]?.file_path)}
        alt={title}
        fill
        sizes="(max-width: 768px) 780px, (max-width: 1280px) 1280px, 100vw"
        className="object-cover md:object-top"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute w-full top-12 py-8 px-4 h-full md:top-8 md:flex md:gap-4 md:px-10 md:py-15">
        
        {/* Poster */}
        <div className="relative w-32 md:w-100 aspect-2/3">
          <Image
            src={getBackdropUrl(images?.posters?.[0]?.file_path)}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="py-6 space-y-4">
          <p className="text-4xl md:text-5xl font-bold">{title}</p>

          <MediaMeta data={data} rating={rating} />

          <div className="flex my-6 items-center gap-3">
            <UserScore rating={data.vote_average?.toFixed(1)} size={50} />
            <p className="text-lg font-bold">User Score</p>
          </div>

          <MediaActions />

          <MediaOverview overview={data.overview}/>
        </div>
      </div>
    </div>
  );
}
