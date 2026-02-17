"use client"

import { ReactNode } from "react"
import { HeroCarousel } from "./hero-carousel"
import { MovieOrSerie } from "@/types/tmdb"

type Props = {
  children: ReactNode
  heroData: MovieOrSerie[]
}

export const ContentWrapper = ({ children, heroData }: Props) => {
  return (
    <div className="relative min-h-screen">
      <HeroCarousel data={heroData} />
      {children}
    </div>
  )
}
