"use client";

// import { useState, useEffect } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRecoilValue } from 'recoil'
import { adminInfoState } from "@/Atoms/admin"

const formSchema = z.object({
  employeeName: z.string().trim().min(1, "Employee name can't be empty"),
  itemName: z.string().trim().min(1, "Item name can't be empty"),
  quantity: z.coerce.number().positive("Quantity should be greater than 0"),
});

type FormFields = z.infer<typeof formSchema>;

export function AddDefective() {

  const adminInfo = useRecoilValue(adminInfoState)
  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      itemName: "",
      quantity: 0,
    },
  });


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    let location;

    if (adminInfo !=  null) {
      location = adminInfo.location;
    } else {
      location = ''
    }

    const defectiveInventoryValue= {
      ...values,
       // eslint-disable-next-line react-hooks/rules-of-hooks
      location 
    }

    console.log(values);
    try {
      const response = await axios.post(`${BACKEND_URL}/defective/create`, defectiveInventoryValue);
      console.log(response.data.message)
    } catch (err) {
      console.log(err)
      // console.log(err.response.data.msg)

    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white w-6/12 h-4/6 p-6 rounded border-2 "
      >
        <div className="flex flex-row justify-center items-center">
          <p className="font-bold text-3xl">Return Item </p>
        </div>

        <FormField
          name="employeeName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Employe Name</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Employee Name"
                  {...field}
                  autoComplete="off"
                />                  
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="itemName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Phone Number</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Item Name"
                  {...field}
                  autoComplete="off"                  
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      
        <FormField
          name="quantity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Position</FormLabel> */}
              <FormControl>
                <Input type="number" placeholder="Quantity" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-center items-center">
          <Button type="submit" className="px-6 text-lg">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddDefective;
