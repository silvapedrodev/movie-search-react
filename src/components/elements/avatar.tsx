import Link from "next/link"

type AvatarProps = {
  size?: number
  letter?: string | null
}

export const Avatar = ({ size = 8, letter }: AvatarProps) => {
  return (
    <Link
      href="/protected"
      className={`w-${size} h-${size} rounded-full border border-purple-550 bg-purple-900 flex items-center justify-center text-sm font-medium text-white hover:cursor-pointer overflow-hidden shrink-0`}
      style={{ width: "2rem", height: "2rem" }}
      aria-label={letter ? `Perfil de ${letter}` : "Perfil"}
    >
      {letter ?? ""}
    </Link>
  )
}