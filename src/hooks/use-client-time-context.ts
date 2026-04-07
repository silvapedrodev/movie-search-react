"use client"

import { getClientTimeContext } from "@/utils/client-time-context"
import { useEffect, useState } from "react"

export const useClientTimeContext = () => {
  const [timeContext, setTimeContext] = useState(getClientTimeContext)

  useEffect(() => {
    const syncTimeContext = () => setTimeContext(getClientTimeContext())
    const interval = window.setInterval(syncTimeContext, 30000)
    window.addEventListener("focus", syncTimeContext)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener("focus", syncTimeContext)
    }
  }, [])

  return timeContext
}
