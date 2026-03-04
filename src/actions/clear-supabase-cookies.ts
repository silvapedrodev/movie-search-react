"use server"

import { cookies } from "next/headers"

export async function clearSupabaseCookies() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  allCookies.forEach(({ name }) => {
    if (name.includes("sb-")) cookieStore.delete(name)
  })
}