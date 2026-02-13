import { SearchMultiItem } from "@/types/tmdb"
import { getTmdbImageUrl } from "@/utils/tmdb"
import Image from "next/image"

type Props = {
  data: SearchMultiItem
}

export const SearchResultCard = ({ data }: Props) => {
  if (!data.poster_path) return null 

  return (
    <div>
      <p>{data.name}</p>
      <Image
        src={getTmdbImageUrl(data.poster_path)}
        alt={`Poster de ${data.name}`}
        width={300}
        height={450}
      />
    </div>
  )
}
