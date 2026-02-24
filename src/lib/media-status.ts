import { MediaStatus, MediaType } from "@/types/tmdb"
import { createClient } from "./supabase/server"

type Props = {
  mediaType: MediaType
  mediaId: number
}

export const getMediaStatus = async ({
  mediaType, mediaId
}: Props): Promise<MediaStatus> => {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { isSeen: false, isWatchlist: false }
  }

  const { data, error } = await supabase
    .from("user_media")
    .select("status")
    .eq("user_id", user.id)
    .eq("media_id", mediaId.toString())
    .eq("media_type", mediaType)
    .maybeSingle()

  if (error || !data) {
    return { isSeen: false, isWatchlist: false }
  }

  return {
    isSeen: data.status === "seen",
    isWatchlist: data.status === "watchlist"
  }
}