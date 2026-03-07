export const formatMinutes = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hrs === 0) return `${mins}min`
  if (mins === 0) return `${hrs}${hrs === 1 ? "hr" : "hrs"}`
  return `${hrs}${hrs === 1 ? "hr" : "hrs"} ${mins}min`
}