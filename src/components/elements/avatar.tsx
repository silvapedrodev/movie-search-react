import { User } from "lucide-react"
import Link from "next/link"

type AvatarProps = {
  size?: number
  letter?: string | null
  isDefault?: boolean
}

export const Avatar = ({ size = 8, letter, isDefault = false }: AvatarProps) => {
  return (
    <Link
      href="/profile"
      className={`w-${size} h-${size} rounded-full border border-purple-550 bg-purple-900 flex items-center justify-center text-sm font-medium text-white hover:cursor-pointer overflow-hidden hover:border-2 shrink-0`}
      aria-label={letter ? `User profile: ${letter}` : "User profile"}
    >
      {isDefault
        ? <User className="size-4" />
        : letter}
    </Link>
  )
}