
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode } from "react"
import { Inventory } from "../Inventory/InventoryTypes"
import { ItemTable } from "./ItemTable"

interface ItemDeatilsProps {
    children: ReactNode,
    itemDetails: Inventory[]
}


export function ItemDetails({children, itemDetails}: ItemDeatilsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-100">
        <ItemTable itemData={itemDetails} />
      </PopoverContent>
    </Popover>
  )
}
