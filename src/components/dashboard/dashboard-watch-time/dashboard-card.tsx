import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DashboardCardProps = React.ComponentProps<typeof Card>

export function DashboardCard({ className, ...props }: DashboardCardProps) {
  return (
    <Card
      className={cn(
        "bg-slate-900 text-white border border-purple-900/30",
        className
      )}
      {...props}
    />
  )
}