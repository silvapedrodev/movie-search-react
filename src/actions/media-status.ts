"use server"

import { createClient } from "@/lib/supabase/server"
import { MediaStatus, MediaType } from "@/types/tmdb"

type TargetStatus = "watchlist" | "seen"

type ToggleInput = {
  mediaType: MediaType
  mediaId: number
  targetStatus: TargetStatus
}

const getUserId = async () => {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error("User not authenticated")
  }

  return { supabase, userId: user.id }
}


const toggleStatus = async ({
  mediaType,
  mediaId,
  targetStatus,
}: ToggleInput): Promise<MediaStatus> => {
  const { supabase, userId } = await getUserId()

  const { data, error } = await supabase.rpc("toggle_media_status", {
    p_user_id: userId,
    p_media_id: mediaId.toString(),
    p_media_type: mediaType,
    p_target_status: targetStatus,
  })

  if (error) throw error

  // RPC returns: 'watchlist' | 'seen' | 'removed'
  return {
    isSeen: data === "seen",
    isWatchlist: data === "watchlist",
  }
}

export const toggleWatchlist = async (input: Omit<ToggleInput, "targetStatus">) =>
  toggleStatus({ ...input, targetStatus: "watchlist" })

export const toggleSeen = async (input: Omit<ToggleInput, "targetStatus">) =>
  toggleStatus({ ...input, targetStatus: "seen" })