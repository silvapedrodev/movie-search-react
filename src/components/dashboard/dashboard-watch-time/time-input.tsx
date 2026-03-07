"use client"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TimeInputProps = {
  value: { hours: number; minutes: number; seconds: number }
  onChange: (value: { hours: number; minutes: number; seconds: number }) => void
  className?: string
}

export const TimeInput = ({ value, onChange, className }: TimeInputProps) => {

  const handleChange = (
    field: "hours" | "minutes" | "seconds",
    raw: string,
    max: number
  ) => {
    const val = parseInt(raw)
    onChange({
      ...value,
      [field]: isNaN(val) ? 0 : Math.min(max, Math.max(0, val)),
    })
  }

  const format = (val: number) => String(val).padStart(2, "0")

  const inputClass = `
    w-14 text-center text-xl md:text-2xl font-mono border-none shadow-none
    focus-visible:ring-0 bg-transparent text-white
    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none
  `

  const fields = [
    { field: "hours",   max: 23, label: "h",   value: value.hours   },
    { field: "minutes", max: 59, label: "min",  value: value.minutes },
    { field: "seconds", max: 59, label: "seg",  value: value.seconds },
  ] as const

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {fields.map(({ field, max, label, value: fieldValue }, index) => (
        <div key={field} className="flex items-center gap-1">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            max={max}
            value={format(fieldValue)}
            onChange={e => handleChange(field, e.target.value, max)}
            className={`focus-visible:ring-0 selection:bg-purple-550 ${inputClass}`}
          />
          <span className="text-slate-400 text-sm md:text-lg select-none">{label}</span>
          {index < fields.length - 1 && (
            <span className="text-slate-600 font-bold text-lg select-none mx-1">:</span>
          )}
        </div>
      ))}
    </div>
  )
}