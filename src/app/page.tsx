import { FooterHome } from "@/components/home/footer";
import { ContentWrapper } from "@/components/home/content-wrapper";
import { HorizontalList } from "@/components/home/horizontal-list";
import { getAllTrending, getPopular } from "@/lib/tmdb";

export default async function Page() {
  const trendingData = await getAllTrending("week")

  const getTrendingSectionData = await getAllTrending()
  const getPopularMovieSectionData = await getPopular("movie", "week")
  const getPopularTvSectionData = await getPopular("tv", "week")

  return (
    <main>
      <ContentWrapper heroData={trendingData?.results || []}>
        <>
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
          <FooterHome />
        </>
      </ContentWrapper>
    </main>
  )
}
