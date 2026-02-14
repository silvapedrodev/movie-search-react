import { FooterHome } from "@/components/home/footer";
import { HomeContent } from "@/components/home/home-content";
import { PopularMoviesSection } from "@/components/home/popular-movies-section";
import { PopularTvSection } from "@/components/home/popular-tv-section";
import { TrendingSection } from "@/components/home/trending-section";
import { getAllTrending } from "@/lib/tmdb";

export default async function Page() {
  const trendingData = await getAllTrending("week")

  return (
    <main className="bg-[linear-gradient(249deg,#030A1B_68.64%,#9747FF_206.69%)]">
      <HomeContent heroData={trendingData?.results || []}>
        <TrendingSection />
        <PopularMoviesSection />
        <PopularTvSection />
      </HomeContent>
      <FooterHome />
    </main>
  )
}
