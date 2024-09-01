import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Inventory } from "../Inventory/InventoryTypes"

interface ItemTableProps {
    itemData: Inventory[]
}

  
export function ItemTable({itemData}: ItemTableProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[104px]">Item Name</TableHead>
            <TableHead>Part Number</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemData.map((item: Inventory) => (
            <TableRow key={item.itemId}>
              <TableCell className="font-medium">{item.itemName}</TableCell>
              <TableCell>{item.partNumber}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  