"use client"

import Image from "next/image"
import { MediaCast } from "@/types/tmdb"
import { getTmdbImageUrl } from "@/utils/tmdb"

type Props = {
  data: MediaCast
  preventClick?: boolean
}

export const MediaCastCard = ({ data, preventClick }: Props) => {
  return (
    <div
      className="w-32 sm:w-40 md:w-48 lg:w-56 shrink-0"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onClick={(e) => {
        if (preventClick) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      <div className="relative aspect-2/3">
        <Image
          src={getTmdbImageUrl(data.profile_path, "w185")}
          alt={data.name || "Unknown"}
          draggable={false}
          fill
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
          className="object-cover rounded-xl drop-shadow-[1px_1px_15px_rgba(151,71,255,0.1)]"
        />
        <div
          className="absolute bottom-1 left-2 font-bold text-sm"
        >
        </div>
      </div>
      <p className="mt-2 text-md font-semibold">{data.name}</p>
      <p className="text-sm text-white/40">{data.character}</p>
    </div>
  )
}
