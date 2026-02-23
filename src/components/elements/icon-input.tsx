import { LucideIcon } from "lucide-react"

type IconInputProps = {
  icon: LucideIcon
  className?: string
}

export function IconInput({ icon: Icon, className }: IconInputProps) {
  return (
    <Icon
      className={`size-6 text-slate-400 ${className || ""}`}
    />
  )
}