import { FooterHome } from "@/components/home/footer";
import { HomeContent } from "@/components/home/home-content";
import { HorizontalList } from "@/components/ui/horizontal-list";
import { getAllTrending, getPopular } from "@/lib/tmdb";

export default async function Page() {
  const trendingData = await getAllTrending("week")

  const getTrendingSectionData = await getAllTrending()
  const getPopularMovieSectionData = await getPopular("movie", "week")
  const getPopularTvSectionData = await getPopular("tv", "week")

  return (
    <main className="bg-[linear-gradient(249deg,#030A1B_68.64%,#9747FF_206.69%)]">
      <HomeContent heroData={trendingData?.results || []}>
        <HorizontalList
          title="Trending"
          items={getTrendingSectionData.results}
        />
        <HorizontalList
          title="Popular - Movies"
          items={getPopularMovieSectionData.results}
        />
        <HorizontalList
          title="Popular - Series"
          items={getPopularTvSectionData.results}
        />
      </HomeContent>
      <FooterHome />
    </main>
  )
}
