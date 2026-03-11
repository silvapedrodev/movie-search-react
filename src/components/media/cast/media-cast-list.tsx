"use client"

import { HorizontalList } from "@/components/home/horizontal-list"
import { MediaCast } from "@/types/tmdb"
import { MediaCastCard } from "@/components/media/cast/media-cast-card"

type Props = {
  items: MediaCast[]
}

export const MediaCastList = ({ items }: Props) => (
  <HorizontalList
    items={items}
    limit={12}
    renderItem={(item, preventClick, index) => (
      <MediaCastCard key={index} data={item} preventClick={preventClick} />
    )}
  />
)