import { getAllTrending } from "@/lib/tmdb"
import { HorizontalList } from "@/components/ui/horizontal-list"

export const TrendingSection = async () => {
  const data = await getAllTrending("day")

  return (
    <HorizontalList 
      title="Trending"
      items={data.results}
    />
  )
}