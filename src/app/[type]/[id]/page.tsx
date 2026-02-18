import ActionButton from "@/components/ui/action-button";
import UserScore from "@/components/ui/user-score";
import { getImages, getItemByTmdbId, getRating } from "@/lib/tmdb";
import { MediaItem } from "@/types/tmdb";
import { formatRuntime, getBackdropUrl, getYear } from "@/utils/tmdb";
import { Bookmark, Check } from "lucide-react";
import Image from "next/image";

type Props = {
  params: Promise<{ type: string; id: string }>
}

export default async function MediaPage({ params }: Props) {
  const { type, id } = await params

  const mediaType = type === "tv" ? "tv" : "movie"
  const tmdbId = Number(id);

  const rating = await getRating(mediaType, tmdbId)
  const data: MediaItem = await getItemByTmdbId(mediaType, tmdbId)
  const images = await getImages(mediaType, tmdbId)

  return (
    <main className="">
      <div className="relative w-full bg-black/90 h-[30vh] md:h-[70vh]">
        <Image
          src={getBackdropUrl(images?.backdrops[0]?.file_path)}
          alt={data.title || data.name || "Poster"}
          fill
          sizes="(max-width: 768px) 780px, (max-width: 1280px) 1280px, 100vw"
          className="object-cover md:object-top"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute w-full top-12 py-8 px-4 h-full md:top-8 md:flex md:gap-4 md:px-10 md:py-15">
          <div className="relative w-32 md:w-100 aspect-2/3">
            <Image
              src={getBackdropUrl(images?.posters[0]?.file_path)}
              alt={data.title || data.name || "Poster"}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="py-6 space-y-2">
            <p className="text-4xl md:text-5xl font-bold">{data.title || data.name}</p>
            <div className="flex">
              <p>{formatRuntime(Number(data.runtime || data.episode_run_time?.[0]))}</p>
              <span className="after:content-['•'] after:mx-2 before:content-['•'] before:mx-2">{getYear(data)}</span>
              <p>{data.production_countries?.[0]?.iso_3166_1}</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="border border-white rounded-lg px-2">{rating}</div>
              {data.genres.slice(0, 3).map((genre, index, array) => (
                <p
                  key={genre.id}>
                  {genre.name}{index < array.length - 1 ? ", " : ""}
                </p>
              ))}
            </div>
            <div className="flex my-6 items-center gap-3">
              <UserScore rating={data.vote_average?.toFixed(1)} size={50} />
              <p className="text-xl font-bold">User Score</p>
            </div>
            <div className="flex gap-4 max-w-3xs">
              <ActionButton label="Watchlist" icon={Bookmark} filled />
              <ActionButton label="Seen" icon={Check} />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-2xl">Overview</h4>
              <p className="max-w-2xl">{data.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
