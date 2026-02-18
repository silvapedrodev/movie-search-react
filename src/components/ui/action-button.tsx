import { LucideIcon } from "lucide-react"

type ActionButtonProps = {
  icon?: LucideIcon
  label: string
  filled?: boolean
  onClick?: () => void
  className?: string
}

export default function ActionButton({
  icon: Icon,
  label,
  onClick,
  filled = false,
  className = ""
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 
                  bg-purple-800 hover:bg-purple-550/90 
                  transition-colors duration-200
                  px-4 py-3 w-full rounded-lg text-center 
                  font-medium hover:cursor-pointer${className}`}
    >
      {Icon && (
        <Icon
          size={18}
          fill={filled ? "currentColor" : "none"}
          stroke={filled ? "none" : "currentColor"}
        />
      )}
      <span>{label}</span>
    </button>
  )
}
