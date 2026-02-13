import { searchMulti } from "@/lib/tmdb";

type Props = {
  params: Promise<{ type: string; id: string }>
}

export default async function MediaPage({ params }: Props) {
  const { type, id } = await params

  const data = await searchMulti(id)

  return (
    <main className="p-6">
      <p>Tipo: {type}</p>
      <p>ID: {id}</p>

    </main>
  )
}
