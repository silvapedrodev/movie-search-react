type Props = {
  overview?: string;
}

export const MediaOverview = ({ overview }: Props) => {
  if (!overview) return null

  return (
    <div className="py-2 space-y-2">
      <h4 className="font-bold text-2xl">Overview</h4>
      <p className="max-w-2xl">{overview}</p>
    </div>
  )
}
