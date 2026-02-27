import { ArrowDownAZ, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SortOption } from "@/types/tmdb"

const sortLabel: Record<SortOption, string> = {
  random: "Random",
  "a-z": "Alphabetical",
  last: "Last added",
}

type MenuProps = {
  current: SortOption
  onSelect: (option: SortOption) => void
}

export const SortDropdownMenu = ({ current, onSelect }: MenuProps) => (
  <DropdownMenuContent className="bg-slate-800 text-white border-slate-600">
    <DropdownMenuRadioGroup
      value={current}
      onValueChange={(value) => onSelect(value as SortOption)}
    >
      <DropdownMenuRadioItem value="random">
        Random
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="a-z">
        Alphabetical
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="last">
        Last added
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
)

type FilterButtonProps = {
  current: SortOption
  onSelect: (option: SortOption) => void
}

export const FilterButton = ({ current, onSelect }: FilterButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={
            "rounded-lg hover:bg-purple-850 hover:cursor-pointer flex items-center gap-2 " +
            (current === "random" ? "bg-slate-800" : "bg-purple-550")
          }
        >
          <ArrowDownAZ size={18} />
          {sortLabel[current]}
          <ChevronDown size={16} className="ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <SortDropdownMenu current={current} onSelect={onSelect} />
    </DropdownMenu>
  )
}