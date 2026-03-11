import { MediaCast } from "@/types/tmdb"
import { MediaCastList } from "@/components/media/cast/media-cast-list"

type MediaExtrasProps = {
  mediaType: string
  cast: MediaCast[]
}

export const MediaExtras = ({ mediaType, cast }: MediaExtrasProps) => {
  return (
    <div className="mt-[50vh] md:mt-0 md:py-10">
      <div>
        <h2 className="px-4 md:px-12 font-bold text-2xl md:text-5xl capitalize">Official Trailer</h2>
        <div className="w-full h-40 bg-red-700"></div>
      </div>

      <div>
        <h2 className="px-4 md:px-12 font-bold text-2xl md:text-5xl capitalize">{mediaType} cast</h2>
        <MediaCastList items={cast} />
      </div>

      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, facere ut velit iste officiis iure eveniet molestias, vero eligendi, quos amet dolore aperiam voluptatem dolores libero quidem a vel id.
    </div>
  )
}