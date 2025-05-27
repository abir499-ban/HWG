"use client"
import React, { useEffect,useState } from "react";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LenderStats } from "@/components/shared/LenderStats";
import { LenderMetrics, LenderRatesPieChart } from "@/components/shared/LenderMetrics";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { defaultLenderProfile, lenderProfileType } from "@/utils/LenderProfile.schema";
import LoadingSpinner from "@/components/shared/Loader";
//import { lender, loanApprovalRate, loanDefaultRate, portfolioYield, operationalEfficiency } from '@/constants/demodata'


export default function LenderDashboard() {
    const { data, status } = useSession()
    const router = useRouter()
    const [lender, setlender] = useState<lenderProfileType>(defaultLenderProfile)    

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/loanshark/signin')
        }
    }, [status])

    useEffect(() => {
        if (status === 'unauthenticated') return
        const fetchLenderDetails = async() =>{
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/lender/profile/${data?.aadharCard}`)
                const result = await res.json()
                if(res?.ok && result){
                    setlender(result)
                }else{
                    console.error("failed to fetch lender details")
                }
            } catch (error) {
                console.error("Error "+error)
            }
        }
        fetchLenderDetails()
    }, [])

    if(status === 'loading'){
        return <LoadingSpinner/>
    }


    return (
        <>
            <header className="h-14 flex items-center border-b bg-gradient-to-l from-orange-50 to-white/80 sticky top-0 z-20">
                <h1 className="ml-4 text-2xl font-bold tracking-tight text-orange-500 animate-fade-in">
                    <span className="inline-block align-middle">💵</span>
                    <span className="ml-2">Loan Shark Dashboard</span>
                </h1>
            </header>

            <main className="flex-1 px-6 py-3 animate-fade-in">
                <div className="max-w-5xl mx-auto px-4 py-10">
                    <Card className="mb-8 shadow-xl">
                        <CardHeader>
                            <p className="text-4xl font-semibold text-orange-500">{lender.name}</p>
                        </CardHeader>
                        <CardContent>
                            <LenderStats
                                totalCapital={lender.totalCapital}
                                avgLoanSize={lender.avgLoanSize}
                                interestRate={lender.interestRate}
                                repaymentTermMonths={lender.repaymentTermMonths}
                                acceptedCollateralTypes={lender.acceptedCollateralTypes}
                                customerBaseSize={lender.customerBaseSize}
                            />
                        </CardContent>
                    </Card>

                    <LenderMetrics
                        loanApprovalRate={lender.loanApprovalRate}
                        loanDefaultRate={lender.loanDefaultRate}
                        portfolioYield={lender.portfolioYield}
                        operationalEfficiency={lender.operationalEfficiency}
                    />

                    <div className="my-3 flex flex-col justify-center items-center gap-4">
                        <h4 className=" tex-xl md:text-2xl font-semibold text-orange-500 ">Default Loans and Repayed Loans</h4>
                        <LenderRatesPieChart loansIssued={lender.loansIssued} loansDefaulted={lender.loansDefaulted} />
                        {/* Add more charts/visualizations here if desired */}
                    </div>
                </div>
            </main>
        </>
    );
}
