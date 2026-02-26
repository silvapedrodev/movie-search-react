import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export const DashboardSection = () => {

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold relative after:block after:w-14 after:h-1 after:bg-purple-550 after:mt-2">
        My List
      </h3>

      <div className="py-7">
        <Tabs defaultValue="all">
          <TabsList className="flex gap-2 bg-slate-800 border-none p-0 py-5 rounded-full">
            <TabsTrigger value="all" className="tab-trigger">All</TabsTrigger>
            <TabsTrigger value="movies" className="tab-trigger">Movies</TabsTrigger>
            <TabsTrigger value="tv-show" className="tab-trigger">Tv Show</TabsTrigger>
          </TabsList>

          <TabsContent value="all">All content</TabsContent>
          <TabsContent value="movies">Movies content</TabsContent>
          <TabsContent value="tv-show">Seen content</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}