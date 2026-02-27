"use client"

import { toggleSeen, toggleWatchlist } from "@/actions/media-status"
import { MediaStatus, MediaType } from "@/types/tmdb"
import { useQueryClient } from "@tanstack/react-query"
import { createContext, ReactNode, useContext, useState, useTransition } from "react"

type MediaStatusContextType = {
  status: MediaStatus
  isPending: boolean
  handleToggleWatchlist: () => Promise<void>
  handleToggleSeen: () => Promise<void>
}

const MediaStatusContext = createContext<MediaStatusContextType | null>(null)

type Props = {
  children: ReactNode
  initialStatus: MediaStatus
  mediaId: number
  mediaType: MediaType
}

export const MediaStatusProvider = ({
  children,
  initialStatus,
  mediaId,
  mediaType }: Props
) => {
  const [status, setStatus] = useState<MediaStatus>(initialStatus)
  const [isPending, startTransition] = useTransition()

  const queryClient = useQueryClient()

  const handleToggleWatchlist = async () => {
    startTransition(async () => {
      try {
        const updated = await toggleWatchlist({ mediaId, mediaType })
        setStatus(updated)

        // library refetch
        queryClient.invalidateQueries({ queryKey: ["user-library"] })
      } catch {
        throw new Error("Failed to update watchlist status.")
      }
    })
  }

  const handleToggleSeen = async () => {
    startTransition(async () => {
      try {
        const updated = await toggleSeen({ mediaId, mediaType })
        setStatus(updated)

        // library refetch
        queryClient.invalidateQueries({ queryKey: ["user-library"] })
      } catch {
        throw new Error("Failed to update seen status.")
      }
    })
  }

  return (
    <MediaStatusContext.Provider value={{
      status,
      isPending,
      handleToggleWatchlist,
      handleToggleSeen
    }}
    >
      {children}
    </MediaStatusContext.Provider>
  )
}

export const useMediaStatus = () => {
  const context = useContext(MediaStatusContext)
  if (!context) throw new Error("useMediaStatus must be used within MediaStatusProvider")
  return context
}