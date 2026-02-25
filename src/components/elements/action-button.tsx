import { LucideIcon } from "lucide-react"

type ActionButtonProps = {
  icon?: LucideIcon
  label: string
  filled?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function ActionButton({
  icon: Icon,
  label,
  onClick,
  filled = false,
  className = "",
  disabled = false
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 
                   hover:bg-purple-550/90 
                  transition-colors duration-200
                  px-4 py-3 w-full rounded-lg text-center 
                  font-medium hover:cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${filled ? 'bg-purple-550 shadow-[0_0_10px_rgba(168,85,247,0.9),0_0_10px_rgba(168,85,247,0.6)]' : 'bg-slate-800'}
                  ${className}`}
    >
      {Icon && (
        <Icon
          size={18}
        />
      )}
      <span>{label}</span>
    </button>
  )
}
