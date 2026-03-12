"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { MediaVideo } from "@/types/tmdb"
import { Play } from "lucide-react"
import { useState } from "react"

export const MediaTrailer = ({ video }: { video: MediaVideo | null }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <h2 className="px-4 md:px-12 font-bold text-2xl md:text-4xl capitalize">Official Trailer</h2>
        <div className="p-4 flex justify-center">
          <div
            className="relative w-full max-w-4xl mx-auto aspect-video group rounded-lg cursor-pointer"
            style={{
              backgroundImage: `url(https://i.ytimg.com/vi/${video?.key}/hqdefault.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            onClick={() => setOpen(true)}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span>
                <Play
                  className="fill-white size-7 md:size-11 hover:fill-white/30 transition-all ease-in"
                  stroke="none"
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={() => { setOpen(false) }}>
        <DialogContent className="bg-slate-900 border-slate-800 p-0 rounded-lg [&>button]:top-6 [&>button]:right-4 md:max-w-6xl w-4xl flex flex-col gap-2">
          <DialogTitle className="text-2xl font-bold p-4">
            Official Trailer
          </DialogTitle>

          <iframe
            src={`https://www.youtube.com/embed/${video?.key}`}
            className="aspect-video overflow-hidden"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </>
  )
}