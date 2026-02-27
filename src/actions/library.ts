"use server"

import { createClient } from "@/lib/supabase/server"
import { getItemByTmdbId } from "@/lib/tmdb"
import { MediaItem, MediaType } from "@/types/tmdb"

type UserMediaRow = {
  media_id: string
  media_type: MediaType
  status: "seen" | "watchlist"
  created_at: string
}

export type UserMediaItem = {
  mediaId: number
  media_type: MediaType
  status: "seen" | "watchlist"
  createdAt: string
  tmdb: MediaItem
}

export type UserLibraryResponse = {
  seen: UserMediaItem[]
  watchlist: UserMediaItem[]
}

export async function getUserLibrary(): Promise<UserLibraryResponse> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { seen: [], watchlist: [] }

  const { data: rows, error } = await supabase
    .from("user_media")
    .select("media_id, media_type, status, created_at")
    .eq("user_id", user.id) as { data: UserMediaRow[] | null; error: any }

  if (error || !rows) return { seen: [], watchlist: [] }

  const uniqueByType = new Map<string, { type: MediaType; id: number }>()
  for (const row of rows) {
    const key = `${row.media_type}-${row.media_id}`
    if (!uniqueByType.has(key)) {
      uniqueByType.set(key, {
        type: row.media_type,
        id: Number(row.media_id),
      })
    }
  }

  const tmdbResults = await Promise.all(
    Array.from(uniqueByType.values()).map(async ({ type, id }) => {
      const tmdb = await getItemByTmdbId(type, id)
      return { key: `${type}-${id}`, tmdb }
    })
  )

  const tmdbMap = new Map(tmdbResults.map(r => [r.key, r.tmdb]))

  const seen: UserMediaItem[] = []
  const watchlist: UserMediaItem[] = []

  for (const row of rows) {
    const key = `${row.media_type}-${row.media_id}`
    const tmdb = tmdbMap.get(key)
    if (!tmdb) continue

    const item: UserMediaItem = {
      mediaId: Number(row.media_id),
      media_type: row.media_type,
      status: row.status,
      createdAt: row.created_at,
      tmdb,
    }

    if (row.status === "seen") {
      seen.push(item)
    } else {
      watchlist.push(item)
    }
  }

  return { seen, watchlist }
}