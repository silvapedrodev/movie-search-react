import { MediaCast, MediaVideo } from "@/types/tmdb"
import { MediaCastList } from "@/components/media/cast/media-cast-list"
import { TriangleAlert } from "lucide-react"

type MediaExtrasProps = {
  mediaType: string
  cast: MediaCast[]
  video: MediaVideo | null
}

export const MediaExtras = ({ mediaType, cast, video }: MediaExtrasProps) => {
  return (
    <div className="mt-[50vh] md:mt-0 md:py-10">
      <div>
        <h2 className="px-4 md:px-12 font-bold text-2xl md:text-5xl capitalize">Official Trailer</h2>
        <div className="w-full py-4 max-w-4xl mx-auto aspect-video">
          {video
            ? <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              className="w-full h-full"
              allowFullScreen
            />
            : <NoTrailer />
          }
        </div>
      </div>

      <div>
        <h2 className="px-4 md:px-12 font-bold text-2xl md:text-5xl capitalize">{mediaType} cast</h2>
        <MediaCastList items={cast} />
      </div>

      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, facere ut velit iste officiis iure eveniet molestias, vero eligendi, quos amet dolore aperiam voluptatem dolores libero quidem a vel id.
    </div>
  )
}

const NoTrailer = () => {
  return (
    <div className="w-full py-4 max-w-4xl mx-auto aspect-video flex flex-col items-center justify-center gap-3 text-muted-foreground border rounded-lg">
      <TriangleAlert className="w-10 h-10 opacity-70" />
      <p className="text-sm">No trailer available.</p>
    </div>
  );
}