"use client"

import { ReactNode, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { SearchInput } from "@/components/ui/search-input"
import { HeroCarousel } from "./hero-carousel"
import { MovieOrSerie } from "@/types/tmdb"
import { SearchList } from "../ui/search-list"
import { SearchSkeletonList } from "../ui/search-skeleton-list"

type Props = {
  children: ReactNode
  heroData: MovieOrSerie[]
}

export const HomeContent = ({ children, heroData }: Props) => {
  const [searchValue, setSearchValue] = useState("")
  const [inputValue, setInputValue] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchValue],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${searchValue}`)
      return res.json()
    },
    enabled: searchValue.length > 0
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(inputValue)
    }, 500) 

    return () => clearTimeout(timer)
  }, [inputValue])

  return (
    <div className="relative min-h-screen">
      <SearchInput onSearch={setSearchValue} />

      {isLoading && <SearchSkeletonList />}

      {searchValue.length > 0 && data?.results?.length > 0
        ? <SearchList item={data.results} /> : (
          <>
            <HeroCarousel data={heroData} />
            {children}
          </>
        )}

    </div>
  )
}
