"use client"

import { useState } from "react"
import { SearchInput } from "@/components/ui/search-input"

type Props = {
  onSearch?: (value: string) => void
}

export const SearchWrapper = ({ onSearch }: Props) => {
  const [value, setValue] = useState("")

  return (
    <SearchInput
      onSearch={(value) => {
        setValue(value)
        if (onSearch) onSearch(value)
      }}
    />
  )
}
