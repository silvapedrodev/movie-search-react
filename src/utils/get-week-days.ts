export const getWeekDays = () => {
  const today = new Date()

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today)
    day.setDate(today.getDate() - (6 - i))
    return {
      label: day.toLocaleDateString("en-US", { weekday: "short" }),
      date: day.toISOString().split("T")[0],
      dayNumber: day.getDate(),
      isToday: day.toDateString() === today.toDateString(),
    }
  })
}