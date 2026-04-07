"use client"

export type ClientTimeContext = {
  localDate: string
  timeZone: string
  utcOffsetMinutes: number
}

export const getClientTimeContext = (): ClientTimeContext => {
  const now = new Date()
  const localDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"

  return {
    localDate,
    timeZone,
    utcOffsetMinutes: -now.getTimezoneOffset(),
  }
}
