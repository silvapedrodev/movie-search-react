"use client"

import { Search } from "lucide-react"
import { useState } from "react"

type Props = {
  onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch }: Props) => {
  const [value, setValue] = useState("")

  return (
    <div className="absolute max-w-5xl top-0 left-4 right-4 z-10 flex gap-2 items-center bg-gray-600/30 backdrop-blur-xs mt-4 mx-auto px-4 py-2 rounded-lg border-[0.5px] border-purple-900">
      <input
        type="text"
        value={value}
        placeholder="Search for movies, tv shows..."
        className="outline-none flex-1 text-sm h-8 placeholder:text-white"
        onChange={e => {
          setValue(e.target.value)
          onSearch(e.target.value) 
        }}
        onKeyDown={key => {
          if(key.code === "Enter") onSearch(value)
        }}
      />
      <Search 
        className="cursor-pointer text-white"
        onClick={() => onSearch(value)}
      />
    </div>
  )
}