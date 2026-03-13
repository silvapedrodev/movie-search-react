import { MediaCast, MediaVideo } from "@/types/tmdb"
import { MediaCastList } from "@/components/media/cast/media-cast-list"
import { MediaTrailer } from "@/components/media/trailer/media-trailer"

type MediaExtrasProps = {
  mediaType: string
  cast: MediaCast[]
  video: MediaVideo | null
}

export const MediaExtras = ({ mediaType, cast, video }: MediaExtrasProps) => {
  return (
    <div className="mt-[50vh] md:mt-0 md:py-10">
      {video?.key &&
        <MediaTrailer video={video} />
      }

      {cast?.length > 0 &&
        <div>
          <h2 className="p-4 md:px-12 font-bold text-2xl md:text-4xl capitalize">{mediaType === 'tv' ? 'Serie' : 'Movie'} cast</h2>
          <MediaCastList items={cast} />
        </div>
      }

      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, facere ut velit iste officiis iure eveniet molestias, vero eligendi, quos amet dolore aperiam voluptatem dolores libero quidem a vel id.
    </div>
  )
}