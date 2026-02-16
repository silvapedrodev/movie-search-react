import { MediaCardSkeleton } from "../home/media/media-card-skeleton"

type Props = {
  amount?: number
}

export const SearchSkeletonList = ({ amount = 12 }: Props) => {
  return (
    <div className="relative grid grid-cols-[repeat(auto-fill,minmax(120px,auto))] gap-4 px-4 pt-22">
      {Array.from({ length: amount }).map((_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </div>
  )
}
