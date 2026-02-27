import { UserMediaItem } from "@/actions/library"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaGrid } from "@/components/media/media-grid"

type SubTab = "all" | "movies" | "tv-show"

type Props = {
  items: UserMediaItem[]
  subTab: SubTab
  onSubTabChange: (value: SubTab) => void
}

export const StatusTabs = ({ items, subTab, onSubTabChange }: Props) => {
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
          <MediaGrid items={items} />
        </TabsContent>
        <TabsContent value="movies">
          <MediaGrid items={movies} />
        </TabsContent>
        <TabsContent value="tv-show">
          <MediaGrid items={tv} />
        </TabsContent>
      </div>
    </Tabs>
  )
}