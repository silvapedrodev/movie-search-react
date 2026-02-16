import { SearchMultiItem } from "@/types/tmdb"
import { SearchResultCard } from "../home/search-result-card"

type SearchListProps = {
  item: SearchMultiItem[]
}

export const SearchList = ({ item }: SearchListProps) => {
  return (
    <div className="relative grid grid-cols-[repeat(auto-fill,minmax(120px,auto))] gap-4 px-4 pt-22">
      {item.map(item => (
        <SearchResultCard key={item.id} data={item} />
      ))}
    </div>
  )
}
