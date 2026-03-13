import { MediaCard } from "@/components/home/media/media-card"
import { MovieOrSerie } from "@/types/tmdb"

export const MediaRecommendation = ({ items }: { items: MovieOrSerie[] }) => {
  return (
    <div>
      <h2 className="px-4 pt-8 pb-4 md:px-12 font-bold text-2xl md:text-4xl">
        Recommendations
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,auto))] md:grid-cols-[repeat(auto-fill,minmax(226px,auto))] px-4 gap-2">
        {items.map((item, index) => (
          <MediaCard key={index} data={item} />
        ))}
      </div>
    </div>
  )
}