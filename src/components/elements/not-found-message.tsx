"use client"

import { Search } from "lucide-react"

type Props = {
  searchValue: string
}

export const NotFoundMessage = ({ searchValue }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Search className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">No results found</h3>
      <p className="text-muted-foreground text-center max-w-md">
        We couldn’t find any movies or TV shows for "{searchValue}". 
        Try searching with different keywords.
      </p>
    </div>
  )
}
