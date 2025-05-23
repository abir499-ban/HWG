"use client"
import React, { useState } from 'react'
import { Eye, EyeOff, User, IdCard, FileText, Key, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoanSharkFormSchema, LoanSharkFormType } from '@/utils/LoanShark.schema';


const LoanSharkSignUpForm = () => {
    const [calendarOpen, setcalendarOpen] = useState(false)
    const [showPassword, setshowPassword] = useState(false)

    const {
        register,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        watch,
        handleSubmit
    } = useForm<LoanSharkFormType>({
        resolver: zodResolver(LoanSharkFormSchema),
        defaultValues: {
            name: "",
            aadharCard: "",
            dob: undefined,
            bankAccount: "",
        }
    })

    const dob = watch('dob')

    const SubmitFn = async (data: LoanSharkFormType) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/loanshark/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const response = await res.json()
            if (res.status === 200) {
                alert("Sign up sucessfull")
                console.log(response)
            } else {
                alert("Sign up failed")
                console.log(response)
            }
        } catch (error) {
            alert("Sign up failed")
            console.error("Error during sign up" + error)
        }
        finally {
            reset()
        }
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit(SubmitFn)} autoComplete="off">
            {/* Name */}
            <div>
                <Label htmlFor="name" className="flex items-center gap-1">
                    <User className="w-4 h-4 text-orange-500" />
                    Name
                </Label>
                <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="mt-1"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
            </div>
            {/* Aadhaar Card Number */}
            <div>
                <Label htmlFor="aadhaar" className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-orange-500" />
                    Aadhaar Card Number
                </Label>
                <Input
                    id="aadhaar"
                    {...register("aadharCard")}
                    placeholder="12-digit Aadhaar number"
                    className="mt-1"
                    maxLength={12}
                    type='string'
                />
                {errors.aadharCard && (
                    <p className="text-red-500 text-xs mt-1">{errors.aadharCard.message}</p>
                )}
            </div>
            {/* Date of Birth */}
            <div>
                <Label className="flex items-center gap-1 mb-1">
                    <Key className="w-4 h-4 text-orange-500" size={4} />
                    Date of Birth
                </Label>
                <Popover open={calendarOpen} onOpenChange={setcalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className={
                                "w-full justify-start text-left font-normal " +
                                (!dob ? "text-muted-foreground" : "")
                            }
                        >
                            {dob ? <span>{new Date(dob).toDateString()}</span> : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={dob}
                            onSelect={(date: Date | undefined) => {
                                setValue("dob", date as Date, { shouldValidate: true });
                                setcalendarOpen(false);
                            }}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                            className="p-3 pointer-events-auto"
                        />
                    </PopoverContent>
                </Popover>
                {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>
                )}
            </div>
            {/* Bank Account Detail */}
            <div>
                <Label htmlFor="bankAccount" className="flex items-center gap-1">
                    <IdCard className="w-4 h-4 text-orange-500" />
                    Bank Account Detail
                </Label>
                <Input
                    id="bankAccount"
                    {...register("bankAccount")}
                    placeholder="Enter your bank details"
                    className="mt-1"
                />
                {errors.bankAccount && (
                    <p className="text-red-500 text-xs mt-1">{errors.bankAccount.message}</p>
                )}
            </div>
            {/* Password */}
            <div>
                <Label htmlFor="password" className="flex items-center gap-1">
                    <Lock className="w-4 h-4 text-orange-500" />
                    Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="mt-1 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setshowPassword((prev) => !prev)}
                        className="absolute right-2 top-2 text-gray-400 hover:text-orange-700"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full mt-4 bg-orange-500 hover:bg-orange-800 text-white hover:cursor-pointer"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
        </form>
    );
}



export default LoanSharkSignUpForm