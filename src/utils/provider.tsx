"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useEffect, useState, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { SearchInput } from "@/components/ui/search-input"
import { SearchList } from "@/components/home/search/search-list"
import { SearchSkeletonList } from "@/components/home/search/search-skeleton-list"
import { NotFoundMessage } from "@/components/ui/not-found-message"
import { MovieOrSerie } from "@/types/tmdb"
import { HeroCarousel } from "@/components/home/hero-carousel"

type Props = {
  children: ReactNode
}

export const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

type SearchProviderProps = {
  children: ReactNode
  heroData?: MovieOrSerie[]
}

export const SearchProvider = ({ children, heroData }: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState("")
  const [inputValue, setInputValue] = useState("")
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["search", searchValue],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/search?q=${searchValue}&page=${pageParam}`)
      return res.json()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
      return undefined
    },
    enabled: searchValue.length > 0
  })

  const allResults = data?.pages.flatMap((page) => page.results) ?? []
  const uniqueResults = allResults.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  )

  const isSearching = searchValue.length > 0
  const showNotFound = isSearching && !isLoading && uniqueResults.length === 0

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setSearchValue(inputValue), 500)
    return () => clearTimeout(timer)
  }, [inputValue])

  // Infinite scroll observer
  useEffect(() => {
    if (!hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage()
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    )

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
      
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <div className="relative min-h-screen bg-[linear-gradient(249deg,#030A1B_68.64%,#9747FF_206.69%)]">
      {/* Search Input sempre visível */}
      <SearchInput onSearch={setInputValue} />

      {isSearching ? (
        showNotFound ? (
          <NotFoundMessage searchValue={searchValue} />
        ) : (
          <>
            <SearchList item={uniqueResults} />
            {isFetchingNextPage && <SearchSkeletonList amount={6} />}
            <div ref={loadMoreRef} className="h-10" />
          </>
        )
      ) : (
        <>
          {heroData && <HeroCarousel data={heroData} />}
          {children}
        </>
      )}
    </div>
  )
}
