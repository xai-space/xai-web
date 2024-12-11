import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'

export function Rename() {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log(1)
  }

  return (
    <div className=" absolute right-2 top-1/2 -translate-y-1/2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto bg-border-bg mr-4">
          <DropdownMenuItem onClick={handleClick}>Rename</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
