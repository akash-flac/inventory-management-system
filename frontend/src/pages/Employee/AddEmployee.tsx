"use client"

import { useState } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BACKEND_URL } from '@/constants'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useRecoilValue } from 'recoil'
import { adminInfoState } from "@/Atoms/admin"

import CustomAlert from '@/components/CustomAlert';




const validatePhoneNumber = (value: string) => {
  // Regular expression for basic phone number format (adjust as needed)
  const phoneRegExp = /^\d+$/;
  if (!phoneRegExp.test(value)) {
      return false
  }
  return true; // No validation error
};
const validatePhoneNumberErrorMessage = {
  message: "Phone number must be numeric.",
};


const formSchema = z.object({
  name: z.string().trim().min(1, "Employee name can't be empty"),
  phoneNumber: z.string().trim().min(10, "Phone number needs to be 10 digits").max(10, "Phone number needs to be 10 digits").refine(validatePhoneNumber, validatePhoneNumberErrorMessage),
  position: z.string().trim().min(1, "Position can't be empty"),
  password: z.string().trim().min(8, "Password can't be less than 8 characters"),
  confirmPassword: z.string().trim().min(8, "Password can't be less than 8 characters")
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });


type FormFields = z.infer<typeof formSchema>;

interface EmployeeRequestBody extends FormFields {
  location: string
}

export function AddEmployee() {

  const adminInfo = useRecoilValue(adminInfoState)

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)
  const [ success, setSuccess ] = useState(false)

  const [ errorDetail, setErrorDetail ] = useState({
    title: "",
    description: ""
  })

  const setErrorFalse = () => setError(false)

  const setSuccessFalse = () => setSuccess(false)

  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      position: "",
      password: "",
      confirmPassword: "",
    },
  })


  const resetForm = () => {
    form.reset({
      name: "",
      phoneNumber: "",
      position: "",
      password: "",
      confirmPassword: "",
      // Add other fields with their default values if necessary
    });
  };


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    let location;

    if (adminInfo !=  null) {
      location = adminInfo.location;
    } else {
      location = ''
    }

    const employeeValues: EmployeeRequestBody | null = {
      ...values,
       // eslint-disable-next-line react-hooks/rules-of-hooks
      location 
    }
    
    try {
      const response = await axios.post(`${BACKEND_URL}/employee/create`, employeeValues);

      if ( response.status === 201 ) {
        setSuccess(true)
        resetForm()
      } else {
        setError(true)
      }
      
      console.log(response)
      console.log(response.data)
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
      setLoading(false)
    } catch (err) {
      resetForm()
      setError(true)
      setErrorDetail({
        title: "Error",
        description: "An Unknown Error Occured!"
      })
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white w-6/12 h-4/6 p-6 rounded border-2 ">
      
      <div className="flex flex-row justify-center items-center"> 
        <p className="font-bold text-3xl">Registration </p> 
      </div>
      
      
      <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Employe Name</FormLabel> */}
              <FormControl>
                <Input placeholder="Employee Name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Phone Number</FormLabel> */}
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Position</FormLabel> */}
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input placeholder="Password" {...field} type='password'/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Confirm Password</FormLabel> */}
              <FormControl>
                <Input placeholder="Confirm Password" {...field} type='password'  />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-center items-center"> 
          <Button disabled={loading} type="submit" className="px-6 text-lg" >Submit</Button>
        </div>
      </form>
      { error ? <CustomAlert title={errorDetail.title} description={errorDetail.description} setErrorOrSuccess={setErrorFalse} variant='destructive'></CustomAlert> : <></>}
      { success ? <CustomAlert title="Employee added!" description="Employee has been successfully created!" setErrorOrSuccess={setSuccessFalse} ></CustomAlert> : <></>}
    </Form>
  )
}

export default AddEmployee;