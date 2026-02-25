// media-actions.tsx
"use client"

import { useMediaStatus } from "@/context/media-status-context"
import ActionButton from "@/components/elements/action-button"
import { Bookmark, Check } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export const MediaActions = () => {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { status, isPending, handleToggleWatchlist, handleToggleSeen } = useMediaStatus()

  const onWatchlistClick = async () => {
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    await handleToggleWatchlist()
  }

  const onSeenClick = async () => {
    if (!isLoggedIn) {
      router.push("/auth/login")
      return
    }
    await handleToggleSeen()
  }

  return (
    <div className="flex gap-4 max-w-3xs">
      <ActionButton
        label="Watchlist"
        icon={Bookmark}
        filled={status.isWatchlist}
        onClick={onWatchlistClick}
        disabled={isPending || status.isSeen}
      />
      <ActionButton
        label="Seen"
        icon={Check}
        filled={status.isSeen}
        onClick={onSeenClick}
        disabled={isPending || status.isWatchlist}
      />
    </div>
  )
}