import { UserMediaItem } from "@/actions/library"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaGrid } from "@/components/media/media-grid"
import { SortOption } from "@/types/tmdb"
import { sortItems } from "@/utils/sort-items"

type SubTab = "all" | "movies" | "tv-show"

type Props = {
  items: UserMediaItem[]
  subTab: SubTab
  onSubTabChange: (value: SubTab) => void
  sortMode: SortOption
  onSortChange: (mode: SortOption) => void
}

export const StatusTabs = ({ items, subTab, onSubTabChange, sortMode, onSortChange }: Props) => {
  const movies = items.filter(i => i.media_type === "movie")
  const tv = items.filter(i => i.media_type === "tv")

  return (
    <Tabs value={subTab} onValueChange={(value) => onSubTabChange(value as SubTab)}>
      <TabsList className="flex gap-2 bg-slate-800 border-none p-0 py-5 rounded-full">
        <TabsTrigger value="all" className="tab-trigger">All</TabsTrigger>
        <TabsTrigger value="movies" className="tab-trigger">Movies</TabsTrigger>
        <TabsTrigger value="tv-show" className="tab-trigger">Tv Show</TabsTrigger>
      </TabsList>

      <div>
        <TabsContent value="all">
          <MediaGrid
            items={sortItems(items, sortMode)}
            sortMode={sortMode}
            onChangeSort={onSortChange}
          />
        </TabsContent>
        <TabsContent value="movies">
          <MediaGrid
            items={sortItems(movies, sortMode)}
            sortMode={sortMode}
            onChangeSort={onSortChange}
          />
        </TabsContent>
        <TabsContent value="tv-show">
          <MediaGrid
            items={sortItems(tv, sortMode)}
            sortMode={sortMode}
            onChangeSort={onSortChange}
          />
        </TabsContent>
      </div>
    </Tabs>
  )
}