'use client'
import React from 'react'
import { IdCard, Lock, EyeOff, Eye } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FarmerFormLoginSchema, farmerFormLoginType } from '@/utils/Farmer.schema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Signin = () => {
    const [showPassword, setshowPassword] = React.useState(false)
    const router = useRouter()
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<farmerFormLoginType>({
        resolver: zodResolver(FarmerFormLoginSchema),
        defaultValues: {
            digitalID: "",
            password: ""
        }
    })

    const SubmitFn = async (data: farmerFormLoginType) => {
        try {
            const res = await signIn("farmer_login", {
                redirect: false,
                digitalID: data.digitalID,
                password: data.password
            })
            if(res?.ok){
                console.log("farmer login successfull")
                router.push('/')
            }else{
                console.log("Error in Login")
            }
            
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#F2FCE2] via-[#FEF7CD] to-green-200 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-700">
                    Farmer Log In
                </h1>

                <form className="flex flex-col items-center justify-center gap-4 py-5 px-4 md:px-6 " onSubmit={handleSubmit(SubmitFn)}>
                    <div>
                        <Label htmlFor="digitalId" className="flex items-center gap-1">
                            <IdCard className="w-4 h-4 text-green-700" />
                            Digital Farmer ID
                        </Label>
                        <Input
                            id="digitalId"
                            {...register("digitalID")}
                            placeholder="Enter youtr Digital Farmer ID"
                            className="w-full mt-1"
                        />
                        {errors.digitalID && (
                            <p className="text-red-500 text-xs mt-1">{errors.digitalID.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password" className="flex items-center gap-1">
                            <Lock className="w-4 h-4 text-green-700" />
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                {...register("password")}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="mt-1 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setshowPassword((prev) => !prev)}
                                className="absolute right-2 top-2 text-gray-400 hover:text-green-700"
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
                        className="w-full bg-green-700 hover:bg-green-800 text-white hover:cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging you in..." : "Sign In"}
                    </Button>
                </form>
                <Link href='/auth/loanshark/signin' className='text-xm text-muted-foreground font-semibold underline'>Login as Loan Shark</Link>
            </div>
        </div>
    );
};

export default Signin;
