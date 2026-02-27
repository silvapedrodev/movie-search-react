import { PlayCircle } from "lucide-react"
import Link from "next/link"

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-5 mt-4 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/50">

      <div className="flex flex-col justify-center items-center mb-2">
        <PlayCircle className="size-16 text-slate-700 mb-4" />
        <h3 className="text-xl font-semibold text-white">Your list is empty</h3>
      </div>

      <p className="text-slate-500 max-w-xs mb-4">
        You haven't added any titles to your list yet. Start exploring and save what you want to watch.
      </p>

      <Link
        href="/"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_10px_rgba(168,85,247,0.9),0_0_10px_rgba(168,85,247,0.6)]">
        Explore Titles
      </Link>
    </div>
  )
}