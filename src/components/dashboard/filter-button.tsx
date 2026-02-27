import { ArrowDownAZ } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type SortOption = "last" | "a-z" | "z-a"

type Props = {
  onSelect: (option: SortOption) => void
  current: SortOption
}

export const FilterButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-slate-800 rounded-lg hover:bg-purple-850 hover:cursor-pointer">
          <ArrowDownAZ size={18} />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-800 text-white border-slate-600 hover:bg">
        <DropdownMenuGroup>
          <DropdownMenuItem>Alphabetical</DropdownMenuItem>
          <DropdownMenuItem>Last Added</DropdownMenuItem>
          <DropdownMenuItem>Random</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}