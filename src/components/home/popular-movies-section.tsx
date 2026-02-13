import { getPopular } from "@/lib/tmdb"
import { HorizontalList } from "@/components/ui/horizontal-list"

export const PopularMoviesSection = async () => {
  const data = await getPopular("movie", "week")

  return (
    <HorizontalList
      title="Popular - Movies"
      items={data.results}
    />
  )
}
