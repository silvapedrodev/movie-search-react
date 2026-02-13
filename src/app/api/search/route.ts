import { SearchMultiItem } from "@/types/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchText = req.nextUrl.searchParams.get("q")

    if (!searchText) {
      return NextResponse.json({ results: [] })
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchText)}&page=1`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    })

    const data = await res.json()
    const filteredResults = data.results.filter(
      (item: SearchMultiItem) =>
        item.media_type === "movie" || item.media_type === "tv"
    )

    return NextResponse.json({
      ...data,
      results: filteredResults,
    })
  } catch (err) {
    console.error("Erro na API Route:", err)
    return NextResponse.json({ err: "Erro ao buscar filmes" }, { status: 500 })
  }
}