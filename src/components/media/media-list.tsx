"use client"

import { HorizontalList } from "@/components/home/horizontal-list"
import { MediaCard } from "@/components/home/media/media-card"
import { MovieOrSerie } from "@/types/tmdb"

type Props = {
  title: string
  items: MovieOrSerie[]
}

export const MediaList = ({ title, items }: Props) => {
  return (
    <div className="my-8">
      <HorizontalList
        title={title}
        items={items}
        renderItem={(item, preventClick, index) => (
          <MediaCard key={index} data={item} preventClick={preventClick} />
        )}
      />
    </div>
  )
}