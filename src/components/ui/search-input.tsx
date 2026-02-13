"use client"

import { Search } from "lucide-react"
import { useState } from "react"

type Props = {
  onSearch: (value: string) => void
}

export const SearchInput = ({ onSearch }: Props) => {
  const [value, setValue] = useState("")

  return (
    <div className="flex gap-2 items-center bg-gray-600 mt-5 px-4 py-2 rounded-md">
      <input
        type="text"
        value={value}
        placeholder="Movie or IMDb ID"
        className="outline-none flex-1 text-sm h-8"
        onChange={e => setValue(e.target.value)}
        onKeyDown={key => {
          if(key.code === "Enter") onSearch(value)
        }}
      />
      <Search 
        className="cursor-pointer"
        onClick={() => onSearch(value)}
      />
    </div>
  )
}