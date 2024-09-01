import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//@ts-ignore
export function AssignDialog({item, addAssignedItem, children}) {

  const [assingedQuantity, setAssignedQuantity] = useState(0)
  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false)

  useEffect(() => {

    if(assingedQuantity > item.quantity) {
      setIsQuantityInvalid(true)
    } else if (assingedQuantity < 0) {
      setIsQuantityInvalid(true)
    } else {
      setIsQuantityInvalid(false)
    }


  }, [assingedQuantity])

    return (
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button variant="outline">Edit Profile</Button> */}
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Item</DialogTitle>
            <DialogDescription>
              {item.itemName} { item.partNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="availableQuantity" className="text-right">
                Available Quantity
              </Label>
              <Input
                id="availableQuantity"
                defaultValue={item.quantity}
                className="col-span-3"
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Assign Quantity
              </Label>
              <Input
                id="quantity"
                onChange={(e) => {
                  setAssignedQuantity(Number(e.target.value))
                }}
                type='number'
                value={assingedQuantity}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"  disabled={isQuantityInvalid} onClick={() => {
              item.quantity =  assingedQuantity
              addAssignedItem(item)
            }}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }