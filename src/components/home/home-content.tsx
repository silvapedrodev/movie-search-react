"use client"

import { ReactNode, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { SearchInput } from "@/components/ui/search-input"
import { SearchResultCard } from "@/components/home/search-result-card"
import { HeroCarousel } from "./hero-carousel"
import { MovieOrSerie } from "@/types/tmdb"

type Props = {
  children: ReactNode
  heroData: MovieOrSerie[]
}

export const HomeContent = ({ children, heroData }: Props) => {
  const [searchValue, setSearchValue] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchValue],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${searchValue}`)
      return res.json()
    },
    enabled: searchValue.length > 0
  })

  return (
    <>
      <HeroCarousel data={heroData} />
      <SearchInput onSearch={setSearchValue} />

      {isLoading && <p>Carregando...</p>}

      {searchValue.length > 0
        ? (data?.results?.map((item: any) => (
          <SearchResultCard key={item.id} data={item} />
        ))) : (
          <>
            {children}
          </>
        )}

    </>
  )
}
