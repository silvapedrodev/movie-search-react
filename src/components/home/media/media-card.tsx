"use client"

import Image from "next/image"
import { MovieOrSerie } from "@/types/tmdb"
import { getTmdbImageUrl, getYear } from "@/utils/tmdb"
import { Star } from "lucide-react"
import Link from "next/link"

type Props = {
  data: MovieOrSerie
}

export const MediaCard = ({ data }: Props) => {
  return (
    <Link
      href={`/${data.media_type ? data.media_type : 'movie'}/${data.id}`}
      className="w-32 sm:w-40 md:w-48 lg:w-56 shrink-0"
    >
      <div className="relative aspect-2/3">
        <Image
          src={getTmdbImageUrl(data.poster_path)}
          alt={data.title || data.name || "Unknown"}
          draggable={false}
          fill
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
          className="object-cover rounded-xl drop-shadow-[1px_1px_15px_rgba(151,71,255,0.1)]"
        />
        <div
          className="absolute bottom-1 left-2 font-bold text-sm"
        >
          {getYear(data)}
        </div>
        <div
          className="flex items-center gap-1 absolute bottom-1 right-2 text-sm font-bold">
          <Star size={14} fill="white" stroke="none" />
          {data.vote_average?.toFixed(1)}
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold">{data.title || data.name}</p>
    </Link>
  )
}
