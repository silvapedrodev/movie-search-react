import { getPopular } from "@/lib/tmdb"
import { HorizontalList } from "@/components/ui/horizontal-list"

export const PopularTvSection = async () => {
  const data = await getPopular("tv", "week")

  return (
    <HorizontalList
      title="Popular - Series"
      items={data.results}
    />
  )
}
