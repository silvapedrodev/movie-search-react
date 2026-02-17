import { SearchMultiItem } from "@/types/tmdb"
import { getTmdbImageUrl } from "@/utils/tmdb"
import { Film, Monitor } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  data: SearchMultiItem
}

export const SearchResultCard = ({ data }: Props) => {
  if (!data.poster_path) return null

  return (
    <Link
      href={`/${data.media_type ? data.media_type : 'movie'}/${data.id}`}
      className="w-full hover:scale-105 transition-transform duration-200"
    >
      <div className="relative aspect-2/3">
        <Image
          src={getTmdbImageUrl(data.poster_path, "w500")}
          alt={`Poster de ${data.name}`}
          fill
          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
          className="object-cover rounded-xl"
        />
        <div className="absolute top-1 right-2 font-bold">
          {data.media_type === "movie"
            ? <Film className="size-5" />
            : <Monitor className="size-5" />
          }
        </div>
      </div>
    </Link>

  )
}
