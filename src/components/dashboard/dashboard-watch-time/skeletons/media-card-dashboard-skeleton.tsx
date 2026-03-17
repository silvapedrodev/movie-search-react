import { Skeleton } from "@/components/ui/skeleton"

export const MediaCardDashboardSkeleton = () => {
  return (
    <div className="w-full min-h-screen mx-auto px-4 sm:px-6 lg:px-20 pt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4  py-4">
        <Skeleton className="h-8 w-32 bg-slate-800" />
        <Skeleton className="h-16 w-full md:h-8 md:w-2xs bg-slate-800" />
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-12 w-32 bg-slate-800" />
          <Skeleton className="h-12 w-32 bg-slate-800" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-8 w-32 bg-slate-800" />
          <Skeleton className="h-8 w-32 bg-slate-800" />
        </div>

        <Skeleton className="h-12 w-56 bg-slate-800 rounded-full" />
        <Skeleton className="h-12 w-80 bg-slate-800 rounded-full" />

        <Skeleton className="h-36 w-full md:w-md bg-slate-800 rounded-lg"/>
      </div>
    </div>
  )
}