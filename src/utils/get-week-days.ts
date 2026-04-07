const DATE_KEY_REGEX = /^\d{4}-\d{2}-\d{2}$/

const formatDateKey = (date: Date) => {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const parseDateKey = (dateKey: string) => {
  if (!DATE_KEY_REGEX.test(dateKey)) return null

  const [year, month, day] = dateKey.split("-").map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null
  }

  return parsed
}

export const getWeekDays = (todayDateKey?: string) => {
  const fallbackNow = new Date()
  const fallbackBaseDate = new Date(Date.UTC(
    fallbackNow.getFullYear(),
    fallbackNow.getMonth(),
    fallbackNow.getDate(),
  ))
  const baseDate = parseDateKey(todayDateKey ?? "") ?? fallbackBaseDate

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(baseDate)
    day.setUTCDate(baseDate.getUTCDate() - (6 - i))

    return {
      label: day.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
      date: formatDateKey(day),
      dayNumber: day.getUTCDate(),
      isToday: formatDateKey(day) === formatDateKey(baseDate),
    }
  })
}