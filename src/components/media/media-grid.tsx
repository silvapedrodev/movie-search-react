import { UserMediaItem } from "@/actions/library"
import { MediaCardDashboard } from "@/components/media/media-card-dashboard"
import { EmptyState } from "@/components/dashboard/empty-state"

type Props = {
  items: UserMediaItem[]
}

export const MediaGrid = ({ items }: Props) => {
  if (!items.length) {
    return (
      <EmptyState />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(388px,1fr))] gap-4 py-4">
      <div className="flex gap-2 items-center">
        <p className="text-sm font-bold tracking-wide">
          {items.length}
          {items.length === 1 ? ' title ' : ' titles '}
          sorted by
        </p>
        alphabetical
      </div>

      {items.map((item) => (
        <MediaCardDashboard
          key={item.mediaId}
          data={item.tmdb}
          mediaType={item.media_type}
        />
      ))}
    </div>
  )
}