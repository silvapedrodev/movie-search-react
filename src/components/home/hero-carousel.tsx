import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/thumbs';
import { MovieOrSerie } from "@/types/tmdb";
import Image from "next/image";
import { getTmdbImageUrl, getYear } from "@/utils/tmdb";
import { Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

type HeroCarouselProps = {
  data: MovieOrSerie[]
}

export const HeroCarousel = ({ data }: HeroCarouselProps) => {
  return (
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        className="w-full hero-swiper"
      >
        {[...data]
          .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
          .map(item => (
            <SwiperSlide key={item.id} className="space-y-4">
              <div className="relative w-full h-[450px] md:h-[650px]">
                <Image
                  src={getTmdbImageUrl(item.backdrop_path, "w1280")}
                  alt={item.title || item.name || "Poster"}
                  fill
                  className="absolute top-0 left-0 w-full h-full object-cover md:object-top-left"
                  priority
                />
                <div className="px-4">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 
                bg-linear-to-t from-black to-transparent" />
                  <h2 className="absolute bottom-0 text-4xl md:text-5xl font-bold">{item.name || item.title}</h2>
                </div>
              </div>
              <div className="md:max-w-2xl px-4 space-y-4">
                <p className="line-clamp-3 md:line-clamp-5">{item.overview}</p>
                <div className="flex gap-4">
                  <MediaTypeBadge label={item.media_type || "N/A"} />
                  <MediaTypeBadge label={getYear(item)} />
                  <MediaTypeBadge label={item.vote_average?.toFixed(1)} vote />
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
  )
}

type MediaTypeBadgeProps = {
  label: string | undefined
  vote?: boolean
}

const MediaTypeBadge = ({ label, vote }: MediaTypeBadgeProps) => {
  return (
    <div className="flex items-center gap-1 text-white text-sm uppercase font-bold bg-purple-550 w-fit px-2 py-1 rounded-md">
      {vote ? (
        <>
          <Star size={14} fill="white" stroke="none" />
          <span>{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </div>
  )
}