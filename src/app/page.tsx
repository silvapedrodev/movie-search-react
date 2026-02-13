import { FooterHome } from "@/components/home/footer";
import { Home } from "@/components/home/home";
import { PopularMoviesSection } from "@/components/home/popular-movies-section";
import { PopularTvSection } from "@/components/home/popular-tv-section";
import { TrendingSection } from "@/components/home/trending-section";

export default function Page() {
  return (
    <main className="px-3 bg-[linear-gradient(249deg,#030A1B_68.64%,#9747FF_206.69%)]">
      <div>
        Carrossel
      </div>
      <Home>
        <TrendingSection />
        <PopularMoviesSection />
        <PopularTvSection />
      </Home>
      <FooterHome />
    </main>
  )
}
