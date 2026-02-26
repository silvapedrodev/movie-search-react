"use client"

import { Play, Search, User } from "lucide-react"
import Link from "next/link"
import { Avatar } from "./avatar"
import { useAuth } from "@/context/auth-context"

type Props = {
  value: string
  onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch, value }: Props) => {
  const { initialName, isLoggedIn } = useAuth()

  return (
    <div className="absolute max-w-5xl left-4 right-4 z-10 flex gap-4 items-center bg-gray-600/30 backdrop-blur-xs my-4 mx-auto px-4 py-2 rounded-lg border-[0.5px] border-purple-900">
      <Link href="/">
        <Play
          className="fill-purple-550 size-8 text-purple-550"
        />
      </Link>
      <input
        type="text"
        value={value}
        placeholder="Search for movies, tv shows..."
        className="outline-none flex-1 text-sm h-8 placeholder:text-white"
        onChange={(e) => onSearch(e.target.value)}
        onKeyDown={key => {
          if (key.code === "Enter") onSearch(value)
        }}
      />
      <Search
        className="cursor-pointer text-white"
        onClick={() => onSearch(value)}
      />
      {isLoggedIn ? ( // 👈 sem o !isLoading wrapping
        <Avatar letter={initialName} />
      ) : (
        <Avatar isDefault/>
      )}
    </div>
  )
}