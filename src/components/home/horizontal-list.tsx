"use client"

import { useRef, useState } from "react"
import { MovieOrSerie } from "@/types/tmdb"
import { ScrollButton } from "@/components/elements/scroll-button"
import { MediaCard } from "@/components/home/media/media-card"

type Props = {
  title: string
  items: MovieOrSerie[]
}

export const HorizontalList = ({ title, items }: Props) => {
  const [preventClick, setPreventClick] = useState(false)

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

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!listRef.current) return
    isDragging.current = true
    setPreventClick(false)
    startX.current = e.clientX
    scrollLeft.current = listRef.current.scrollLeft
    listRef.current.classList.add("cursor-grabbing")
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !listRef.current) return
    const walk = e.clientX - startX.current
    if (Math.abs(walk) > 5) setPreventClick(true)
    listRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handlePointerUp = () => {
    isDragging.current = false
    listRef.current?.classList.remove("cursor-grabbing")
    // reset após pequeno delay para não bloquear próximo clique
    setTimeout(() => setPreventClick(false), 50)
  }


  return (
    <section className="my-8 px-4 relative">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <ScrollButton direction="left" onClick={scrollLeftBtn} />
      <ScrollButton direction="right" onClick={scrollRightBtn} />

      <div
        ref={listRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerMove={handlePointerMove}
        className={`flex gap-4 overflow-x-auto no-scrollbar cursor-grab select-none`}
      >
        {items.map(item => (
          <MediaCard key={item.id} data={item} preventClick={preventClick} />
        ))}
      </div>
    </section>
  )
}
