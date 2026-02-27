"use client"

import Image from "next/image"
import { MediaItem, MediaType } from "@/types/tmdb"
import { formatRuntime, getPosterUrl, getYear } from "@/utils/tmdb"
import Link from "next/link"
import { FileText } from "lucide-react"
import UserScore from "@/components/elements/user-score"

type Props = {
  data: MediaItem
  mediaType: MediaType
}

export const MediaCardDashboard = ({ data, mediaType }: Props) => {
  const runtime = Number(data.runtime || data.episode_run_time?.[0]);

  return (
    <div className="flex bg-slate-800 rounded-lg overflow-hidden shadow-lg">
      <div className="relative shrink-0 w-32 min-w-[375]:w-32 sm:w-32 md:w-40 aspect-2/3">
        <Image
          src={getPosterUrl(data.poster_path)}
          alt={data.title || data.name || "Unknown"}
          fill
          sizes="160px"
          className="object-cover"
        />
        {mediaType === "tv" &&
          <div className="absolute top-2 left-2 bg-slate-800 text-sm uppercase px-1 rounded-sm">
            {mediaType}
          </div>
        }
        <div className="absolute bottom-1 -right-3 sm:-right-6">
          <UserScore
            rating={data.vote_average !== undefined
              ? data.vote_average.toFixed(1)
              : "0"}
            size={40} />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col text-sm space-y-2">
        <div>
          <h3 className="text-white text-xl font-bold leading-tight">
            {data.title || data.name}
          </h3>
        </div>

        <div>
          <ul className="flex [&>li:not(:last-child)::after]:content-['|'] 
               [&>li:not(:last-child)::after]:mx-2">
            {mediaType === "tv" ? (
              <>
                <li>
                  {data.number_of_seasons}{" "}
                  {data.number_of_seasons === 1 ? "Season" : "Seasons"}
                </li>
                <li>{getYear(data)}</li>
              </>
            ) : (
              <>
                <li>{formatRuntime(runtime)}</li>
                <li>{getYear(data)}</li>
              </>
            )}
          </ul>
        </div>

        <p className="text-white/70 text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
          {data.overview || "No description available for this title."}
        </p>

        <Link
          href={`/${mediaType}/${data.id}`}
          className="w-full bg-slate-700 hover:bg-purple-850 transition-colors text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2">
          <FileText size={20} />
          More About
        </Link>
      </div>
    </div>
  )
}
