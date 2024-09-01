import { useState, useEffect, ReactNode} from 'react';

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
import axios from 'axios';

import { Item } from '@/types';
import { BACKEND_URL } from '@/constants';


interface UpdateDialogProps {
  children: ReactNode,
  item: Item,
  onSuccess: () => void
}

export function UpdateDialog({children, item, onSuccess}: UpdateDialogProps) {

    const [ increaseQuantity, setIncreaseQuantity ] = useState(0);
    const [ updatedQuantity, setUpdatedQuantity ] = useState(0);
    const [ updating, setUpdating] = useState(false)

    async function updateQuanityInBackend(){
      console.log("sending data to backend")
  
      try {
        setUpdating(true)
          const response = await axios.post(`${BACKEND_URL}/item/update`, {
            itemId: item.itemId,
            quantity: increaseQuantity
          })

          onSuccess()

          console.log("SUCCESS!")
          console.log("Axios Response : ", response)
          console.log("Axios Response.data : ", response.data)
        setUpdating(false)

      } catch (err) {
          console.log("An error occured : ", err)
          setUpdating(false)

      }
  }

    useEffect( () => {
        setIncreaseQuantity(0)
    }, [])

    useEffect( () => {
        const newQuantity = item.quantity + increaseQuantity
        setUpdatedQuantity(newQuantity)
    }, [increaseQuantity])
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
          <DialogDescription>
           {item.itemName} {item.partNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentQuantity" className="text-right">
              Current
            </Label>
            <Input
              id="currentQuantity"
              value={item.quantity}
              className="col-span-3"
              type='number'
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="increase" className="text-right">
              Increase
            </Label>
            <Input
              id="increase"
              className="col-span-3"
              type='number'
              onChange={(e) => {
                setIncreaseQuantity(Number(e.target.value))
              }}
              disabled={updating}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="updatedQuantity" className="text-right">
              Updated
            </Label>
            <Input
              value={updatedQuantity}
              id="updatedQuantity"
              className="col-span-3"
              type='number'
              disabled={true}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={updateQuanityInBackend} disabled={updating}>{updating ?  "Updating...": "Update"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
