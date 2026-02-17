"use client"

import { Search } from "lucide-react"
import { useState } from "react"

type Props = {
  value: string
  onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch, value }: Props) => {

  return (
    <div className="absolute max-w-5xl top-0 left-4 right-4 z-10 flex gap-2 items-center bg-gray-600/30 backdrop-blur-xs mt-4 mx-auto px-4 py-2 rounded-lg border-[0.5px] border-purple-900">
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
      <div className="size-8 bg-purple-900 border border-purple-500 rounded-full flex items-center justify-center text-sm font-medium text-white hover:cursor-pointer">
        A
      </div>
    </div>
  )
}