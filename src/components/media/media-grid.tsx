import { UserMediaItem } from "@/actions/library"
import { MediaCardDashboard } from "@/components/media/media-card-dashboard"
import { EmptyState } from "@/components/dashboard/empty-state"
import { SortOption } from "@/types/tmdb"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { SortDropdownMenu } from "@/components/dashboard/filter-button"

type Props = {
  items: UserMediaItem[]
  sortMode: SortOption
  onChangeSort?: (mode: SortOption) => void
}

const sortLabel: Record<SortOption, string> = {
  random: "Random",
  "a-z": "Alphabetical",
  last: "Last added",
}

export const MediaGrid = ({ items, sortMode, onChangeSort }: Props) => {
  if (!items.length) return <EmptyState />

  return (
    <>
      <div className="flex gap-2 items-center mt-4">
        <p className="text-sm font-bold tracking-wide">
          {items.length}
          {items.length === 1 ? ' title ' : ' titles '}
          sorted by
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="
                px-3 py-1.5 rounded-full text-xs font-semibold
                bg-slate-800 text-white border border-slate-600
                inline-flex items-center gap-1 hover:bg-purple-850
              "
            >
              {sortLabel[sortMode]}
              <ChevronDown size={14} />
            </button>
          </DropdownMenuTrigger>

          {onChangeSort && (
            <SortDropdownMenu current={sortMode} onSelect={onChangeSort} />
          )}
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(388px,1fr))] gap-4 py-4">
        {items.map((item) => (
          <MediaCardDashboard
            key={item.mediaId}
            data={item.tmdb}
            mediaType={item.media_type}
          />
        ))}
      </div>
    </>
  )
}