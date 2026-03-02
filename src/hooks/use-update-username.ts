"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { updateUsername } from "@/actions/profile"

export function useUpdateUsername() {
  const router = useRouter()
  const { updateProfile } = useAuth()

  return useMutation({
    mutationFn: (username: string) => updateUsername(username),
    onSuccess: ({ username }) => {
      updateProfile(username)
      router.refresh()
    },
  })
}