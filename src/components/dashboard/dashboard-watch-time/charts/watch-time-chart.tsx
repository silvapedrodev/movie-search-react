"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { DashboardCard } from "@/components/dashboard/dashboard-watch-time/dashboard-card"
import { getChartData, type ChartPeriod } from "@/actions/time-watch-actions"
import { formatMinutes } from "@/utils/format-minutes"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { BarChart2 } from "lucide-react"
import { DashboardCardTitle } from "@/components/dashboard/dashboard-watch-time/dashboard-card-title"

const chartConfig = {
  minutes: {
    label: "Watch Time",
    color: "var(--color-purple-550)",
  },
} satisfies ChartConfig

const periods: { label: string; value: ChartPeriod }[] = [
  { label: "Days", value: "days" },
  { label: "Months", value: "months" },
  { label: "Years", value: "years" },
]

export const WatchTimeChart = () => {
  const [period, setPeriod] = useState<ChartPeriod>("days")

  const { data } = useQuery({
    queryKey: ["chart", period],
    queryFn: () => getChartData(period),
    staleTime: Infinity,
  })

  return (
    <DashboardCard>
      <DashboardCardTitle label="Watch Time" Icon={BarChart2} />
      <CardHeader className="pt-0">
        <div className="flex gap-2">
          {periods.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer
                ${period === p.value
                  ? "bg-purple-550 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data ?? []} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} stroke="#1e293b" />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-slate-900 border border-slate-700 text-slate-200"
                  formatter={(value) => formatMinutes(Number(value))}
                />
              }
            />
            <Bar
              dataKey="minutes"
              fill="var(--color-minutes)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                fontSize={11}
                fill="#64748b"
                formatter={(value: number) => value > 0 ? formatMinutes(value) : ""}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </DashboardCard>
  )
}