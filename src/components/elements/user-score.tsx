type UserScoreProps = {
  rating: string
  size?: number
}

export default function UserScore({ rating, size = 70 }: UserScoreProps) {
  const percent = Math.round(Number(rating) * 10)

  const getColor = () => {
    if (percent >= 70) return "#22c55e"
    if (percent >= 40) return "#eab308"
    return "#ef4444"
  }

  const color = getColor()

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${percent}%, #1f2937 ${percent}%)`
      }}
    >
      <div className="flex items-center justify-center w-[85%] h-[85%] bg-black rounded-full">
        <span className="text-white text-sm font-semibold">
          {percent}%
        </span>
      </div>
    </div>
  )
}
