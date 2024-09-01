import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { X } from 'lucide-react'

type variantTypes = 'default' | 'destructive' | null | undefined 

interface CustomAlertProps {
  title: string,
  description: string,
  variant?: variantTypes,
  setErrorOrSuccess: (arg: boolean) => void
}

function CustomAlert( { title, description, setErrorOrSuccess, variant = 'default'}: CustomAlertProps) {
  return (
    <Alert variant={variant} className="absolute bottom-4 right-4 w-[25%]">
        <div className='flex flex-row justify-between'>
           <AlertTitle>{title}</AlertTitle>
           <X className='hover:cursor-pointer' onClick={() => {
            setErrorOrSuccess(false)
           }} />
           </div>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
  )
}

export default CustomAlert