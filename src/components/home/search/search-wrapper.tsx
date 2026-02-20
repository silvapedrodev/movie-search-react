"use client"

import { useState } from "react"
import { SearchInput } from "@/components/elements/search-input"

type Props = {
  onSearch?: (value: string) => void
}

export const SearchWrapper = ({ onSearch }: Props) => {
  const [value, setValue] = useState("")

  return (
    <SearchInput
      value={value}
      onSearch={(value) => {
        setValue(value)
        if (onSearch) onSearch(value)
      }}
    />
  )
}
