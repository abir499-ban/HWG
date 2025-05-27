"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoanRequestFormType, LoanformSchema } from '@/utils/LoanRequest.schema'
import {useSession} from 'next-auth/react'


const LoanRequestForm = ({farmerId , aadharID} : Record<string , string>) => {
    const {data} = useSession()
    const form = useForm<LoanRequestFormType>({
            resolver: zodResolver(LoanformSchema),
            defaultValues: {
                loanAmount: 0,
                loanPurpose: "",
                loanTermMonths: 12,
                requestedInterestRate: undefined,
            },
        });

    const onSubmit = async(formData : LoanRequestFormType)=>{
        const obj = {...formData , farmerId , aadharID}
        console.log(obj)
        try {
            const res =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/loan/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${data?.accessToken}`
                },
                body : JSON.stringify(obj)
            })
            const response = await res.json()
            if(res?.ok && response){
                alert('Loan request submitted successfully')
            }else{
                console.log("Failed to submit loan request ", response)
            }
        } catch (error) {
            console.log(error)
        }


        form.reset()
    }
        
  return (
    <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="loanAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Amount (₹)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={100}
                                            placeholder="Enter requested amount (in Indian Rupees)"
                                            value={field.value || ""}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="loanPurpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Purpose</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="E.g., Crop Purchase, Equipment Upgrade, etc."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="loanTermMonths"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Term (in months)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={60}
                                            placeholder="Repayment duration"
                                            value={field.value || ""}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="requestedInterestRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Requested Interest Rate (%)
                                        <span className="ml-2 text-xs text-muted-foreground font-normal">(optional)</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            max={100}
                                            step={0.1}
                                            placeholder="Propose a rate (optional)"
                                            value={field.value || ""}
                                            onChange={e => {
                                                const v = e.target.value;
                                                if (v === "") field.onChange(undefined);
                                                else field.onChange(Number(v));
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit"  className="w-full hover:cursor-pointer" disabled={data?.role !== 'farmer'}>
                            Submit Request
                        </Button>
                    </form>
                </Form>
  )
}

export default LoanRequestForm