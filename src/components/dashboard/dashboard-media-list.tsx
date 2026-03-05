"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterButton } from "@/components/dashboard/filter-button"
import { useUserLibrary } from "@/hooks/use-user-library"
import { StatusTabs } from "@/components/dashboard/status-tabs"
import { useState } from "react"
import { MediaCardDashboardSkeleton } from "@/components/media/media-dashboard-skeleton"
import { useUserSortMode } from "@/hooks/use-user-sort-mode"

type StatusTab = "seen" | "watchlist"

export const DashboardMediaList = () => {
  const { data, isLoading, isError } = useUserLibrary()

  const [statusTab, setStatusTab] = useState<StatusTab>("watchlist")
  const [subTab, setSubTab] = useState<"all" | "movies" | "tv-show">("all")

  const { sortMode, setSortMode, isLoading: isSortLoading } = useUserSortMode()

  if (isLoading) {
    return <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <MediaCardDashboardSkeleton key={i} />
      ))}
    </div>
  }

  if (isError || !data) {
    return <div className="py-7">Could not load your list.</div>
  }

  const { seen, watchlist } = data

  return (
    <div>
      <div className="py-7">
        <Tabs
          value={statusTab}
          onValueChange={(value) => setStatusTab(value as StatusTab)}
        >
          <div className="flex items-center justify-between">
            <TabsList className="flex gap-2 bg-slate-800 border-none p-0 py-5 rounded-full">
              <TabsTrigger value="watchlist" className="tab-trigger">Watchlist</TabsTrigger>
              <TabsTrigger value="seen" className="tab-trigger">Seen</TabsTrigger>
            </TabsList>

            <FilterButton
              current={sortMode}
              onSelect={setSortMode}
            />
          </div>

          <TabsContent value="watchlist" className="mt-4">
            <StatusTabs
              items={watchlist}
              subTab={subTab}
              onSubTabChange={setSubTab}
              sortMode={sortMode}
              onSortChange={setSortMode}
            />
          </TabsContent>
          <TabsContent value="seen" className="mt-4">
            <StatusTabs
              items={seen}
              subTab={subTab}
              onSubTabChange={setSubTab}
              sortMode={sortMode}
              onSortChange={setSortMode}
            />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}