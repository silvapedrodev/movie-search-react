"use client"

import { useRef } from "react"
import { MovieOrSerie } from "@/types/tmdb"
import { ScrollButton } from "./scroll-button"
import { MediaCard } from "../home/media/media-card"

type Props = {
  title: string
  items: MovieOrSerie[]
}

export const HorizontalList = ({ title, items }: Props) => {
  const listRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)


  const scrollRightBtn = () => {
    if (!listRef.current) return
    listRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  const scrollLeftBtn = () => {
    if (!listRef.current) return
    listRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!listRef.current) return

    isDragging.current = true
    listRef.current.classList.add("cursor-grabbing")

    const rect = listRef.current.getBoundingClientRect()
    startX.current = e.clientX - rect.left
    scrollLeft.current = listRef.current.scrollLeft
  }

  const handleMouseUp = () => {
    isDragging.current = false
    listRef.current?.classList.remove("cursor-grabbing")
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    listRef.current?.classList.remove("cursor-grabbing")
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !listRef.current) return

    e.preventDefault()

    const rect = listRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const walk = x - startX.current

    listRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section className="my-8 px-4 relative">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <ScrollButton direction="left" onClick={scrollLeftBtn} />
      <ScrollButton direction="right" onClick={scrollRightBtn} />

      <div
        ref={listRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 overflow-x-auto no-scrollbar cursor-grab select-none`}
      >
        {items.map(item => (
          <MediaCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  )
}
