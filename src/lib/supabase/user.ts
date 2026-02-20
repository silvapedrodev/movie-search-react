import { createClient } from "./server"

type UserData = {
  userId: string
  username: string
  email: string
  watchlist: string[]
  seen: string[]
  error?: string
}

export async function getUserData(): Promise<UserData> {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) return { error: error?.message || 'No user' } as UserData

  const user = data.user

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username, email')
    .eq('id', user.id)
    .single()

  if (profileError) return { error: profileError.message } as UserData

  const { data: watchlist } = await supabase
    .from('watchlist')
    .select('movie_id')
    .eq('user_id', user.id)

  const { data: seenMovies } = await supabase
    .from('seen_movies')
    .select('movie_id')
    .eq('user_id', user.id)

  return {
    userId: user.id,
    username: profile.username,
    email: profile.email,
    watchlist: watchlist?.map((w) => w.movie_id) || [],
    seen: seenMovies?.map((s) => s.movie_id) || [],
  }
}

export async function getUsername(): Promise<string | undefined> {
  const data = await getUserData()
  return data.username
}

export async function getEmail(): Promise<string | undefined> {
  const data = await getUserData()
  return data.email
}

export async function getWatchlist(): Promise<string[] | undefined> {
  const data = await getUserData()
  return data.watchlist
}

export async function getSeenMovies(): Promise<string[] | undefined> {
  const data = await getUserData()
  return data.seen
}