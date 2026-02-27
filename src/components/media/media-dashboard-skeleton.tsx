import { Skeleton } from "@/components/ui/skeleton"

export const MediaCardDashboardSkeleton = () => {
  return (
    <div className="flex bg-slate-800 rounded-lg overflow-hidden shadow-lg h-full">

      <div className="relative shrink-0 w-[120px] aspect-[2/3]">
        <Skeleton className="absolute inset-0 bg-slate-700" />
      </div>

      <div className="flex-1 p-4 flex flex-col space-y-2 min-w-0">
        <Skeleton className="h-5 w-3/4 bg-slate-700" />

        <Skeleton className="h-3 w-1/2 bg-slate-700" />

        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3 w-full bg-slate-700" />
          <Skeleton className="h-3 w-full bg-slate-700" />
          <Skeleton className="h-3 w-2/3 bg-slate-700" />
        </div>

        <Skeleton className="h-8 w-full bg-slate-700 rounded-lg" />
      </div>
    </div>
  )
}