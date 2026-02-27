"use client"

import { UserLibraryResponse } from "@/actions/library"
import { useQuery } from "@tanstack/react-query"

async function fetchUserLibrary(): Promise<UserLibraryResponse> {
  const res = await fetch("/api/user/library", {
    credentials: "include"
  })

  if (!res.ok) throw new Error("Failed to load library")
  return res.json()
}

export function useUserLibrary() {
  return useQuery({
    queryKey: ["user-library"],
    queryFn: fetchUserLibrary,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  })
}