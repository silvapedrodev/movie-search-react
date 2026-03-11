import { FooterHome } from "@/components/home/footer";
import { ContentWrapper } from "@/components/home/content-wrapper";
import { getAllTrending, getPopular } from "@/lib/tmdb";
import { MediaList } from "@/components/media/media-list";

export default async function Page() {
  const trendingData = await getAllTrending("week")

  const getTrendingSectionData = await getAllTrending()
  const getPopularMovieSectionData = await getPopular("movie", "week")
  const getPopularTvSectionData = await getPopular("tv", "week")

  return (
    <main>
      <ContentWrapper heroData={trendingData?.results || []}>
        <>
          <MediaList
            title="Trending"
            items={getTrendingSectionData.results}
          />
          <MediaList
            title="Popular - Movies"
            items={getPopularMovieSectionData.results}
          />
          <MediaList
            title="Popular - Series"
            items={getPopularTvSectionData.results}
          />
          <FooterHome />
        </>
      </ContentWrapper>
    </main>
  )
}
