import { MediaItem } from "@/types/tmdb"
import { formatRuntime, getYear } from "@/utils/tmdb"

type Props = {
  data: MediaItem
  rating: string
};

export const MediaMeta = ({ data, rating }: Props) => {
  const runtime = Number(data.runtime || data.episode_run_time?.[0]);
  const genres = data.genres?.slice(0, 3) || [];
  const country = data.production_countries?.[0]?.iso_3166_1;

  return (
    <>
      <div className="flex">
        <p>{formatRuntime(runtime)}</p>
        <span className="after:content-['•'] after:mx-2 before:content-['•'] before:mx-2">
          {getYear(data)}
        </span>
        <p>{country}</p>
      </div>

      <div className="flex gap-2 items-center">
        <div className="border border-white rounded-lg px-2">
          {rating}
        </div>

        {genres.map((genre, index) => (
          <p key={genre.id}>
            {genre.name}
            {index < genres.length - 1 ? ", " : ""}
          </p>
        ))}
      </div>
    </>
  )
}
